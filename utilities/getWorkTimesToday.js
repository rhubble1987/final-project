const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = function getWorkTimesToday(UserId, res) {
  availableStartTimes = [540,570,600,630,660,690,720,750,780,810,840,870,900,930,960,990,1020];

  db.EventBlock.findAll({
    where: {
      UserId: UserId,
      date: {
        [Op.eq]: moment().format("YYYYMMDD"),
      },
      endTime: {
        [Op.gte]: 540,
      },
      startTime: {
        [Op.lte]: 1020,
      },
    },
    order: [["startTime", "ASC"]],
  })
    .then((savedEventBlocks) => {
      db.Task.findAll({
        where: {
          UserId: UserId,
          calculatedWorkDate: {
            [Op.eq]: moment().format("YYYYMMDD"),
          },
          isComplete: false,
        },
        order: [["calculatedPriority", "ASC"]],
      }).then((savedTasksWithoutTimes) => {
        for (l = 0; l < savedEventBlocks.length; l++) {
          for (p = 0; p < availableTimes.length; p++) {
            if (savedEventBlocks[l].dataValues.startTime === availableStartTimes[p]) {
              console.log('this is running');
              availableStartTimes.splice(p, (savedEventBlocks[l].dataValues.duration / 30));
            }
          }
        
        }
        console.log(availableStartTimes);

        let tasksWithTimes = [];
        for (j = 0; j < savedTasksWithoutTimes.length; j++) {
          savedTasksWithoutTimes[j].dataValues.calculatedStartTime = availableStartTimes[j];
          savedTasksWithoutTimes[j].dataValues.calculatedEndTime = availableStartTimes[j] + 30;
          tasksWithTimes.push(savedTasksWithoutTimes.dataValues);
        }

        
        for (m = 0; m < tasksWithTimes.length; m++) {
            db.Task.update(
                {
                    calculatedStartTime: tasksWithTimes[m].calculatedStartTime,
                    calculatedEndTime: tasksWithTimes[m].calculatedEndTime
                },
                {
                    where: {
                        id: tasksWithTimes[m].id
                    }
                }
            )
            .catch(err => {console.log(err)});
        }
        res.sendStatus(200);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

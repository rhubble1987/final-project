const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

module.exports = function getWorkTimes(UserId, res) {
  console.log('getWorkTimes is running');
  let todayOrTomorrowSearch;

  if (moment().format('H') < 9) {
    todayOrTomorrowSearch = moment().format("YYYYMMDD");
  }

  if (moment().format('H') >= 9) {
    todayOrTomorrowSearch = moment().add(1,'days').format("YYYYMMDD");
  }

  availableStartTimes = [540,570,600,630,660,690,720,750,780,810,840,870,900,930,960,990];


  db.EventBlock.findAll({
    where: {
      UserId: UserId,
      date: {
        [Op.eq]: todayOrTomorrowSearch
      },
      endTime: {
        [Op.gte]: 540,
      },
      startTime: {
        [Op.lte]: 1020,
      },
    },
    order: [["startTime", "ASC"]]
  })
    .then((savedEventBlocks) => {
      if(savedEventBlocks) {
        for (l = 0; l < savedEventBlocks.length; l++) {
          for (p = 0; p < availableStartTimes.length; p++) {
            if (savedEventBlocks[l].dataValues.startTime === availableStartTimes[p]) {
              availableStartTimes.splice(p, (savedEventBlocks[l].dataValues.duration / 30));
            }
          }
        
        }
      }
      db.Task.findAll({
        where: {
          UserId: UserId,
          calculatedWorkDate: {
            [Op.eq]: todayOrTomorrowSearch,
          },
          isComplete: false,
        },
        order: [["calculatedPriority", "ASC"]],
      }).then((savedTasksWithoutTimes) => {
        if (!savedTasksWithoutTimes) {
          return null;
        } else {
        let tasksWithTimes = [];
        
          for (j = 0; j < savedTasksWithoutTimes.length; j++) {
            savedTasksWithoutTimes[j].dataValues.startTime = availableStartTimes[j];
            savedTasksWithoutTimes[j].dataValues.endTime = availableStartTimes[j] + 30;
            tasksWithTimes.push(savedTasksWithoutTimes[j].dataValues);
          }
        

        const updateAllTasks = new Promise((resolve) => {
          for (m = 0; m < tasksWithTimes.length; m++) {
            db.Task.update(
                {
                    startTime: tasksWithTimes[m].startTime,
                    endTime: tasksWithTimes[m].endTime
                },
                {
                    where: {
                        id: tasksWithTimes[m].id
                    }
                }
            )
            .catch(err => {console.log(err)});
        }
        resolve('All tasks updated!');
        });

          updateAllTasks.then(() => {
            res.sendStatus(200);
          });

       
        }
        
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

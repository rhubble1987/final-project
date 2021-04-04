const db = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");
const getWorkTimes = require("./getWorkTimes");

module.exports = function getWorkDate(UserId, res) {
  let todayOrTomorrowSearch;

  if (moment().format('H') < 16) {
    todayOrTomorrowSearch = moment().format("YYYYMMDD");
  }

  if (moment().format('H') >= 16) {
    todayOrTomorrowSearch = moment().add(1,'days').format("YYYYMMDD");
  }

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
    order: [["startTime", "ASC"]],
  })
    .then((savedEvents) => {
      db.Task.findAll({
        where: {
          UserId: UserId,
          isComplete: false,
        },
        order: [["calculatedPriority", "ASC"]],
      })
        .then((tasks) => {
          let prioritizedSavedTasks = [];
          for (n = 0; n < tasks.length; n++) {
            prioritizedSavedTasks.push(tasks[n].dataValues);
          }
          let totalEventTime = 0;
          let tasksWithDates = [];
          if (savedEvents) {
            for (i = 0; i < savedEvents.length, i++; ) {
              totalEventTime = totalEventTime + savedEvents[i].duration;
            }
            let timeForTasks = 480 - totalEventTime;

            for (j = 0; j < prioritizedSavedTasks.length; j++) {
                if (moment().format('H') <= 16) {
                    prioritizedSavedTasks[j].calculatedWorkDate = moment().format("YYYYMMDD");
                }
                if (moment().format('H') > 16) {
                    prioritizedSavedTasks[j].calculatedWorkDate = moment().add(1,'days').format("YYYYMMDD");
                }
              tasksWithDates.push(prioritizedSavedTasks[j]);
              timeForTasks = timeForTasks + 30;
              if (timeForTasks === 480) {
                j = prioritizedSavedTasks.length;
              }
            }
          }
          if (savedEvents === null) {
            let timeForTasks = 480;
            for (j = 0; j < prioritizedSavedTasks.length; j++) {
                if (moment().format('H') > 16) {
                    prioritizedSavedTasks[j].calculatedWorkDate = moment().add(1,'days').format(
                        "YYYYMMDD"
                    );
                }
                if (moment().format('H') <= 16) {
                    prioritizedSavedTasks[j].calculatedWorkDate = moment().format(
                        "YYYYMMDD"
                    );
                }
              tasksWithDates.push(prioritizedSavedTasks[j]);
              timeForTasks = timeForTasks + 30;
              if (timeForTasks === 480) {
                j = prioritizedSavedTasks.length;
              }
            }
          }

          let updateTasksWithDates = new Promise((resolve) => {
            for (k = 0; k < tasksWithDates.length; k++) {
              db.Task.update(
                {
                  calculatedWorkDate: tasksWithDates[k].calculatedWorkDate,
                },
                {
                  where: {
                    id: tasksWithDates[k].id,
                  },
                }
              )
              .catch(err => {console.log(err)});
            }
            resolve('All tasks updated!');
          });

          updateTasksWithDates.then(() => {
            getWorkTimes(UserId, res);
          });
            
          
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

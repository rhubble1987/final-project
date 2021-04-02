const db = require('../models');
const moment = require('moment');

//order: [['calculatedPriority','ASC']]

module.exports = function getWorkDate(data) {
  //Get all saved tasks and event blocks
  var savedTasks = db.Task.findAll({include: db.User, where: {userId: data.UserId}, order: [['calculatedPriority','ASC']]})
    .then((storedTasks => {
      return storedTasks;
    }))
    .catch(err => console.log(err));
  var savedEventBlocks = db.EventBlock.findAll({include: db.User, where: {userId: req.body.userId, date: moment().format("YYYYMMDD")}})
    .then(storeEventBlocks => {
      return storeEventBlocks;
    })
    .catch(err => console.log(err));

  //Calculate the amount of time blocked off for events
  let totalBlockedEventTimeForToday = 0;
  for (i = 0; i < savedEventBlocks.length; i++) {
    totalBlockedEventTimeForToday = totalBlockedEventTimeForToday + (savedEventBlocks[i].endTime - savedEventBlocks[i].startTime);
  }

  /* Calculate the amount of free time based on the event block time calculated above and
    user submitted estimates to determine if there is enough time today to work on the task.
    If yes, the task gets a calculated work day of today, and if not, the task gets a calculated work day
    of tomorrow */
  let totalAvailableWorkTimeForToday = 480 - totalBlockedEventTimeForToday;

  for (j = 0; j < savedTasks.length; j++) {
    if (savedTasks[j].durationEstimate) {
      totalAvailableWorkTimeForToday = totalAvailableWorkTimeForToday + savedTasks[j].durationEstimate;
      if (totalAvailableWorkTimeForToday <= 480) {
        savedTasks[j].calculatedWorkDate = moment().format('YYYYMMDD');
      } else {
        savedTasks[j].calculatedWorkDate = moment().add(1,'days').format('YYYYMMDD');
      }
    } else {
      totalAvailableWorkTimeForToday = totalAvailableWorkTimeForToday - 0;
    }
  }

  //Now determine what tasks can be completed during the 8-hour timeframe today based on the available work time
  return savedTasks;





};
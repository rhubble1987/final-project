const { DATEONLY } = require('sequelize/types');
const db = require('../models');

module.exports = function getWorkDate(req) {
    //Get all saved tasks and event blocks
    var savedTasks = db.Task.findAll({where: {UserId: req.body.userId, isComplete: false}, order: ['calculatedPriority','ASC']})
    .then((storedTasks => {return storedTasks}))
    .catch(err => console.log(err));
    var savedEventBlocks = db.EventBlock.findAll({where: {UserId: req.body.userId, date: DATEONLY.now}})
    .then(storeEventBlocks => {return storeEventBlocks})
    .catch(err => console.log(err));

    //Calculate the amount of time blocked off for events
    let totalBlockedEventTimeForToday = 0;
    for (i = 0; i < savedEventBlocks.length; i++) {
        totalBlockedEventTimeForToday = totalBlockedEventTimeForToday + (savedEventBlocks[i].endTime - savedEventBlocks[i].startTime);
    }

    //Calculate the amount of free time based on the event block time calculated above and user submitted estimates
    let totalAvailableWorkTimeForToday = 480 - totalBlockedEventTimeForToday;

    for (j = 0; j < savedTasks.length; j++) {
        if (savedTasks[j].durationEstimate) {
            totalAvailableWorkTimeForToday = totalAvailableWorkTimeForToday + savedTasks[j].durationEstimate;
            savedTasks[j].calculatedWorkDate = DATEONLY.now;
        } else {
            totalAvailableWorkTimeForToday = totalAvailableWorkTimeForToday - 0;
        }
    }

    //Now determine what tasks can be completed during the 8-hour timeframe today based on the available work time
    for (k = 0; k < totalAvailableWorkTimeForToday; k++) {
        totalAvailableWorkTimeForToday = totalAvailableWorkTimeForToday +
    }


    


}
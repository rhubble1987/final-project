const schedule = require('node-schedule');
const db = require('../models');

module.exports = function dailyTaskUpdate() {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 0;
    rule.minute = 1;

    db.User.findAll({
        include: {
            model: db.Task,
            where: {
                isComplete: false
            }
        }
    })

    schedule.scheduleJob(rule, function() {
        sendMorningText();
        console.log('Function executed');
      });

    
}
const db = require('../models');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { Op } = require("sequelize");



module.exports = function sendMorningText() {
    console.log('Function executing');
    db.User.findAll({
        include: {
            model: db.Task,
            where: {
                calculatedPriority: {
                    [Op.lte] : 5
                }
            }
            
        },
        order: [[db.Task, 'calculatedPriority', 'ASC']]
    })
    .then(users => {
      for (i = 0; i < users.length; i++) {
        //console.log(`User Number: ${users[i].dataValues.id}`);
        let messageBody;
        if (users[i].dataValues.Tasks.length === 1) {
          messageBody = `Good morning, from Loopti! Your top task for today is: ${users[i].dataValues.Tasks[0].dataValues.taskName}. Check today's schedule in Loopti to see when you should work on this! https://peaceful-reef-96374.herokuapp.com/`;
        }
        if (users[i].dataValues.Tasks.length === 2) {
          messageBody = `Good morning, from Loopti! Your top tasks for today are: ${users[i].dataValues.Tasks[0].dataValues.taskName} and ${users[i].dataValues.Tasks[1].dataValues.taskName}. Check today's schedule in Loopti to see when you should work on these! https://peaceful-reef-96374.herokuapp.com/`;
        }
        if (users[i].dataValues.Tasks.length === 3) {
          messageBody = `Good morning, from Loopti! Your top tasks for today are: ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[1].dataValues.taskName}, and ${users[i].dataValues.Tasks[2].dataValues.taskName}. Check today's schedule in Loopti to see when you should work on these! https://peaceful-reef-96374.herokuapp.com/`;
        }
        if (users[i].dataValues.Tasks.length === 4) {
          messageBody = `Good morning, from Loopti! Your top tasks for today are: ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[1].dataValues.taskName}, ${users[i].dataValues.Tasks[2].dataValues.taskName}, and ${users[i].dataValues.Tasks[3].dataValues.taskName}. Check today's schedule in Loopti to see when you should work on these! https://peaceful-reef-96374.herokuapp.com/`;
        }
        if (users[i].dataValues.Tasks.length === 5) {
          messageBody = `Good morning, from Loopti! Your top tasks for today are: ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[1].dataValues.taskName}, ${users[i].dataValues.Tasks[2].dataValues.taskName}, ${users[i].dataValues.Tasks[3].dataValues.taskName}, and ${users[i].dataValues.Tasks[4].dataValues.taskName}. Check today's schedule in Loopti to see when you should work on these! https://peaceful-reef-96374.herokuapp.com/`;
        }
        let userNumber = users[i].dataValues.mobileNumber;
        client.messages
            .create({
              body: messageBody,
              from: '+17036352929',
              to: userNumber
            })
            .then(() => console.log("Text sent to user."))
            .catch(err => {
              console.log(err);
            });
      }
    });
};




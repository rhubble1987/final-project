const db = require('../models');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { Op } = require("sequelize");



function sendMorningText() {
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
      let messageBody;
      let userNumber;
      for (i = 0; i < users.length; i++) {
        //console.log(`User Number: ${users[i].dataValues.id}`);
        console.log(users[i].dataValues.Tasks[0].dataValues.taskName);
        messageBody = `Good morning, from Loopti! Here are your current top five tasks: ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[0].dataValues.taskName}, and ${users[i].dataValues.Tasks[0].dataValues.taskName}. Check today's schedule in Loopti to see when you should work on these! https://peaceful-reef-96374.herokuapp.com/`;
        userNumber = users[i].dataValues.mobileNumber
        console.log(messageBody);
        console.log(userNumber);
          /*client.messages
            .create({
              body: messageBody,
              from: '+17036352929',
              to: userNumber
            })
            .then(() => console.log("Text sent to user."))
            .catch(err => {
              console.log(err);
            }); */
      }
    });
};

sendMorningText();




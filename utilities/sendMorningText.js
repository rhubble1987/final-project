const db = require('../models');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { Op } = require("sequelize");



module.exports = function sendMorningText() {
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
        if (users[i].dataValues.Tasks !== null) {
            client.messages
            .create({
                body: `Good morning, from Loopti! Here are your current top five tasks: ${users[i].dataValues.Tasks[0].dataValues.taskName}, ${users[i].dataValues.Tasks[1].dataValues.taskName}, ${users[i].dataValues.Tasks[2].dataValues.taskName}, ${users[i].dataValues.Tasks[3].dataValues.taskName}, and ${users[i].dataValues.Tasks[4].dataValues.taskName}. Check your Loopti calendar to see the best times to work on these!`,
                from: '+17036352929',
                to: users[i].dataValues.mobileNumber
            })
            .then(() => console.log("Text sent to user."))
            .catch(err => {console.log(err)});
        }
        }
    })
}
    
            


const db = require('../models');
const {Op} = require('sequelize');
const moment = require('moment');


module.exports = {
    getUserEventBlocks: function(req,res) {
        db.EventBlock.findAll({
            where: {
                UserId: req.body.userId,
                date: {
                    [Op.eq]: moment().format('YYYYMMDD')
                }
            }
        })
        .then(userEventBlocks => res.json(userEventBlocks))
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        //Need to add code here to calculate new priorities and work days and times
        db.EventBlock.create({
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            UserId: req.body.userId
        })
        .then(newEventBlock => res.json(newEventBlock))
        .catch(err => res.send(err));
    }
}
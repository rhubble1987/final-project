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
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        db.EventBlock.create({
            date: req.body.date,
            startTime: startTime,
            endTime: endTime,
            duration: endTime - startTime,
            UserId: req.body.userId
        })
        .then(function() {
            getPriority(req.body.userId,res);
        })
        .catch(err => res.send(err));
    }
};
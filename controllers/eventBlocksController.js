const db = require('../models');
const {Op} = require('sequelize');
const moment = require('moment');
const getPriority = require('../utilities/getPriority');


module.exports = {
    getUserEventBlocks: function(req,res) {
        db.EventBlock.findAll({
            where: {
                UserId: req.params.userId,
                date: {
                    [Op.eq]: moment().format('YYYYMMDD')
                }
            }
        })
        .then(userEventBlocks => res.json(userEventBlocks))
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        const startTime = moment.duration(req.body.startTime).asMinutes();
        const endTime = moment.duration(req.body.endTime).asMinutes();
        const eventDate = moment(req.body.date).format('YYYYMMDD')
        db.EventBlock.create({
            date: eventDate,
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
const db = require('../models');

module.exports = {
    getUserEventBlocks: function(req,res) {
        db.EventBlock.findAll({where: {UserId: req.body.userId}})
        .sort({date: 1})
        .then(userEventBlocks => res.json(userEventBlocks))
        .catch(err => res.send(err));
    },
    create: function(req,res) {
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
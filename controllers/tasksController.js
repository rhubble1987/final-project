const db = require('../models');

module.exports = {
    getUserTasks: function(req,res) {
        db.Task.findAll({where: { Userid: req.body.userId, dueDate: '27-03-2021'}})
        .sort({calculatedPriority: 1})
        .then(userTasks => res.json(userTasks))
        .catch(err => res.json(err));
    },
    create: function(req,res) {
        db.Task.create({

            taskName: req.body.name,


            taskName: req.body.name,
            dueDate: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            calculatedWorkDate: 20210331,
            calculatedStartTime: 720,
            calculatedEndTime: 780,
            calculatedPriority: 1,
            note: req.body.note,
            UserId: req.body.userId

            taskName: req.body.taskName,
            dueDate: req.body.dueDate,
            //importance: req.body.importance,
            //durationEstimate: req.body.durationEstimate,
            note: req.body.note,
            UserId: req.body.userId
        })
        .then(function() {
            getPriority(req.body.userId,res);
        })
        .catch(err => res.send(err));
    },
    updateUserTask: function(req,res) {
        db.Task.update({
            taskName: req.body.taskName,

            dueDate: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            calculatedWorkDate: 20210331,
            calculatedStartTime: 720,
            calculatedEndTime: 780,
            calculatedPriority: 1,
            note: req.body.note,
            UserId: req.body.userId

        },
        {
            where: {
            id: req.body.id
            }
        })
        .then(function() {
            getPriority(req.body.userId,res);
        })
        .catch(err => res.send(err));
    },
    deleteUserTask: function(req,res) {
        db.Task.destroy({
            where: {
                id: req.body.id
            }
        })
        .then(function() {
            getPriority(req.body.userId,res);
>

        })
        .then(newTask => res.json(newTask))
        .catch(err => res.send(err));
    }
}
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
            dueDate: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            calculatedWorkDate: 20210331,
            calculatedStartTime: 720,
            calculatedEndTime: 780,
            calculatedPriority: 1,
            note: req.body.note,
            UserId: req.body.userId
        })
        .then(newTask => res.json(newTask))
        .catch(err => res.send(err));
    }
}
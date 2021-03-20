const db = require('../models');

module.exports = {
    getUserTasks: function(req,res) {
        db.Task.findAll({where: {UserId: req.body.userId}})
        .sort({calculatedPriority: 1})
        .then(userTasks => res.json(userTasks))
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        db.Task.create({
            name: req.body.name,
            dueData: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            calculatedWorkData: 20210331,
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
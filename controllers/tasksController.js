const db = require('../models');

module.exports = {
    getUserTasks: function(req,res) {
        db.Task.findAll({where: {UserId: req.body.userId}, order: ['calculatedPriority', 'ASC']})
        .then(userTasks => res.json(userTasks))
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        //Need to add code here to calculate priority, work date and times
        db.Task.create({
            name: req.body.name,
            dueData: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            calculatedWorkDate: 20210331,
            calculatedStartTime: 720,
            calculatedEndTime: 780,
            calculatedPriority: 0,
            note: req.body.note,
            isComplete: false,
            UserId: req.body.userId
        })
        .then(newTask => res.json(newTask))
        .catch(err => res.send(err));
    }
}
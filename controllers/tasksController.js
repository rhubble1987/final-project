const db = require('../models');

module.exports = {
    getUserTasks: function(req,res) {
        console.log(req)
        db.Task.findAll({
            where: {
                userId: req.body.userId, 
                isComplete: false
            },
            order: [['calculatedPriority', 'ASC']]
        })
        .then((userTasks) => {
            console.log(userTasks);
            res.json(userTasks)
        })
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        db.Task.create({
            taskName: req.body.name,
            dueDate: req.body.dueDate,
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

        })
        .then(newTask => res.json(newTask))
        .catch(err => res.send(err));
    }
}
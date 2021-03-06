const db = require('../models');
const moment = require('moment');
const getPriority = require('../utilities/getPriority');

module.exports = {
    getUserTasksForToday: function(req,res) {
        db.Task.findAll({
            where: {
                UserId: req.params.userId, 
                isComplete: false,
                calculatedWorkDate: moment().format('YYYYMMDD')
            },
            order: [['calculatedPriority', 'ASC']]
        })
        .then((userTasks) => {
            res.json(userTasks)
        })
        .catch(err => res.send(err));
    },
    getAllTasksForAUser: function(req,res) {
        db.Task.findAll({
            where: {
                UserId: req.params.userId, 
                isComplete: false,
            },
            order: [['calculatedPriority', 'ASC']]
        })
        .then((userTasks) => {
            res.json(userTasks)
        })
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        db.Task.create({
            taskName: req.body.taskName,
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
    completeUserTask: function(req,res) {
        db.Task.update({
            isComplete: 1
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
    },
    getUserTasksForTomorrow: function(req,res) {
        db.Task.findAll({
            where: {
                UserId: req.params.userId, 
                isComplete: false,
                calculatedWorkDate: moment().add(1,'days').format('YYYYMMDD')
            },
            order: [['calculatedPriority', 'ASC']]
        })
        .then((userTasks) => {
            res.json(userTasks)
        })
        .catch(err => res.send(err));
    }
}
const db = require('../models');
const getPriority = require('../utilities/getPriority');
//const getWorkDate = require('../utilities/getWorkDate');

// {include: User, where: {userId: req.body.userId}} order: [['calculatedPriority', 'ASC']]
module.exports = {
    getUserTasks: function(req,res) {
        console.log(req)
        db.Task.findAll({where: {userId: req.body.userId, isComplete: false}})
        .then((userTasks) => {
            console.log(userTasks);
            res.json(userTasks)
        })
        .catch(err => res.send(err));
    },
    create: function(req,res) {
        db.Task.create({
            taskName: req.body.taskName,
            dueDate: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            note: req.body.note,
            UserId: req.body.userId
        })
        .then(function() {
            getPriority(req.body.userId,res);
        })
        .catch(err => res.send(err));
    }
}
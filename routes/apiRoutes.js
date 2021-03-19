const db = require('../models');

module.exports = function (app) {
    app.get("/api/tasks", function (req,res) {
        db.Task.findAll({where: {id: req.body.userEmail}}).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.send(err);
        });
    });

    app.post("/api/user", function (req,res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }).then(function(userData) {
            res.json(userData);
        });
    })

    app.post("/api/tasks", function(req,res) {
        db.Task.create({
            name: req.body.name,
            dueData: req.body.dueDate,
            importance: req.body.importance,
            durationEstimate: req.body.durationEstimate,
            calculatedWorkData: 20210319,
            calculatedStartTime: 720,
            calculatedEndTime: 780,
            calculatedPriority: 1,
            note: req.body.note,
            userId: req.body.userId
        }).then(function(taskData) {
            res.json(taskData);
        });
    })
}
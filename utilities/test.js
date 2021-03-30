const db = require('../models');

module.exports = function getAllUsersandTasks() {
    db.User.findAll({
        include: db.Task
    })
    .then(users => {
        console.log(users);
    })
    .catch(err => {console.log(err)});
}

getAllUsersandTasks();
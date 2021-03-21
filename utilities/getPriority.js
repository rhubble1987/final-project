const { all } = require('sequelize/types/lib/operators');
const db = require('../models');

//Create an array consisting of task due dates
//Sort array from soonest to latest
//Then use a for loop to assign the new priorities for all tasks
//Use update method for saved tasks
//New tasks priority will be handled with the create method in the controller

module.exports = function getPriority(req) {
    var savedTasks = db.Task.findAll({where: {UserId: req.body.userId, isComplete: false}, order: ['dueDate','ASC']})
    .then((storedTasks => {return storedTasks}))
    .catch(err => console.log(err));
    for (k = 0; k < savedTasks.length; k++) {
        if (savedTasks[k].importance === 1) {
            const urgentTask = savedTasks[k];
            savedTasks.splice(k,1);
            savedTasks.unshift(urgentTask);
        }
    }
    for (i = 0; i < savedTasks.length; i++) {
        savedTasks[i].calculatedPriority = i++;
    }
    for (j = 0; j < savedTasks.length; j++) {
        if (savedTasks[j].dueDate === savedTasks[j++].dueDate) {
             if (savedTasks[j].importance < savedTasks[j++].importance) {
                 savedTasks[j].calculatedPriority--;
                 savedTasks[j++].calculatedPriority++;
             } else if (savedTask[j].importance === null) {
                 if (savedTasks[j].createdAt > savedTasks[j++].createdAt) {
                     savedTasks[j].calculatedPriority--;
                     savedTasks[j].calculatedPriority++;
                 }
             }
        }
    }

    for (l = 0; l < savedTasks.length; l++) {
        db.Task.update({calculatedPriority: savedTasks[l].calculatedPriority},{
            where: {
                    d: savedTasks[l].id
                    }
                })
                .then(() => console.log('Tasks Prioritized'))
                .catch(err => console.log(err));
    
            }
    }
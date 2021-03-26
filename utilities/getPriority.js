const db = require('../models');

//Create an array consisting of task due dates
//Sort array from soonest to latest
//Then use a for loop to assign the new priorities for all tasks
//Use update method for saved tasks
//New tasks priority will be handled with the create method in the controller

const urgentTask = function(savedTasks) {
    for (k = 0; k < savedTasks.length; k++) {
        if (savedTasks[k].importance === 1) {
            const urgentTask = savedTasks[k];
            savedTasks.splice(k,1);
            savedTasks.unshift(urgentTask);
        }
    }
}

const calculatePriorityByOrder = function(savedTasks) {
    console.log("Tasks rearranged");
    for (i = 0; i < savedTasks.length; i++) {
        savedTasks[i].Task.calculatedPriority = i++;
    }
}

const reassignPriorityByImportance = function(savedTasks) {
    for (j = 0; j < savedTasks.length; j++) {
        if (savedTasks[j].dueDate === savedTasks[j++].dueDate) {
             if (savedTasks[j].importance < savedTasks[j++].importance) {
                 savedTasks[j].calculatedPriority--;
                 savedTasks[j++].calculatedPriority++;
             } else if (savedTasks[j].importance === null && savedTasks[j++] !== null && savedTasks[j++].importance === null) {
                 if (savedTasks[j].createdAt > savedTasks[j++].createdAt) {
                     savedTasks[j].calculatedPriority++;
                     savedTasks[j].calculatedPriority--;
                 }
             } else if (savedTasks[j].importance == 5 && savedTasks[j++] !== null && savedTasks[j++].importance ===null){
                savedTasks[j].calculatedPriority++;
                savedTasks[j++].calculatedPriority--;
             }
        }
    }
}

const updatePriorities = function(savedTasks) {
    for (i = 0; i < savedTasks.length; i++) {
        db.Task.update({calculatedPriority: savedTasks[i].Task.calculatedPriority},{
            where: {
                    id: savedTasks[i].id
                    }
                })
                .then(() => {
                    console.log('Task Prioritized');
                })
                .catch(err => console.log(err));
            }
};


module.exports = async function getPriority() {
        console.log("getPriority is running!")
        let savedTasks;
        db.Task.findAll({where: {UserId: req.body.userId, isComplete: false}, order: [['dueDate', 'ASC']]}).then(data => {
                savedTasks = data;
        })
        .catch(err => {console.log(err)});

        await urgentTask(savedTasks);
        await calculatePriorityByOrder(savedTasks);
        await reassignPriorityByImportance(savedTasks);
        await updatePriorities(savedTasks);
        
    }

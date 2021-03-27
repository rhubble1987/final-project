const db = require("../models");

//Create an array consisting of task due dates
//Sort array from soonest to latest
//Then use a for loop to assign the new priorities for all tasks
//Use update method for saved tasks
//New tasks priority will be handled with the create method in the controller

//

module.exports = function getPriority(UserId,res) {
  db.Task.findAll({
    where: { UserId: UserId, isComplete: false },
    order: [["dueDate", "ASC"]],
  })
    .then((data) => {
      let savedTasks = data;
      console.log(savedTasks);
      if (savedTasks.length > 1) {
        let copiedTasks = [...savedTasks];
        //First move any urgent tasks to the top
        for (k = 0; k < copiedTasks.length; k++) {
          if (copiedTasks[k].importance === 1) {
            const urgentTask = copiedTasks[k];
            copiedTasks.splice(k, 1);
            copiedTasks.unshift(urgentTask);
            console.log("Urgent task moved to the top");
          }
        }

        //Then prioritize tasks based on their due dates(e.g. placement in the array)
        let tasksPrioritizedByDueDate = [];
        for (i = 0; i < copiedTasks.length; i++) {
            
          copiedTasks[i].dataValues = {
            ...copiedTasks[i].dataValues,
            calculatedPriority: i + 1,
          };
          tasksPrioritizedByDueDate.push(copiedTasks[i].dataValues);
          db.Task.update(
            {
              calculatedPriority: copiedTasks[i].dataValues.calculatedPriority,
            },
            { where: { id: copiedTasks[i].dataValues.id } }
          ).catch((err) => {
            console.log(err);
          });
        }
        console.log("Tasks prioritized by due date");

        console.log(tasksPrioritizedByDueDate);
        /* for (j = 0; j < tasksPrioritizedByDueDate.length - 1; j++) {
          if (
            tasksPrioritizedByDueDate[j].dueDate ===
              tasksPrioritizedByDueDate[j + 1].dueDate &&
            tasksPrioritizedByDueDate[j].importance >
              tasksPrioritizedByDueDate[j + 1].importance
          ) {/* {
            tasksPrioritizedByDueDate[j] = {
              ...tasksPrioritizedByDueDate[j],
              calculatedPriority: j + 1,
            };
            tasksPrioritizedByDueDate[j + 1] = {
              ...tasksPrioritizedByDueDate[j + 1],
              calculatedPriority: [j + 1] - 1,
            }; 
            db.Task.update(
              {
                calculatedPriority:
                  tasksPrioritizedByDueDate[j].calculatedPriority + 1,
              },
              { where: { id: tasksPrioritizedByDueDate[j].id } }
            )
              .then(() => {console.log("Task further prioritized by importance")})
              .catch((err) => {
                console.log(err);
              });
            db.Task.update(
              {
                calculatedPriority:
                  tasksPrioritizedByDueDate[j + 1].calculatedPriority - 1,
              },
              { where: { id: tasksPrioritizedByDueDate[j + 1].id } }
            )
              .then(() => {console.log("Task further prioritized by importance")})
              .catch((err) => {
                console.log(err);
              });
          } else {
              return console.log('Task already prioritized');
          } */
      } else {
        let copiedTask = [...savedTasks];
        db.Task.update(
          { calculatedPriority: 1 },
          { where: { id: copiedTask[0].dataValues.id } })
        .then(() => {console.log('Task prioritized!')})
        .catch((err) => {
          console.log(err);
        });

      }
      res.sendStatus(200);
    })

    .catch((err) => {
      console.log(err);
    });
};

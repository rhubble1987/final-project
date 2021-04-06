//This file is for future functionality

const db = require("../models");
const getWorkDate = require("./getWorkDate");



module.exports = function getPriority(UserId, res) {
  console.log("getPriority is running");
  db.Task.findAll({
    where: { UserId: UserId, isComplete: false },
    order: [["dueDate", "ASC"]],
  })
    .then((data) => {
      let savedTasks = data;
      if (savedTasks.length > 1) {
        let copiedTasks = [...savedTasks];

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
        getWorkDate(UserId, res);
      }  
      if (savedTasks.length === 1) {
        let copiedTask = [...savedTasks];
        db.Task.update(
          { calculatedPriority: 1 },
          { where: { id: copiedTask[0].dataValues.id } }
        )
          .then(() => {
            console.log("Task prioritized!");
          })
          .catch((err) => {
            console.log(err);
          });
          getWorkDate(UserId, res);
        }
        if (savedTasks.length < 1) {
          res.sendStatus(200);
        }
      
    })

    .catch((err) => {
      console.log(err);
    });
};

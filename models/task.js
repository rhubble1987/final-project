const moment = require('moment');

module.exports = function(sequelize, DataTypes){
  const Task = sequelize.define("Task", {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
        durationEstimate: {
            type: DataTypes.INTEGER,
            defaultValue: 30
            //Note: for now, this will always default to 60 minutes. We'll allow users to specify a duration estimate in a later update.
        },
        calculatedWorkDate: { //Should be stored as YYYYMMDD. Use moment.js to convert to formatted date when displaying to user
            type: DataTypes.INTEGER,
           defaultValue: moment().add(1,'days').format('YYYYMMDD')
        },
        startTime: { //Should be stored as minutes in the day (e.g. 12pm = 720) and then will be converted to formatted time when displayed to the user
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        endTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        calculatedPriority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        scheduleType: {
            type: DataTypes.STRING,
            defaultValue: 'task'
        }
    });

  return Task;
};
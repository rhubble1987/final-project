module.exports = function(sequelize, DataTypes){
    const Task = sequelize.define("Task", {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        /* Stored as YYYYMMDD
         Needs to allow user to have a default due date of their chooseing. For now, they will
         just always have to enter a due date
         
         Add validation that if importance is level 1, then the due date must default to the current day*/
        },
        /* importance: {
            type: DataTypes.INTEGER,
            defaultValue: 5
            /* User will see words that equate to a value: Urgent = 1, Important = 2, 
            Somewhat important = 3, Not very important = 4, If I have time = 5
            
            If urgent (#1) is selected, the due date will default to today
        }, 
        durationEstimate: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        calculatedWorkDate: { //Should be stored as YYYYMMDD. Use moment.js to convert to formatted date when displaying to user
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        calculatedStartTime: { //Should be stored as minutes in the day (e.g. 12pm = 720) and then will be converted to formatted time when displayed to the user
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        calculatedEndTime: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, */
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
        }
    });

    
    return Task;
}
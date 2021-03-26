module.exports = function(sequelize, DataTypes){
    const Task = sequelize.define("Task", {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        /* Stored as YYYYMMDD */
        },
        importance: {
            type: DataTypes.INTEGER,
            allowNull: true
            /* User will see words that equate to a value: Urgent = 1, Important = 2, 
            Somewhat important = 3, Not very important = 4, If I have time = 5 */
        },
        durationEstimate: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        }
    });

    
    return Task;
}
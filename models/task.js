module.exports = function(sequelize, DataTypes){
    const Task = sequelize.define("Task", {
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        importance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        durationEstimate: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        calculatedWorkDate: { //Should be stored as YYYYMMDD. Use moment.js to convert to formatted date when displaying to user
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calculatedStartTime: { //Should be stored as minutes in the day (e.g. 12pm = 720) and then will be converted to formatted time when displayed to the user
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calculatedEndTime: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calculatedPriority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return Task;
}
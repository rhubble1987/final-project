module.exports = function(sequelize, DataTypes){
    const EventBlock = sequelize.define("EventBlock", {
        date: { //Stored as YYYYMMDD
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startTime: { //Stored as minutes
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 1440
            }
        },
        endTime: { //Stored as minutes
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 1440
            }
        },
        duration: { //Stored as minutes,
            type: DataTypes.INTEGER,
            allowNull: false      
        },
        scheduleType: {
            type: DataTypes.STRING,
            defaultValue: 'event',
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false

        }
    });

    return EventBlock;
}
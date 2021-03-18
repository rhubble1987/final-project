module.exports = function(sequelize, DataTypes){
    const EventBlock = sequelize.define("EventBlock", {
        date: { //Stored as YYYYMMDD
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startTime: { //Stored as minutes
            type: DataTypes.INTEGER,
            allowNull: false
        },
        endDate: { //Stored as minutes
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return EventBlock;
}
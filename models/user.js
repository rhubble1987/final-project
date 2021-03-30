

module.exports =function(sequelize, DataTypes) {
   const User = sequelize.define("User", {
       email: {
           type: DataTypes.STRING,
           allowNull: false
       },
       password: {
           type: DataTypes.STRING,
           allowNull: false
       },
       firstName: {
           type: DataTypes.STRING,
           allowNull: false
       },
       lastName: {
           type: DataTypes.STRING,
           allowNull: false
       },
       mobileNumber: {
           type: DataTypes.STRING,
           allowNull: false
       }
   });
   
   User.associate = (models) => {
    User.hasMany(models.Task, {
        onDelete: 'cascade'
    });
    models.Task.belongsTo(User);
    User.hasMany(models.EventBlock, {
        onDelete: 'cascade'
    });
    User.hasMany(models.Task);
    models.Task.belongsTo(User);
    User.hasMany(models.EventBlock);
    models.EventBlock.belongsTo(User);
    }

   return User;
}
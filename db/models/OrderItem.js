const sequelize = require("sequelize");

module.exports = ( sequelize, DataTypes) =>
sequelize.define("OrderItem",{
    quantity:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
});
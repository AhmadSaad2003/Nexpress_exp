// models/App.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');

class App extends Model {
    static associate() {
        // Define associations
        App.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
}

App.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    dateofcreation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    capital: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    userId: { 
        type: DataTypes.UUID,
        allowNull: false,
        references: { 
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    modelName: 'App',
    tableName: 'apps',
    timestamps: true,
});

module.exports = App;

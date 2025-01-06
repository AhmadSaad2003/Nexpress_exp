const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const App = require('./AppModel'); // Modèle App

class Ecosysteme extends Model {}

Ecosysteme.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    IdApp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ecosysteme',
    tableName: 'ecosystemes',
    timestamps: true
});

// Définition de la relation avec App
Ecosysteme.belongsTo(App, {
    foreignKey: 'IdApp',
    onDelete: 'CASCADE', // Supprimer Ecosysteme lorsque App est supprimé
    onUpdate: 'CASCADE'  // Met à jour la clé étrangère si nécessaire
});

module.exports = Ecosysteme;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const App = require('./AppModel');

class SocleDeSecurite extends Model {}

// Initialisation du modèle
SocleDeSecurite.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    Name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    IdApp: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'SocleDeSecurite', // Nom du modèle
    tableName: 'socle_de_securites', // Nom de la table
    timestamps: true, // Ajoute createdAt et updatedAt
});

SocleDeSecurite.belongsTo(App, { 
            foreignKey: 'IdApp', 
            onDelete: 'CASCADE', // Supprime le socle de sécurité si l'application associée est supprimée
            onUpdate: 'CASCADE' // Mets à jour la clé étrangère si nécessaire
        });


module.exports = SocleDeSecurite;

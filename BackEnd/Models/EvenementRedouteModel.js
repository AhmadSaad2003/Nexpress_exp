const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ValeurMetier = require('./valeurMetierModel');

class EvenementRedoute extends Model {}

// Initialisation du modèle
EvenementRedoute.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    Name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    Description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    TypeEvent: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    Consequence: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    IdValeurMetier: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'EvenementRedoute', // Nom du modèle
    tableName: 'evenement_redoutes', // Nom de la table
    timestamps: true, // Ajoute createdAt et updatedAt
});

EvenementRedoute.belongsTo(ValeurMetier, { 
            foreignKey: 'IdValeurMetier', 
            onDelete: 'CASCADE', // Supprime l'événement redouté si la valeur métier associée est supprimée
            onUpdate: 'CASCADE' // Mets à jour la clé étrangère si nécessaire
        });

module.exports = EvenementRedoute;

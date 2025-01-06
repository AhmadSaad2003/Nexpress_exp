// models/BienSupport.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ValeurMetier = require('./valeurMetierModel');

class BienSupport extends Model {}

// Initialisation du modèle
BienSupport.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    Name: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    IdValeurMetier: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'BienSupport', // Nom du modèle
    tableName: 'bien_supports', // Nom de la table
    timestamps: true, // Ajoute les champs createdAt et updatedAt
});

BienSupport.belongsTo(ValeurMetier, { 
            foreignKey: 'IdValeurMetier', 
            onDelete: 'CASCADE', // Supprime les BienSupport si la ValeurMetier associée est supprimée
            onUpdate: 'CASCADE' // Mets à jour la clé étrangère si elle change dans ValeurMetier
        });

module.exports = BienSupport;

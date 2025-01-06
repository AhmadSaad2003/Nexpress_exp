// models/Mission.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const App = require('./AppModel');
//const ValeurMetier = require('./valeurMetierModel');

class Mission extends Model {
    // static associate() {
    //     // Relation avec App (onDelete: CASCADE)
        

    //     // Relation avec ValeurMetier (onDelete: CASCADE)
    //     Mission.hasMany(ValeurMetier, { 
    //         foreignKey: 'IdMission', 
    //         onDelete: 'CASCADE', 
    //         onUpdate: 'CASCADE' 
    //     });
    // }
}

// Initialisation du modèle
Mission.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    Idapp: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'Mission', // Nom du modèle
    tableName: 'missions', // Nom de la table
    timestamps: true, // Ajoute les champs createdAt et updatedAt
});

Mission.belongsTo(App, { 
            foreignKey: 'Idapp', 
            onDelete: 'CASCADE', // Supprime les missions associées si l'app est supprimée
            onUpdate: 'CASCADE' // Mets à jour les clés étrangères si l'app change
        });

module.exports = Mission;

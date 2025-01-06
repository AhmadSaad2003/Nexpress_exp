const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Mission = require('./missionModel');
// const BienSupport = require('./bienSupportModel');
// const EvenementRedoute = require('./evenementRedouteModel');

class ValeurMetier extends Model {
    // static associate() {
    //     // Relation avec Mission (onDelete: CASCADE)
        

    //     // Relation avec BienSupport (onDelete: CASCADE)
    //     ValeurMetier.hasMany(BienSupport, { 
    //         foreignKey: 'IdValeurMetier', 
    //         onDelete: 'CASCADE', 
    //         onUpdate: 'CASCADE' 
    //     });

    //     // Relation avec EvenementRedoute (onDelete: CASCADE)
    //     ValeurMetier.hasMany(EvenementRedoute, { 
    //         foreignKey: 'IdValeurMetier', 
    //         onDelete: 'CASCADE', 
    //         onUpdate: 'CASCADE' 
    //     });
    // }
}

// Initialisation du modèle
ValeurMetier.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    Nom: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    Nature: { 
        type: DataTypes.ENUM('Processus', 'Information'), 
        allowNull: false 
    },
    Description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    EntiteResponsable: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    IdMission: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'ValeurMetier', // Nom du modèle
    tableName: 'valeur_metiers', // Nom de la table
    timestamps: true, // Ajoute createdAt et updatedAt
});

ValeurMetier.belongsTo(Mission, { 
            foreignKey: 'IdMission', 
            onDelete: 'CASCADE', // Supprime les Valeurs Métier associées si la Mission est supprimée
            onUpdate: 'CASCADE' // Mets à jour la clé étrangère si nécessaire
        });

module.exports = ValeurMetier;

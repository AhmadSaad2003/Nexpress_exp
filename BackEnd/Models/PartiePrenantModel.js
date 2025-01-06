const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const Ecosysteme = require('./EcosystemeModel'); // Modèle Ecosysteme
//const CheminStrategique = require('./CheminStrategiqueModel'); // Modèle CheminStrategique

class PartiePrenant extends Model {}

PartiePrenant.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Activite: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Depandance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Penetration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Maturite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Confiance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NiveauMenace: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    IdEcosysteme: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'PartiePrenant',
    tableName: 'parties_prenantes',
    timestamps: true
});

// Définition de la relation avec Ecosysteme
PartiePrenant.belongsTo(Ecosysteme, {
    foreignKey: 'IdEcosysteme',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Définition de la relation avec CheminStrategique
// PartiePrenant.hasMany(CheminStrategique, {
//     foreignKey: 'IdPartiePrenant',  // La clé étrangère dans CheminStrategique
//     onDelete: 'CASCADE',           // Supprimer les chemins stratégiques si le PartiePrenant est supprimé
//     onUpdate: 'CASCADE'            // Mettre à jour la clé étrangère si nécessaire
// });

module.exports = PartiePrenant;

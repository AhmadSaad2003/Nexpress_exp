const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const CheminStrategique = require('./CheminStrategiqueModel'); // Modèle CheminStrategique

class ScenarioOperationnel extends Model {}

ScenarioOperationnel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Intitul: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    IdCheminStrategique: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Connaitre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Rentrer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Trouver: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Exploiter: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Vraisemblence: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ScenarioOperationnel',
    tableName: 'scenarios_operationnels',
    timestamps: true
});

// Définition de la relation avec le modèle CheminStrategique
ScenarioOperationnel.belongsTo(CheminStrategique, {
    foreignKey: 'IdCheminStrategique',
    onDelete: 'CASCADE' // Supprimer le scénario opérationnel si le chemin stratégique associé est supprimé
});

module.exports = ScenarioOperationnel;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const CheminStrategique = require('./CheminStrategiqueModel'); // Modèle CheminStrategique

class MesureSecurite extends Model {}

MesureSecurite.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdCheminStrategique: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Mesure: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    MenaceResiduel: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'MesureSecurite',
    tableName: 'mesures_securite',
    timestamps: true
});

// Définition de la relation avec le modèle CheminStrategique
MesureSecurite.belongsTo(CheminStrategique, {
    foreignKey: 'IdCheminStrategique',
    onDelete: 'CASCADE' // Supprimer la mesure de sécurité si le chemin stratégique associé est supprimé
});

module.exports = MesureSecurite;

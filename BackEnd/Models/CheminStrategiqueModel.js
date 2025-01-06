const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const SourceRisque = require('./sourceRisqueModel'); // Modèle SourceRisque
const EvenementRedoute = require('./evenementRedouteModel'); // Modèle EvenementRedoute
const PartiePrenant = require('./partiePrenantModel'); // Modèle PartiePrenant
// const MesureDeSecurite = require('./MesureSecuriteModel'); // Modèle MesureDeSecurite

class CheminStrategique extends Model {}

CheminStrategique.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Intitul: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    IdSourceRisque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdEvenementRedoute: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdPartiePrenant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Gravite: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CheminStrategique',
    tableName: 'chemins_strategiques',
    timestamps: true
});

// Définition des relations avec les autres modèles
CheminStrategique.belongsTo(SourceRisque, {
    foreignKey: 'IdSourceRisque',
    onDelete: 'CASCADE' // Supprimer le chemin stratégique si la source de risque est supprimée
});
CheminStrategique.belongsTo(EvenementRedoute, {
    foreignKey: 'IdEvenementRedoute',
    onDelete: 'CASCADE' // Supprimer le chemin stratégique si l'événement redouté est supprimé
});
CheminStrategique.belongsTo(PartiePrenant, {
    foreignKey: 'IdPartiePrenant',
    onDelete: 'CASCADE' // Supprimer le chemin stratégique si la partie prenante est supprimée
});

// Définition de la relation hasMany avec MesureDeSecurite
// CheminStrategique.hasMany(MesureDeSecurite, {
//     foreignKey: 'IdCheminStrategique', // La clé étrangère dans MesureDeSecurite
//     onDelete: 'CASCADE', // Supprimer les mesures de sécurité si le chemin stratégique est supprimé
//     onUpdate: 'CASCADE' // Mettre à jour la clé étrangère si nécessaire
// });

module.exports = CheminStrategique;

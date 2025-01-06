const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const App = require('./AppModel'); // Modèle App
//const CheminStrategique = require('./CheminStrategiqueModel'); // Modèle CheminStrategique

class SourceRisque extends Model {}

SourceRisque.init({
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
    modelName: 'SourceRisque',
    tableName: 'source_risques',
    timestamps: true
});

// Définition de la relation avec App
SourceRisque.belongsTo(App, {
    foreignKey: 'IdApp',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Définition de la relation avec CheminStrategique
// SourceRisque.hasMany(CheminStrategique, {
//     foreignKey: 'IdSourceRisque',  // La clé étrangère dans CheminStrategique
//     onDelete: 'CASCADE',           // Supprimer les chemins stratégiques si le source risque est supprimé
//     onUpdate: 'CASCADE'            // Mettre à jour la clé étrangère si nécessaire
// });

module.exports = SourceRisque;

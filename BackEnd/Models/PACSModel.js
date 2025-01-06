const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à la base de données
const App = require('./AppModel'); // Import du modèle App

class PACS extends Model {}

PACS.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Impact: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    CoefficientRisques: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Ajout de la clé étrangère IdApp
    IdApp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: App, // Référence au modèle App
            key: 'id'  // Clé primaire de App
        }
    }
}, {
    sequelize,
    modelName: 'PACS',
    tableName: 'pacs',
    timestamps: true
});

// Définir la relation entre PACS et App
PACS.belongsTo(App, { foreignKey: 'IdApp', onDelete: 'CASCADE' });

module.exports = PACS;

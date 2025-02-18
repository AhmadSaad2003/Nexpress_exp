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
    MesureDeSecurite: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Responsable: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    DifficulteDeMisEnOeuvre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Complexite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    DureeEcheance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.ENUM('termine', 'a lancer', 'en cours'),
        allowNull: false
    },
    IdApp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: App, 
            key: 'id'
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

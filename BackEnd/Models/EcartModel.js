const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Connexion à votre base de données
const SocleDeSecurite = require('./socleDeSecuriteModel'); // Modèle SocleDeSecurite

class Ecart extends Model {}

Ecart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    TypeEcart: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Justification: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    IdSocleSecurite: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ecart',
    tableName: 'ecarts',
    timestamps: true
});

// Définition de la relation avec SocleDeSecurite
Ecart.belongsTo(SocleDeSecurite, { 
    foreignKey: 'IdSocleSecurite', 
    onDelete: 'CASCADE',  // Supprimer les écarts associés lorsque SocleDeSecurite est supprimé
    onUpdate: 'CASCADE'   // Met à jour la clé étrangère si nécessaire
});

module.exports = Ecart;

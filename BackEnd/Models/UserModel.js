const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Votre fichier de configuration de base de données
//const App = require('./appModel'); // Import du modèle App

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID, // Identifiant unique
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Association hasMany : Un utilisateur peut avoir plusieurs applications
// User.hasMany(App, {
//   foreignKey: 'userId', // Assurez-vous d'avoir un `userId` dans le modèle App pour établir la relation
//   onDelete: 'CASCADE', // Supprimer les applications associées si l'utilisateur est supprimé
// });

module.exports = User;

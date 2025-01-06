const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST,  // Database host (your Docker service name)
    dialect: 'postgres',
    port: process.env.DB_PORT,  // PostgreSQL port
    logging: false,             // Optional: Disable SQL logging
  }
);
// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie!');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données :', err);
  });

module.exports = sequelize;

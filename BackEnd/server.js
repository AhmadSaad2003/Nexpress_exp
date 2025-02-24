require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoute = require('./Routes/userRoute');
const appRoute = require('./Routes/appRoute');
const missionRoute = require('./Routes/missionRoute');
const valeurMetier = require('./Routes/valeurMetierRoute');
const evenementRedoute = require('./Routes/evenementRedouteRoute');
const bienSupport = require('./Routes/bienSupportRoute');
const socleDeSecurite = require('./Routes/socleDeSecuriteRoute');
const ecart = require('./Routes/ecartRoute');
const sourceRisque = require('./Routes/sourceRisqueRoute');
const ecosysteme = require('./Routes/ecosystemeRoute');
const partiePrenant = require('./Routes/partiePrenantRoute');
const cheminStrategique = require('./Routes/cheminStrategiqueRoute');
const cheminOperationnel = require('./Routes/cheminOperationnelRoute');
const mesureSecurite = require('./Routes/mesureSecuriteRoute');
const PACS = require('./Routes/PACSRoute');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
// Routes
app.use('/api/auth/user', userRoute);
app.use('/api/apps', appRoute);
app.use('/api/missions', missionRoute);
app.use('/api/valeurMetiers', valeurMetier);
app.use('/api/evenementRedoutes', evenementRedoute);
app.use('/api/bienSupports', bienSupport);
app.use('/api/socleDeSecurites', socleDeSecurite);
app.use('/api/ecarts', ecart);
app.use('/api/sourceRisques', sourceRisque);
app.use('/api/ecosystemes', ecosysteme);
app.use('/api/partiePrenants', partiePrenant);
app.use('/api/cheminStrategiques', cheminStrategique);
app.use('/api/cheminOperationnels', cheminOperationnel);
app.use('/api/mesureSecurites', mesureSecurite);
app.use('/api/PACS', PACS);

// Test de la connexion à la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    // Synchroniser les modèles
    await sequelize.sync({ alter: true });
    console.log('Les modèles ont été synchronisés.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
})();

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

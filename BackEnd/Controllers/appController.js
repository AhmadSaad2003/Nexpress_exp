const App = require('../Models/AppModel'); // Importer le modèle App

// Créer une nouvelle application
const createApp = async (req, res) => {
    try {
        const { name, dateofcreation, capital } = req.body;
        const userId = req.user.id;
        const newApp = await App.create({ name, dateofcreation, capital, userId });
        res.status(201).json(newApp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'application.' });
    }
};

// Récupérer toutes les applications
const getAllApps = async (req, res) => {
    try {
        const apps = await App.findAll();
        res.status(200).json(apps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des applications.' });
    }
};

// Récupérer une application par ID
const getAppById = async (req, res) => {
    try {
        const { id } = req.params;
        const app = await App.findByPk(id);
        if (!app) {
            return res.status(404).json({ error: 'Application non trouvée.' });
        }
        res.status(200).json(app);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'application.' });
    }
};

// Mettre à jour une application
const updateApp = async (req, res) => {
    try {
        const { appId } = req.params;
        const { content } = req.body;

        // Parse the content field (assuming it's a JSON string)
        const parsedContent = JSON.parse(content);
        const { name, dateofcreation, capital } = parsedContent;
        const app = await App.findByPk(appId);
        if (!app) {
            return res.status(404).json({ error: 'Application non trouvée.' });
        }
        await app.update({ name, dateofcreation, capital });
        res.status(200).json(app);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'application.' });
    }
};

// Supprimer une application
const deleteApp = async (req, res) => {
    try {
        const { id } = req.params;
        const app = await App.findByPk(id);
        if (!app) {
            return res.status(404).json({ error: 'Application non trouvée.' });
        }
        await app.destroy();
        res.status(200).json({ message: 'Application supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'application.' });
    }
};

const getUserApps = async (req, res) => {
    try {
      const userId = req.user.id; // `authenticate` middleware adds `req.user`
      const apps = await App.findAll({ where: { userId } });
      res.status(200).json(apps);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects", error });
    }
  };

module.exports = { createApp, getAllApps, getAppById, updateApp, deleteApp, getUserApps };

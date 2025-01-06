const SocleDeSecurite = require('../Models/socleDeSecuriteModel'); // Importer le modèle SocleDeSecurite

// Créer un nouveau Socle de Sécurité
const createSocleDeSecurite = async (req, res) => {
    try {
        const { Name, IdApp } = req.body;
        const newSocleDeSecurite = await SocleDeSecurite.create({ Name, IdApp });
        res.status(201).json(newSocleDeSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du Socle de Sécurité.' });
    }
};

// Récupérer tous les Socles de Sécurité
const getAllSoclesDeSecurite = async (req, res) => {
    try {
        const soclesDeSecurite = await SocleDeSecurite.findAll();
        res.status(200).json(soclesDeSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des Socles de Sécurité.' });
    }
};

// Récupérer un Socle de Sécurité par ID
const getSocleDeSecuriteById = async (req, res) => {
    try {
        const { id } = req.params;
        const socleDeSecurite = await SocleDeSecurite.findByPk(id);
        if (!socleDeSecurite) {
            return res.status(404).json({ error: 'Socle de Sécurité non trouvé.' });
        }
        res.status(200).json(socleDeSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du Socle de Sécurité.' });
    }
};

// Mettre à jour un Socle de Sécurité
const updateSocleDeSecurite = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, IdApp } = req.body;
        const socleDeSecurite = await SocleDeSecurite.findByPk(id);
        if (!socleDeSecurite) {
            return res.status(404).json({ error: 'Socle de Sécurité non trouvé.' });
        }
        await socleDeSecurite.update({ Name, IdApp });
        res.status(200).json(socleDeSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du Socle de Sécurité.' });
    }
};

// Supprimer un Socle de Sécurité
const deleteSocleDeSecurite = async (req, res) => {
    try {
        const { id } = req.params;
        const socleDeSecurite = await SocleDeSecurite.findByPk(id);
        if (!socleDeSecurite) {
            return res.status(404).json({ error: 'Socle de Sécurité non trouvé.' });
        }
        await socleDeSecurite.destroy();
        res.status(200).json({ message: 'Socle de Sécurité supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du Socle de Sécurité.' });
    }
};

const getAppSocle = async (req, res) => {
    try {
      const {IdApp} = req.params; 
      const socles = await SocleDeSecurite.findAll({ where: { IdApp } });
      res.status(200).json(socles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching missions", error });
    }
};
module.exports = { createSocleDeSecurite, getAllSoclesDeSecurite, getSocleDeSecuriteById, updateSocleDeSecurite, deleteSocleDeSecurite, getAppSocle };

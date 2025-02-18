const PACS = require('../Models/PACSModel'); // Importer le modèle PACS
const App = require('../Models/AppModel'); // Importer le modèle App

// Créer un nouveau PACS
const createPACS = async (req, res) => {
    try {
        const { MesureDeSecurite, Responsable, DifficulteDeMisEnOeuvre, Complexite,DureeEcheance, Status, IdApp } = req.body;

        // Vérifier l'existence de l'App
        const app = await App.findByPk(IdApp);
        if (!app) {
            return res.status(404).json({ error: 'App non trouvée.' });
        }

        const newPACS = await PACS.create({
            MesureDeSecurite, Responsable, DifficulteDeMisEnOeuvre, Complexite,DureeEcheance, Status, IdApp
        });

        res.status(201).json(newPACS);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du PACS.' });
    }
};

// Récupérer tous les PACS
const getAllPACS = async (req, res) => {
    try {
        const pacs = await PACS.findAll();
        res.status(200).json(pacs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des PACS.' });
    }
};

// Récupérer un PACS par ID
const getPACSById = async (req, res) => {
    try {
        const { id } = req.params;
        const pacs = await PACS.findByPk(id);
        if (!pacs) {
            return res.status(404).json({ error: 'PACS non trouvé.' });
        }
        res.status(200).json(pacs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du PACS.' });
    }
};

// Mettre à jour un PACS
const updatePACS = async (req, res) => {
    try {
        const { pacsId } = req.params;
        const { MesureDeSecurite, Responsable, DifficulteDeMisEnOeuvre, Complexite, DureeEcheance, Status } = req.body;

        const pacs = await PACS.findByPk(pacsId);
        if (!pacs) {
            return res.status(404).json({ error: 'PACS non trouvé.' });
        }

        await pacs.update({
            MesureDeSecurite, Responsable, DifficulteDeMisEnOeuvre, Complexite,DureeEcheance, Status
        });

        res.status(200).json(pacs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du PACS.' });
    }
};

// Supprimer un PACS
const deletePACS = async (req, res) => {
    try {
        const { pacsId } = req.params;
        const pacs = await PACS.findByPk(pacsId);
        if (!pacs) {
            return res.status(404).json({ error: 'PACS non trouvé.' });
        }
        await pacs.destroy();
        res.status(200).json({ message: 'PACS supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du PACS.' });
    }
};

const getAppPacs = async (req, res) => {
    try {
      const {IdApp} = req.params; 
      const pacs = await PACS.findAll({ where: { IdApp } });
      res.status(200).json(pacs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Pacs", error });
    }
};

module.exports = { createPACS, getAllPACS, getPACSById, updatePACS, deletePACS, getAppPacs };

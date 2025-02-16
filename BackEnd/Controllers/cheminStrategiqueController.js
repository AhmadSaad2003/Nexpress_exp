const CheminStrategique = require('../Models/CheminStrategiqueModel'); // Importer le modèle CheminStrategique
const SourceRisque = require('../Models/sourceRisqueModel'); // Importer le modèle SourceRisque
const EvenementRedoute = require('../Models/evenementRedouteModel'); // Importer le modèle EvenementRedoute
const PartiePrenant = require('../Models/partiePrenantModel'); // Importer le modèle PartiePrenant

// Créer un nouveau CheminStrategique
const createCheminStrategique = async (req, res) => {
    try {
        const { Intitul, Description, IdSourceRisque, IdEvenementRedoute, IdPartiePrenant, Gravite } = req.body;

        // Vérifier l'existence de la SourceRisque
        const sourceRisque = await SourceRisque.findByPk(IdSourceRisque);
        if (!sourceRisque) {
            return res.status(404).json({ error: 'Source de risque non trouvée.' });
        }

        // Vérifier l'existence de l'EvenementRedoute
        const evenementRedoute = await EvenementRedoute.findByPk(IdEvenementRedoute);
        if (!evenementRedoute) {
            return res.status(404).json({ error: 'Événement redouté non trouvé.' });
        }

        // Vérifier l'existence de la PartiePrenant
        const partiePrenant = await PartiePrenant.findByPk(IdPartiePrenant);
        if (!partiePrenant) {
            return res.status(404).json({ error: 'Partie prenante non trouvée.' });
        }

        const newCheminStrategique = await CheminStrategique.create({
            Intitul, Description, IdSourceRisque, IdEvenementRedoute, IdPartiePrenant, Gravite
        });

        res.status(201).json(newCheminStrategique);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du chemin stratégique.' });
    }
};

// Récupérer tous les CheminsStrategiques
const getAllCheminsStrategiques = async (req, res) => {
    try {
        const cheminsStrategiques = await CheminStrategique.findAll();
        res.status(200).json(cheminsStrategiques);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des chemins stratégiques.' });
    }
};

// Récupérer un CheminStrategique par ID
const getCheminStrategiqueById = async (req, res) => {
    try {
        const { id } = req.params;
        const cheminStrategique = await CheminStrategique.findByPk(id);
        if (!cheminStrategique) {
            return res.status(404).json({ error: 'Chemin stratégique non trouvé.' });
        }
        res.status(200).json(cheminStrategique);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du chemin stratégique.' });
    }
};

// Mettre à jour un CheminStrategique
const updateCheminStrategique = async (req, res) => {
    try {
        const { stratId } = req.params;
        const { Intitul, Description, IdEvenementRedoute, IdPartiePrenant, Gravite } = req.body;


        // Vérifier l'existence de l'EvenementRedoute
        const evenementRedoute = await EvenementRedoute.findByPk(IdEvenementRedoute);
        if (!evenementRedoute) {
            return res.status(404).json({ error: 'Événement redouté non trouvé.' });
        }

        // Vérifier l'existence de la PartiePrenant
        const partiePrenant = await PartiePrenant.findByPk(IdPartiePrenant);
        if (!partiePrenant) {
            return res.status(404).json({ error: 'Partie prenante non trouvée.' });
        }

        const cheminStrategique = await CheminStrategique.findByPk(stratId);
        if (!cheminStrategique) {
            return res.status(404).json({ error: 'Chemin stratégique non trouvé.' });
        }

        await cheminStrategique.update({
            Intitul, Description, IdEvenementRedoute, IdPartiePrenant, Gravite
        });

        res.status(200).json(cheminStrategique);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du chemin stratégique.' });
    }
};

// Supprimer un CheminStrategique
const deleteCheminStrategique = async (req, res) => {
    try {
        const { stratId } = req.params;
        const cheminStrategique = await CheminStrategique.findByPk(stratId);
        if (!cheminStrategique) {
            return res.status(404).json({ error: 'Chemin stratégique non trouvé.' });
        }
        await cheminStrategique.destroy();
        res.status(200).json({ message: 'Chemin stratégique supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du chemin stratégique.' });
    }
};

const getSourceStrat = async (req, res) => {
    try {
      const {IdSourceRisque} = req.params; 
      const scenarioStrat = await CheminStrategique.findAll({ where: { IdSourceRisque } });
      res.status(200).json(scenarioStrat);
    } catch (error) {
      res.status(500).json({ message: "Error fetching scenario strategique", error });
    }
};


module.exports = { createCheminStrategique, getAllCheminsStrategiques, getCheminStrategiqueById, updateCheminStrategique, deleteCheminStrategique, getSourceStrat };

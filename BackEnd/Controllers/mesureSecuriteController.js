const MesureSecurite = require('../Models/MesureSecuriteModel'); // Importer le modèle MesureSecurite
const CheminStrategique = require('../Models/CheminStrategiqueModel'); // Importer le modèle CheminStrategique

// Créer une nouvelle MesureSecurite
const createMesureSecurite = async (req, res) => {
    try {
        const { IdCheminStrategique, Mesure, MenaceResiduel } = req.body;

        // Vérifier l'existence du CheminStrategique
        const cheminStrategique = await CheminStrategique.findByPk(IdCheminStrategique);
        if (!cheminStrategique) {
            return res.status(404).json({ error: 'Chemin stratégique non trouvé.' });
        }

        const newMesureSecurite = await MesureSecurite.create({
            IdCheminStrategique, Mesure, MenaceResiduel
        });

        res.status(201).json(newMesureSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la mesure de sécurité.' });
    }
};

// Récupérer toutes les MesureSecurites
const getAllMesuresSecurite = async (req, res) => {
    try {
        const mesuresSecurite = await MesureSecurite.findAll();
        res.status(200).json(mesuresSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des mesures de sécurité.' });
    }
};

// Récupérer une MesureSecurite par ID
const getMesureSecuriteById = async (req, res) => {
    try {
        const { id } = req.params;
        const mesureSecurite = await MesureSecurite.findByPk(id);
        if (!mesureSecurite) {
            return res.status(404).json({ error: 'Mesure de sécurité non trouvée.' });
        }
        res.status(200).json(mesureSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la mesure de sécurité.' });
    }
};

// Mettre à jour une MesureSecurite
const updateMesureSecurite = async (req, res) => {
    try {
        const { id } = req.params;
        const { IdCheminStrategique, Mesure, MenaceResiduel } = req.body;

        // Vérifier l'existence du CheminStrategique
        const cheminStrategique = await CheminStrategique.findByPk(IdCheminStrategique);
        if (!cheminStrategique) {
            return res.status(404).json({ error: 'Chemin stratégique non trouvé.' });
        }

        const mesureSecurite = await MesureSecurite.findByPk(id);
        if (!mesureSecurite) {
            return res.status(404).json({ error: 'Mesure de sécurité non trouvée.' });
        }

        await mesureSecurite.update({
            IdCheminStrategique, Mesure, MenaceResiduel
        });

        res.status(200).json(mesureSecurite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la mesure de sécurité.' });
    }
};

// Supprimer une MesureSecurite
const deleteMesureSecurite = async (req, res) => {
    try {
        const { id } = req.params;
        const mesureSecurite = await MesureSecurite.findByPk(id);
        if (!mesureSecurite) {
            return res.status(404).json({ error: 'Mesure de sécurité non trouvée.' });
        }
        await mesureSecurite.destroy();
        res.status(200).json({ message: 'Mesure de sécurité supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la mesure de sécurité.' });
    }
};

module.exports = { createMesureSecurite, getAllMesuresSecurite, getMesureSecuriteById, updateMesureSecurite, deleteMesureSecurite };

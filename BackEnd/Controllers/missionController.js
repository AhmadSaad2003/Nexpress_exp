const Mission = require('../Models/missionModel'); // Importer le modèle Mission

// Créer une nouvelle mission
const createMission = async (req, res) => {
    try {
        const { description, Idapp } = req.body;
        const newMission = await Mission.create({ description, Idapp });
        res.status(201).json(newMission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la mission.' });
    }
};

// Récupérer toutes les missions
const getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.findAll();
        res.status(200).json(missions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des missions.' });
    }
};

// Récupérer une mission par ID
const getMissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const mission = await Mission.findByPk(id);
        if (!mission) {
            return res.status(404).json({ error: 'Mission non trouvée.' });
        }
        res.status(200).json(mission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la mission.' });
    }
};

// Mettre à jour une mission
const updateMission = async (req, res) => {
    try {
        const { missionId } = req.params;
        const { description } = req.body;
        console.log(description);
        // Parse the content field (assuming it's a JSON string)
        //console.log(description);
        const mission = await Mission.findByPk(missionId);
        if (!mission) {
            return res.status(404).json({ error: 'Mission non trouvée.' });
        }
        await mission.update({ description, missionId });
        res.status(200).json(mission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la mission.' });
    }
};

// Supprimer une mission
const deleteMission = async (req, res) => {
    try {
        const { missionId } = req.params;
        const mission = await Mission.findByPk(missionId);
        if (!mission) {
            return res.status(404).json({ error: 'Mission non trouvée.' });
        }
        await mission.destroy();
        res.status(200).json({ message: 'Mission supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la mission.' });
    }
};

const getAppMissions = async (req, res) => {
    try {
      const {Idapp} = req.params; 
      const missions = await Mission.findAll({ where: { Idapp } });
      res.status(200).json(missions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching missions", error });
    }
};

module.exports = { createMission, getAllMissions, getMissionById, updateMission, deleteMission, getAppMissions };

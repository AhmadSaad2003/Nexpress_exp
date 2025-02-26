import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Ecosysteme } from "../../interfaces/ecosystem";
import { PartiePrenant } from "../../interfaces/partiePrenants";
import { CheminStrategique } from "../../interfaces/cheminStrategique";
import { MesureSecurite } from "../../interfaces/mesureSecurite";
import { SourceRisque } from "../../interfaces/sourceRisque";
import { EvenementRedoute } from "../../interfaces/evenementRedoute";
import { Mission } from "../../interfaces/mission";
import { ValeurMetier } from "../../interfaces/valeurMetier"
import "../../Style/atelier3.css"
//ecosysteme
import { getappecosys } from "../../services/Atelier3Services/getAppEcosystemeService";
import { createecosys } from "../../services/Atelier3Services/createEcosystemService";
import { updateecosys } from "../../services/Atelier3Services/updateEcosystemService"; // Add update service
import { deleteecosys } from "../../services/Atelier3Services/deleteEcosystemService"; // Add delete service
//partie prenante
import { getecoparties } from "../../services/Atelier3Services/getEcoPartiesService";
import { createpartie } from "../../services/Atelier3Services/createPartieService";
import { deletepartie } from "../../services/Atelier3Services/deletePartieService";
import { updatepartie } from "../../services/Atelier3Services/updatePartieService";
//scenario strategique
import { getsourcestrat } from "../../services/Atelier3Services/getSourceScenarioStratService";
import { createstrat } from "../../services/Atelier3Services/createScenarioStratService";
import { updatestrat } from "../../services/Atelier3Services/updateScenarioStratService";
import { deletestrat } from "../../services/Atelier3Services/deleteScenarioStratService";
//mesure securite
import { getscenariomesure } from "../../services/Atelier3Services/getScenarioMesureService";
import { updatemesure } from "../../services/Atelier3Services/updateMesureService";
import { deletemesure } from "../../services/Atelier3Services/deleteMesureService";
import { createmesure } from "../../services/Atelier3Services/createMesureService";
//source de risque
import { getappsource } from "../../services/Atelier2Services/getAppSourceService";
//mission
import { getappmissions } from "../../services/Atelier1Services/getAppMissionsService";
//evenement redoute
import { getvaleurevent } from "../../services/Atelier1Services/getValeurEventsService";
//valeur metier
import { getmissionvaleurmetier } from "../../services/Atelier1Services/getValeurMetierService"

const Atelier3: React.FC = () => {
  const [ecosystemes, setEcosystemes] = useState<Ecosysteme[]>([]);
  const [partiePrenants, setPartiePrenants] = useState<PartiePrenant[]>([]);
  const [strategiques, setStrategiques] = useState<CheminStrategique[]>([]);
  const [mesureSecurites, setMesureSecurites] = useState<
    MesureSecurite[]
  >([]);
  const [sourceRisques, setSourceRisques] = useState<SourceRisque[]>(
    []
  );
  const [evenements, setEvenements] = useState<EvenementRedoute[]>([]);
  const [parties,setParties]=useState<PartiePrenant[]>([]);


  const [selectedEcosystemes, setSelectedEcosystemes] = useState<Ecosysteme | null>(null);
  const [selectedPartiePrenant, setSelectedPartiePrenant] =
    useState<PartiePrenant | null>(null);
  const [selectedStrategique, setSelectedStrategique] =
    useState<CheminStrategique | null>(null);
    const [selectedMesureSecurite, setSelectedMesureSecurite] =
    useState<MesureSecurite | null>(null);
    const [selectedSourceRisque, setselectedSourceRisque] =
    useState<SourceRisque | null>(null);
    const [showBienEvent, setshowBienEvent] = useState(false);

  //=====================================================ecosysteme usestates=======================================
  const [isAddEcosystemeModalOpen, setAddEcosystemeModalOpen] = useState(false);
  const [newEcosystemeDescription, setNewEcosystemeDescription] = useState("");
  const [isUpdateEcosystemeModalOpen, setUpdateEcosystemeModalOpen] = useState(false); // Update modal state
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Delete confirmation modal

  //==============================================partie prenantes usestates=======================================
  const [isAddPartieModalOpen, setAddPartieModalOpen] =
    useState(false);
  const [newPartieNom, setNewPartieNom] = useState("");
  const [newPartieActivite, setNewPartieActivite] = useState("");
  const [newPartieDepandance, setNewPartieDepandance] =
    useState(0);
  const [newPartiePenetration, setNewPartiePenetration] =
    useState(0);
  const [newPartieMaturite, setNewPartieMaturite] =
    useState(0);
  const [newPartieConfiance, setNewPartieConfiance] =
    useState(0);
  const [newPartieNiveauMenace, setnewPartieNiveauMenace] =
    useState(0);
  const [isDeletePartieConfirmationOpen, setDeletePartieConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [isUpdatePartieModalOpen, setUpdatePartieModalOpen] = useState(false); // Update modal state
  const [showViewPartieModal, setShowViewPartieModal] =
  useState<boolean>(false);
  
  //==============================================chemin strategique usestates=======================================
  const [isAddScenarioModalOpen, setAddScenarioModalOpen] = useState(false);
  const [newScenarioIntitul, setnewScenarioIntitul] = useState("");
  const [newScenarioDescription, setnewScenarioDescription] = useState("");
  const [newScenarioIdEvenementRedoute, setnewScenarioIdEvenementRedoute] = useState(0);
  const [newScenarioIdPartiePrenant, setnewScenarioIdPartiePrenant] = useState(0);
  const [newScenarioGravite, setnewScenarioGravite] = useState(0);
  const [isUpdateScenarioModalOpen, setUpdateScenarioModalOpen] = useState(false); // Update modal state
  const [isDeleteScenarioConfirmationOpen, setDeleteScenarioConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [showViewScenarioModal, setShowViewScenarioModal] =
    useState<boolean>(false);


  //==============================================mesure securite usestates===============================================
  const [isAddMesureModalOpen, setAddMesureModalOpen] =
    useState(false);
  const [newMesureMesure, setNewMesureMesure] = useState("");
  const [newMesureMenaceResiduel, setNewMesureMenaceResiduel] = useState(0);
  const [isDeleteMesureConfirmationOpen, setDeleteMesureConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [showViewMesureModal, setShowViewMesureModal] =
    useState<boolean>(false);
  const [isUpdateMesureModalOpen, setUpdateMesureModalOpen] = useState(false); // Update modal state

  //===========================================================================================================
  const navigate = useNavigate();
  const location = useLocation();
  const app = location.state?.app;

  useEffect(() => {
    if (app) {
      fetchData(app.id);
    }
  }, [app]);
  

  const fetchData = async (appId: number) => {
    try {
      const sourceResponse = await getappsource(appId);
      setSourceRisques(sourceResponse);
      const ecosystemeResponse = await getappecosys(appId);
      setEcosystemes(ecosystemeResponse);

      const missionResponse = await getappmissions(appId);
      // Fetch data for each mission
      const valeurResponses = await Promise.all(
       missionResponse.map((mission) => getmissionvaleurmetier(mission.id))
      );
      const flattenedValeurResponses = valeurResponses.flat();
      const evenementResponse = await Promise.all(
        flattenedValeurResponses.map((valeur : any) => {
          return getvaleurevent(valeur.id);
        })
      );
      const events = evenementResponse.flat().filter(event => event); // Supprime les éléments vides
      setEvenements(events);
    }
     catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //===================================================================================================

  const handleSelectSource = async (source: SourceRisque) => {
    if (selectedSourceRisque != null && selectedSourceRisque.id == source.id) {
      setselectedSourceRisque(null);
      setSelectedStrategique(null);
    } else {
      setSelectedStrategique(null);
      setSelectedEcosystemes(null);    
      setSelectedStrategique(null);
      setselectedSourceRisque(source);
      
      try {
        const strategiqueResponse = await getsourcestrat(source.id);
        setStrategiques(strategiqueResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectStrategique = async (scenario: CheminStrategique) => {
    if(selectedStrategique!= null && selectedStrategique.id == scenario.id){
      setSelectedStrategique(null);
    }else{
      try {
        setshowBienEvent(true);
        setSelectedStrategique(scenario);
        setSelectedMesureSecurite(null);
        const mesureResponse = await getscenariomesure(scenario.id);
        setMesureSecurites(mesureResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectEcosysteme = async (ecosysteme: Ecosysteme) => {
    if(selectedEcosystemes != null && selectedEcosystemes.id==ecosysteme.id){
      setSelectedEcosystemes(null);
      setshowBienEvent(false);
    }else{
      setshowBienEvent(false);
      setselectedSourceRisque(null);
      setSelectedMesureSecurite(null);
      setSelectedEcosystemes(ecosysteme);
      try {
        const partieResponse = await getecoparties(ecosysteme.id);
        setPartiePrenants(partieResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectedMesure = (mesure: MesureSecurite) => {
    if(selectedMesureSecurite != null && selectedMesureSecurite.id==mesure.id)
    {
      setSelectedMesureSecurite(null);
    }else{
      setSelectedMesureSecurite(mesure);
    }
  };

  const handleSelectPartie = (partie: PartiePrenant) => {
    if(selectedPartiePrenant != null && selectedPartiePrenant.id==partie.id)
    {
      setSelectedPartiePrenant(null);
    }else{
      setSelectedPartiePrenant(partie);
    }
  };

  const fetchPartie = async () => {
    try {
  
      const parResponses = await Promise.all(
        ecosystemes.map(async (eco) => {
          const response = await getecoparties(eco.id);
          return response;
        })
      );
  
      const flattenedParties = parResponses.flat();
  
      setParties(flattenedParties);
  
      // setTimeout(() => {
      //   console.log("Parties state after setting:", parties); // This may still show old state
      // }, 100);
    } catch (error) {
      console.error("Error fetching parties:", error);
    }
  };
  

  //==============================================ecosystemes functions========================================
  const handleAddEcosystemeClick = () => {
    setAddEcosystemeModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddEcosystemeModalOpen(false);
    setNewEcosystemeDescription("");
  };

  const handleCreateEcosysteme = async () => {
    if (!newEcosystemeDescription.trim() || !app) {
      alert("Please enter a valid ecosysteme description.");
      return;
    }

    try {
      const response = await createecosys(newEcosystemeDescription, app.id);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Ecosysteme created successfully!");
        fetchData(app.id);
        handleCloseModal();
      } else {
        alert("Failed to create Ecosysteme. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Ecosysteme:", error);
      alert("Failed to create Ecosysteme.");
    }
  };

  // Update eco
  const handleUpdateEcosystemeClick = () => {
    if (!selectedEcosystemes) {
      alert("Please select a Ecosysteme");
    } else {
      setNewEcosystemeDescription(selectedEcosystemes.Description || "");
      setUpdateEcosystemeModalOpen(true);
    }
  };

  const handleUpdateEcosysteme = async () => {
    if (!newEcosystemeDescription.trim() || !selectedEcosystemes) {
      alert("Please enter a valid Ecosysteme description.");
      return;
    }

    try {
      const response = await updateecosys(
        selectedEcosystemes.id,
        newEcosystemeDescription
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Ecosysteme updated successfully!");
        fetchData(app.id);
        setUpdateEcosystemeModalOpen(false);
      } else {
        alert("Failed to update Ecosysteme. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Ecosysteme:", error);
      alert("Failed to update Ecosysteme.");
    }
  };

  // Delete eco
  const handleDeleteEcosystemeClick = () => {
    if (!selectedEcosystemes) {
      alert("Please select a Ecosysteme");
    } else {
      setDeleteConfirmationOpen(true);
    }
  };

  const handleDeleteEcosysteme = async () => {
    if (selectedEcosystemes) {
      try {
        const response = await deleteecosys(selectedEcosystemes.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("Ecosysteme deleted successfully!");
          fetchData(app.id);
          setDeleteConfirmationOpen(false);
        } else {
          alert("Failed to delete Ecosysteme. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Ecosysteme:", error);
        alert("Failed to delete Ecosysteme.");
      }
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  //==============================================partie prenants functions========================================

  const handleOpenAddPartieModal = () => {
    setAddPartieModalOpen(true);
  };

  const handleCloseAddPartieModal = () => {
    setSelectedPartiePrenant(null);
    setAddPartieModalOpen(false);
    setNewPartieNom("");
    setNewPartieActivite("");
    setNewPartieConfiance(0);
    setNewPartieDepandance(0);
    setNewPartieMaturite(0);
    setNewPartiePenetration(0);
  };

  const handleCreatePartie = async () => {
    if (
      !newPartieNom.trim() ||
      !newPartieActivite.trim() ||
      !newPartieConfiance ||
      !newPartieDepandance ||
      !newPartieMaturite ||
      !newPartiePenetration ||
      !selectedEcosystemes
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await createpartie(
        newPartieNom,
        newPartieActivite,
        newPartieDepandance,
        newPartiePenetration,
        newPartieMaturite,
        newPartieConfiance,
        selectedEcosystemes.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedEcosystemes) handleSelectEcosysteme(selectedEcosystemes);
        alert("Partie prenante created successfully!");
        handleCloseAddPartieModal();
      } else {
        alert("Failed to create Partie prenante. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Partie prenante:", error);
      alert("Failed to create Partie prenante.");
    }
  };

  const handleViewPartie = () => {
    if (selectedPartiePrenant) {
      setNewPartieNom(selectedPartiePrenant.Nom);
      setNewPartieActivite(selectedPartiePrenant.Activite);
      setNewPartieConfiance(selectedPartiePrenant.Confiance);
      setNewPartieDepandance(selectedPartiePrenant.Depandance);
      setNewPartieMaturite(selectedPartiePrenant.Maturite);
      setNewPartiePenetration(selectedPartiePrenant.Penetration);
      setnewPartieNiveauMenace(selectedPartiePrenant.NiveauMenace);
      setShowViewPartieModal(true); // Show the view modal
    } else {
      alert("Please select an partie prenante to view.");
    }
  };

  const handleCloseViewPartieModal = () => {
    setShowViewPartieModal(false); // Reset all states when closing the modal
    setNewPartieNom("");
    setNewPartieActivite("");
    setNewPartieConfiance(0);
    setNewPartieDepandance(0);
    setNewPartieMaturite(0);
    setNewPartiePenetration(0);
    setnewPartieNiveauMenace(0);
    setSelectedPartiePrenant(null);
  };

  const handleOpenDeletePartieModal = () => {
    setDeletePartieConfirmationOpen(true);
  };

  const handleDeletePartie = async () => {
    if (selectedPartiePrenant) {
      try {
        const response = await deletepartie(selectedPartiePrenant.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedEcosystemes) handleSelectEcosysteme(selectedEcosystemes);
          alert("Partie prenante deleted successfully!");
          setDeletePartieConfirmationOpen(false);
        } else {
          alert("Failed to delete Partie prenante. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Partie prenante:", error);
        alert("Failed to delete Partie prenante.");
      }
    }
  };

  const handleCloseDeletePartieConfirmation = () => {
    setDeletePartieConfirmationOpen(false);
  };

  const handleOpenUpdatePartieModal = () => {
    if (selectedPartiePrenant) {
        setNewPartieNom(selectedPartiePrenant.Nom);
        setNewPartieActivite(selectedPartiePrenant.Activite);
        setNewPartieConfiance(selectedPartiePrenant.Confiance);
        setNewPartieDepandance(selectedPartiePrenant.Depandance);
        setNewPartieMaturite(selectedPartiePrenant.Maturite);
        setNewPartiePenetration(selectedPartiePrenant.Penetration);
        setUpdatePartieModalOpen(true);
    }
  };

  const handleCloseUpdatePartieModal = () => {
    setUpdatePartieModalOpen(false);
    setNewPartieNom("");
    setNewPartieActivite("");
    setNewPartieConfiance(0);
    setNewPartieDepandance(0);
    setNewPartieMaturite(0);
    setNewPartiePenetration(0);
  };

  const handleUpdatePartie = async () => {
    if (selectedPartiePrenant && selectedEcosystemes) {
      try {
        const response = await updatepartie(
            newPartieNom,
            newPartieActivite,
            newPartieDepandance,
            newPartiePenetration,
            newPartieMaturite,
            newPartieConfiance,
            selectedPartiePrenant.id,
            selectedEcosystemes.id
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedEcosystemes) handleSelectEcosysteme(selectedEcosystemes);
          alert("Partie prenante created successfully!");
          handleCloseUpdatePartieModal();
        } else {
          alert("Failed to create Partie prenante. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Partie prenante:", error);
        alert("Failed to create Partie prenante.");
      }
    }
  };

  //==============================================scenario strategique functions========================================

  const handleAddScenarioClick = async () => {
    console.log("Fetching parties before opening modal...");
    await fetchPartie(); // Ensure parties are fetched before opening the modal
    console.log("Parties after fetching:", parties);
    setnewScenarioIntitul("");
    setnewScenarioDescription("");
    setnewScenarioIdEvenementRedoute(0);
    setnewScenarioIdPartiePrenant(0);
    setnewScenarioGravite(0);
    setAddScenarioModalOpen(true);
  };

  const handleCloseAddScenarioModal = () => {
    setAddScenarioModalOpen(false);
    setnewScenarioIntitul("");
    setnewScenarioDescription("");
    setnewScenarioIdEvenementRedoute(0);
    setnewScenarioIdPartiePrenant(0);
    setnewScenarioGravite(0);
  };

  const handleCreateScenario = async () => {
    if (!newScenarioIntitul.trim() || 
        !newScenarioDescription.trim() ||
        !newScenarioIdEvenementRedoute ||
        !newScenarioIdPartiePrenant ||
        !newScenarioGravite ||
        !selectedSourceRisque) {
      alert("Please fill all the feilds.");
      return;
    }

    try {
      const response = await createstrat(newScenarioIntitul, newScenarioDescription, selectedSourceRisque.id, newScenarioIdEvenementRedoute, newScenarioIdPartiePrenant, newScenarioGravite);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Scenario strategique created successfully!");
        fetchData(app.id);
        handleCloseAddScenarioModal();
      } else {
        alert("Failed to create Scenario strategique. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Scenario strategique:", error);
      alert("Failed to create Scenario strategique.");
    }
  };

  // Update Scenario
  const handleUpdateScenarioClick = () => {
    if (!selectedStrategique) {
      alert("please select a scenario strategique");
    } else {
      setnewScenarioIntitul(selectedStrategique.Intitul);
      setnewScenarioDescription(selectedStrategique.Description);
      setnewScenarioIdEvenementRedoute(selectedStrategique.IdEvenementRedoute);
      setnewScenarioIdPartiePrenant(selectedStrategique.IdPartiePrenant);
      setnewScenarioGravite(Number(selectedStrategique.Gravite));
      setUpdateScenarioModalOpen(true);
    }
  };

  const handleUpdateScenario = async () => {
    if (!newScenarioIntitul.trim() || 
        !newScenarioDescription.trim() ||
        !newScenarioIdEvenementRedoute ||
        !newScenarioIdPartiePrenant ||
        !newScenarioGravite ||
        !selectedSourceRisque ||
        !selectedStrategique
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await updatestrat(
        newScenarioIntitul, 
        newScenarioDescription,
        newScenarioIdEvenementRedoute, 
        newScenarioIdPartiePrenant, 
        newScenarioGravite,
        selectedStrategique.id
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Scenario strategique updated successfully!");
        if (selectedSourceRisque) handleSelectSource(selectedSourceRisque);
        setUpdateScenarioModalOpen(false);
      } else {
        alert("Failed to update Scenario strategique. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Scenario strategique:", error);
      alert("Failed to update Scenario strategique.");
    }
  };

  // Delete scenario
  const handleDeleteScenarioClick = () => {
    if (!selectedStrategique) {
      alert("please select a scenario strategique");
    } else {
      setDeleteScenarioConfirmationOpen(true);
    }
  };

  const handleDeleteScenario = async () => {
    if (selectedStrategique) {
      try {
        const response = await deletestrat(selectedStrategique.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("scenario strategique deleted successfully!");
          fetchData(app.id);
          setDeleteScenarioConfirmationOpen(false);
        } else {
          alert("Failed to delete scenario strategique. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting scenario strategique:", error);
        alert("Failed to delete scenario strategique.");
      }
    }
  };

  const handleCloseDeleteScenarioConfirmation = () => {
    setDeleteScenarioConfirmationOpen(false);
  };

  const handleViewScenario = () => {
    if (selectedStrategique) {
      setShowViewScenarioModal(true); // Show the view modal
    } else {
      alert("Please select an scenario startegique to view.");
    }
  };

  const handleCloseViewScenarioModal = () => {
    setShowViewScenarioModal(false); // Reset all states when closing the modal
  };

  //=============================================mesure de securite functions==============================================
  
  const handleOpenAddMesureModal = () => {
    setAddMesureModalOpen(true);
  };

  const handleCloseAddMesureModal = () => {
    setAddMesureModalOpen(false);
    setNewMesureMesure("");
    setNewMesureMenaceResiduel(0);
  };

  const handleCreateMesure = async () => {
    if (
      !newMesureMesure.trim() ||
      !newMesureMenaceResiduel ||
      !selectedStrategique
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await createmesure(
        newMesureMesure,
        newMesureMenaceResiduel,
        selectedStrategique.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedStrategique) handleSelectStrategique(selectedStrategique);
        alert("Mesure Securite created successfully!");
        handleCloseAddMesureModal();
      } else {
        alert("Failed to create Mesure Securite. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Mesure Securite:", error);
      alert("Failed to create Mesure Securite.");
    }
  };

  const handleViewMesure = () => {
    if (selectedMesureSecurite) {
      setShowViewMesureModal(true); // Show the view modal
    } else {
      alert("Please select an Mesure to view.");
    }
  };

  const handleCloseViewMesureModal = () => {
    setShowViewMesureModal(false); // Reset all states when closing the modal
  };

  const handleOpenDeleteMesureModal = () => {
    setDeleteMesureConfirmationOpen(true);
  };

  const handleDeleteMesure = async () => {
    if (selectedMesureSecurite) {
      try {
        const response = await deletemesure(selectedMesureSecurite.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedStrategique) handleSelectStrategique(selectedStrategique);
          alert("Mesure de securite deleted successfully!");
          setDeleteMesureConfirmationOpen(false);
        } else {
          alert("Failed to delete Mesure de securite. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Mesure de securite:", error);
        alert("Failed to delete Mesure de securite.");
      }
    }
  };

  const handleCloseDeleteMesureConfirmation = () => {
    setDeleteMesureConfirmationOpen(false);
  };

  const handleOpenUpdateMesureModal = () => {
    if (selectedMesureSecurite) {
      setNewMesureMesure(selectedMesureSecurite.Mesure);
      setNewMesureMenaceResiduel(selectedMesureSecurite.MenaceResiduel);
      setUpdateMesureModalOpen(true);
    }
  };

  const handleCloseUpdateMesureModal = () => {
    setUpdateMesureModalOpen(false);
    setNewMesureMesure("");
    setNewMesureMenaceResiduel(0);
  };

  const handleUpdateMesure = async () => {
    if (selectedMesureSecurite) {
      try {
        const response = await updatemesure(
          newMesureMesure,
          newMesureMenaceResiduel,
          selectedMesureSecurite.id
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedStrategique) handleSelectStrategique(selectedStrategique);
          alert("Mesure de securite updated successfully!");
          handleCloseUpdateMesureModal();
        } else {
          alert("Failed to create Mesure de securite. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Mesure de securite:", error);
        alert("Failed to create Mesure de securite.");
      }
    }
  };

  //==========================================================================================================
  return (
    <div className="atelier3-page">
      <div className="atelier3-page__sidebar">
        <h4 className="atelier3-page__sidebar-title">Ecosystemes</h4>
        <ul className="atelier3-page__ecosysteme-list">
          {ecosystemes.length > 0 ? (
            ecosystemes.map((ecosysteme) => (
              <li
                key={ecosysteme.id}
                className={`atelier3-page__ecosysteme-item ${
                  selectedEcosystemes && selectedEcosystemes.id === ecosysteme.id
                    ? "atelier3-page__ecosysteme-item--selected"
                    : ""
                }`}
                onClick={() => handleSelectEcosysteme(ecosysteme)}
              >
                {ecosysteme.Description || `Ecosysteme ${ecosysteme.id}`}
              </li>
            ))
          ) : (
            <p className="atelier3-page__empty-message">No ecosystemes available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div className="atelier3-page__ecosysteme-actions">
          <button
            className="atelier3-page__btn atelier3-page__btn--add"
            onClick={handleAddEcosystemeClick}>
            Add Ecosysteme
          </button>
          <button
            className="atelier3-page__btn atelier3-page__btn--update"
            onClick={handleUpdateEcosystemeClick}>
            Update
          </button>
          <button
            className="atelier3-page__btn atelier3-page__btn--delete"
            onClick={handleDeleteEcosystemeClick}>
            Delete
          </button>
        </div>

        <h4 className="atelier3-page__sidebar-title">Source de risque</h4>
        <ul className="atelier3-page__source-list">
          {sourceRisques.length > 0 ? (
            sourceRisques.map((source) => (
              <li
                key={source.id}
                className={`atelier3-page__source-item ${
                  selectedSourceRisque && selectedSourceRisque.id === source.id
                    ? "atelier3-page__source-item--selected"
                    : ""
                }`}
                onClick={() => handleSelectSource(source)}
              >
                {source.Name || `Socle ${source.id}`}
              </li>
            ))
          ) : (
            <p className="atelier3-page__empty-message">No Source de risque available.</p>
          )}
        </ul>
      </div>

      <div className="atelier3-page__content">
        {selectedEcosystemes && !selectedSourceRisque && (
          <div className="atelier3-page__ecosysteme-content">
            <h3>Parties prenantes for : {selectedEcosystemes.Description}</h3>
            {partiePrenants.map((partie) => (
              <div
              key={partie.id}
              className={`atelier3-page__partie-item ${
                selectedPartiePrenant && selectedPartiePrenant.id === partie.id
                  ? "atelier3-page__partie-item--selected"
                  : ""
              }`}
              onClick={() => handleSelectPartie(partie)}
            >
                <p>{partie.Nom}</p>
              </div>
            ))}
            <div className="atelier3-page__partie-actions">
            <button className="atelier3-page__btn" onClick={() => handleViewPartie()}>
              View Partie prenante
            </button>
            <button className="atelier3-page__btn" onClick={handleOpenAddPartieModal}>
              Add Partie prenante
            </button>
            <button className="atelier3-page__btn" onClick={handleOpenUpdatePartieModal}>
              Update Partie prenante
            </button>
            <button className="atelier3-page__btn" onClick={handleOpenDeletePartieModal}>
              Delete Partie prenante
            </button>
            </div>
          </div>
        )}

        {selectedSourceRisque && !selectedEcosystemes && (
          <div className="atelier3-page__source-content">
            <h3>Scenarios strategiques for : {selectedSourceRisque.Name}</h3>
            {strategiques.map((strat) => (
              <div
              key={strat.id}
              className={`atelier3-page__strat-item ${
                selectedStrategique && selectedStrategique.id === strat.id
                  ? "atelier3-page__strat-item--selected"
                  : ""
              }`}
              onClick={() => handleSelectStrategique(strat)}
            >
                {strat.Intitul}
                </div>
            ))}
            <div className="atelier3-page__strat-actions">
              <button className="atelier3-page__btn" onClick={() => handleViewScenario()}>
              View Scenario Strategique
            </button>
            <button className="atelier3-page__btn" onClick={handleAddScenarioClick}>
              Add Scenario strategique
            </button>
            <button className="atelier3-page__btn"onClick={handleUpdateScenarioClick}>
              Update Scenario strategique
            </button>
            <button className="atelier3-page__btn" onClick={handleDeleteScenarioClick}>
              Delete Scenario strategique
            </button>
            </div>
            
          </div>
        )}

        {selectedStrategique && showBienEvent && (
          <div className="atelier3-page__strat-detail">
            <h3>Mesures de securites for : {selectedStrategique.Intitul}</h3>
            {mesureSecurites.map((mesure) => (
                <div
                key={mesure.id}
                className={`atelier3-page__mesure-item ${
                  selectedMesureSecurite && selectedMesureSecurite.id === mesure.id
                    ? "atelier3-page__mesure-item--selected"
                    : ""
                }`}
                onClick={() => handleSelectedMesure(mesure)}
              >{mesure.Mesure}</div>
              ))}
              <div className="atelier3-page__mesure-actions">
            <button className="atelier3-page__btn" onClick={handleViewMesure}>
              View Mesure de securite
            </button> 
            <button className="atelier3-page__btn" onClick={handleOpenAddMesureModal}>
              Add Mesure de securite
            </button>
            <button className="atelier3-page__btn" onClick={handleOpenUpdateMesureModal}>
              Update Mesure de securite
            </button>
            <button className="atelier3-page__btn" onClick={handleOpenDeleteMesureModal}>
              Delete Mesure de securite
            </button>
            </div>
          </div>
        )}
      </div>

      {/*======================================== ecosysteme modals ============================================*/}
      {isAddEcosystemeModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Add Ecosysteme</h3>
            <input
              className="atelier3-page__modal-input"
              type="text"
              placeholder="Ecosysteme description"
              value={newEcosystemeDescription}
              onChange={(e) => setNewEcosystemeDescription(e.target.value)}
              />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleCreateEcosysteme}>
                Create
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Mission Modal */}
      {isUpdateEcosystemeModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Update Ecosysteme</h3>
            <input
              className="atelier3-page__modal-input"
              type="text"
              value={newEcosystemeDescription}
              onChange={(e) => setNewEcosystemeDescription(e.target.value)}
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleUpdateEcosysteme}>
                Save
              </button>
              <button className="atelier3-page__modal-btn" onClick={() => setUpdateEcosystemeModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Are you sure you want to delete this exosysteme?</h3>
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleDeleteEcosysteme}>
                Yes
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseDeleteConfirmation}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== partie prenants modals ============================================*/}
      {isAddPartieModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Add Partie prenants</h3>
            <input
              type="text"
              placeholder="Name"
              value={newPartieNom}
              onChange={(e) => setNewPartieNom(e.target.value)}
              className="atelier3-page__modal-input"
              />
            <input
              type="text"
              placeholder="Activite"
              value={newPartieActivite}
              onChange={(e) => setNewPartieActivite(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Dependance"
              value={newPartieDepandance}
              onChange={(e) => setNewPartieDepandance(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Penetration"
              value={newPartiePenetration}
              onChange={(e) => setNewPartiePenetration(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Maturite"
              value={newPartieMaturite}
              onChange={(e) => setNewPartieMaturite(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Confiance"
              value={newPartieConfiance}
              onChange={(e) => setNewPartieConfiance(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleCreatePartie}>
                Save
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseAddPartieModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewPartieModal && selectedPartiePrenant && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Partie prenante Details</h3>
            <p>
              <strong>Nom:</strong> {selectedPartiePrenant.Nom}
            </p>
            <p>
              <strong>Activite:</strong> {selectedPartiePrenant.Activite}
            </p>
            <p>
              <strong>Dependance:</strong> {selectedPartiePrenant.Depandance}
            </p>
            <p>
              <strong>Penetration:</strong> {selectedPartiePrenant.Penetration}
            </p>
            <p>
              <strong>Maturite:</strong> {selectedPartiePrenant.Maturite}
            </p>
            <p>
              <strong>Confiance:</strong> {selectedPartiePrenant.Confiance}
            </p>
            <p>
              <strong>Niveau de menace:</strong> {selectedPartiePrenant.NiveauMenace}
            </p>
            <button className="atelier3-page__modal-btn" onClick={handleCloseViewPartieModal}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeletePartieConfirmationOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Are you sure you want to delete this Partie prenante?</h3>
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleDeletePartie}>
                Yes
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseDeletePartieConfirmation}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdatePartieModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Update Partie prenante</h3>
            <input
              type="text"
              placeholder="Name"
              value={newPartieNom}
              onChange={(e) => setNewPartieNom(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <input
              type="text"
              placeholder="Activite"
              value={newPartieActivite}
              onChange={(e) => setNewPartieActivite(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Dependance"
              value={newPartieDepandance}
              onChange={(e) => setNewPartieDepandance(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Penetration"
              value={newPartiePenetration}
              onChange={(e) => setNewPartiePenetration(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Maturite"
              value={newPartieMaturite}
              onChange={(e) => setNewPartieMaturite(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Confiance"
              value={newPartieConfiance}
              onChange={(e) => setNewPartieConfiance(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleUpdatePartie}>
                Save
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseUpdatePartieModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== scenario strategique modals ============================================*/}
      {isAddScenarioModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Add Scenario strategique</h3>
            <input
              type="text"
              placeholder="Intitule"
              value={newScenarioIntitul}
              onChange={(e) => setnewScenarioIntitul(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <textarea
              placeholder="Description"
              value={newScenarioDescription}
              onChange={(e) => setnewScenarioDescription(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <select
              value={newScenarioIdEvenementRedoute}
              onChange={(e) =>setnewScenarioIdEvenementRedoute(Number(e.target.value))}
              className="atelier3-page__modal-input"
            >
              <option value="">Select an Evenement redoute</option> {/* Placeholder option */}
              {evenements.map((evenement) => (
              <option key={evenement.id} value={evenement.id}>
                {evenement.Name}
              </option>
              ))}
            </select>
            <select
              value={newScenarioIdPartiePrenant}
              onChange={(e) =>setnewScenarioIdPartiePrenant(Number(e.target.value))}
              className="atelier3-page__modal-input"
            >
              <option value="">Select an Partie prenante</option> {/* Placeholder option */}
              {parties.map((partie) => (
              <option key={partie.id} value={partie.id}>
                {partie.Nom}
              </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Gravite"
              value={newScenarioGravite}
              onChange={(e) => setnewScenarioGravite(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleCreateScenario}>
                Create
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseAddScenarioModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update socle de securite  Modal */}
      {isUpdateScenarioModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Update Scenario strategique</h3>
            <input
              type="text"
              placeholder="Intitule"
              value={newScenarioIntitul}
              onChange={(e) => setnewScenarioIntitul(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <textarea
              placeholder="Description"
              value={newScenarioDescription}
              onChange={(e) => setnewScenarioDescription(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <select
              value={newScenarioIdEvenementRedoute}
              onChange={(e) =>setnewScenarioIdEvenementRedoute(Number(e.target.value))}
              className="atelier3-page__modal-input"
            >
              <option value="">Select an Evenement redoute</option> {/* Placeholder option */}
              {evenements.map((evenement) => (
              <option key={evenement.id} value={evenement.id}>
                {evenement.Name}
              </option>
              ))}
            </select>
            <select
              value={newScenarioIdPartiePrenant}
              onChange={(e) =>setnewScenarioIdPartiePrenant(Number(e.target.value))}
              className="atelier3-page__modal-input"
            >
              <option value="">Select an Partie prenante</option> {/* Placeholder option */}
              {partiePrenants.map((partie) => (
              <option key={partie.id} value={partie.id}>
                {partie.Nom}
              </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Gravite"
              value={newScenarioGravite}
              onChange={(e) => setnewScenarioGravite(Number(e.target.value))}
              min={1}
              max={4}
              className="atelier3-page__modal-input"
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleUpdateScenario}>
                Save
              </button>
              <button className="atelier3-page__modal-btn" onClick={() => setUpdateScenarioModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete socle de securite  Modal */}
      {isDeleteScenarioConfirmationOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Are you sure you want to delete this Scenario strategique?</h3>
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleDeleteScenario}>
                Yes
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseDeleteScenarioConfirmation}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

        {showViewScenarioModal && selectedStrategique && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Scenario strategique Details</h3>
            <p>
              <strong>Intitule:</strong> {selectedStrategique.Intitul}
            </p>
            <p>
              <strong>Description:</strong> {selectedStrategique.Description}
            </p>
            <p>
              <strong>Gravite:</strong> {selectedStrategique.Gravite}
            </p>
            <button className="atelier3-page__modal-btn" onClick={handleCloseViewScenarioModal}>
              Back
            </button>
          </div>
        </div>
      )}

      {/*======================================== mesure modals ============================================*/}
      {isAddMesureModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Add Mesure</h3>
            <textarea
              placeholder="Mesure"
              value={newMesureMesure}
              onChange={(e) => setNewMesureMesure(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <input
              type="number"
              placeholder="Menace residuel"
              value={newMesureMenaceResiduel}
              onChange={(e) => setNewMesureMenaceResiduel(Number(e.target.value))}
              className="atelier3-page__modal-input"
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleCreateMesure}>
                Save
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseAddMesureModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewMesureModal && selectedMesureSecurite && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Mesure de securite Details</h3>
            <p>
              <strong>Mesure:</strong> {selectedMesureSecurite.Mesure}
            </p>
            <p>
              <strong>Menace residuel:</strong> {selectedMesureSecurite.MenaceResiduel}
            </p>
            <button className="atelier3-page__modal-btn" onClick={handleCloseViewMesureModal}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteMesureConfirmationOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Are you sure you want to delete this Mesure de securite?</h3>
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleDeleteMesure}>
                Yes
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseDeleteMesureConfirmation}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateMesureModalOpen && (
        <div className="atelier3-page__modal-overlay">
          <div className="atelier3-page__modal-content">
            <h3>Update Mesure</h3>
            <input
              type="text"
              value={newMesureMesure}
              onChange={(e) => setNewMesureMesure(e.target.value)}
              className="atelier3-page__modal-input"
            />
            <textarea
              value={newMesureMenaceResiduel}
              onChange={(e) => setNewMesureMenaceResiduel(Number(e.target.value))}
              className="atelier3-page__modal-input"
            />
            <div className="atelier3-page__modal-actions">
              <button className="atelier3-page__modal-btn" onClick={handleUpdateMesure}>
                Save
              </button>
              <button className="atelier3-page__modal-btn" onClick={handleCloseUpdateMesureModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Atelier3;

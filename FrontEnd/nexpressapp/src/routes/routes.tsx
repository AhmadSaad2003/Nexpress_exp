export const API_URL = "http://localhost:3000/api";

export const AUTH_ROUTES = {
  SIGNUP: `${API_URL}/auth/user/register`,
  SIGNIN: `${API_URL}/auth/user/login`,
};

export const ROUTES = {
  //app routes
  CREATEAPP: `${API_URL}/apps/`,
  GETUSERAPPS: `${API_URL}/apps/userapps`,
  UPDATEAPP: `${API_URL}/apps/:appId`,
  DELETEAPP: `${API_URL}/apps/:appId`,

  //mission routes
  GETAPPMISSIONS: `${API_URL}/missions/appMissions/:Idapp`,
  CREATEMISSION: `${API_URL}/missions/`,
  DELETEMISSION: `${API_URL}/missions/:missionId`,
  UPDATEMISSION: `${API_URL}/missions/:missionId`,

  //valeurMetier routes
  GETMISSIONVALEURMETIER: `${API_URL}/valeurMetiers/missionValeurMetier/:IdMission`,
  CREATEVALEURMETIER: `${API_URL}/valeurMetiers/`,
  DELETEVALEURMETIER: `${API_URL}/valeurMetiers/:valeurId`,
  UPDATEVALEURMETIER: `${API_URL}/valeurMetiers/:valeurId`,

  //socleSecurite routes
  GETAPPSOCLES: `${API_URL}/socleDeSecurites/appSocles/:Idapp`,
  CREATESOCLE: `${API_URL}/socleDeSecurites/`,
  DELETESOCLE: `${API_URL}/socleDeSecurites/:socleId`,
  UPDATESOCLE: `${API_URL}/socleDeSecurites/:socleId`,

  //ecarts routes
  GETSOCLEECART: `${API_URL}/ecarts/socleEcart/:IdSocleSecurite`,
  CREATEECART: `${API_URL}/ecarts/`,
  DELETEECART: `${API_URL}/ecarts/:IdEcart`,
  UPDATEECART: `${API_URL}/ecarts/:IdEcart`,

  //evenement redoute route
  GETVALEUREVENT: `${API_URL}/evenementRedoutes/valeurEvent/:IdValeurMetier`,
  CREATEEVENT: `${API_URL}/evenementRedoutes/`,
  DELETEEVENT: `${API_URL}/evenementRedoutes/:IdEven`,
  UPDATEEVENT: `${API_URL}/evenementRedoutes/:IdEven`,

  //ebien support route
  GETVALEURBIEN: `${API_URL}/bienSupports/valeurBien/:IdValeurMetier`,
  CREATEBIEN: `${API_URL}/bienSupports/`,
  DELETEBIEN: `${API_URL}/bienSupports/:IdBien`,
  UPDATEBIEN: `${API_URL}/bienSupports/:IdBien`,

  //sources routes
  GETAPPSOURCE: `${API_URL}/sourceRisques/appSources/:IdApp`,
  CREATESOURCE: `${API_URL}/sourceRisques/`,
  DELETESOURCE: `${API_URL}/sourceRisques/:sourceId`,
  UPDATESOURCE: `${API_URL}/sourceRisques/:sourceId`,

  //ecosystemes routes
  GETAPPECO: `${API_URL}/ecosystemes/appEcosystems/:IdApp`,
  CREATEECO: `${API_URL}/ecosystemes/`,
  DELETEECO: `${API_URL}/ecosystemes/:ecosystemId`,
  UPDATEECO: `${API_URL}/ecosystemes/:ecosystemId`,

  //Parties routes
  GETECOPARTIE: `${API_URL}/partiePrenants/ecoParties/:IdEcosysteme`,
  CREATPARTIE: `${API_URL}/partiePrenants/`,
  DELETEPARTIE: `${API_URL}/partiePrenants/:partieId`,
  UPDATEPARTIE: `${API_URL}/partiePrenants/:partieId`,

  //Scenario strategiques routes
  GETSOURCESTRAT: `${API_URL}/cheminStrategiques/sourceStrat/:IdSourceRisque`,
  CREATESTRAT: `${API_URL}/cheminStrategiques/`,
  DELETESTRAT: `${API_URL}/cheminStrategiques/:stratId`,
  UPDATESTRAT: `${API_URL}/cheminStrategiques/:stratId`,

  //Mesure routes
  GETSCENARIOMESURE: `${API_URL}/mesureSecurites/scenarioMesure/:IdCheminStrategique`,
  CREATEMESURE: `${API_URL}/mesureSecurites/`,
  DELETEMESURE: `${API_URL}/mesureSecurites/:mesureId`,
  UPDATEMESURE: `${API_URL}/mesureSecurites/:mesureId`,

  //Scenario opperationnel routes
  GETSCENARIOOPP: `${API_URL}/cheminOperationnels/scenarioOpp/:IdCheminStrategique`,
  CREATESCENARIOOPP: `${API_URL}/cheminOperationnels/`,
  DELETESCENARIOOPP: `${API_URL}/cheminOperationnels/:oppId`,
  UPDATESCENARIOOPP: `${API_URL}/cheminOperationnels/:oppId`,

  //PACS routes
  GETAPPPACS: `${API_URL}/PACS/appPacs/:IdApp`,
  CREATEPACS: `${API_URL}/PACS/`,
  DELETEPACS: `${API_URL}/PACS/:pacsId`,
  UPDATEPACS: `${API_URL}/PACS/:pacsId`,

};

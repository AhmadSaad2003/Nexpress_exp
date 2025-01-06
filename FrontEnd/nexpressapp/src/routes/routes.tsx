export const API_URL = "http://localhost:3000/api";

export const AUTH_ROUTES = {
  SIGNUP: `${API_URL}/user/register`,
  SIGNIN: `${API_URL}/user/login`,
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

};

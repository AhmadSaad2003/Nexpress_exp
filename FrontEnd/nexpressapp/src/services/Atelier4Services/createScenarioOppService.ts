import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const createscenarioopp = async (Intitul:string, IdCheminStrategique:number, Connaitre:string, Rentrer:string, Trouver:string, Exploiter:string, Vraisemblence:number) => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
  try {
    const response = await axios.post(ROUTES.CREATESCENARIOOPP, {
        Intitul,
        IdCheminStrategique,
        Connaitre,
        Rentrer,
        Trouver,
        Exploiter,
        Vraisemblence
    },
    {
        headers,
    });
    
    if (response.status >= 200 && response.status < 300) {
        return response;  // You can return the full response if you need additional data
    } else {
        throw new Error('Failed to create scenario opperationnel');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An error occurred during creation."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const createpartie = async (Nom: string, Activite: string, Depandance: number,Penetration: number,Maturite: number,Confiance: number, IdEcosysteme:number) => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
  try {
    const response = await axios.post(ROUTES.CREATPARTIE, {
        Nom,
        Activite,
        Depandance,
        Penetration,
        Maturite,
        Confiance,
        IdEcosysteme
    },
    {
        headers,
    });
    
    if (response.status >= 200 && response.status < 300) {
        return response;  // You can return the full response if you need additional data
    } else {
        throw new Error('Failed to create partie prenant');
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

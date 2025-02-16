import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const createstrat = async (Intitul:string, Description:string, IdSourceRisque:number, IdEvenementRedoute:number, IdPartiePrenant:number, Gravite:number) => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
  try {
    const response = await axios.post(ROUTES.CREATESTRAT, {
        Intitul,
        Description,
        IdSourceRisque,
        IdEvenementRedoute,
        IdPartiePrenant,
        Gravite,
    },
    {
        headers,
    });
    
    if (response.status >= 200 && response.status < 300) {
        return response;  // You can return the full response if you need additional data
    } else {
        throw new Error('Failed to create scenario strategique');
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

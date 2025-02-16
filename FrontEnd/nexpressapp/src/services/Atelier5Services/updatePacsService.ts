import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updatepacs = async (Nom:string, Type:string, Impact:number, CoefficientRisques:number,pacsId:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.UPDATEPACS.replace(":pacsId", pacsId.toString());
      const response = await axios.put(
        url,
        {
            Nom,
            Type,
            Impact,
            CoefficientRisques,
        },
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to update pacs');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };

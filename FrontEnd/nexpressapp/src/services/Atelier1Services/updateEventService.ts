import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updateevent = async (Name: string, Description: string, TypeEvent: string,Consequence:string, IdEven:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.UPDATEEVENT.replace(":IdEven", IdEven.toString());
      const response = await axios.put(
        url,
        {
            Name,
            Description,
            TypeEvent,
            Consequence,
        },
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to update evenement redoute');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };

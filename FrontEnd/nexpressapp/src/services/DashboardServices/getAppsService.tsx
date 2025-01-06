import axios from "axios";
import { ROUTES } from "../../routes/routes";
import { App } from "../../interfaces/app";

export const getapps = async () => {
    try {
        const token = localStorage.getItem("token");
    
        const headers = {
          Authorization: `Bearer ${token}`,
        };
    
        const response = await axios.get<App[]>(ROUTES.GETUSERAPPS, {
          headers,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "An error occurred.");
        } else {
          throw new Error("An unexpected error occurred.");
        }
      }
};

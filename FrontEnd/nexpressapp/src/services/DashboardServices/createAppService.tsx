import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const createapp = async (name: string, dateofcreation: string, capital: string) => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
  try {
    const response = await axios.post(ROUTES.CREATEAPP, {
        name,
        dateofcreation,
        capital,
    },{
        headers,
    });
    
    if (response.status >= 200 && response.status < 300) {
        return response;  // You can return the full response if you need additional data
    } else {
        throw new Error('Failed to create app');
    }
  } catch (error) {
    console.log(name);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An error occurred during creation."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

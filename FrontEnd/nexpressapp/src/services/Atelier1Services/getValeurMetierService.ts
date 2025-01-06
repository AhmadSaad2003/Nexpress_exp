import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const getmissionvaleurmetier = async (missionId: number) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = ROUTES.GETMISSIONVALEURMETIER.replace(
      ":IdMission",
      missionId.toString()
    );
    const response = await axios.get(url, {
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

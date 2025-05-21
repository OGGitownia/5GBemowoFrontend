import axios from "axios";

const BASE_URL = "http://localhost:8080/api/bases";

export const fetchBaseCreatingMethods = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/methods/get-all`);
        console.log("Fetched base creation methods:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching base creation methods:", error);
        throw error;
    }
};

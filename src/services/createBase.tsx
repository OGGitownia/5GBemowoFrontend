import axios from "axios";

export const createBase = async (
    sourceUrl: string,
    selectedMethod: string,
    userId: number
): Promise<void> => {
    try {
        const payload = {
            sourceUrl: sourceUrl,
            selectedMethod: selectedMethod,
            userId: userId
        };
        const BASE_URL = "http://localhost:8080/api/bases";

        console.log("Wysyłanie żądania tworzenia bazy:", payload);

        const response = await axios.post(`${BASE_URL}/bases/create`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log("Base creation initiated. Response:", response.data);
    } catch (error) {
        console.error("Error during base creation:", error);
        throw error;
    }
};

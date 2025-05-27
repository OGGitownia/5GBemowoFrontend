import axios from 'axios';

export const createBase = async (
    sourceUrl: string,
    selectedMethod: string,
    userId: number
): Promise<string> => {
    const payload = {
        sourceUrl,
        selectedMethod,
        userId
    };

    const response = await axios.post("http://localhost:8080/api/bases/create", payload, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data.baseId;
};


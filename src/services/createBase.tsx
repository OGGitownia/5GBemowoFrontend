import axios from "axios";

export const createBase = async (
    sourceUrl: string,
    selectedMethod: string,
    maxContextWindow: number,
    multiSearchAllowed: boolean,
    release: string,
    series: string,
    norm: string
): Promise<string> => {
    const payload = {
        sourceUrl,
        selectedMethod,
        maxContextWindow,
        multiSearchAllowed,
        release,
        series,
        norm
    };

    const response = await axios.post("http://localhost:8080/api/bases/create", payload, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data.baseId;
};

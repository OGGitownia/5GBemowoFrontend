import axios from "axios";
import { BaseInfo } from "../types/BaseInfo";

export const fetchBases = async (): Promise<BaseInfo[]> => {
    try {
        const response = await axios.get<BaseInfo[]>("http://localhost:8080/api/bases");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Błąd podczas pobierania baz:", error);
        return [];
    }
};

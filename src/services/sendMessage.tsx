import axios from "axios";
import { Message } from "../types/Message";


export const sendMessage = async (message: Message): Promise<void> => {
    try {
        await axios.post("http://localhost:8080/api/messages/ask", message, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("Message sent:", message);
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};
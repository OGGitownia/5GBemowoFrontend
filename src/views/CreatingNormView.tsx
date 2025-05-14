import { useEffect, useState } from "react";
import "../main/Shared.css";
import "../styles/CreatingNormView.css";
import {useUser} from "../services/UserContext.tsx";



function CreatingNormView() {
    const {user, setUser} = useUser()
    console.log(user)
    const [statusMessage, setStatusMessage] = useState("Connecting...");

    useEffect(() => {
        // !!!!!
        const socket = new WebSocket(`ws://localhost:8080/ws/base-status?baseId=${"baseId"}`);

        socket.onopen = () => {
            console.log("WebSocket połączony");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("STATUS UPDATE:", data);

            if (data.type === "status-update") {
                setStatusMessage(data.message);

                if (data.status === "READY") {
                    socket.close();
                    /// !!!
                    //onReady();
                }
                if (data.status === "FAILED") {
                    socket.close();
                    setStatusMessage("Błąd przetwarzania normy.");
                }
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket błąd:", error);
            setStatusMessage("Błąd połączenia WebSocket.");
        };

        return () => {
            socket.close();
        };
    }, ["baseId", "onReady"]);

    return (
        <div className="creating-norm">
            <div className="top-right">
                <button >Back to Add Norm</button>
            </div>
            <h1>Norm is being created...</h1>
            <p>{statusMessage}</p>
        </div>
    );
}

export default CreatingNormView;

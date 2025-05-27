import { useEffect } from "react";

export const useBaseStatusSocket = (
    baseId: string | null,
    onStatusUpdate: (status: string) => void
) => {
    useEffect(() => {
        if (!baseId) return;

        const socket = new WebSocket(`ws://localhost:8080/ws/status?baseId=${baseId}`);

        socket.onopen = () => {
            console.log("WebSocket connected for baseId:", baseId);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "statusUpdate" && data.status) {
                    onStatusUpdate(data.status);
                }
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            console.log("Closing WebSocket for baseId:", baseId);
            socket.close();
        };
    }, [baseId, onStatusUpdate]);
};

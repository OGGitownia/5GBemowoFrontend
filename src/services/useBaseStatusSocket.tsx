import { useEffect } from "react";

export const useBaseStatusSocket = (
    baseId: string,
    onStatusUpdate: (status: string) => void
) => {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws/status");

        socket.onopen = () => {
            socket.send(JSON.stringify({ subscribeTo: baseId }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.baseId === baseId && data.status) {
                onStatusUpdate(data.status);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
        };
    }, [baseId, onStatusUpdate]);
};

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Message } from "../types/Message.tsx";
import { User } from "../types/User.tsx";

interface AppContextType {
    user: User | null;
    setUser: (u: User | null) => void;
    chatMap: Map<string, Message[]>;
    sortedChatIds: string[];
    addPendingMessage: (msg: Message) => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [chatMap, setChatMap] = useState<Map<string, Message[]>>(new Map());
    const [sortedChatIds, setSortedChatIds] = useState<string[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

    // WebSocket auto-connect
    useEffect(() => {
        if (!user?.id) {
            console.log("Brak usera — zamykamy socket");
            socketRef.current?.close();
            socketRef.current = null;
            return;
        }

        const socket = new WebSocket(`ws://localhost:8080/ws/messages?userId=${user.id}`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket połączony dla usera:", user.id);
        };

        socket.onmessage = (event) => {
            try {
                const msg: Message = JSON.parse(event.data);
                console.log("Otrzymano wiadomość:", msg);
                updateWithIncomingMessage(msg);
            } catch (e) {
                console.error("łąd parsowania wiadomości WS:", e);
            }
        };

        socket.onclose = () => {
            console.log("🔌 Socket zamknięty");
        };

        socket.onerror = (e) => console.error("Błąd WebSocket:", e);

        return () => socket.close();
    }, [user?.id]);

    const updateWithIncomingMessage = (msg: Message) => {
        setChatMap(prevMap => {
            const newMap = new Map(prevMap);
            const current = newMap.get(msg.chatId) ?? [];

            const updatedList = [...current.filter(m => m.id !== msg.id), msg].sort((a, b) =>
                (a.answeredAt ?? 0) - (b.answeredAt ?? 0)
            );
            newMap.set(msg.chatId, updatedList);

            const sortedIds = Array.from(newMap.entries())
                .sort(([, a], [, b]) => {
                    const lastA = a[a.length - 1]?.answeredAt ?? 0;
                    const lastB = b[b.length - 1]?.answeredAt ?? 0;
                    return lastB - lastA;
                })
                .map(([id]) => id);

            setSortedChatIds(sortedIds);
            return newMap;
        });
    };

    const addPendingMessage = (msg: Message) => {
        setChatMap(prevMap => {
            const newMap = new Map(prevMap);
            const current = newMap.get(msg.chatId) ?? [];
            newMap.set(msg.chatId, [...current, msg]);

            const sortedIds = Array.from(newMap.entries())
                .sort(([, a], [, b]) => {
                    const lastA = a[a.length - 1]?.answeredAt ?? 0;
                    const lastB = b[b.length - 1]?.answeredAt ?? 0;
                    return lastB - lastA;
                })
                .map(([id]) => id);

            setSortedChatIds(sortedIds);
            return newMap;
        });
    };

    return (
        <AppContext.Provider value={{ user, setUser, chatMap, sortedChatIds, addPendingMessage  }}>
            {children}
        </AppContext.Provider>
    );



};



export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within an AppProvider");
    return context;
};

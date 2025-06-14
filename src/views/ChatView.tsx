import "../main/Shared.css";
import "../styles/ChatView.css";

import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Message } from "../types/Message";
import { sendMessage } from "../services/sendMessage";
import BackButton from "../components/smallerComponents/BackButton.tsx";
import { useApp } from "../services/AppContext.tsx";
import RightIcons from "../components/smallerComponents/RightIcons.tsx";
import ChatBubble from "../components/smallerComponents/ChatBubble.tsx";

function ChatView() {
    const { chatMap, user, addPendingMessage } = useApp();
    const location = useLocation();

    const { model, tuners, baseId, chatId: passedChatId } = location.state as {
        model: string;
        tuners: string[];
        baseId: string;
        chatId: number;
    };

    const generateNextChatId = (): number => {
        let maxId = -1;
        for (const chatId of chatMap.keys()) {
            const numericId = parseInt(chatId);
            if (!isNaN(numericId)) {
                maxId = Math.max(maxId, numericId);
            }
        }
        return maxId + 1;
    };

    const [chatId] = useState(() => {
        if (passedChatId === -1) {
            const newId = generateNextChatId();
            console.log("Utworzono nowy chatId:", newId);
            return newId;
        } else {
            console.log("Otwieranie istniejącego chatId:", passedChatId);
            return passedChatId;
        }
    });

    const [input, setInput] = useState("");
    const lastSentId = useRef<string | null>(null);

    const messages = chatMap.get(chatId.toString()) ?? [];

    const handleSend = async () => {
        if (!input.trim()) return;

        const id = `${user?.id}${Date.now()}`;
        const newMessage: Message = {
            id,
            question: input,
            answer: "",
            modelName: model,
            tuners,
            askedAt: Date.now(),
            answeredAt: undefined,
            answered: false,
            userId: user!.id,
            chatId: chatId.toString(),
            baseId: baseId,
            release: location.state.release,
            series: location.state.series,
            norm: location.state.norm
        };


        lastSentId.current = id;
        setInput("");

        try {
            await sendMessage(newMessage);
            addPendingMessage(newMessage);
            console.log("Message sent:", newMessage);

        } catch (e) {
            console.error("Błąd wysyłania wiadomości:", e);
        }
    };

    return (
        <div className="chat-view">
            <div className="chat-header">
                <BackButton />
                <h1 className="chat-title">Chat3GPP</h1>
                <p className="chat-sub">Current model: <strong>{model}</strong></p>
                <div className="tuners-list">
                    {tuners.map(tuner => (
                        <div key={tuner} className="tuner-tile">{tuner}</div>
                    ))}
                </div>
            </div>
            <RightIcons/>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}

            </div>

            <div className="chat-input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatView;

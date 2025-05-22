import "../main/Shared.css";
import "../styles/ChatView.css";

import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Message } from "../types/Message";
import { sendMessage } from "../services/sendMessage";
import { useMessageWebSocket } from "../services/useMessageWebSocket";
import BackButton from "../components/smallerComponents/BackButton.tsx";

const userId = 1234;
const chatId = "chat-" + Date.now();

function ChatView() {
    const location = useLocation();
    const { model, tuners } = location.state as { model: string; tuners: string[] };

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const lastSentId = useRef<string | null>(null);

    /*
    useEffect(() => {
        if (!lastSentId.current) return;
        const id = lastSentId.current;
        useMessageWebSocket(id, (updated) => {
            setMessages((prev) =>
                prev.map((m) => (m.id === updated.id ? updated : m))
            );
        });
    }, [messages]);

     */

    const handleSend = async () => {
        if (!input.trim()) return;

        const id = `${userId}${Date.now()}`;
        const newMessage: Message = {
            id,
            question: input,
            answer: "",
            modelName: model,
            tuners,
            askedAt: Date.now(),
            answeredAt: undefined,
            answered: false,
            userId,
            chatId
        };

        setMessages((prev) => [...prev, newMessage]);
        lastSentId.current = id;
        setInput("");

        try {
            await sendMessage(newMessage);
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

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="chat-bubble">
                        <div className="user-question"><strong>You:</strong> {msg.question}</div>
                        <div className="ai-answer">
                            <strong>AI:</strong>{" "}
                            {msg.answered ? msg.answer : <em>Loading...</em>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default ChatView;

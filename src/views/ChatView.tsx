//import { useState, useEffect, useRef } from "react";
import "../main/Shared.css";
import "../styles/ChatView.css";
import {useUser} from "../services/UserContext.tsx";

//import SockJS from "sockjs-client";
//import { Client, IMessage } from "@stomp/stompjs";


/*

type Message = {
    sender: "user" | "bot";
    content: string;
};

 */

function ChatView() {
    const {user, setUser} = useUser()
    console.log(user)
    /*
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws/chat"),
            reconnectDelay: 5000,
            debug: (str) => console.log("STOMP: " + str),
            onConnect: () => {
                console.log(" STOMP WebSocket połączony");

                client.subscribe("/topic/chat", (message: IMessage) => {
                    console.log(" Otrzymano wiadomość STOMP:");
                    console.log("Raw message.body:", message.body);

                    try {
                        const data = JSON.parse(message.body);
                        console.log(" Sparsowany JSON:", data);

                        const botReply: Message = {
                            sender: "bot",
                            content: data.answer || " Brak treści odpowiedzi",
                        };

                        setMessages((prev) => [...prev, botReply]);
                    } catch (err) {
                        console.error(" Błąd parsowania JSON:", err);
                        setMessages((prev) => [
                            ...prev,
                            {
                                sender: "bot",
                                content: " Nie udało się przetworzyć odpowiedzi serwera.",
                            },
                        ]);
                    }
                });

            },
            onStompError: (frame) => {
                console.error(" Błąd STOMP: ", frame.headers["message"]);
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", content: " Błąd WebSocket (STOMP)" },
                ]);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, []);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            sender: "user",
            content: inputText.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");

        fetch("http://localhost:8080/api/chat/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                baseName: norm.sourceUrl,
                question: userMessage.content,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Błąd zapytania");
                return res.text();
            })
            .then(() => {
                const botReply: Message = {
                    sender: "bot",
                    content: ` Serwer przyjął pytanie: "${userMessage.content}"`,
                };
                setMessages((prev) => [...prev, botReply]);
            })
            .catch((err) => {
                const errorReply: Message = {
                    sender: "bot",
                    content: ` Błąd serwera: ${err.message}`,
                };
                setMessages((prev) => [...prev, errorReply]);
            });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <div className="top-bar">
                <h2>Chat 3GPP</h2>
                <div className="norm-info">
                    Chatting with: <strong>{norm.sourceUrl}</strong> (status: {norm.status})
                </div>
                <button className="back-button" onClick={onBack}>
                    Back
                </button>
            </div>

            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>

            <div className="input-area">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );

     */
    return    (<div className="input-area">

        <button >Send</button>
    </div>)
}

export default ChatView;

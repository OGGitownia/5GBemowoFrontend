import React from "react";
import { useApp } from "../services/AppContext";
import { Message } from "../types/Message";
import "../styles/ChatHistoryPanel.css";

const ChatHistoryPanel: React.FC = () => {
    const { chatMap, sortedChatIds } = useApp();

    const getLastMessage = (messages: Message[]): Message => {
        return messages.reduce((latest, msg) => {
            const latestTime = latest.answeredAt ?? latest.askedAt;
            const currentTime = msg.answeredAt ?? msg.askedAt;
            return currentTime > latestTime ? msg : latest;
        });
    };

    return (
        <div className="chat-history-container">
            <div className="chat-history-header">Chat History</div>
            <div className="chat-history-list">
                {sortedChatIds.map(chatId => {
                    const messages = chatMap.get(chatId);
                    if (!messages || messages.length === 0) return null;
                    const lastMessage = getLastMessage(messages);

                    return (
                        <div className="chat-tile" key={chatId}>
                            <div className="chat-title">Chat ID: {chatId}</div>
                            <div className="chat-info">Model: <strong>{lastMessage.modelName}</strong></div>
                            <div className="chat-tuners">
                                {lastMessage.tuners.map(tuner => (
                                    <span key={tuner} className="tuner-tag">{tuner}</span>
                                ))}
                            </div>
                            <div className="chat-time">
                                Last: {new Date(lastMessage.answeredAt ?? lastMessage.askedAt).toLocaleString()}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatHistoryPanel;

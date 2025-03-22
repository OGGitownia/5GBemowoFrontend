import "../main/Shared.css";
import "../styles/ChatView.css";


type Props = {
    onBack: () => void;
};

function ChatView({ onBack }: Props) {
    return (
        <div className="chat-container">
            <div className="top-right">
                <button onClick={onBack}>Back to selection</button>
            </div>
            <h1>Chat 3GPP</h1>
            {/* wiadomości i input */}
        </div>
    );
}

export default ChatView;

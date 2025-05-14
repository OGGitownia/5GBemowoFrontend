import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../main/Shared.css";
import "../styles/Verification.css";

export default function Verification() {
    const [token, setToken] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate(); // dodajemy hook do nawigacji

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                `/api/sessions/verify?token=${encodeURIComponent(token)}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Weryfikacja udana:", data);
                navigate("/select"); // przejście do widoku "select"
            } else {
                setMessage("Nieprawidłowy token lub błąd weryfikacji.");
            }
        } catch (error) {
            console.error("Błąd weryfikacji:", error);
            setMessage("Wystąpił błąd podczas weryfikacji.");
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Verification</div>
                <div className="underline"/>
            </div>

            <div className="inputs">
                <div className="input field-container">
                    <input
                        className="field-input"
                        type="text"
                        placeholder="Enter verification token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </div>
            </div>

            <div className="submit-container">
                <button className="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
}

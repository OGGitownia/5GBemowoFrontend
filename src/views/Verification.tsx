import { useState } from "react";
import "../main/Shared.css";
import "../styles/Verification.css";


type VerificationProps = {
    onVerifySuccess: () => void;
};

export default function Verification({ onVerifySuccess }: VerificationProps) {
    const [token, setToken] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                `/api/sessions/verify?token=${encodeURIComponent(token)}`,
                {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                }
            );

            if (response.ok) {
                const data = (await response.json()) as { valid: boolean };
                if (data.valid) {
                    setMessage("Token jest prawidłowy");
                    onVerifySuccess();       // <-- wywołanie callbacka po udanej weryfikacji
                } else {
                    setMessage("Token jest nieprawidłowy");
                }
            } else {
                setMessage(`Błąd serwera: ${response.status}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(`Błąd sieci: ${error.message}`);
            } else {
                setMessage(`Nieznany błąd: ${String(error)}`);
            }
        }
        ;
    }

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
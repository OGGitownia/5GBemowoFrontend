import { useState } from "react";
import "../main/Shared.css";
import "../styles/LoginSignup.css";

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

type Props = {
    onLoginSuccess: () => void;
};
const handleClick = async (action: string, username: string, email: string, password: string, setAction: (val: string) => void) => {
    if (action === "Sign Up") {
        const url = "http://localhost:8080/api/users/register/email";
        const data = {username: username, email: email, password: password};

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(data);
            console.log(result);
        } catch (error) {
            console.error("Błąd podczas wysyłania żądania:", error);
        }
    } else {
        setAction("Sign Up");
    }
};


function LoginSignup({ onLoginSuccess }: Props) {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        // Tutaj normalnie dodałbyś fetch do backendu i walidację.
        // Zakładamy, że logowanie zawsze się udaje:
        onLoginSuccess();
    };

    return (
        <div className='containter'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="user icon" />
                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="email icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="password icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

            </div>

            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Lost Password?<span>Click Here!</span>
                </div>
            )}

            <div className="submit-container">
                <div
                    className={action === "Login" ? "submit gray" : "submit"}
                    onClick={() => handleClick(action, username, email, password, setAction)}
                >
                    Sign Up
                </div>
                <div
                    className={action === "Sign Up" ? "submit gray" : "submit"}
                    onClick={() => {
                        if (action === "Login") handleLoginClick();
                        else setAction("Login");
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;

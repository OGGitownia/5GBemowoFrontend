import { useState } from "react";
import "../main/Shared.css";
import "../styles/LoginSignup.css";

import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

type Props = {
    onLoginSuccess: () => void;
};

function LoginSignup({ onLoginSuccess }: Props) {
    const [action, setAction] = useState("Sign Up");

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
                        <input type="text" placeholder="Name" />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="email icon" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="password icon" />
                    <input type="password" placeholder="Password" />
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
                    onClick={() => setAction("Sign Up")}
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

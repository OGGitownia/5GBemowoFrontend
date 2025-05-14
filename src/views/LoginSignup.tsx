import { useState } from "react";
import "../main/Shared.css";
import "../styles/LoginSignup.css";
import {useNavigate} from "react-router-dom";


import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import {User} from "../AppRouter.tsx";
import {getNewSessionToken} from "../services/authService.tsx";
import {loginWithEmail} from "../services/login.tsx";


const handleClick = async (
    action: string,
    username: string,
    email: string,
    password: string,
    setAction: (val: string) => void,
    navigate: ReturnType<typeof useNavigate>
) => {
    if (action === "Sign Up") {
        const url = "http://localhost:8080/api/users/register/email";
        const data = {
            username: username,
            email: email,
            password: password
        };
        console.log(data)

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log(response.status);

            if (response.ok) {
                const result = await response.json();
                console.log("Rejestracja zakończona sukcesem:", result);

                const user: User = {
                    id: result.id,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    username: result.username,
                    password: result.password,
                    avatarPath: result.avatarPath,
                    createdAt: result.createdAt,
                    lastActiveAt: result.lastActiveAt,
                    roles: result.roles,
                    isActive: result.isActive,
                    emailVerified: result.emailVerified,
                    phoneNumberVerified: result.phoneNumberVerified,
                };
                localStorage.setItem("user", JSON.stringify(user));
                const token = await getNewSessionToken(user.id, navigate);
                if (token) {
                    console.log("Token zapisany w localStorage:", token);
                    localStorage.setItem("token", token);

                    navigate("/verifyEmail");
                }
            } else {
                const errorText = await response.text();
                console.error("Błąd podczas rejestracji:", errorText);
            }
        } catch (error) {
            console.error("Błąd podczas wysyłania żądania:", error);
        }
    } else {
        setAction("Sign Up");
    }
};



function LoginSignup() {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = () => {
        loginWithEmail(email, password, navigate);
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
                    onClick={() => handleClick(action, username, email, password, setAction, navigate)}
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

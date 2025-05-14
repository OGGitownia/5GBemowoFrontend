import { User, UserRole } from "../AppRouter";
import { NavigateFunction } from "react-router-dom";


export const loginWithEmail = async (email: string, password: string, navigate: NavigateFunction) => {
    try {
        const response = await fetch("http://localhost:8080/api/users/login/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const userData = await response.json();

            const user: User = {
                id: userData.id,
                email: userData.email || null,
                phoneNumber: userData.phoneNumber || null,
                username: userData.username,
                password: userData.sessionToken,
                avatarPath: userData.avatarPath || null,
                createdAt: userData.createdAt,
                lastActiveAt: userData.lastActiveAt,
                roles: userData.roles.map((role: string) => role as UserRole),
                isActive: userData.isActive,
                emailVerified: userData.emailVerified,
                phoneNumberVerified: userData.phoneNumberVerified
            };

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", user.password);

            console.log("Logowanie udane. Użytkownik zapisany w localStorage.");
            navigate("/select");
            //!!!!!!
        } else {
            const errorData = await response.json();
            console.error("Błąd logowania:", errorData.error);
            alert(errorData.error);
        }
    } catch (error) {
        console.error("Błąd podczas logowania przez email:", error);
        alert("Wystąpił błąd połączenia z serwerem.");
    }
};



export const loginWithPhone = async (phoneNumber: string, password: string, navigate: NavigateFunction) => {
    try {
        const response = await fetch("http://localhost:8080/api/users/login/phone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phoneNumber, password })
        });

        if (response.ok) {
            const userData = await response.json();

            const user: User = {
                id: userData.id,
                email: userData.email || null,
                phoneNumber: userData.phoneNumber || null,
                username: userData.username,
                password: userData.sessionToken,
                avatarPath: userData.avatarPath || null,
                createdAt: userData.createdAt,
                lastActiveAt: userData.lastActiveAt,
                roles: userData.roles.map((role: string) => role as UserRole),
                isActive: userData.isActive,
                emailVerified: userData.emailVerified,
                phoneNumberVerified: userData.phoneNumberVerified
            };

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", user.password);

            console.log("Logowanie udane. Użytkownik zapisany w localStorage.");
            navigate("/select");
            //!!!!!!
        } else {
            const errorData = await response.json();
            console.error("Błąd logowania:", errorData.error);
            alert(errorData.error);
        }
    } catch (error) {
        console.error("Błąd podczas logowania przez telefon:", error);
        alert("Wystąpił błąd połączenia z serwerem.");
    }
};



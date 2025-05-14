import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginSignup from "./views/LoginSignup.tsx";
import NormSelectionView from "./views/NormSelectionView.tsx";
import AddNewNormView from "./views/AddNewNormView.tsx";
import CreatingNormView from "./views/CreatingNormView.tsx";
import ChatView from "./views/ChatView.tsx";
import VerifyEmailView from "./views/Verification.tsx";
import { fetchUserSession } from "./services/authService.tsx";
import { Navigate } from "react-router-dom";



function AppRouter() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const userData = await fetchUserSession(navigate);
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        };
        checkSession();
    }, [navigate]);

    if (loading) {
        return <div>Ładowanie aplikacji...</div>;
    }


    return (
        <Routes>
            {!user ? (
                <>
                    <Route path="/" element={<LoginSignup />} />
                    <Route path="*" element={<LoginSignup />} />
                </>
            ) : !user.emailVerified ? (
                <>
                    <Route path="/verifyEmail" element={<VerifyEmailView />} />
                    <Route path="*" element={<Navigate to="/verifyEmail" />} />
                </>
            ) : (
                <>
                    <Route path="/select" element={<NormSelectionView />} />
                    <Route path="/add" element={<AddNewNormView />} />
                    <Route path="/creating/:baseId" element={<CreatingNormView />} />
                    <Route path="/chat/:normId" element={<ChatView />} />
                    <Route path="*" element={<Navigate to="/select" />} />
                </>
            )}
        </Routes>


    );
}

export interface User {
    id: number;
    email: string | null;
    phoneNumber: string | null;
    username: string;
    password: string;
    avatarPath: string | null;
    createdAt: string;
    lastActiveAt: string;
    roles: UserRole[];
    isActive: boolean;
    emailVerified: boolean;
    phoneNumberVerified: boolean;
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}




export default AppRouter;




// AppView.tsx
import { useState } from "react";
import NormSelectionView from "../views/NormSelectionView.tsx";
import AddNewNormView from "../views/AddNewNormView.tsx";
import CreatingNormView from "../views/CreatingNormView.tsx";
import ChatView from "../views/ChatView.tsx";
import LoginSignup from "../views/LoginSignup.tsx";
import Verification from "../views/Verification.tsx";

type BaseEntity = {
    id: number;
    sourceUrl: string;
    status: string;
    statusMessage?: string;
};

function AppView() {
    const [view, setView] = useState<
        "login" | "verify" | "select" | "add" | "creating" | "chat"
    >("select");

    const [selectedBaseId, setSelectedBaseId] = useState<number | null>(null);
    const [selectedBase, setSelectedBase] = useState<BaseEntity | null>(null);

    const handleNormSelected = async (url: string) => {
        const res = await fetch("http://localhost:8080/api/bases", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sourceUrl: url }),
        });

        const base = await res.json();
        setSelectedBaseId(base.id);
        setView("creating");
    };

    const handleOpenChat = (base: BaseEntity) => {
        setSelectedBase(base);
        setView("chat");
    };

    return (
        <>  {/* using fragment to switch view */}
            {view === "login" && (
                <LoginSignup
                    onLoginSuccess={() => setView("select")}
                    onSignupSuccess={() => setView("verify")}
                />
            )}

            {view === "verify" && (
                <Verification
                    onVerifySuccess={() => setView("select")}
                />
            )}

            {view === "select" && (
                <NormSelectionView
                    onAddNew={() => setView("add")}
                    onOpenChat={handleOpenChat}
                />
            )}
            {view === "add" && (
                <AddNewNormView
                    onBack={() => setView("select")}
                    onSelectNorm={handleNormSelected}
                />
            )}
            {view === "creating" && (
                <CreatingNormView
                    baseId={selectedBaseId!}
                    onBack={() => setView("add")}
                    onReady={() => setView("chat")}
                />
            )}
            {view === "chat" && (
                <ChatView
                    onBack={() => setView("select")}
                    norm={selectedBase!}
                />
            )}
        </>
    );
}

export default AppView;

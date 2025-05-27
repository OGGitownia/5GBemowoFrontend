import { useState } from "react";
import NormSelectionView from "../views/NormSelectionView.tsx";
import AddNewNormView from "../views/AddNewNormView.tsx";
import CreatingNormView from "../views/CreatingNormView.tsx";
import ChatView from "../views/ChatView.tsx";


type BaseEntity = {
    id: number;
    sourceUrl: string;
    status: string;
    statusMessage?: string;
};

function AppView() {
    const [view, setView] = useState<"select" | "add" | "creating" | "chat">("select");

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

    switch (view) {
        case "select":
            return (
                <NormSelectionView
                    onAddNew={() => setView("add")}
                    onOpenChat={handleOpenChat}
                />
            );
        case "add":
            return <AddNewNormView onBack={() => setView("select")} onSelectNorm={handleNormSelected} />;
        case "creating":
            return (
                <CreatingNormView
                    baseId={selectedBaseId!}
                    onBack={() => setView("add")}
                    onReady={() => setView("chat")}
                />
            );
        case "chat":
            return (
                <ChatView
                    onBack={() => setView("select")}
                    norm={selectedBase!} // ← Przekazujemy wybraną normę
                />
            );
        default:
            return null;
    }
}

export default AppView;

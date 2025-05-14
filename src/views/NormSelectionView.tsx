import { useEffect, useState } from "react";
import "../main/Shared.css";
import "../styles/NormSelectionView.css";


type BaseEntity = {
    id: number;
    sourceUrl: string;
    status: string;
    statusMessage?: string;
};

/*
type Props = {
    onAddNew: () => void;
    onOpenChat: (norm: BaseEntity) => void;
};

 */


function NormSelectionView() {
    const [bases, setBases] = useState<BaseEntity[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/bases")
            .then(res => {
                if (!res.ok) throw new Error("Błąd pobierania baz");
                return res.json();
            })
            .then(data => {
                console.log("Pobrane bazy:", data);
                setBases(data);
            })
            .catch(err => {
                console.error("Błąd pobierania baz:", err);
            });
    }, []);


    return (
        <div className="norm-selection">
            <h1>Select norm to chat with</h1>

            {bases.length > 0 ? (
                <ul className="norm-list">
                    {bases.map((base) => (
                        <li
                            key={base.id}
                            className="norm-item clickable"
                        >
                            <strong>{base.sourceUrl}</strong> ({base.status})
                        </li>

                    ))}
                </ul>
            ) : (
                <p>No norms available</p>
            )}

            <button >Add new norm</button>
        </div>
    );
}

export default NormSelectionView;

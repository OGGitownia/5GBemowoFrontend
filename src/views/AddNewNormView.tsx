import { useEffect, useState } from "react";
import "../main/Shared.css";
import "../styles/AddNewNormView.css";


function AddNewNormView() {
    const [availableNorms, setAvailableNorms] = useState<string[]>([]);

    useEffect(() => {
        const fetchNorms = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/bases/available-norms");
                console.log("Odpowiedź:", res);

                if (!res.ok) throw new Error("Błąd HTTP");

                const data = await res.json();
                console.log("Dane:", data);

                setAvailableNorms(data);
            } catch (err) {
                console.error("Błąd:", err);
            }
        };

        fetchNorms();
    }, []);


    return (
        <div className="add-norm">
            <div className="top-right">
                <button>Back to selection</button>
            </div>
            <h1>Add new norm</h1>
            <ul>
                {availableNorms.map((url, i) => (
                    <li key={i}>
                        {url}
                        <button >Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddNewNormView;

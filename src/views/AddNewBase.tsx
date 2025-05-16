import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddNewBase.css";
import { Norm } from "../types/Norm.tsx";
import { fetchBaseCreatingMethods } from "../services/fetchBaseCreatingMethods.tsx";
import {createBase} from "../services/createBase.tsx";
import {useUser} from "../services/UserContext.tsx";

const AddNewBase: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [norm, setNorm] = useState<Norm | null>(null);
    const [methods, setMethods] = useState<string[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<string>("Waiting for initial status...");
    const [statusHistory, setStatusHistory] = useState<string[]>([]);

    const { user } = useUser();
    useEffect(() => {
        if (state && state.norm) {
            setNorm(state.norm);
        } else {
            console.error("Brak normy! Przekierowanie do głównego widoku.");
            navigate("/select");
        }
    }, [state, navigate]);

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const availableMethods = await fetchBaseCreatingMethods();
                setMethods(availableMethods);
            } catch (error) {
                console.error("Error fetching methods:", error);
            }
        };

        fetchMethods();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMethod(event.target.value);
    };

    const handleCreateBase = () => {
        if (!norm) {
            console.error("Norm is not available.");
            return;
        }

        if (selectedMethod && user?.id) {
            setIsConfirmed(true);
            setCurrentStatus("Waiting for the first status...");
            createBase(norm.zipUrl, selectedMethod, user.id)
                .then(() => {
                    console.log("Base creation initiated.");
                })
                .catch((error) => {
                    console.error("Error during base creation:", error);
                });
        } else {
            console.error("Brak wymaganych danych: metoda lub user ID.");
        }
    };
    const updateStatus = (newStatus: string) => {
        setStatusHistory((prev) => [currentStatus, ...prev]);
        setCurrentStatus(newStatus);
    };

    return norm ? (
        <div className="norm-details-container">
            <h2>{norm.title}</h2>
            <h3>{norm.specNumber}</h3>

            {!isConfirmed ? (
                <div className="selection-area">
                    <select className="method-select" onChange={handleSelectChange} disabled={isConfirmed}>
                        <option value="">Select Method</option>
                        {methods.map((method, index) => (
                            <option key={index} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                    <button
                        className="confirm-button"
                        onClick={handleCreateBase}
                        disabled={!selectedMethod}
                    >
                        Confirm / Create
                    </button>
                </div>
            ) : (
                <div className="confirmation-area">
                    <p><strong>Selected method:</strong> {selectedMethod}</p>
                </div>
            )}

            <div className="status-container">
                <h4>Current Status:</h4>
                <p>{currentStatus}</p>

                <h4>Previous Statuses:</h4>
                <ul className="status-history">
                    {statusHistory.map((status, index) => (
                        <li key={index}>{status}</li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <div className="loading-message">Loading norm details...</div>
    );
};

export default AddNewBase;

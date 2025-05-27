import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddNewBase.css";
import { Norm } from "../types/Norm.tsx";
import { fetchBaseCreatingMethods } from "../services/fetchBaseCreatingMethods.tsx";
import { createBase } from "../services/createBase.tsx";
import { useApp } from "../services/AppContext.tsx";
import { Spinner } from "reactstrap";
import { useBaseStatusSocket } from "../services/useBaseStatusSocket.tsx";

const AddNewBase: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [norm, setNorm] = useState<Norm | null>(null);
    const [methods, setMethods] = useState<string[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<string>("Waiting for initial status...");
    const [statusHistory, setStatusHistory] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [baseId, setBaseId] = useState<string | null>(null);

    const { user } = useApp();

    // Ładowanie normy z routingu
    useEffect(() => {
        if (state && state.norm) {
            setNorm(state.norm);
        } else {
            console.error("Brak normy! Przekierowanie do głównego widoku.");
            navigate("/select");
        }
    }, [state, navigate]);

    // Pobranie metod
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

    // Aktualizacja statusu
    const updateStatus = useCallback((newStatus: string) => {
        setStatusHistory((prev) => [newStatus, ...prev]);
        setCurrentStatus(newStatus);
    }, []);

    // Hook WebSocket tylko po uzyskaniu baseId
    useBaseStatusSocket(baseId, updateStatus);

    // Wybór metody
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMethod(event.target.value);
        setErrorMessage(null);
    };

    // Tworzenie bazy
    const handleCreateBase = () => {
        if (!norm) {
            console.error("Norm is not available.");
            return;
        }

        if (selectedMethod && user?.id) {
            setIsConfirmed(true);
            setCurrentStatus("Waiting for the first status...");
            setIsLoading(true);

            createBase(norm.zipUrl, selectedMethod, user.id)
                .then((returnedBaseId) => {
                    console.log("Base creation initiated. ID:", returnedBaseId);
                    setBaseId(returnedBaseId); // Aktywuje WebSocket
                })
                .catch((error) => {
                    console.error("Error during base creation:", error);
                    setErrorMessage("Failed to create base. Please try again.");
                    setIsLoading(false);
                });
        } else {
            console.error("Metoda tworzenia bazy nie została wybrana.");
            setErrorMessage("You must select a method before confirming!");
        }
    };

    return norm ? (
        <div className="norm-details-container">
            <div className="info-header">
                <h2>You are creating a new base for LLM</h2>
                <p>
                    Based on: <strong>{norm.title}</strong> (Code: <strong>{norm.specNumber}</strong>)
                </p>
            </div>

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
                        disabled={isLoading}
                    >
                        Confirm / Create
                    </button>

                    {isLoading && (
                        <div className="loading-spinner">
                            <Spinner />
                            <p>Your base is being created...</p>
                        </div>
                    )}

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
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

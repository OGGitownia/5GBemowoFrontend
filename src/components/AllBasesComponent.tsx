import React, { useEffect, useState } from "react";
import { BaseInfo } from "../types/BaseInfo";
import { fetchBases } from "../services/fetchBases.tsx";
import BaseInfoCard from "./smallerComponents/BaseInfoCard.tsx";
import "../styles/Components/AllBasesComponent.css";

const AllBasesComponent: React.FC = () => {
    const [bases, setBases] = useState<BaseInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBases = async () => {
            const data = await fetchBases();
            setBases(data);
            setLoading(false);
        };

        loadBases();
    }, []);

    if (loading) return <p className="loading-text">Loading bases...</p>;

    return (
        <div className="all-bases-container">
            <h2 className="all-bases-title">Base List</h2>
            <div className="base-cards-wrapper">
                {bases.map((base) => (
                    <BaseInfoCard key={base.id} base={base} />
                ))}
            </div>
        </div>
    );
};

export default AllBasesComponent;

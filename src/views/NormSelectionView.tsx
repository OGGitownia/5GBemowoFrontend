import { useEffect, useState } from "react";
import "../main/Shared.css";
import "../styles/NormSelectionView.css";

import profileIcon from "../assets/profile_icon.svg";
import aboutIcon from "../assets/about_us_icon.svg";
import availableIcon from "../assets/available.png";
import treeIcon from "../assets/tree.png";
import starIcon from "../assets/favourite.png";

// Model bazy danych
type BaseEntity = {
    id: number;
    sourceUrl: string;
    status: string;
    statusMessage?: string;
};


export default function NormSelectionView() {
    const [bases, setBases] = useState<BaseEntity[]>([]);

    useEffect(() => {
        fetch("/api/bases")
            .then((res) => {
                if (!res.ok) throw new Error("Błąd pobierania baz");
                return res.json();
            })
            .then((data) => setBases(data))
            .catch((err) => console.error("Błąd pobierania baz:", err));
    }, []);

    return (
        <div className="norm-selection-container">
            {}
            <div className="top-bar">
                <div className="right-icons">
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn">
                            <img src={profileIcon} alt="Profil" />
                        </button>
                        <div className="icon-label">Profil</div>
                    </div>
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn">
                            <img src={aboutIcon} alt="About Us" />
                        </button>
                        <div className="icon-label">About Us</div>
                    </div>
                </div>
            </div>

            {/* Główny content: środkowy header, ikonki i rozszerzone okno norm */}
            <div className="main-content">
                <div className="header">
                    <div className="text">Chat 3 GPP</div>
                    <div className="underline" />
                </div>

                <div className="icon-group">
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn">
                            <img src={availableIcon} alt="Available Norms" />
                        </button>
                        <div className="icon-label">Available</div>
                    </div>
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn">
                            <img src={treeIcon} alt="Tree View" />
                        </button>
                        <div className="icon-label">Tree View</div>
                    </div>
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn">
                            <img src={starIcon} alt="Favorites" />
                        </button>
                        <div className="icon-label">Favorites</div>
                    </div>
                </div>

                <div className="norm-list-scroll expanded">
                    {bases.length > 0 ? (
                        <ul className="norm-list">
                            {bases.map((base) => (
                                <li
                                    key={base.id}
                                    className="norm-item"
                                >
                                    <strong>{base.sourceUrl}</strong> ({base.status})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No norms available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

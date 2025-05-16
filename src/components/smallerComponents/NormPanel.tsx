import React from "react";
import "../../styles/smallComponents/NormPanel.css";
import {Norm} from "../../types/Norm.tsx";


interface NormPanelProps {
    norm: Norm;
    onClick?: () => void;
}

const NormPanel: React.FC<NormPanelProps> = ({ norm, onClick }) => {
    return (
        <div className="norm-panel" onClick={onClick}>
            <div className="header">
                <div className="name">{norm.title} - {norm.specNumber}</div>
            </div>
            <div className="details">
                <span>Latest Version: {norm.latestVersion}</span>
                <span>Date: {norm.date}</span>
                <span>Size: {norm.size}</span>
            </div>
            <a className="download-link" href={norm.zipUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                Download ZIP
            </a>
        </div>
    );
};

export default NormPanel;

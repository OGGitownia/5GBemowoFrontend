import React from "react";
import "../../styles/smallComponents/BasePanel.css";
import {Base} from "../../types";


interface BasePanelProps {
    base: Base;
}

const BasePanel: React.FC<BasePanelProps> = ({ base }) => {
    return (
        <div className="base-panel">
            <div className="header">
                <div className="name">{base.name}</div>
            </div>
        </div>
    );
};

export default BasePanel;

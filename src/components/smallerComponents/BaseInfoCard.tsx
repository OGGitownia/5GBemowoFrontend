import React from "react";
import "../../styles/smallComponents/BaseInfoCard.css";
import { BaseInfo } from "../../types/BaseInfo.tsx";

interface BaseCardProps {
    base: BaseInfo;
}

const BaseInfoCard: React.FC<BaseCardProps> = ({ base }) => {
    return (
        <div className="base-card">
            <p><strong>Status:</strong> {base.status}</p>
            {base.statusMessage && <p><strong>Status message:</strong> {base.statusMessage}</p>}
            <p><strong>Method:</strong> {base.createdWthMethod}</p>
            <p><strong>Max context:</strong> {base.maxContextWindow}</p>
            <p><strong>Multi-search:</strong> {base.multiSearchAllowed ? "Yes" : "No"}</p>
        </div>
    );
};

export default BaseInfoCard;

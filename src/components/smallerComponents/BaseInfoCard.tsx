import React, { useState } from "react";
import "../../styles/smallComponents/BaseInfoCard.css";
import { BaseInfo } from "../../types/BaseInfo.tsx";
import StartChatModal from "../../modals/StartChatModal.tsx";


interface BaseCardProps {
    base: BaseInfo;
}

const BaseInfoCard: React.FC<BaseCardProps> = ({ base }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="base-card" onClick={handleCardClick}>
                <p><strong>Status:</strong> {base.status}</p>
                {base.statusMessage && <p><strong>Status message:</strong> {base.statusMessage}</p>}
                <p><strong>Method:</strong> {base.createdWthMethod}</p>
                <p><strong>Max context:</strong> {base.maxContextWindow}</p>
                <p><strong>Multi-search:</strong> {base.multiSearchAllowed ? "Yes" : "No"}</p>
            </div>

            {showModal && (
                <StartChatModal
                    baseInfo={base}
                    onClose={handleCloseModal}
                    onStartChat={(model, options) => {
                        console.log("Starting chat with", model, options);
                        handleCloseModal();
                    }}
                />

            )}
        </>
    );
};

export default BaseInfoCard;

import "../main/Shared.css";
import "../styles/MainView.css";

import { useApp } from "../services/AppContext.tsx";
import { useState } from "react";
import TreeComponent from "../components/TreeComponent.tsx";
import BestBasesComponent from "../components/BestBasesComponent.tsx";
import AllBasesComponent from "../components/AllBasesComponent.tsx";
import ViewSelector from "../components/ViewSelector.tsx";
import ChatHistoryPanel from "../components/ChatHistoryPanel.tsx";
import RightIcons from "../components/smallerComponents/RightIcons.tsx";

export default function MainView() {
    const {user} = useApp();
    const [activeButton, setActiveButton] = useState<"all" | "tree" | "best">("all");

    const handleButtonClick = (buttonType: "all" | "tree" | "best") => {
        setActiveButton(buttonType);
        console.log(`Active button is now: ${buttonType}`);
        console.log(user)
    };

    const renderContent = () => {
        switch (activeButton) {
            case "all":
                return <AllBasesComponent/>;
            case "best":
                return <BestBasesComponent/>;
            case "tree":
                return <TreeComponent/>;
            default:
                return null;
        }
    };

    return (
        <div className="main-container">
                <RightIcons/>
            <div className="main-content">
                <div className="header">
                    <div className="text">Chat 3 GPP</div>
                    <div className="underline"/>
                </div>
                <ViewSelector
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
                />
                <div className="content-columns">

                    <div className="norm-list-scroll-expanded">
                        {renderContent()}
                    </div>
                </div>

            </div>
            <div className="chat-history-wrapper">
                <ChatHistoryPanel/>
            </div>
        </div>
    );
}

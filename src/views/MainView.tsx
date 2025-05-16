import {logoutUser} from "../services/logout.tsx";
import {useNavigate} from "react-router-dom";
import "../main/Shared.css";
import "../styles/MainView.css";

import profileIcon from "../assets/profile_icon.svg";
import aboutIcon from "../assets/about_us_icon.svg";
import logoutIcon from "../assets/logout.svg";
import {useUser} from "../services/UserContext.tsx";
import {useState} from "react";
import TreeComponent from "../components/TreeComponent.tsx";
import BestBasesComponent from "../components/BestBasesComponent.tsx";
import AllBasesComponent from "../components/AllBasesComponent.tsx";
import ViewSelector from "../components/ViewSelector.tsx";








export default function MainView() {
    const {user, setUser} = useUser()
    console.log(user)
    const navigate = useNavigate()

    const [activeButton, setActiveButton] = useState<"all" | "tree" | "best">("all");

    const handleButtonClick = (buttonType: "all" | "tree" | "best") => {
        setActiveButton(buttonType);
        console.log(`Active button is now: ${buttonType}`);
    };

    const renderContent = () => {
        switch (activeButton) {
            case "all":
                return <AllBasesComponent />;
            case "best":
                return <BestBasesComponent />;
            case "tree":
                return <TreeComponent />;
            default:
                return null;
        }
    };



    return (
        <div className="norm-selection-container">
            <div className="top-bar">
                <div className="right-icons">
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn" onClick={() => navigate("/profile")}>
                            <img src={profileIcon} alt="Profil" />
                        </button>
                        <div className="icon-label">Profil</div>
                    </div>
                    <div className="icon-wrapper">
                        <button type="button" className="icon-btn" onClick={() => navigate("/aboutUs")}>
                            <img src={aboutIcon} alt="About Us" />
                        </button>
                        <div className="icon-label">About Us</div>
                    </div>
                </div>

            </div>

            <div className="left-icons">
                <div className="icon-wrapper">
                    <button type="button" className="icon-btn"
                            onClick={() => logoutUser(navigate, setUser)}
                            title="Wyloguj">
                        <img src={logoutIcon} alt="Logout" />
                    </button>
                    <div className="icon-label">Logout</div>
                </div>
            </div>

            <div className="main-content">
                <div className="header">
                    <div className="text">Chat 3 GPP</div>
                    <div className="underline" />
                </div>

                <ViewSelector
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
                />

                <div className="norm-list-scroll expanded">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
}

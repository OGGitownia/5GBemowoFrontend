import {logoutUser} from "../services/logout.tsx";
import {useNavigate} from "react-router-dom";
import "../main/Shared.css";
import "../styles/MainView.css";


import ProfileIcon from '../assets/profile_icon.svg?react';
import AboutIcon from '../assets/about_us_icon.svg?react';
import LogoutIcon from '../assets/logout.svg?react';


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
        <div className="main-container">
            <div className="top-bar">
                <div className="right-icons">
                    <button type="button" className="icon-btn-with-label" onClick={() => navigate("/profile")}>
                        <ProfileIcon className="custom-icon" />
                        <span className="icon-label">Profil</span>
                    </button>

                    <button type="button" className="icon-btn-with-label" onClick={() => navigate("/aboutUs")}>
                        <AboutIcon className="custom-icon" />
                        <span className="icon-label">About Us</span>
                    </button>

                    <button
                        type="button"
                        className="icon-btn-with-label"
                        onClick={() => logoutUser(navigate, setUser)}
                        title="Wyloguj">
                        <LogoutIcon className="custom-icon" />
                        <span className="icon-label">Logout</span>
                    </button>
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

                <div className="norm-list-scroll-expanded">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
}

import "../styles/AboutUsView.css";
import BackButton from "../components/smallerComponents/BackButton.tsx";
import RightIcons from "../components/smallerComponents/RightIcons.tsx";

const AboutUsView = () => {
    return (
        <div className="about-us-container">
            <div className="top-bar">
                <BackButton />
                <RightIcons />
            </div>
        </div>
    );
};

export default AboutUsView;
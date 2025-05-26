import "../styles/AboutUsView.css";
import BackButton from "../components/smallerComponents/BackButton.tsx";
import RightIcons from "../components/smallerComponents/RightIcons.tsx";
import ChatHistoryPanel from "../components/ChatHistoryPanel.tsx";

const AboutUsView = () => {
  return (
      <div className="about-us-container">
        <div className="top-bar">
          <BackButton />
          <RightIcons />
        </div>
        <div className="history-panel-wrapper">
          <ChatHistoryPanel />
        </div>
      </div>
  );
};

export default AboutUsView;

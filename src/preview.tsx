import ReactDOM from "react-dom/client";
import NormSelectionView from "./views/NormSelectionView";
import "./index.css";


const App = () => {
    localStorage.setItem("token", "1")
    const handleOpenChat = (norm: any) => {
        console.log("Norm clicked:", norm);
    };

    return (
        <div className="app-container">
            <NormSelectionView onOpenChat={handleOpenChat} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

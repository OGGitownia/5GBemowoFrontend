import ReactDOM from "react-dom/client";
import MainView from "./views/MainView.tsx";
import "./index.css";


const App = () => {
    localStorage.setItem("token", "1")
    const handleOpenChat = (norm: any) => {
        console.log("Norm clicked:", norm);
    };

    return (
        <div className="app-container">
            <MainView onOpenChat={handleOpenChat} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

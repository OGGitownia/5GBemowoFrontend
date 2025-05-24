import { useState } from "react";
import "../styles/ProfileView.css";
import BackButton from "../components/smallerComponents/BackButton.tsx";

function handleDeleteAccount() {

}

const ProfileView = () => {
    const [username, setUsername] = useState("exampleUser");
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("password123");

    const [editingField, setEditingField] = useState<"username" | "email" | "password" | null>(null);
    const [tempValue, setTempValue] = useState("");

    const handleEditClick = (field: "username" | "email" | "password") => {
        setEditingField(field);
        if (field === "username") setTempValue(username);
        if (field === "email") setTempValue(email);
        if (field === "password") setTempValue(password);
    };

    const handleSave = () => {
        if (editingField === "username") setUsername(tempValue);
        if (editingField === "email") setEmail(tempValue);
        if (editingField === "password") setPassword(tempValue);
        setEditingField(null);
    };

    return (
        <div className="profile-wrapper">
            <div className="back-button-fixed">
                <BackButton />
            </div>
            <button className="delete-button-fixed" onClick={handleDeleteAccount}>
                Delete Account
            </button>


            <div className="profile-view">
                <h2>Profile</h2>

                <div className="profile-field">
                    <label>Username:</label>
                    {editingField === "username" ? (
                        <>
                            <input
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                            />
                            <button className="back-button" onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <span>{username}</span>
                            <button className="back-button" onClick={() => handleEditClick("username")}>
                                Change Username
                            </button>
                        </>
                    )}
                </div>

                <div className="profile-field">
                    <label>Email:</label>
                    {editingField === "email" ? (
                        <>
                            <input
                                type="email"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                            />
                            <button className="back-button" onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <span>{email}</span>
                            <button className="back-button" onClick={() => handleEditClick("email")}>
                                Change Email
                            </button>
                        </>
                    )}
                </div>

                <div className="profile-field">
                    <label>Password:</label>
                    {editingField === "password" ? (
                        <>
                            <input
                                type="password"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                            />
                            <button className="back-button" onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <span>{"*".repeat(password.length)}</span>
                            <button className="back-button" onClick={() => handleEditClick("password")}>
                                Change Password
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;

import { useEffect, useState } from "react";
import "../main/Shared.css";
import "../styles/NormSelectionView.css";

// Definicja typu Release odpowiadająca danym z backendu
type Release = {
    releaseId: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    closureDate: string;
};

function ReleasesList() {
    const [releases, setReleases] = useState<Release[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/norms/releases")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data: Release[]) => {
                setReleases(data);
            })
            .catch((error) => {
                console.error("Error fetching releases:", error);
            });
    }, []);

    return (
        <div>
            <h2>All Releases</h2>
            <ul>
                {releases.map((release) => (
                    <li key={release.releaseId}>
                        <strong>{release.name}</strong> ({release.releaseId}) – {release.status}
                        <br />
                        Start: {release.startDate}, End: {release.endDate}, Closed: {release.closureDate}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReleasesList;

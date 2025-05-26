import React, { useEffect, useState } from "react";
import axios from "axios";

export const generatePhotoView = (photoCode: string, baseId: number): React.ReactNode => {
    return <RemoteImage filename={photoCode} baseId={baseId} />;
};

interface Props {
    filename: string;
    baseId: number;
}

const RemoteImage: React.FC<Props> = ({ filename, baseId }) => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/photos/${baseId}/${filename}`,
                    {
                        responseType: "arraybuffer",
                    }
                );

                const base64 = Buffer.from(response.data, "binary").toString("base64");
                setImageData(`data:image/png;base64,${base64}`);
            } catch (err) {
                console.error("Błąd ładowania obrazu:", err);
                setError("Nie udało się załadować obrazu.");
            }
        };

        fetchImage();
    }, [filename, baseId]);

    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!imageData) return <div>Ładowanie obrazka...</div>;

    return <img src={imageData} alt={filename} width={200} height={200} />;
};

import React, { useEffect, useState } from 'react'

interface Props {
    folder: number
    filename: string
}

const PhotoViewer: React.FC<Props> = ({ folder, filename }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/photos/${folder}/${filename}`)

                if (!response.ok) {
                    throw new Error(`Błąd: ${response.status}`)
                }

                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                setImageUrl(url)
            } catch (e: any) {
                setError(e.message)
            }
        }

        fetchImage()
    }, [folder, filename])

    if (error) return <p style={{ color: 'red' }}> {error}</p>
    if (!imageUrl) return <p>Ładowanie zdjęcia...</p>

    return (
        <div>
            <h2>Podgląd zdjęcia:</h2>
            <img src={imageUrl} alt={filename} style={{ maxWidth: '100%' }} />
        </div>
    )
}

export default PhotoViewer

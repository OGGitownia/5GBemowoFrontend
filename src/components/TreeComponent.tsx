import { useEffect, useState } from "react";
import {
    fetchAllReleases,
    fetchFetchBase,
    fetchNormsForReleaseAndSeries,
    fetchSeriesForRelease
} from "../services/NormDataServices.tsx";
import {Release} from "../types/Release.tsx";
import {ReleasePanel} from "./smallerComponents/ReleasesPanel.tsx";
import {Series} from "../types/Series.tsx";
import {SeriesPanel} from "./smallerComponents/SeriesPanel.tsx";
import "../styles/smallComponents/BackButtonTree.css";
import {Norm} from "../types/Norm.tsx";
import NormPanel from "./smallerComponents/NormPanel.tsx";
import BasePanel from "./smallerComponents/BasePanel.tsx";
import {useNavigate} from "react-router-dom";


export default function TreeComponent() {
    const navigate = useNavigate();
    const [releases, setReleases] = useState<Release[]>([]);
    const [series, setSeries] = useState<Series[]>([]);
    const [norms, setNorms] = useState<Norm[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
    const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
    const [selectedNorm, setSelectedNorm] = useState<Norm | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllReleases();
                setReleases(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load releases");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleReleaseClick = async (release: Release) => {
        setLoading(true);
        try {
            const data = await fetchSeriesForRelease(release.releaseId);
            setSeries(data);
            setSelectedRelease(release);
        } catch (err) {
            console.error(err);
            setError("Failed to load series");
        } finally {
            setLoading(false);
        }
    };

    const handleSeriesClick = async (series: Series) => {
        setLoading(true);
        try {
            const data = await fetchNormsForReleaseAndSeries(selectedRelease!.releaseId, series.seriesId);
            setNorms(data);
            setSelectedSeries(series);
        } catch (err) {
            console.error(err);
            setError("Failed to load norms");
        } finally {
            setLoading(false);
        }
    };

    const handleNormClick = async (norm: Norm) => {
        setLoading(true);
        try {
            const data = await fetchFetchBase(selectedRelease!.releaseId, selectedSeries!.seriesId, norm.specNumber);
            setBases(data);
            setSelectedNorm(norm);
        } catch (err) {
            console.error(err);
            setError("Failed to load bases");
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        if (selectedNorm) {
            setSelectedNorm(null);
            setBases([]);
        } else if (selectedSeries) {
            setSelectedSeries(null);
            setNorms([]);
        } else {
            setSelectedRelease(null);
            setSeries([]);
        }
    };

    if (loading) return <div>Loading releases...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tree-container">
            {selectedNorm ? (
                <div className="bases-view">
                    <button className="back-button" onClick={handleBackClick}>
                        ← Back to Norms
                    </button>
                    <h3 className="Title-selection"> Bases for {selectedNorm.title}</h3>
                    <div className="bases-list">
                        {bases.map((base) => (
                            <BasePanel key={base.name} base={base} />
                        ))}
                    </div>
                </div>
            ) : selectedSeries ? (
                <div className="norms-view">
                    <button className="back-button" onClick={handleBackClick}>
                        ← Back to Series
                    </button>
                    <h3 className="Title-selection"> for {selectedSeries.name}</h3>
                    <div className="norms-list">
                        {norms.map((norm) => (
                            <NormPanel
                                key={norm.specNumber}
                                norm={norm}
                                onShowBases={() => handleNormClick(norm)}
                                onAddBase={() => {
                                    if (norm) {
                                        navigate("/add", { state: { norm } });
                                    } else {
                                        console.error("Norma nie jest wybrana!");
                                    }
                                }}
                            />

                        ))}
                    </div>
                </div>
            ) : selectedRelease ? (
                <div className="series-view">
                    <button className="back-button" onClick={handleBackClick}>
                        ← Back to Releases
                    </button>
                    <h3 className="Title-selection">Series for {selectedRelease.name}</h3>
                    <div className="series-list">
                        {series.map((series) => (
                            <SeriesPanel
                                key={series.seriesId}
                                series={series}
                                onClick={() => handleSeriesClick(series)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="releases-list">
                    {releases.map((release) => (
                        <ReleasePanel
                            key={release.releaseId}
                            release={release}
                            onClick={() => handleReleaseClick(release)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

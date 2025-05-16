import "../styles/AboutUsView.css";
import BackButton from "../components/smallerComponents/BackButton.tsx";

const AboutUsView = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <BackButton />
                <h1>About the Crusades</h1>
                <p>An epic series of religious wars during the medieval period.</p>
            </div>

            <div className="about-content">
                <div className="about-section">
                    <h2>What were the Crusades?</h2>
                    <p>
                        The Crusades were a series of religious wars initiated, supported, and sometimes directed
                        by the Latin Church in the medieval period. The most commonly known are the campaigns in
                        the Eastern Mediterranean aimed at recovering the Holy Land from Muslim rule, but they also
                        took place in Europe against paganism and heresy.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Major Crusades</h2>
                    <ul className="crusades-list">
                        <li><strong>First Crusade (1096–1099):</strong> Marked by the capture of Jerusalem in 1099, led primarily by French and German nobles.</li>
                        <li><strong>Second Crusade (1147–1149):</strong> An unsuccessful attempt to reclaim lands taken by Muslim forces.</li>
                        <li><strong>Third Crusade (1189–1192):</strong> Led by Richard the Lionheart, Philip II of France, and Frederick I Barbarossa to recapture Jerusalem.</li>
                        <li><strong>Fourth Crusade (1202–1204):</strong> Deviated from its original mission and ended with the sacking of Constantinople.</li>
                        <li><strong>Children's Crusade (1212):</strong> A disastrous popular crusade by European Christians to regain the Holy Land from Muslims, led by children.</li>
                    </ul>
                </div>

                <div className="about-section">
                    <h2>Legacy and Impact</h2>
                    <p>
                        The Crusades had profound and lasting impacts on both Europe and the Middle East. They led to
                        significant cultural exchanges, military advances, and the expansion of trade routes. Although
                        largely unsuccessful in their primary objective, they reshaped the political landscape of Europe
                        and influenced Christian and Muslim relations for centuries.
                    </p>
                </div>
            </div>

            <div className="about-footer">
                <p>© 2025 Historical Chronicles. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AboutUsView;

import "./Landing.css";

export default function Landing() {
    return (
        <div className="landing">
            <h1>AETHER</h1>

            <p className="subtitle">Enterpriser Intelligent Platform</p>
            <p className="description">Transform your business data into decisions.</p>

            <div className="Buttons">
                <button>Get Started</button>
                <button className="Secondary">Sign In</button>
            </div>
        </div>
    );
}
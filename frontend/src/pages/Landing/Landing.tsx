import { Link } from 'react-router-dom';
import Logo from '../../components/brand/Logo';
import Button from '../../components/ui/Button';
import ChartPlaceholder from '../../components/ui/ChartPlaceholder';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing__glow" aria-hidden="true" />

      <header className="landing__nav">
        <Logo size="md" />
        <div className="landing__nav-actions">
          <Link to="/login" className="landing__nav-link">
            Sign In
          </Link>
          <Link to="/register">
            <Button size="md">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="landing__hero">
        <div className="landing__mark">
          <Logo size="lg" withWordmark={false} />
        </div>

        <p className="landing__eyebrow">Enterprise Intelligence Platform</p>

        <h1 className="landing__title">AETHER</h1>

        <p className="landing__description">
          Transform your business data into decisions.
        </p>

        <div className="landing__actions">
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="landing__preview">
          <div className="landing__preview-glass">
            <div className="landing__preview-row">
              <div className="landing__preview-tile landing__preview-tile--wide">
                <span className="landing__preview-label">Revenue</span>
                <ChartPlaceholder variant="line" />
              </div>
              <div className="landing__preview-tile">
                <span className="landing__preview-label">Retention</span>
                <ChartPlaceholder variant="donut" />
              </div>
            </div>
            <div className="landing__preview-row">
              <div className="landing__preview-tile">
                <span className="landing__preview-label">Pipeline</span>
                <ChartPlaceholder variant="bars" />
              </div>
              <div className="landing__preview-tile">
                <span className="landing__preview-label">Growth</span>
                <ChartPlaceholder variant="line" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

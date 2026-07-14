import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import ChartPlaceholder from '../../components/ui/ChartPlaceholder';
import './Dashboard.css';

const SUMMARY_CARDS = [
  { label: 'Total Revenue', value: '—' },
  { label: 'Active Users', value: '—' },
  { label: 'Conversion Rate', value: '—' },
  { label: 'Open Reports', value: '—' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Dashboard</h1>
            <p className="dashboard__subtitle">
              An overview of your business, once your data is connected.
            </p>
          </div>
        </div>

        <div className="dashboard__summary">
          {SUMMARY_CARDS.map((item) => (
            <div className="dashboard__summary-card" key={item.label}>
              <span className="dashboard__summary-label">{item.label}</span>
              <span className="dashboard__summary-value">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="dashboard__grid">
          <Card
            title="Revenue over time"
            description="Connect a data source to populate this chart."
            className="dashboard__grid-item--wide"
          >
            <ChartPlaceholder variant="line" />
          </Card>
          <Card
            title="Customer retention"
            description="No data yet"
          >
            <ChartPlaceholder variant="donut" />
          </Card>
          <Card
            title="Pipeline by stage"
            description="No data yet"
          >
            <ChartPlaceholder variant="bars" />
          </Card>
          <Card
            title="Recent reports"
            description="Generated reports will appear here."
            className="dashboard__grid-item--wide"
          >
            <div className="dashboard__empty-state">
              <span>No reports yet</span>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

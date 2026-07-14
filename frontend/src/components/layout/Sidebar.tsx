import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../brand/Logo';
import {
  IconGrid,
  IconChart,
  IconBuilding,
  IconDocument,
  IconSettings,
  IconLogout,
  IconChat,
} from './icons';
import { clearToken } from '../../services/api';
import './Sidebar.css';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: IconGrid, to: '/dashboard' },
  { label: 'Analytics', icon: IconChart, to: '/dashboard' },
  { label: 'Companies', icon: IconBuilding, to: '/companies' },
  { label: 'AI Chat', icon: IconChat, to: '/chat' },
  { label: 'Reports', icon: IconDocument, to: '/dashboard' },
  { label: 'Settings', icon: IconSettings, to: '/dashboard' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <Logo size="sm" />
      </div>

      <nav className="sidebar__nav">
        <ul>
          {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
            <li key={label}>
              <Link
                to={to}
                className={`sidebar__item ${location.pathname === to ? 'sidebar__item--active' : ''}`}
              >
                <Icon className="sidebar__icon" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__bottom">
        <button type="button" className="sidebar__item sidebar__item--logout" onClick={handleLogout}>
          <IconLogout className="sidebar__icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

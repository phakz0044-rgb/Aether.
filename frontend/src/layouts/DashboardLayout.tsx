import type { ReactNode } from 'react';
import Sidebar from '../components/layout/Sidebar';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-layout__main">{children}</main>
    </div>
  );
}

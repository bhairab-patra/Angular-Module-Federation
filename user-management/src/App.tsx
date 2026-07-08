import React from 'react';
import { BrowserRouter, MemoryRouter, NavLink, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import RolesPage from './pages/RolesPage';
import PermissionsPage from './pages/PermissionsPage';

interface AppProps {
  routerMode?:  'browser' | 'memory';
  initialPath?: string;
}

export default function App({ routerMode = 'browser', initialPath = '/user-management' }: AppProps) {
  const Router = routerMode === 'memory' ? MemoryRouter : BrowserRouter;
  const routerProps = routerMode === 'memory' ? { initialEntries: [initialPath] } : {};

  return (
    <Router {...routerProps}>
      <div className="um-shell">
        {/* ── Header ── */}
        <div className="um-header">
          <div className="um-header-left">
            <span className="um-header-icon">👤</span>
            <h2 className="um-header-title">User Management</h2>
            {routerMode === 'memory' && (
              <span className="um-remote-badge">Remote</span>
            )}
          </div>
          <nav className="um-tabs">
            <NavLink to="/user-management" className={({ isActive }) => isActive ? 'um-tab um-tab--active' : 'um-tab'}>
              👤 Users
            </NavLink>
            <NavLink to="/roles-management" className={({ isActive }) => isActive ? 'um-tab um-tab--active' : 'um-tab'}>
              🎭 Roles
            </NavLink>
            <NavLink to="/permissions-management" className={({ isActive }) => isActive ? 'um-tab um-tab--active' : 'um-tab'}>
              🔐 Permissions
            </NavLink>
          </nav>
        </div>

        {/* ── Page content ── */}
        <div className="um-body">
          <Routes>
            <Route path="/user-management"       element={<UsersPage />} />
            <Route path="/roles-management"       element={<RolesPage />} />
            <Route path="/permissions-management" element={<PermissionsPage />} />
            <Route path="*"            element={<UsersPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

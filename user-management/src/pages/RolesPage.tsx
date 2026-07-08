import React from 'react';

interface Role {
  id: number;
  name: string;
  description: string;
  users: number;
  permissions: number;
  color: string;
}

const MOCK_ROLES: Role[] = [
  { id: 1, name: 'Admin', description: 'Full system access — can manage all resources', users: 3, permissions: 48, color: '#7c3aed' },
  { id: 2, name: 'Manager', description: 'Team management and reporting access', users: 8, permissions: 24, color: '#2563eb' },
  { id: 3, name: 'Developer', description: 'Development tools and API access', users: 15, permissions: 18, color: '#0891b2' }

];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export default function RolesPage() {
  return (
    <div className="um-page">


      <div className="um-card-grid">
        {MOCK_ROLES.map(role => (
          <div key={role.id} className="um-role-card">
            <div className="um-role-header">
              <span
                className="um-role-avatar"
                style={{ background: role.color }}
              >
                {initials(role.name)}
              </span>
              <div>
                <div className="um-role-name">{role.name}</div>
                <div className="um-text-muted" style={{ fontSize: 12 }}>
                  {role.permissions} permissions
                </div>
              </div>
            </div>

            <p className="um-role-desc">{role.description}</p>

            <div className="um-role-stats">
              <span>👤 {role.users} users</span>
              <span>🔐 {role.permissions} perms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

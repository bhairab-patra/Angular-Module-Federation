import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  initials: string;
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Arjun Sharma',  email: 'arjun@solifi.com',  role: 'Admin',     status: 'Active',   initials: 'AS' },
  { id: 2, name: 'Priya Patel',   email: 'priya@solifi.com',  role: 'Manager',   status: 'Active',   initials: 'PP' },
  { id: 3, name: 'Ravi Kumar',    email: 'ravi@solifi.com',   role: 'Developer', status: 'Inactive', initials: 'RK' },
];

export default function UsersPage() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="um-page">
      {/* ── Toolbar ── */}
 

      {/* ── Table ── */}
      <div className="um-card">
        <table className="um-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
 
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="um-user-cell">
                    <span className="um-avatar">{user.initials}</span>
                    <span className="um-user-name">{user.name}</span>
                  </div>
                </td>
                <td className="um-text-muted">{user.email}</td>
                <td><span className="um-badge">{user.role}</span></td>
                <td>
                  <span className={`um-status um-status--${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
    
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="um-empty">No users match your search.</div>
        )}
      </div>
    </div>
  );
}

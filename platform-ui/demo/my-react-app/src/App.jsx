import { useRef, useEffect, useState } from 'react'
import './App.css'

const NAV_GROUPS = [
  {
    id: 'overview', label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', route: '/dashboard',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
      { id: 'analytics', label: 'Analytics & Reports', badge: 'New', badgeVariant: 'success', route: '/analytics',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
    ],
  },
  {
    id: 'management', label: 'Management',
    items: [
      { id: 'users', label: 'Users & Permissions', badge: 12, badgeVariant: 'warning', route: '/users',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        children: [
          { id: 'users-list',   label: 'All Users',          route: '/users/list' },
          { id: 'users-roles',  label: 'Roles & Permissions',route: '/users/roles' },
          { id: 'users-invite', label: 'Invite Members',     route: '/users/invite' },
        ],
      },
      { id: 'products', label: 'Products', route: '/products',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>' },
      { id: 'orders', label: 'Orders', badge: 3, badgeVariant: 'danger', route: '/orders',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
    ],
  },
  {
    id: 'settings', label: 'Settings',
    items: [
      { id: 'settings', label: 'General Settings', route: '/settings',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3"/></svg>' },
      { id: 'help', label: 'Help & Docs', route: '/help', dividerAfter: false,
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
    ],
  },
]

const MENU_ITEMS = [
  { label: 'My Profile',  action: 'profile',  icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21a9 9 0 0 1 18 0"/></svg>' },
  { label: 'Settings',    action: 'settings', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3"/></svg>' },
  { label: 'Sign Out',    action: 'logout', danger: true, icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' },
]

const PAGE_CONTENT = {
  dashboard:    { title: 'Dashboard',           desc: 'Overview of your key metrics.' },
  analytics:    { title: 'Analytics & Reports', desc: 'Insights and trend data.' },
  users:        { title: 'Users & Permissions', desc: 'Manage team members and access.' },
  'users-list': { title: 'All Users',           desc: 'Full list of registered users.' },
  'users-roles':{ title: 'Roles & Permissions', desc: 'Define roles and access levels.' },
  'users-invite':{ title: 'Invite Members',     desc: 'Send invitations to new members.' },
  products:     { title: 'Products',            desc: 'Your product catalogue.' },
  orders:       { title: 'Orders',              desc: 'Track and manage orders.' },
  settings:     { title: 'General Settings',    desc: 'Configure application settings.' },
  help:         { title: 'Help & Docs',         desc: 'Documentation and support.' },
}

function App() {
  const shellRef = useRef(null)
  const [activeId, setActiveId] = useState('dashboard')

  useEffect(() => {
    const el = shellRef.current
    if (!el) return

    // Arrays/objects must be set as JS properties
    el.groups          = NAV_GROUPS
    el.headerMenuItems = MENU_ITEMS

    const onNav    = (e) => setActiveId(e.detail.id)
    const onAction = (e) => console.log('menu action:', e.detail)
    const onHelp   = ()  => console.log('help clicked')

    el.addEventListener('itemSelect',       onNav)
    el.addEventListener('headerMenuAction', onAction)
    el.addEventListener('headerHelpClick',  onHelp)

    return () => {
      el.removeEventListener('itemSelect',       onNav)
      el.removeEventListener('headerMenuAction', onAction)
      el.removeEventListener('headerHelpClick',  onHelp)
    }
  }, [])

  const page = PAGE_CONTENT[activeId] || { title: activeId, desc: '' }

  return (
    <pui-lib-app-shell
      ref={shellRef}
      app-title="Admin Portal"
      app-subtitle="Platform Management"
      header-bg-color="#12C6A8"
      header-user-name="Bhairab Patra"
      header-user-email="bpatra@solifi.com"
      header-greeting="Hi"
      header-user-subtext="Welcome back!"
      header-show-help="true"
      sidebar-bg-color="#0f172a"
      sidebar-text-color="#94a3b8"
      sidebar-active-color="#12C6A8"
      active-id={activeId}
      style={{ display: 'block', height: '100vh' }}
    >
      <div style={{ padding: '32px 36px', background: '#f8fafc', minHeight: '100%', boxSizing: 'border-box' }}>
        
       
      </div>
    </pui-lib-app-shell>
  )
}

export default App

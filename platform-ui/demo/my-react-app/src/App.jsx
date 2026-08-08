import { useRef, useEffect, useState, Fragment } from 'react'
import './App.css'

function App() {
  const ref = useRef(null);

  const variantMap = {
    active: 'success',
    pending: 'warning',
    error: 'danger',
    info: 'info',
  };

  const COLUMNS = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status', label: 'Status', type: 'badge',
      badgeMap: {
        Active: { color: '#10b981' },
        Inactive: { color: '#6b7280' },
      }
    },
    { key: 'salary', label: 'Salary', align: 'right', type: 'currency' },
  ];

  const DATA = [
    { name: 'Bhairab', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'pri', role: 'Designer', status: 'Inactive', salary: 85000 },
     { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'priyanka', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 }, { name: 'Alice', role: 'Engineer', status: 'Active', salary: 95000 },
    { name: 'Bob', role: 'Designer', status: 'Inactive', salary: 85000 },
  ];

  const STATUS_VARIANT = {
  delivered: 'success', cancelled: 'danger',
  transit: 'warning',   processing: 'info',
};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arrays/objects → set as JS properties
    el.menuItems = [
      { label: 'Profile', action: 'profile' },
      { label: 'Settings', action: 'settings' },
      { label: 'Sign out', action: 'signout', danger: true },
    ];

    // Events → addEventListener
    const onAction = (e) => console.log('action:', e.detail);
    const onHelp = () => console.log('help clicked');
    el.addEventListener('menuAction', onAction);
    el.addEventListener('helpClick', onHelp);
    return () => {
      el.removeEventListener('menuAction', onAction);
      el.removeEventListener('helpClick', onHelp);
    };
  }, []);


  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Arrays → JS property (or use JSON string attribute below)
    el.suggestions = [
      { label: 'Button', value: 'button', category: 'Forms' },
      { label: 'Modal', value: 'modal', category: 'Components' },
    ];
    el.recentSearches = ['Button', 'Modal'];

    const onSearch = (e) => console.log('search:', e.detail);
    const onSelect = (e) => console.log('selected:', e.detail);
    el.addEventListener('searchChange', onSearch);
    el.addEventListener('suggestionSelected', onSelect);
    return () => {
      el.removeEventListener('searchChange', onSearch);
      el.removeEventListener('suggestionSelected', onSelect);
    };
  }, []);


  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.columns = COLUMNS;       // JS property — array
    el.data = DATA;          // JS property — array
    el.searchable = true;
    el.sortable = true;
    el.paginated = true;
    el.pageSize = 10;
    el.striped = true;
    el.selectable = true;

    const onRow = (e) => console.log('Row:', e.detail);
    el.addEventListener('rowClick', onRow);
    return () => el.removeEventListener('rowClick', onRow);
  }, []);


  return (
    <Fragment>
      <pui-lib-header
        ref={ref}
        app-title="Admin Portal"
        app-subtitle="PLATFORM MANAGEMENT"
        bg-color="#12C6A8"
        logo-url="/assets/hero.png"
        badge=''
        show-help="true"
        user-name="Bhairab Patra"
        user-email="bpatra@solifi.com"
        greeting="Hi"
        user-subtext="Welcome back!">
      </pui-lib-header>

      <pui-lib-button variant="primary" size="sm">Click</pui-lib-button>
      <pui-lib-search
        ref={ref}
        placeholder="Search…"
        shortcut="⌘K"
        debounce="300"
        min-chars="1"
        clearable="true"
      />
      <pui-lib-badge variant="primary" size="md">
        info
      </pui-lib-badge>


     
        <pui-lib-tag variant={STATUS_VARIANT[status] ?? 'default'}>
      {status}
    </pui-lib-tag>

    </Fragment >
  );
}

export default App

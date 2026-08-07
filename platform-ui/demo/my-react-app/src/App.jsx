import { useRef, useEffect, useState, Fragment } from 'react'
import './App.css'

function App() {
  const ref = useRef(null);

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
      { label: 'Modal',  value: 'modal',  category: 'Components' },
    ];
    el.recentSearches = ['Button', 'Modal'];

    const onSearch = (e) => console.log('search:', e.detail);
    const onSelect = (e) => console.log('selected:', e.detail);
    el.addEventListener('searchChange',       onSearch);
    el.addEventListener('suggestionSelected', onSelect);
    return () => {
      el.removeEventListener('searchChange',       onSearch);
      el.removeEventListener('suggestionSelected', onSelect);
    };
  }, []);

  return (
    <Fragment>
      <pui-header
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
      </pui-header>

      <pui-button variant="primary" size="sm">Click</pui-button>
   <pui-search
      ref={ref}
      placeholder="Search…"
      shortcut="⌘K"
      debounce="300"
      min-chars="1"
      clearable="true"
    />
      
   </Fragment >
  );
}

export default App

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';

let root: ReactDOM.Root | null = null;

// Called by Angular admin-hub wrapper component via loadRemoteModule.
// initialPath maps the Angular child route to a React internal route.
export function mount(element: HTMLElement, initialPath = '/user-management'): void {
  injectRemoteStyles();
  root = ReactDOM.createRoot(element);
  root.render(<App routerMode="memory" initialPath={initialPath} />);
}

export function unmount(): void {
  root?.unmount();
  root = null;
}

function injectRemoteStyles(): void {
  addLink('um-styles', 'http://localhost:4203/styles.css');
}

function addLink(id: string, href: string): void {
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id   = id;
  link.rel  = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

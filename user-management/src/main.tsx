import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Standalone entry point — used when running app directly at localhost:4203
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App routerMode="browser" />
  </React.StrictMode>
);

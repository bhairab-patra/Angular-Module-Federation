import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Register all pui-* web components before React renders
import '@bhairab-patra/platform-ui/elements';
import '@bhairab-patra/platform-ui/elements/styles.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode removed: Angular Elements (Shadow DOM) does not support double-mount
customElements.whenDefined('pui-lib-button').then(() => {
  createRoot(document.getElementById('root')).render(<App />)
})

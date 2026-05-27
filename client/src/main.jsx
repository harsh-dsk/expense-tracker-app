import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function hideAppLoader() {
  const loader = document.getElementById('app-loader')
  if (!loader) return

  loader.classList.add('is-hidden')
  window.setTimeout(() => loader.remove(), 220)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

hideAppLoader()

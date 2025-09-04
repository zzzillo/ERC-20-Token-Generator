import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'   // 👈 must be imported here
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

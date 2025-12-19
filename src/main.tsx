import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/ipados-design-system.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

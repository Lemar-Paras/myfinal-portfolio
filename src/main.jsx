import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/interactions.css'
import './styles/content.css'
import './styles/navigation.css'
import './styles/about.css'
import './styles/skills.css'
import './styles/projects.css'
import './styles/experience.css'
import './styles/contact.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

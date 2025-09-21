import Home from './pages/Home'
import OrganiserRegistrations from './pages/OrganiserRegistrations'

export default function App() {
  // Minimal, dependency-free routing for a hidden organiser page.
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path === '/organiser/registrations') {
    return <OrganiserRegistrations />
  }
  return <Home />
}
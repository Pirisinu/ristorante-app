import { Routes, Route } from 'react-router-dom'
import SiteNavbar from './components/SiteNavbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Contatti from './pages/Contatti.jsx'
import Galleria from './pages/Galleria.jsx'
import Login from './pages/Login.jsx'
import AreaPersonale from './pages/loggedSections/AreaPersonale.jsx'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteNavbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/galleria" element={<Galleria />} />
          <Route path="/accedi" element={<Login />} />
          <Route path="/gestione" element={<AreaPersonale />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import SiteNavbar from './components/SiteNavbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Contatti from './pages/Contatti.jsx'
import Galleria from './pages/Galleria.jsx'
import Vini from './pages/Vini.jsx'
import Login from './pages/Login.jsx'
import AreaPersonale from './pages/loggedSections/AreaPersonale.jsx'
import AdminContatti from './pages/loggedSections/AdminContatti.jsx'
import AdminBanner from './pages/loggedSections/AdminBanner.jsx'
import AdminPrenotazioni from './pages/loggedSections/AdminPrenotazioni.jsx'
import PublicNotice from './components/PublicNotice.jsx'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteNavbar />
      <PublicNotice />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/galleria" element={<Galleria />} />
          <Route path="/vini" element={<Vini />} />
          <Route path="/accedi" element={<Login />} />
          <Route path="/gestione" element={<AreaPersonale />} />
          <Route path="/gestione/contatti" element={<AdminContatti />} />
          <Route path="/gestione/banner" element={<AdminBanner />} />
          <Route path="/gestione/prenotazioni" element={<AdminPrenotazioni />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

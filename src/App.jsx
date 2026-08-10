import { Routes, Route } from 'react-router-dom'
import SiteNavbar from './components/SiteNavbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Contatti from './pages/Contatti.jsx'
import Galleria from './pages/Galleria.jsx'

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
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

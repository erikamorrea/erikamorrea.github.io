import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Work />} />
            <Route path="/work" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </SmoothScroll>
    </>
  )
}

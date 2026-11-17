import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const isWork = pathname === '/'

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <Link to="/" className={styles.logo}>E.M.</Link>
      {isWork && (
        <Link to="/" className={styles.center}>Erika Morrea</Link>
      )}
      <ul className={styles.links}>
        <li>
          <Link to="/work" className={pathname === '/work' ? styles.active : ''}>
            Work
          </Link>
        </li>
        <li>
          <Link to="/contact" className={pathname === '/contact' ? styles.active : ''}>
            Contact
          </Link>
        </li>
      </ul>
    </motion.nav>
  )
}

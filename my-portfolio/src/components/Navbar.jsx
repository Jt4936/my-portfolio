import { motion } from 'framer-motion'
import './Navbar.css'

const links = [
  { label: 'About', idx: 1 },
  { label: 'Work', idx: 2 },
  { label: 'Skills', idx: 3 },
  { label: 'Contact', idx: 4 },
]

export default function Navbar({ activePage, goTo }) {
  return (
    <motion.nav
      className={`navbar ${activePage > 0 ? 'scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="nav-logo" onClick={() => goTo(0)}>
        JH<span>.</span>
      </div>
      <div className="nav-links">
        {links.map((l, i) => (
          <motion.button
            key={l.label}
            className={`nav-link ${activePage === l.idx ? 'nav-link-active' : ''}`}
            onClick={() => goTo(l.idx)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            {l.label}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  )
}

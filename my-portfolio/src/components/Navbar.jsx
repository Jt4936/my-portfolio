import { motion } from 'framer-motion'
import { useLang } from '../i18n'
import LangToggle from './LangToggle'
import './Navbar.css'

export default function Navbar({ activePage, goTo }) {
  const { t } = useLang()
  const links = [
    { label: t.nav.about, idx: 1 },
    { label: t.nav.work, idx: 2 },
    { label: t.nav.skills, idx: 3 },
    { label: t.nav.contact, idx: 4 },
  ]

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
      <div className="nav-right">
        <div className="nav-links">
          {links.map((l, i) => (
            <motion.button
              key={l.idx}
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
        <LangToggle />
      </div>
    </motion.nav>
  )
}

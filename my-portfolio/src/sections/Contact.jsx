import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n'
import './Contact.css'

const ROWS = [
  { label: 'MAIL', value: 'hujintao12@126.com', href: 'mailto:hujintao12@126.com' },
  { label: 'TEL', value: '+86 150 7250 5930', href: 'tel:+8615072505930' },
  { label: 'GIT', value: 'github.com/Jt4936', href: 'https://github.com/Jt4936' },
  { label: 'IN', value: 'linkedin.com/in/jintao-hu', href: 'https://www.linkedin.com/in/jintao-hu-7014643a6' },
]

export default function Contact({ isActive }) {
  const { t } = useLang()
  const [show, setShow] = useState(false)
  const [typed, setTyped] = useState('')
  const signal = t.contact.signal

  useEffect(() => {
    if (!isActive) { setShow(false); setTyped(''); return }
    const id = setTimeout(() => setShow(true), 700)
    return () => clearTimeout(id)
  }, [isActive])

  // typewriter on the signal line once the panel arrives
  useEffect(() => {
    if (!show) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(signal.slice(0, i))
      if (i >= signal.length) clearInterval(id)
    }, 42)
    return () => clearInterval(id)
  }, [show, signal])

  return (
    <section id="contact" className="contact">
      {/* break-through-clouds flash on arrival */}
      <AnimatePresence>
        {isActive && (
          <motion.div className="cloud-flash"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.3, 1], delay: 0.55 }} />
        )}
      </AnimatePresence>

      {/* dark cosmic backdrop */}
      <div className="contact-bg">
        <div className="contact-bg-overlay" />
        <div className="contact-atmosphere" />
      </div>

      <AnimatePresence>
        {show && (
          <motion.div className="contact-hud"
            initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="hud-corner tl" /><span className="hud-corner tr" />
            <span className="hud-corner bl" /><span className="hud-corner br" />

            <div className="hud-signal">
              <span className="beacon" />
              <span className="hud-signal-text">{typed}</span>
              <span className="caret">▮</span>
            </div>

            <div className="section-tag">{t.contact.tag}</div>
            <h2 className="contact-title">
              {t.contact.titleLine1}<br /><span>{t.contact.titleLine2}</span>
            </h2>
            <p className="contact-sub">{t.contact.sub}</p>

            <div className="hud-status"><span className="dot" />{t.contact.open}</div>

            <div className="hud-rows">
              {ROWS.map((r, i) => (
                <motion.a key={r.label} className="hud-row"
                  href={r.href}
                  target={r.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.5 }}>
                  <span className="hud-row-label">{r.label}</span>
                  <span className="hud-row-value">{r.value}</span>
                  <span className="hud-row-arrow">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {show && (
        <motion.div className="contact-footer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <span>© 2026 Jintao Hu</span>
          <span>{t.contact.footerBuilt}</span>
        </motion.div>
      )}
    </section>
  )
}

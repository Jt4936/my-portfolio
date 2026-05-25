import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './Contact.css'

export default function Contact({ isActive }) {
  const ref = useRef(null)
  const [landed, setLanded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Phase 1: dive starts immediately (handled by ParticleField camera)
      // Phase 2: after 0.8s flash, photo appears
      const t1 = setTimeout(() => setLanded(true), 800)
      // Phase 3: after 1.4s content fades in
      const t2 = setTimeout(() => setShowContent(true), 1400)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    } else {
      setLanded(false)
      setShowContent(false)
    }
  }, [isActive])

  return (
    <section id="contact" className="contact" ref={ref}>

      {/* Flash overlay — simulates breaking through clouds */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="cloud-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.3, 1], delay: 0.55 }}
          />
        )}
      </AnimatePresence>

      {/* Full-screen background photo */}
      <motion.div
        className="contact-bg"
        initial={{ opacity: 0, scale: 1.15, filter: 'blur(18px)' }}
        animate={landed
          ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
          : { opacity: 0, scale: 1.15, filter: 'blur(18px)' }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/photo-outdoor.jpg" alt="Jintao Hu" className="contact-bg-img" />
        {/* Dark gradient overlay so text is readable */}
        <div className="contact-bg-overlay" />
        {/* Atmospheric particles */}
        <div className="contact-atmosphere" />
      </motion.div>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="contact-inner"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="contact-left">
              <div className="section-tag">// Get In Touch</div>
              <h2 className="contact-title">
                Let's Build<br/>
                <span>Something Together</span>
              </h2>
              <p className="contact-sub">
                I'm currently open to new opportunities. Whether you have
                a project in mind or just want to say hello — reach out anytime.
              </p>
              <div className="contact-details">
                <a href="mailto:hujintao12@126.com" className="contact-email">
                  hujintao12@126.com
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="contact-phone">+86 150 7250 5930</div>
              </div>
              <div className="contact-links">
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {showContent && (
        <motion.div
          className="contact-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span>© 2024 Jintao Hu</span>
          <span>Built with React + Three.js</span>
        </motion.div>
      )}
    </section>
  )
}

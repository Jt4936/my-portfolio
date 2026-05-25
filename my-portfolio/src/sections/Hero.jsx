import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <motion.div
          className="section-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          // Frontend Developer & Creative Coder
        </motion.div>

        <div className="hero-name-wrap">
          {['Jintao', 'Hu'].map((word, i) => (
            <div key={word} className="hero-name-line" style={{ overflow: 'hidden' }}>
              <motion.h1
                className="hero-name"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.55 + i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          I craft immersive web experiences that live at the intersection of code and visual design.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <button
            className="btn-primary"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </button>
        </motion.div>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>

      <motion.div
        className="hero-counter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        01 / 05 — Home
      </motion.div>
    </section>
  )
}

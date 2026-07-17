import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n'
import './About.css'

export default function About() {
  const { t } = useLang()
  const stats = t.about.stats
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-inner">
        <div className="about-left">
          <motion.div className="section-tag"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.6}}>
            {t.about.tag}
          </motion.div>

          <motion.h2 className="about-title"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
            transition={{duration:0.7,delay:0.1}}>
            {t.about.titleLine1}<br/><span>{t.about.titleLine2}</span>
          </motion.h2>

          <motion.p className="about-body"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.7,delay:0.2}}>
            {t.about.body1}
          </motion.p>

          <motion.p className="about-body"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.7,delay:0.3}}>
            {t.about.body2}
          </motion.p>

          <motion.div className="about-edu"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.7,delay:0.4}}>
            {t.about.edu.map((e) => (
              <div className="edu-item" key={e.degree}>
                <span className="edu-degree">{e.degree}</span>
                <span className="edu-school">{e.school}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="about-right">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="stat-card"
                animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
                transition={{duration:0.6,delay:0.2+i*0.1}}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label" style={{whiteSpace:'pre-line'}}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

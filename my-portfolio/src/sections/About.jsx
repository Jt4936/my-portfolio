import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const stats = [
  { num: 'UTS', label: 'Master of IT\nInteractive Design' },
  { num: '4+', label: 'Years of Design\nExperience' },
  { num: '8+', label: 'Projects\nCompleted' },
  { num: '2026', label: 'Graduated\nMay 2026' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-inner">
        <div className="about-left">
          <motion.div className="section-tag"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.6}}>
            // About Me
          </motion.div>

          <motion.h2 className="about-title"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
            transition={{duration:0.7,delay:0.1}}>
            Design meets<br/><span>Technology</span>
          </motion.h2>

          <motion.p className="about-body"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.7,delay:0.2}}>
            Hi, I'm Jintao — a freshly graduated Master of Information Technology (Interactive Design) from UTS Sydney, Class of May 2026. My journey spans from Computer Science foundations at UC Santa Cruz to specialising in UX/UI design and front-end development.
          </motion.p>

          <motion.p className="about-body"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.7,delay:0.3}}>
            I bridge the gap between design thinking and technical implementation — crafting high-fidelity prototypes in Figma, building interactive web experiences, and developing games in Unity and Unreal Engine 5. I'm passionate about creating digital experiences that feel both intuitive and visually striking.
          </motion.p>

          <motion.div className="about-edu"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
            transition={{duration:0.7,delay:0.4}}>
            <div className="edu-item">
              <span className="edu-degree">Master of IT · Interactive Design</span>
              <span className="edu-school">University of Technology Sydney · 2026</span>
            </div>
            <div className="edu-item">
              <span className="edu-degree">Bachelor of IT · Interactive Design</span>
              <span className="edu-school">University of Technology Sydney · 2024</span>
            </div>
            <div className="edu-item">
              <span className="edu-degree">Computer Science</span>
              <span className="edu-school">UC Santa Cruz · 2019–2020</span>
            </div>
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

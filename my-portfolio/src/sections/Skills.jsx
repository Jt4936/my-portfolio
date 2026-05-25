import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Skills.css'

const skillGroups = [
  {
    category: 'Design & Prototyping',
    skills: ['Figma', 'UX Research', 'UI Design', 'Interaction Design', 'Usability Testing', 'Design Thinking'],
  },
  {
    category: 'Frontend Development',
    skills: ['HTML / CSS / JS', 'React', 'Three.js', 'Framer Motion', 'GSAP', 'p5.js / Processing'],
  },
  {
    category: 'Game Development',
    skills: ['Unity (C#)', 'Unreal Engine 5', '2D / 3D Games', 'Immersive Storytelling', 'Game UI Design'],
  },
  {
    category: 'Creative & Technical',
    skills: ['SwiftUI / iOS', 'Data Visualization', 'Arduino', 'Wearable Computing', 'Service Design', 'Git'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.div className="skills-header"
        animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
        transition={{duration:0.7}}>
        <div className="section-tag">// Tech Stack</div>
        <h2 className="skills-title">What I Work With</h2>
      </motion.div>

      <div className="skills-grid">
        {skillGroups.map((group, gi) => (
          <motion.div key={group.category} className="skill-group"
            animate={inView?{opacity:1,y:0}:{opacity:0,y:40}}
            transition={{duration:0.7,delay:0.15+gi*0.12}}>
            <div className="skill-category">{group.category}</div>
            <div className="skill-pills">
              {group.skills.map((s, si) => (
                <motion.span key={s} className="skill-pill"
                  animate={inView?{opacity:1,scale:1}:{opacity:0,scale:0.85}}
                  transition={{duration:0.4,delay:0.3+gi*0.1+si*0.04}}>
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

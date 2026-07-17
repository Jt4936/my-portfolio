import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n'
import './Skills.css'

export default function Skills() {
  const { t } = useLang()
  const skillGroups = t.skills.groups
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.div className="skills-header"
        animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
        transition={{duration:0.7}}>
        <div className="section-tag">{t.skills.tag}</div>
        <h2 className="skills-title">{t.skills.title}</h2>
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

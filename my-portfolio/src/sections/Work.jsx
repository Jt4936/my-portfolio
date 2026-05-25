import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Work.css'

const featured = [
  { num:'01', title:'MoodWave',       desc:'AI emotional music companion for graduates. Three-phase emotional arc: Hold, Release, Lift.', tags:['Figma','UX Research','AI'],    color:'#9966ff', projectId:1 },
  { num:'02', title:'ArtistExposure', desc:'SwiftUI iOS platform for emerging artist discovery with media boards and highlight reels.',   tags:['SwiftUI','iOS','Swift'],       color:'#ff6644', projectId:4 },
  { num:'03', title:'Beach Safety',   desc:'Real-time coastal safety app with shark alerts, rip currents and UV index for Sydney beaches.',tags:['Figma','UI Design','Mobile'], color:'#44aaff', projectId:5 },
  { num:'04', title:'Gaming Voice Box',desc:'In-game voice companion with character selection and real-time voice customisation.',        tags:['Figma','Game UI','Mobile'],    color:'#ff4488', projectId:6 },
]

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  const openProject = (projectId) => {
    navigate(`/projects?open=${projectId}`)
  }

  return (
    <section id="work" className="work" ref={ref}>
      <motion.div className="work-header"
        animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
        transition={{duration:0.7}}>
        <div className="section-tag">// Selected Work</div>
        <h2 className="work-title">Things I've Built</h2>
      </motion.div>

      <div className="projects-list">
        {featured.map((p,i)=>(
          <motion.div key={p.num} className="project-row"
            style={{'--accent-color':p.color}}
            animate={inView?{opacity:1,x:0}:{opacity:0,x:-40}}
            transition={{duration:0.7,delay:i*0.1}}
            onClick={()=>openProject(p.projectId)}
          >
            <div className="project-num">{p.num}</div>
            <div className="project-info">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t=><span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="project-arrow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="work-footer"
        animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
        transition={{duration:0.7,delay:0.5}}>
        <button className="view-all-btn" onClick={()=>navigate('/projects')}>
          View All Projects
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="work-count">8 projects total</span>
      </motion.div>
    </section>
  )
}

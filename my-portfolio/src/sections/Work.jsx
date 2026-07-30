import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n'
import { games, gameList } from '../games'
import './Work.css'

export default function Work() {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  const featured = gameList.map((slug, i) => {
    const g = games[slug]
    return {
      num: String(i + 1).padStart(2, '0'),
      slug,
      title: lang === 'zh' ? g.titleZh : g.title,
      desc: g.subtitle[lang] ?? g.subtitle.zh,
      tags: lang === 'zh' ? g.tags : g.tagsEn,
      color: g.accent,
    }
  })

  return (
    <section id="work" className="work" ref={ref}>
      <motion.div className="work-header"
        animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
        transition={{duration:0.7}}>
        <div className="work-header-left">
          <div className="section-tag">{t.work.tag}</div>
          <h2 className="work-title">{t.work.title}</h2>
        </div>
        <button className="work-more" onClick={()=>navigate('/projects', { state:{ from:'home' } })}>
          <span className="work-more-label">{t.work.more}</span>
          <span className="work-more-count">{t.work.count}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </motion.div>

      <div className="projects-list">
        {featured.map((p,i)=>(
          <motion.div key={p.slug} className="project-row"
            style={{'--accent-color':p.color}}
            animate={inView?{opacity:1,x:0}:{opacity:0,x:-40}}
            transition={{duration:0.7,delay:i*0.1}}
            onClick={()=>navigate(`/game/${p.slug}`, { state:{ from:'home' } })}
          >
            <div className="project-num">{p.num}</div>
            <div className="project-info">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t=><span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="project-cta">
              <span>{t.work.cta}</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}

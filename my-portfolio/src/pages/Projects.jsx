import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomCursor from '../components/CustomCursor'
import './Projects.css'

const categories = ['All', 'UTS Projects', 'Personal Projects', 'Frontend', 'Game']

const projects = [
  { id:1, title:'MoodWave',         subtitle:'AI Emotional Music Companion',  category:'UTS Projects',      type:['Frontend'], tags:['Figma','UX Research','AI Design'], desc:'An emotionally adaptive AI music companion for recent graduates experiencing unemployment. Guides users through a three-phase emotional arc: Hold, Release, Lift.', images:['/projects/moodwave-2.png','/projects/moodwave-1.png'], color:'#9966ff', links:{demo:'https://youtu.be/MhjPBsx6Ey4'}, year:'2026', role:'UI/UX Designer' },
  { id:2, title:'OnTrack',          subtitle:'Smart Commute Planner',         category:'UTS Projects',      type:['Frontend'], tags:['Figma','UX Design','Transport'],   desc:'A commute planning app with smart notifications, transport mode selection, and schedule management for daily Sydney commuters.',                               images:['/projects/ontrack.png'],                              color:'#44ddaa', links:{},                                          year:'2025', role:'UI/UX Designer' },
  { id:3, title:'TripView Redesign',subtitle:'Sydney Transit App Redesign',   category:'UTS Projects',      type:['Frontend'], tags:['Figma','Redesign','Transit'],      desc:'A dark-themed redesign of the TripView Sydney train app with improved route visualization, real-time carriage availability, and accessibility-focused layout.',   images:['/projects/tripview.png'],                             color:'#ffaa44', links:{},                                          year:'2025', role:'UI/UX Designer' },
  { id:4, title:'ArtistExposure',   subtitle:'Artist Discovery Platform',     category:'Personal Projects', type:['Frontend'], tags:['SwiftUI','iOS','Swift'],           desc:'A SwiftUI iOS app for artist discovery. Features artist profiles, media boards, highlight reels, and story-based content discovery for emerging creators.',       images:['/projects/artist-exposure.png'],                      color:'#ff6644', links:{github:'https://github.com/Jt4936/ArtistExposureFirstPrototype'}, year:'2026', role:'iOS Developer' },
  { id:5, title:'Beach Safety',     subtitle:'Coastal Safety Companion',      category:'UTS Projects',      type:['Frontend'], tags:['Figma','UI Design','Mobile'],      desc:'Real-time beach safety app showing shark activity, rip currents, UV index and water quality for Sydney beaches with live safety scores and alerts.',            images:['/projects/beach-2.png','/projects/beach-1.png'],     color:'#44aaff', links:{},                                          year:'2025', role:'UI/UX Designer' },
  { id:9, title:'Farming',          subtitle:'Low-poly Farm & Dungeon RPG',     category:'Personal Projects', type:['Game'],     tags:['Unity','C#','Game Design'],        desc:'A Unity 3D low-poly farming RPG with village management, dungeon exploration, tool wheel, weather system and stamina framework. Farm, trade, build NPC relationships and unlock underground dungeons.', images:['/projects/farming.png'], color:'#66cc44', links:{github:'https://github.com/Jt4936/Farming-'}, year:'2025', role:'Game Developer' },
  { id:11, title:'ODD JOBS: Full Bloom!', subtitle:'2D Florist Simulation Game',      category:'UTS Projects',      type:['Game'],     tags:['Unity','2D','Game Design Studio'], desc:'A fast-paced 2D simulation game where you juggle quirky part-time jobs to earn rent. Play as a florist — serve customers, remember orders, water and pick flowers, trim stems. Playable in browser!', images:['/projects/oddjobs.png'], color:'#44cc88', links:{demo:'https://alf-uts.itch.io/odd-jobs'}, year:'2026', role:'Game Developer' },
  { id:10, title:'RescuSub',         subtitle:'Underwater Rescue Game',          category:'Personal Projects', type:['Game'],     tags:['Unity','C#','Team Project'],       desc:'A Unity underwater rescue game featuring shark enemy AI, oxygen management system, and dynamic hazards. Built as a 4-person team collaboration with custom shaders and UI.', images:['/projects/rescusub.png'], color:'#00aadd', links:{}, year:'2025', role:'Game Developer' },
  { id:6, title:'Gaming Voice Box', subtitle:'In-Game Voice Companion',       category:'UTS Projects',      type:['Game'],     tags:['Figma','Game UI','Mobile'],        desc:'A voice companion app for gamers with character selection, in-game overlays, and real-time voice customisation. Designed around FPS game aesthetics.',          images:['/projects/gaming.png'],                               color:'#ff4488', links:{},                                          year:'2025', role:'UI/UX Designer' },
  { id:7, title:'Restaurant App',   subtitle:'Food Ordering Experience',      category:'UTS Projects',      type:['Frontend'], tags:['Figma','UI Design','Food'],        desc:'A food ordering app with warm earth-tone aesthetics, featuring menu browsing, promotions, cart management and a seamless checkout flow.',                     images:['/projects/restaurant.png'],                           color:'#cc8844', links:{},                                          year:'2025', role:'UI Designer'    },
  { id:8, title:'Pocket Pet',       subtitle:'Pet Social Community',          category:'UTS Projects',      type:['Frontend'], tags:['Figma','Social App','Mobile'],     desc:'A pet-focused social platform where users create virtual pet profiles, share content, and connect with other pet owners with video feed and friend discovery.',   images:['/projects/pocketpet.png'],                            color:'#88aaff', links:{},                                          year:'2025', role:'UI Designer'    },
]

const CARDS_PER_PAGE = 6

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [imgIdx, setImgIdx] = useState(0)
  const [activePage, setActivePage] = useState(0)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const isScrolling = useRef(false)

  const filtered = filter === 'All' ? projects
    : ['Frontend','Game'].includes(filter)
      ? projects.filter(p => p.type?.includes(filter))
      : projects.filter(p => p.category === filter)

  const pages = []
  for (let i = 0; i < filtered.length; i += CARDS_PER_PAGE)
    pages.push(filtered.slice(i, i + CARDS_PER_PAGE))

  useEffect(() => {
    const openId = searchParams.get('open')
    if (openId) {
      const p = projects.find(p => p.id === parseInt(openId))
      if (p) setTimeout(() => { setSelected(p); setImgIdx(0) }, 400)
    }
  }, [searchParams])

  useEffect(() => {
    setActivePage(0)
    containerRef.current?.scrollTo({ top: 0 })
  }, [filter])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      if (isScrolling.current) return
      isScrolling.current = true
      const next = e.deltaY > 0
        ? Math.min(activePage + 1, pages.length - 1)
        : Math.max(activePage - 1, 0)
      setActivePage(next)
      el.scrollTo({ top: next * window.innerHeight, behavior: 'smooth' })
      setTimeout(() => { isScrolling.current = false }, 900)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [activePage, pages.length])

  return (
    <div style={{ height:'100vh', overflow:'hidden', background:'#07070a', position:'relative' }}>
      <CustomCursor />

      {/* Fixed nav bar — Back + Filters together */}
      <div className="proj-navbar">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      {/* Fullpage scroll container — hide scrollbar */}
      <div ref={containerRef} className="proj-scroll">
        {pages.map((pageCards, pi) => (
          <div key={pi} className="proj-page">

            {/* Header only on first page */}
            {pi === 0 && (
              <div className="projects-header">
                <div className="section-tag">// Selected Work</div>
                <h1 className="projects-title">All Projects</h1>
                <p className="projects-sub">UI/UX Design & iOS Development · 2025–2026</p>
                {/* Filters right under title */}
                <div className="filter-row">
                  {categories.map(c => (
                    <button key={c} className={`filter-btn ${filter===c?'active':''}`} onClick={()=>setFilter(c)}>{c}</button>
                  ))}
                </div>
              </div>
            )}



            {/* 6-card grid */}
            <div className="projects-grid-6">
              {pageCards.map((p, i) => (
                <motion.div key={p.id} className="project-card"
                  style={{'--card-color': p.color}}
                  initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}
                  transition={{duration:0.35, delay:i*0.06}}
                  onClick={()=>{setSelected(p);setImgIdx(0)}}
                >
                  <div className="card-img-wrap">
                    {p.images[0]
                      ? <img src={p.images[0]} alt={p.title} className="card-img"/>
                      : <div className="card-img-placeholder">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Code</span>
                        </div>
                    }
                    <div className="card-overlay"><span>View →</span></div>
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span className="card-year">{p.year}</span>
                      <span className="card-cat">{p.category}</span>
                    </div>
                    <h3 className="card-title">{p.title}</h3>
                    <p className="card-subtitle">{p.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="page-ind">{pi + 1} / {pages.length}</div>
          </div>
        ))}
      </div>

      {/* Right side dots */}
      <div className="proj-dots">
        {pages.map((_,i) => (
          <button key={i} className={`proj-dot ${activePage===i?'active':''}`}
            onClick={()=>{ setActivePage(i); containerRef.current?.scrollTo({ top: i*window.innerHeight, behavior:'smooth' }) }}
          />
        ))}
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {activePage > 0 && (
          <motion.button className="back-to-top"
            onClick={()=>{ setActivePage(0); containerRef.current?.scrollTo({ top:0, behavior:'smooth' }) }}
            initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setSelected(null)}
          >
            <motion.div className="modal" style={{'--card-color': selected.color}}
              initial={{opacity:0,scale:0.92,y:40}} animate={{opacity:1,scale:1,y:0}}
              exit={{opacity:0,scale:0.92,y:40}} transition={{duration:0.35,ease:[0.16,1,0.3,1]}}
              onClick={e=>e.stopPropagation()}
            >
              <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
              {selected.images.length > 0 && (
                <div className="modal-imgs">
                  <motion.img key={imgIdx} src={selected.images[imgIdx]} alt={selected.title}
                    className="modal-img" initial={{opacity:0}} animate={{opacity:1}}/>
                  {selected.images.length > 1 && (
                    <div className="modal-img-dots">
                      {selected.images.map((_,i)=>(
                        <button key={i} className={`img-dot ${imgIdx===i?'active':''}`} onClick={()=>setImgIdx(i)}/>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="modal-body">
                <div className="modal-meta">
                  <span className="card-cat">{selected.category}</span>
                  <span className="card-year">{selected.year}</span>
                  <span className="card-year">{selected.role}</span>
                </div>
                <h2 className="modal-title">{selected.title}</h2>
                <p className="modal-subtitle">{selected.subtitle}</p>
                <p className="modal-desc">{selected.desc}</p>
                <div className="card-tags" style={{marginBottom:'20px'}}>
                  {selected.tags.map(t=><span key={t} className="card-tag">{t}</span>)}
                </div>
                {(selected.links.github||selected.links.demo) && (
                  <div className="modal-links">
                    {selected.links.github && <a href={selected.links.github} target="_blank" rel="noreferrer" className="modal-link">GitHub →</a>}
                    {selected.links.demo   && <a href={selected.links.demo}   target="_blank" rel="noreferrer" className="modal-link accent">View Demo →</a>}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

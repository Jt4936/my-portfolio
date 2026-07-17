import { useEffect, useRef, useState } from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Navbar from './components/Navbar'
import ParticleField from './components/ParticleField'
import CustomCursor from './components/CustomCursor'
import './App.css'

const SECTIONS = ['hero','about','work','skills','contact']

// Flash overlay colors per page transition
const FLASH_COLORS = ['','#9955ff','#4488ff','#44ddff','#ffffff']

export default function App() {
  const [activePage, setActivePage]   = useState(0)
  const [isMobile, setIsMobile]       = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    document.body.classList.add("fullpage-mode")
    return () => document.body.classList.remove("fullpage-mode")
  }, [])

  // Track viewport so we can switch between desktop wheel-snap and mobile touch-scroll
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const [flashColor, setFlashColor]   = useState(null)
  const containerRef = useRef(null)
  const particleRef  = useRef(null)
  const isScrolling  = useRef(false)
  const currentPage  = useRef(0)

  // Fire the 3D camera dive + colour flash for a section change (shared by wheel & touch)
  const activate = (idx) => {
    const prev = currentPage.current
    if (idx === prev) return
    currentPage.current = idx
    setActivePage(idx)
    if (particleRef.current) particleRef.current.flyTo(idx, prev)
    const color = FLASH_COLORS[idx]
    if (color) {
      setFlashColor(color)
      setTimeout(() => setFlashColor(null), 700)
    }
  }

  // ── Desktop: hijack the wheel for full-page snap navigation ──
  useEffect(()=>{
    if(isMobile) return
    const container = containerRef.current
    if(!container) return
    const onWheel=(e)=>{
      e.preventDefault()
      if(isScrolling.current) return
      isScrolling.current=true
      const next = e.deltaY>0
        ? Math.min(currentPage.current+1, SECTIONS.length-1)
        : Math.max(currentPage.current-1, 0)
      goTo(next)
      setTimeout(()=>{ isScrolling.current=false }, 1100)
    }
    container.addEventListener('wheel', onWheel, {passive:false})
    return ()=>container.removeEventListener('wheel', onWheel)
  },[isMobile])

  // ── Mobile: let touch scroll naturally, but trigger the same effects as
  //    each section passes the viewport centre ──
  useEffect(()=>{
    if(!isMobile) return
    const container = containerRef.current
    if(!container) return
    let ticking = false
    const onScroll = () => {
      if(ticking || isScrolling.current) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const sections = container.querySelectorAll('section')
        const centerY = container.getBoundingClientRect().top + container.clientHeight / 2
        let idx = 0
        for(let i=0; i<sections.length; i++){
          const r = sections[i].getBoundingClientRect()
          if(r.top <= centerY && r.bottom > centerY){ idx = i; break }
        }
        activate(idx)
      })
    }
    container.addEventListener('scroll', onScroll, {passive:true})
    return ()=>container.removeEventListener('scroll', onScroll)
  },[isMobile])

  const goTo=(idx)=>{
    // Trigger 3D camera flight + flash overlay
    activate(idx)

    // Scroll content into view
    if(isMobile){
      // Guard the scroll listener so it doesn't fly through intermediate sections
      isScrolling.current = true
      setTimeout(()=>{ isScrolling.current = false }, 1000)
      document.getElementById(SECTIONS[idx])?.scrollIntoView({ behavior:'smooth' })
    } else {
      setTimeout(()=>{
        containerRef.current?.scrollTo({ top: idx*window.innerHeight, behavior:'smooth' })
      }, idx===4 ? 500 : 80)
    }
  }

  return (
    <div className="app">
      <CustomCursor />
      <Navbar activePage={activePage} goTo={goTo} />
      <ParticleField ref={particleRef} />

      {/* Flash transition overlay */}
      {flashColor && (
        <div style={{
          position:'fixed', inset:0, zIndex:50, pointerEvents:'none',
          background: flashColor,
          animation: 'flashIn 0.65s ease-out forwards',
        }}/>
      )}

      <div className="page-dots">
        {SECTIONS.map((_,i)=>(
          <button key={i}
            className={`page-dot ${activePage===i?'active':''}`}
            onClick={()=>goTo(i)}
            aria-label={`Section ${i+1}`}
          />
        ))}
      </div>

      <div className="fullpage" ref={containerRef}>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact isActive={activePage===4} />
      </div>
    </div>
  )
}

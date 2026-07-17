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

  // ── Mobile: PPT-style paging. One swipe = advance one full section (with the
  //    same 3D dive + flash). Sections taller than the screen scroll internally
  //    first; only a swipe past the top/bottom edge flips to the next section. ──
  useEffect(()=>{
    if(!isMobile) return
    const container = containerRef.current
    if(!container) return

    let startY = null
    const onStart = (e) => { startY = e.touches[0]?.clientY ?? null }
    const onEnd = (e) => {
      if(startY == null) return
      const dy = startY - (e.changedTouches[0]?.clientY ?? startY)
      startY = null
      if(isScrolling.current) return
      if(Math.abs(dy) < 45) return   // ignore taps / tiny drags

      // If the current section still has content to scroll in the swipe
      // direction, let that native scroll happen instead of paging.
      const sec = container.querySelectorAll('section')[currentPage.current]
      if(sec){
        const atTop    = sec.scrollTop <= 4
        const atBottom = sec.scrollTop + sec.clientHeight >= sec.scrollHeight - 4
        if(dy > 0 && !atBottom) return
        if(dy < 0 && !atTop) return
      }

      const next = dy > 0
        ? Math.min(currentPage.current + 1, SECTIONS.length - 1)
        : Math.max(currentPage.current - 1, 0)
      if(next === currentPage.current) return
      goTo(next)
    }
    container.addEventListener('touchstart', onStart, {passive:true})
    container.addEventListener('touchend', onEnd, {passive:true})
    return ()=>{
      container.removeEventListener('touchstart', onStart)
      container.removeEventListener('touchend', onEnd)
    }
  },[isMobile])

  const goTo=(idx)=>{
    // Trigger 3D camera flight + flash overlay
    activate(idx)

    // Scroll content into view
    if(isMobile){
      // Lock paging until the transition settles
      isScrolling.current = true
      setTimeout(()=>{ isScrolling.current = false }, 1100)
      const container = containerRef.current
      const el = document.getElementById(SECTIONS[idx])
      if(container && el){
        el.scrollTop = 0                       // start the incoming section at its top
        container.scrollTo({ top: el.offsetTop, behavior:'smooth' })
      }
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

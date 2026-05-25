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

  useEffect(() => {
    document.body.classList.add("fullpage-mode")
    return () => document.body.classList.remove("fullpage-mode")
  }, [])
  const [flashColor, setFlashColor]   = useState(null)
  const containerRef = useRef(null)
  const particleRef  = useRef(null)
  const isScrolling  = useRef(false)
  const currentPage  = useRef(0)

  useEffect(()=>{
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
  },[])

  const goTo=(idx)=>{
    const prev = currentPage.current
    if(idx===prev) return
    currentPage.current=idx
    setActivePage(idx)

    // Trigger 3D camera flight
    if(particleRef.current) particleRef.current.flyTo(idx, prev)

    // Flash overlay
    const color = FLASH_COLORS[idx]
    if(color){
      setFlashColor(color)
      setTimeout(()=>setFlashColor(null), 700)
    }

    // Scroll content
    setTimeout(()=>{
      containerRef.current?.scrollTo({ top: idx*window.innerHeight, behavior:'smooth' })
    }, idx===4 ? 500 : 80)
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

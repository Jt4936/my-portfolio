import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    let mx = -200, my = -200
    const tail = [], MAX = 26
    let frame = 0, raf

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      tail.push({ x: mx, y: my })
      if (tail.length > MAX) tail.shift()
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Touch: let the glow follow the finger on mobile
    const onTouch = (e) => {
      const t = e.touches[0]
      if (!t) return
      mx = t.clientX; my = t.clientY
      tail.push({ x: mx, y: my })
      if (tail.length > MAX) tail.shift()
    }
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })

    const draw = () => {
      raf = requestAnimationFrame(draw)
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < tail.length; i++) {
        const { x, y } = tail[i]
        const p = i / tail.length
        const r = p * 3.5 + 0.3
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3)
        g.addColorStop(0,   `rgba(255,255,255,${p * 0.5})`)
        g.addColorStop(0.5, `rgba(200,230,255,${p * 0.3})`)
        g.addColorStop(1,   'rgba(150,200,255,0)')
        ctx.beginPath(); ctx.arc(x, y, r * 3, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      }

      const pulse = 1 + Math.sin(frame * 0.08) * 0.35
      const hr = 5 * pulse
      const hg = ctx.createRadialGradient(mx, my, 0, mx, my, hr * 5)
      hg.addColorStop(0,   'rgba(255,255,255,0.9)')
      hg.addColorStop(0.3, 'rgba(220,240,255,0.4)')
      hg.addColorStop(1,   'rgba(150,200,255,0)')
      ctx.beginPath(); ctx.arc(mx, my, hr * 5, 0, Math.PI * 2)
      ctx.fillStyle = hg; ctx.fill()
      ctx.beginPath(); ctx.arc(mx, my, hr, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fill()

      const fl = hr * (2.5 + Math.sin(frame * 0.12))
      ctx.strokeStyle = `rgba(255,255,255,${0.25 + Math.sin(frame * 0.08) * 0.15})`
      ctx.lineWidth = 0.8
      for (let a = 0; a < 4; a++) {
        const ang = (a / 4) * Math.PI * 2 + frame * 0.01
        ctx.beginPath()
        ctx.moveTo(mx + Math.cos(ang) * (hr + 1), my + Math.sin(ang) * (hr + 1))
        ctx.lineTo(mx + Math.cos(ang) * (hr + fl), my + Math.sin(ang) * (hr + fl))
        ctx.stroke()
      }
    }
    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      pointerEvents: 'none', zIndex: 9999,
    }} />
  )
}

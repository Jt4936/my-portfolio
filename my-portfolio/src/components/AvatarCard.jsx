import { useEffect, useRef, useState } from 'react'
import './AvatarCard.css'

export const AVATAR_READY = true

// Expression images, ordered FAR → NEAR. Source watermark was cropped off
// during processing; the circular mask keeps the face centered.
const EXPR = [
  { key: 'unhappy',   src: '/avatar/unhappy.jpg',   label: 'ZZZ…' }, // cursor far away
  { key: 'calm',      src: '/avatar/calm.jpg',      label: 'HELLO' },
  { key: 'happy',     src: '/avatar/happy.jpg',     label: ':D' },
  { key: 'surprised', src: '/avatar/surprised.jpg', label: '!!' },   // cursor very close
]

export default function AvatarCard() {
  const ref = useRef(null)
  const [ok, setOk] = useState(true)
  const [mood, setMood] = useState('calm')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState(0)

  useEffect(() => {
    const onMove = (px, py) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = px - cx
      const dy = py - cy
      const dist = Math.hypot(dx, dy)

      // Head tilts toward the cursor (watching you)
      const max = 15
      setTilt({
        x: Math.max(-max, Math.min(max, -dy / 14)),
        y: Math.max(-max, Math.min(max, dx / 14)),
      })

      // Expression by distance band
      const m = dist < 140 ? 'surprised' : dist < 340 ? 'happy' : dist < 640 ? 'calm' : 'unhappy'
      setMood(m)
      setGlow(Math.max(0, Math.min(1, 1 - dist / 640)))
    }
    const mm = (e) => onMove(e.clientX, e.clientY)
    const tm = (e) => { const t = e.touches[0]; if (t) onMove(t.clientX, t.clientY) }
    window.addEventListener('mousemove', mm)
    window.addEventListener('touchmove', tm, { passive: true })
    return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('touchmove', tm) }
  }, [])

  if (!ok) return null

  return (
    <div className="avatar-wrap">
      <div
        className="avatar-card"
        ref={ref}
        style={{ transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, '--glow': glow }}
      >
        <div className="avatar-ring" />
        <div className="avatar-mask">
          {EXPR.map((e) => (
            <img
              key={e.key}
              src={e.src}
              className={`avatar-img ${mood === e.key ? 'on' : ''}`}
              onError={() => setOk(false)}
              draggable={false}
              alt=""
            />
          ))}
        </div>
        <span className="avatar-mood">{EXPR.find((e) => e.key === mood)?.label}</span>
      </div>
    </div>
  )
}

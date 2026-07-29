import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import CustomCursor from '../components/CustomCursor'
import LangToggle from '../components/LangToggle'
import { useLang } from '../i18n'
import { games } from '../games'
import './GamePage.css'

// ── Custom SVG charts (all data is the designer's own analysis) ──

function ArmorCurve({ accent }) {
  const W = 520, H = 260, pad = 40, K = 12, maxDef = 30
  const x = (d) => pad + (d / maxDef) * (W - pad * 2)
  const y = (r) => H - pad - r * (H - pad * 2)
  const pts = []
  for (let d = 0; d <= maxDef; d += 0.5) pts.push(`${x(d)},${y(d / (d + K))}`)
  const marks = [
    { d: 2.4, label: '80F' }, { d: 6, label: '50F' }, { d: 9.6, label: '20F' }, { d: 12, label: '1F' },
  ]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="hud-chart" role="img" aria-label="Armor curve">
      {[0, 0.25, 0.5, 0.75].map((r) => (
        <g key={r}>
          <line x1={pad} y1={y(r)} x2={W - pad} y2={y(r)} className="grid" />
          <text x={pad - 8} y={y(r) + 4} className="axis" textAnchor="end">{Math.round(r * 100)}%</text>
        </g>
      ))}
      <polyline points={pts.join(' ')} fill="none" stroke={accent} strokeWidth="2.5" />
      {marks.map((m) => (
        <g key={m.label}>
          <circle cx={x(m.d)} cy={y(m.d / (m.d + K))} r="4" fill={accent} />
          <text x={x(m.d)} y={y(m.d / (m.d + K)) - 10} className="mark" textAnchor="middle">{m.label}</text>
        </g>
      ))}
      <text x={W / 2} y={H - 6} className="axis" textAnchor="middle">护甲值 armor →</text>
    </svg>
  )
}

function TtkBars({ accent }) {
  const rows = [
    { label: { zh: '杂兵', en: 'Mob' }, min: 2, max: 3, of: 31 },
    { label: { zh: '重甲兵', en: 'Ogre' }, min: 8, max: 10, of: 31 },
    { label: { zh: 'BOSS', en: 'Boss' }, min: 23, max: 25, of: 31 },
    { label: { zh: '玩家被杀', en: 'Player death' }, min: 13, max: 31, of: 31 },
  ]
  const { lang } = useLang()
  return (
    <div className="ttk">
      {rows.map((r) => (
        <div className="ttk-row" key={r.label.en}>
          <span className="ttk-label">{r.label[lang]}</span>
          <div className="ttk-track">
            <div className="ttk-fill" style={{ left: `${(r.min / r.of) * 100}%`, width: `${((r.max - r.min) / r.of) * 100 || 3}%`, background: accent }} />
          </div>
          <span className="ttk-val">{r.min}{r.max !== r.min ? `–${r.max}` : ''} 刀</span>
        </div>
      ))}
    </div>
  )
}

function Radar({ dims, accent }) {
  const { lang } = useLang()
  const size = 300, c = size / 2, R = 110, n = dims.length
  const ang = (i) => (Math.PI * 2 * i) / n - Math.PI / 2
  const pt = (i, r) => [c + Math.cos(ang(i)) * R * r, c + Math.sin(ang(i)) * R * r]
  const poly = dims.map((d, i) => pt(i, d.score / 10).join(',')).join(' ')
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="hud-chart radar" role="img" aria-label="Radar">
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={dims.map((_, i) => pt(i, r).join(',')).join(' ')} className="grid" fill="none" />
      ))}
      {dims.map((_, i) => <line key={i} x1={c} y1={c} x2={pt(i, 1)[0]} y2={pt(i, 1)[1]} className="grid" />)}
      <polygon points={poly} fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="2" />
      {dims.map((d, i) => {
        const [lx, ly] = pt(i, 1.22)
        return <text key={i} x={lx} y={ly} className="radar-label" textAnchor="middle">{d.label[lang]} {d.score}</text>
      })}
    </svg>
  )
}

// ── Block renderer ──

function Block({ block, lang, accent }) {
  const L = (o) => (o ? o[lang] ?? o.zh : '')
  switch (block.type) {
    case 'stats':
      return (
        <div className="hud-stats">
          {block.items.map((s) => (
            <div className="hud-stat" key={L(s.k)}>
              <span className="hud-stat-k">{L(s.k)}</span>
              <span className="hud-stat-v">{L(s.v)}</span>
            </div>
          ))}
        </div>
      )
    case 'text':
      return (
        <section className="gp-section">
          {block.h && <h2 className="gp-h">{L(block.h)}</h2>}
          {block.body.map((p, i) => <p className="gp-p" key={i}>{L(p)}</p>)}
        </section>
      )
    case 'cards':
    case 'pillars':
      return (
        <section className="gp-section">
          {block.h && <h2 className="gp-h">{L(block.h)}</h2>}
          <div className={block.type === 'pillars' ? 'gp-pillars' : 'gp-cards'}>
            {block.items.map((it) => (
              <div className="gp-card" key={L(it.t)}>
                <h3 className="gp-card-t">{L(it.t)}</h3>
                <p className="gp-card-d">{L(it.d)}</p>
              </div>
            ))}
          </div>
          {block.note && <p className="gp-note">{L(block.note)}</p>}
        </section>
      )
    case 'timeline':
      return (
        <section className="gp-section">
          {block.h && <h2 className="gp-h">{L(block.h)}</h2>}
          <div className="gp-timeline">
            {block.items.map((it) => (
              <div className="gp-tl-item" key={L(it.t)}>
                <div className="gp-tl-dot" style={{ background: accent }} />
                <h3 className="gp-tl-t">{L(it.t)}</h3>
                <p className="gp-tl-d">{L(it.d)}</p>
              </div>
            ))}
          </div>
        </section>
      )
    case 'chart':
      return (
        <section className="gp-section">
          {block.h && <h2 className="gp-h">{L(block.h)}</h2>}
          <div className="gp-chart-wrap">
            {block.kind === 'armor' && <ArmorCurve accent={accent} />}
            {block.kind === 'ttk' && <TtkBars accent={accent} />}
            {block.kind === 'radar' && <Radar dims={block.dims} accent={accent} />}
          </div>
          {block.note && <p className="gp-note">{L(block.note)}</p>}
        </section>
      )
    case 'gallery':
      return (
        <section className="gp-section">
          {block.h && <h2 className="gp-h">{L(block.h)}</h2>}
          <div className="gp-gallery">
            {block.images.map((im) => (
              <figure className="gp-shot" key={im.src}>
                <img src={im.src} alt={L(im.cap)} loading="lazy" />
                <figcaption>{L(im.cap)}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )
    case 'video':
      return (
        <section className="gp-section">
          <video className="gp-video" src={block.src} poster={block.poster} controls preload="none" playsInline />
        </section>
      )
    default:
      return null
  }
}

export default function GamePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, t } = useLang()
  const game = games[slug]

  // Back = the previous view: the projects grid if we came from there,
  // otherwise the Work section on the home page (not the Hero top).
  const goBack = () => {
    if (location.state?.from === 'projects') navigate('/projects', { state:{ from:'home' } })
    else navigate('/', { state:{ section: 2 } })
  }

  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  useEffect(() => { document.body.classList.remove('fullpage-mode') }, [])

  if (!game) {
    return (
      <div className="gp-missing">
        <p>404</p>
        <button onClick={() => navigate('/')}>← {t.projects.back}</button>
      </div>
    )
  }

  const L = (o) => (o ? o[lang] ?? o.zh : '')
  const title = lang === 'zh' ? game.titleZh : game.title
  const tags = lang === 'zh' ? game.tags : game.tagsEn

  return (
    <div className="gp" style={{ '--accent': game.accent }}>
      <CustomCursor />

      <div className="gp-nav">
        <button className="gp-back" onClick={goBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.projects.back}
        </button>
        <LangToggle />
      </div>

      <header className="gp-hero" style={game.cover ? { backgroundImage: `linear-gradient(180deg, rgba(7,7,10,0.55), rgba(7,7,10,0.96)), url(${game.cover})` } : undefined}>
        <motion.div className="gp-hero-inner"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="gp-kicker">// CASE STUDY</div>
          <h1 className="gp-title">{title}</h1>
          <p className="gp-sub">{L(game.subtitle)}</p>
          <div className="gp-tags">{tags.map((tg) => <span key={tg} className="gp-tag">{tg}</span>)}</div>
          {(game.links.play || game.links.source) && (
            <div className="gp-links">
              {game.links.play && <a className="gp-link primary" href={game.links.play} target="_blank" rel="noreferrer">{lang === 'zh' ? '在线试玩' : 'Play now'} →</a>}
              {game.links.source && <a className="gp-link" href={game.links.source} target="_blank" rel="noreferrer">GitHub →</a>}
            </div>
          )}
        </motion.div>
      </header>

      <main className="gp-body">
        {game.blocks.map((b, i) => <Block key={i} block={b} lang={lang} accent={game.accent} />)}
      </main>

      <footer className="gp-footer">
        <button className="gp-back" onClick={goBack}>← {t.projects.back}</button>
        <span>© 2026 Jintao Hu</span>
      </footer>
    </div>
  )
}

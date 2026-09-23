import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomCursor from '../components/CustomCursor'
import LangToggle from '../components/LangToggle'
import AssetViewer from '../components/AssetViewer'
import { useLang } from '../i18n'
import { modelAssets } from '../modelAssets'
import './AssetsPage.css'

const CONTACT_EMAIL = 'hujintao12@126.com'

const COPY = {
  zh: {
    back: '返回作品',
    eyebrow: '// AI 资源陈列室',
    title: '可交互模型资源',
    intro: '这里整理了我在游戏原型与视觉实验中生成并使用的模型资源。选择一个资源，即可在线旋转、缩放并从不同角度查看。',
    disclosureTitle: 'AI 制作声明',
    disclosure: '本页展示的模型与贴图均由生成式 AI 制作或辅助制作，并由我进行筛选、整理和项目适配。所有文件仅供在线预览；如需在项目中使用、讨论授权或了解制作流程，请先与我联系。',
    all: '全部项目',
    library: '资源列表',
    select: '选择资源进行 3D 预览',
    emptyTitle: '资源正在整理中',
    emptyBody: '老虎机王国与 Mesh 解密 Demo 的预览资源会在确认来源与制作信息后加入这里。',
    selectedEmpty: '当前筛选条件下还没有可预览资源。',
    about: '资源说明',
    project: '来源项目',
    projectStatus: '项目状态',
    provenance: 'AI 制作信息',
    tools: '使用工具',
    createdAt: '整理时间',
    source: '相关源码',
    sourceUnavailable: '源码信息整理中',
    viewProject: '查看来源项目',
    viewSource: '查看相关源码',
    contact: '联系我使用此资源',
    contactNote: '请在邮件中注明资源名称、使用场景和发布平台。',
    previewOnly: '仅供在线预览 · 使用前请联系',
    cardPreview: '预览 3D 模型',
    viewer: {
      preview: '3D 模型预览',
      loading: '正在加载模型…',
      error: '模型暂时无法加载，请稍后再试。',
      unavailable: '此资源的 3D 预览文件正在整理中。',
      hint: '拖动旋转 · 滚轮或双指缩放',
      controls: '模型查看控制',
      zoomIn: '放大',
      zoomOut: '缩小',
      autoRotate: '切换自动旋转',
      rotate: '自动旋转',
      reset: '重置视角',
    },
  },
  en: {
    back: 'Back to work',
    eyebrow: '// AI ASSET SHOWROOM',
    title: 'Interactive Model Library',
    intro: 'A curated collection of model assets made for my game prototypes and visual experiments. Select an asset to rotate, zoom and inspect it from every angle.',
    disclosureTitle: 'AI production disclosure',
    disclosure: 'The models and textures shown here were created or assisted with generative AI, then selected, curated and adapted by me for each project. Files are available for online preview only. Please contact me to discuss use, licensing or the production process.',
    all: 'All projects',
    library: 'Asset library',
    select: 'Select an asset for a 3D preview',
    emptyTitle: 'Assets are being prepared',
    emptyBody: 'Preview assets from Slot Kingdom and the Mesh puzzle demo will appear here after their source and production details are confirmed.',
    selectedEmpty: 'No preview assets match this project filter yet.',
    about: 'About this asset',
    project: 'Source project',
    projectStatus: 'Project status',
    provenance: 'AI production details',
    tools: 'Tools used',
    createdAt: 'Curated',
    source: 'Related source',
    sourceUnavailable: 'Source information in preparation',
    viewProject: 'View source project',
    viewSource: 'View related source',
    contact: 'Contact me to use this asset',
    contactNote: 'Please include the asset name, intended use and publishing platform in your email.',
    previewOnly: 'Online preview only · Contact required for use',
    cardPreview: 'Preview 3D model',
    viewer: {
      preview: '3D model preview',
      loading: 'Loading model…',
      error: 'The model could not be loaded. Please try again later.',
      unavailable: 'The 3D preview file for this asset is being prepared.',
      hint: 'Drag to rotate · Scroll or pinch to zoom',
      controls: 'Model viewing controls',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      autoRotate: 'Toggle auto-rotate',
      rotate: 'Auto-rotate',
      reset: 'Reset view',
    },
  },
}

function localize(value, lang, fallback = '') {
  if (typeof value === 'string') return value
  return value?.[lang] ?? value?.en ?? value?.zh ?? fallback
}

function projectKey(asset) {
  return asset.project?.id ?? localize(asset.project?.title, 'en', 'other')
}

export default function AssetsPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const copy = COPY[lang]
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(modelAssets[0]?.id ?? null)

  useEffect(() => {
    document.body.classList.remove('fullpage-mode')
    window.scrollTo(0, 0)
  }, [])

  const projects = useMemo(() => {
    const seen = new Map()
    modelAssets.forEach((asset) => {
      const key = projectKey(asset)
      if (!seen.has(key)) {
        seen.set(key, {
          key,
          label: localize(asset.project?.title, lang, lang === 'zh' ? '其他' : 'Other'),
        })
      }
    })
    return [...seen.values()]
  }, [lang])

  const filteredAssets = useMemo(
    () => filter === 'all' ? modelAssets : modelAssets.filter((asset) => projectKey(asset) === filter),
    [filter],
  )

  const selected = filteredAssets.find((asset) => asset.id === selectedId) ?? filteredAssets[0] ?? null
  const sourceCode = selected?.sourceCode
  const projectUrl = selected?.project?.url
  const sourceUrl = sourceCode?.url
  const contactSubject = selected
    ? encodeURIComponent(`${lang === 'zh' ? '资源使用咨询' : 'Asset use enquiry'} · ${localize(selected.title, lang, selected.id)}`)
    : encodeURIComponent(lang === 'zh' ? 'AI 资源使用咨询' : 'AI asset use enquiry')

  const chooseFilter = (key) => {
    setFilter(key)
    const first = key === 'all' ? modelAssets[0] : modelAssets.find((asset) => projectKey(asset) === key)
    setSelectedId(first?.id ?? null)
  }

  return (
    <div className="assets-page">
      <CustomCursor />

      <nav className="assets-nav" aria-label={copy.title}>
        <button type="button" className="assets-back" onClick={() => navigate('/projects')}>
          <span aria-hidden="true">←</span>
          {copy.back}
        </button>
        <LangToggle />
      </nav>

      <header className="assets-hero">
        <div className="assets-hero-copy">
          <p className="assets-eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="assets-intro">{copy.intro}</p>
        </div>
        <aside className="assets-disclosure">
          <span className="assets-disclosure-icon" aria-hidden="true">AI</span>
          <div>
            <h2>{copy.disclosureTitle}</h2>
            <p>{copy.disclosure}</p>
          </div>
        </aside>
      </header>

      {modelAssets.length === 0 ? (
        <main className="assets-empty">
          <span aria-hidden="true">◇</span>
          <h2>{copy.emptyTitle}</h2>
          <p>{copy.emptyBody}</p>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${contactSubject}`}>{copy.contact} →</a>
        </main>
      ) : (
        <main className="assets-main">
          <section className="assets-library" aria-labelledby="asset-library-title">
            <div className="assets-section-heading">
              <div>
                <p className="assets-eyebrow">// {String(modelAssets.length).padStart(2, '0')}</p>
                <h2 id="asset-library-title">{copy.library}</h2>
              </div>
              <p>{copy.select}</p>
            </div>

            <div className="assets-filters" role="group" aria-label={copy.project}>
              <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => chooseFilter('all')}>
                {copy.all}
              </button>
              {projects.map((project) => (
                <button
                  type="button"
                  key={project.key}
                  className={filter === project.key ? 'active' : ''}
                  onClick={() => chooseFilter(project.key)}
                >
                  {project.label}
                </button>
              ))}
            </div>

            {filteredAssets.length === 0 ? (
              <p className="assets-filter-empty">{copy.selectedEmpty}</p>
            ) : (
              <div className="asset-card-grid">
                {filteredAssets.map((asset) => {
                  const title = localize(asset.title, lang, asset.id)
                  const isSelected = selected?.id === asset.id
                  return (
                    <button
                      type="button"
                      key={asset.id}
                      className={`asset-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedId(asset.id)}
                      aria-pressed={isSelected}
                      aria-label={`${copy.cardPreview}: ${title}`}
                    >
                      <span className="asset-card-image">
                        {asset.poster ? <img src={asset.poster} alt="" loading="lazy" /> : <span aria-hidden="true">3D</span>}
                        <i>{copy.cardPreview}</i>
                      </span>
                      <span className="asset-card-copy">
                        <strong>{title}</strong>
                        <small>{localize(asset.project?.title, lang)}</small>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          {selected && (
            <section className="asset-detail" aria-labelledby="active-asset-title">
              <div className="asset-preview-panel">
                <AssetViewer key={selected.id} asset={selected} labels={copy.viewer} />
                <span className="asset-preview-badge">{copy.previewOnly}</span>
              </div>

              <article className="asset-info">
                <p className="assets-eyebrow">// {copy.about}</p>
                <h2 id="active-asset-title">{localize(selected.title, lang, selected.id)}</h2>
                <p className="asset-description">{localize(selected.description, lang)}</p>

                {selected.tags?.length > 0 && (
                  <div className="asset-tags">
                    {selected.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}

                <dl className="asset-metadata">
                  <div>
                    <dt>{copy.project}</dt>
                    <dd>{localize(selected.project?.title, lang, '—')}</dd>
                  </div>
                  {selected.project?.status && (
                    <div>
                      <dt>{copy.projectStatus}</dt>
                      <dd>{localize(selected.project.status, lang)}</dd>
                    </div>
                  )}
                  <div>
                    <dt>{copy.provenance}</dt>
                    <dd>{localize(selected.provenance?.summary, lang, copy.disclosureTitle)}</dd>
                  </div>
                  {selected.provenance?.tools?.length > 0 && (
                    <div>
                      <dt>{copy.tools}</dt>
                      <dd>{selected.provenance.tools.join(' · ')}</dd>
                    </div>
                  )}
                  {selected.provenance?.createdAt && (
                    <div>
                      <dt>{copy.createdAt}</dt>
                      <dd>{selected.provenance.createdAt}</dd>
                    </div>
                  )}
                  <div>
                    <dt>{copy.source}</dt>
                    <dd>{localize(sourceCode?.status, lang, copy.sourceUnavailable)}</dd>
                  </div>
                </dl>

                {(projectUrl || sourceUrl) && (
                  <div className="asset-related-links">
                    {projectUrl && <a href={projectUrl}>{copy.viewProject} →</a>}
                    {sourceUrl && (
                      <a href={sourceUrl} target="_blank" rel="noreferrer">
                        {localize(sourceCode.label, lang, copy.viewSource)} →
                      </a>
                    )}
                  </div>
                )}

                <div className="asset-contact">
                  <p>{copy.contactNote}</p>
                  <a href={`mailto:${CONTACT_EMAIL}?subject=${contactSubject}`}>{copy.contact} →</a>
                </div>
              </article>
            </section>
          )}
        </main>
      )}

      <footer className="assets-footer">
        <span>© 2026 Jintao Hu</span>
        <span>{copy.previewOnly}</span>
      </footer>
    </div>
  )
}

import { createContext, useContext, useEffect, useState } from 'react'

// ── Translation dictionary ──────────────────────────────
// Chinese is the default language. Proper nouns (names, tech
// stack, project titles) stay in Latin script in both locales.
const translations = {
  zh: {
    langLabel: 'EN',
    nav: { about: '关于', work: '作品', skills: '技能', contact: '联系' },
    hero: {
      tag: '// 前端开发者 & 创意程序员',
      sub: '我打造沉浸式的网页体验，让代码与视觉设计在交汇处相遇。',
      viewWork: '查看作品',
      getInTouch: '联系我',
      scroll: '滚动探索',
      counter: '01 / 05 — 首页',
    },
    about: {
      tag: '// 关于我',
      titleLine1: '设计邂逅',
      titleLine2: '技术',
      body1: '你好，我是 Jintao —— 悉尼科技大学（UTS）信息技术（交互设计）硕士，2026 年 5 月刚刚毕业。我的经历从加州大学圣克鲁兹分校的计算机科学基础，一路延伸到专注于 UX/UI 设计与前端开发。',
      body2: '我在设计思维与技术实现之间架起桥梁 —— 用 Figma 制作高保真原型，构建交互式网页体验，并使用 Unity 和 Unreal Engine 5 开发游戏。我热衷于创造既直观又极具视觉冲击力的数字体验。',
      edu: [
        { degree: '信息技术硕士 · 交互设计', school: '悉尼科技大学 · 2026' },
        { degree: '信息技术学士 · 交互设计', school: '悉尼科技大学 · 2024' },
        { degree: '计算机科学', school: '加州大学圣克鲁兹分校 · 2019–2020' },
      ],
      stats: [
        { num: 'UTS', label: '信息技术硕士\n交互设计' },
        { num: '4+', label: '年设计\n经验' },
        { num: '8+', label: '完成\n项目' },
        { num: '2026', label: '毕业于\n2026 年 5 月' },
      ],
    },
    work: {
      tag: '// 精选作品',
      title: '我做过的东西',
      viewAll: '查看全部项目',
      count: '共 8 个项目',
    },
    skills: {
      tag: '// 技术栈',
      title: '我的工具箱',
      groups: [
        { category: '设计与原型', skills: ['Figma', '用户研究', 'UI 设计', '交互设计', '可用性测试', '设计思维'] },
        { category: '前端开发', skills: ['HTML / CSS / JS', 'React', 'Three.js', 'Framer Motion', 'GSAP', 'p5.js / Processing'] },
        { category: '游戏开发', skills: ['Unity (C#)', 'Unreal Engine 5', '2D / 3D 游戏', '沉浸式叙事', '游戏 UI 设计'] },
        { category: '创意与技术', skills: ['SwiftUI / iOS', '数据可视化', 'Arduino', '可穿戴计算', '服务设计', 'Git'] },
      ],
    },
    contact: {
      tag: '// 联系我',
      titleLine1: '让我们一起',
      titleLine2: '创造点什么',
      sub: '我目前正在寻找新的机会。无论你脑海中已有项目，还是只想打个招呼 —— 随时欢迎联系。',
      footerBuilt: '使用 React + Three.js 构建',
    },
    projects: {
      back: '返回',
      tag: '// 精选作品',
      title: '全部项目',
      sub: 'UI/UX 设计与 iOS 开发 · 2025–2026',
      view: '查看 →',
      code: '代码',
      github: 'GitHub →',
      demo: '查看演示 →',
      categories: { All: '全部', 'UTS Projects': 'UTS 项目', 'Personal Projects': '个人项目', Frontend: '前端', Game: '游戏' },
      // Per-project text keyed by project id (English lives in Projects.jsx data)
      items: {
        1: { subtitle: 'AI 情绪音乐伴侣', desc: '一款为正经历失业的应届毕业生打造的情绪自适应 AI 音乐伴侣，引导用户走过三段式情绪旅程：承载、释放、升华。' },
        2: { subtitle: '智能通勤规划', desc: '一款面向悉尼日常通勤者的通勤规划应用，提供智能提醒、出行方式选择与行程管理。' },
        3: { subtitle: '悉尼公交应用改版', desc: '对悉尼火车应用 TripView 的深色主题改版，优化了线路可视化、实时车厢余位显示，并采用注重无障碍的布局。' },
        4: { subtitle: '艺术家发掘平台', desc: '一款基于 SwiftUI 的 iOS 艺术家发掘应用，包含艺术家主页、媒体墙、精选短片，以及面向新锐创作者的故事化内容发现。' },
        5: { subtitle: '海岸安全助手', desc: '一款实时海滩安全应用，展示悉尼海滩的鲨鱼活动、离岸流、紫外线指数与水质，并提供实时安全评分与预警。' },
        6: { subtitle: '游戏内语音伴侣', desc: '一款面向玩家的语音伴侣应用，支持角色选择、游戏内浮层与实时语音定制，整体围绕 FPS 游戏美学设计。' },
        7: { subtitle: '餐饮点单体验', desc: '一款采用暖色大地色调的餐饮点单应用，包含菜单浏览、促销活动、购物车管理与顺畅的结账流程。' },
        8: { subtitle: '宠物社交社区', desc: '一个以宠物为核心的社交平台，用户可创建虚拟宠物档案、分享内容，并通过视频流与好友发现结识其他宠物主人。' },
        9: { subtitle: '低多边形农场与地牢 RPG', desc: '一款 Unity 3D 低多边形农场 RPG，包含村庄经营、地牢探索、工具轮盘、天气系统与体力机制。种田、交易、与 NPC 建立关系，并解锁地下地牢。' },
        10: { subtitle: '水下救援游戏', desc: '一款 Unity 水下救援游戏，包含鲨鱼敌人 AI、氧气管理系统与动态危险。由 4 人团队协作开发，含自定义着色器与 UI。' },
        11: { subtitle: '2D 花店模拟游戏', desc: '一款快节奏的 2D 模拟游戏，你要打各种奇趣兼职来赚房租。扮演花店店员 —— 招待顾客、记住订单、浇水采花、修剪花枝。可在浏览器中直接游玩！' },
      },
    },
  },
  en: {
    langLabel: '中',
    nav: { about: 'About', work: 'Work', skills: 'Skills', contact: 'Contact' },
    hero: {
      tag: '// Frontend Developer & Creative Coder',
      sub: 'I craft immersive web experiences that live at the intersection of code and visual design.',
      viewWork: 'View My Work',
      getInTouch: 'Get In Touch',
      scroll: 'Scroll to explore',
      counter: '01 / 05 — Home',
    },
    about: {
      tag: '// About Me',
      titleLine1: 'Design meets',
      titleLine2: 'Technology',
      body1: "Hi, I'm Jintao — a freshly graduated Master of Information Technology (Interactive Design) from UTS Sydney, Class of May 2026. My journey spans from Computer Science foundations at UC Santa Cruz to specialising in UX/UI design and front-end development.",
      body2: "I bridge the gap between design thinking and technical implementation — crafting high-fidelity prototypes in Figma, building interactive web experiences, and developing games in Unity and Unreal Engine 5. I'm passionate about creating digital experiences that feel both intuitive and visually striking.",
      edu: [
        { degree: 'Master of IT · Interactive Design', school: 'University of Technology Sydney · 2026' },
        { degree: 'Bachelor of IT · Interactive Design', school: 'University of Technology Sydney · 2024' },
        { degree: 'Computer Science', school: 'UC Santa Cruz · 2019–2020' },
      ],
      stats: [
        { num: 'UTS', label: 'Master of IT\nInteractive Design' },
        { num: '4+', label: 'Years of Design\nExperience' },
        { num: '8+', label: 'Projects\nCompleted' },
        { num: '2026', label: 'Graduated\nMay 2026' },
      ],
    },
    work: {
      tag: '// Selected Work',
      title: "Things I've Built",
      viewAll: 'View All Projects',
      count: '8 projects total',
    },
    skills: {
      tag: '// Tech Stack',
      title: 'What I Work With',
      groups: [
        { category: 'Design & Prototyping', skills: ['Figma', 'UX Research', 'UI Design', 'Interaction Design', 'Usability Testing', 'Design Thinking'] },
        { category: 'Frontend Development', skills: ['HTML / CSS / JS', 'React', 'Three.js', 'Framer Motion', 'GSAP', 'p5.js / Processing'] },
        { category: 'Game Development', skills: ['Unity (C#)', 'Unreal Engine 5', '2D / 3D Games', 'Immersive Storytelling', 'Game UI Design'] },
        { category: 'Creative & Technical', skills: ['SwiftUI / iOS', 'Data Visualization', 'Arduino', 'Wearable Computing', 'Service Design', 'Git'] },
      ],
    },
    contact: {
      tag: '// Get In Touch',
      titleLine1: "Let's Build",
      titleLine2: 'Something Together',
      sub: "I'm currently open to new opportunities. Whether you have a project in mind or just want to say hello — reach out anytime.",
      footerBuilt: 'Built with React + Three.js',
    },
    projects: {
      back: 'Back',
      tag: '// Selected Work',
      title: 'All Projects',
      sub: 'UI/UX Design & iOS Development · 2025–2026',
      view: 'View →',
      code: 'Code',
      github: 'GitHub →',
      demo: 'View Demo →',
      categories: { All: 'All', 'UTS Projects': 'UTS Projects', 'Personal Projects': 'Personal Projects', Frontend: 'Frontend', Game: 'Game' },
    },
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('lang') || 'zh'
    }
    return 'zh'
  })

  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const toggle = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'))

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LangProvider')
  return ctx
}

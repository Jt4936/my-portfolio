const privateSource = (repository, version = '') => ({
  status: {
    zh: `私有 GitHub 源工程 · ${repository}${version ? ` · ${version}` : ''} · 可联系查看`,
    en: `Private GitHub source project · ${repository}${version ? ` · ${version}` : ''} · access available on request`,
  },
})

const slotKingdomProject = {
  id: 'slot-kingdom',
  title: { zh: '《老虎机王国》', en: 'Slot Kingdom' },
  status: { zh: 'Unity 6 WebGL 游戏 Demo · 已发布', en: 'Unity 6 WebGL game demo · Published' },
  url: '/game/slot-kingdom',
}

const slotKingdomAssets = [
  {
    id: 'slot-kingdom-palace-shell',
    title: { zh: '老虎机宫殿空窗外壳 P2', en: 'Slot Palace Empty-Window Shell P2' },
    description: {
      zh: '玩家主城中的老虎机宫殿外壳；正面三处空窗由游戏程序显示卷轴与符号。',
      en: 'The slot-machine palace shell used in the player capital; the three front windows are filled with reels and symbols at runtime.',
    },
    model: '/models/slot-kingdom/slot-palace-shell-v1.glb',
    poster: '/model-posters/slot-kingdom/slot-palace-shell-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '14K tris', '0.47 MB'],
    project: slotKingdomProject,
    sourceCode: privateSource('Jt4936/slot-kingdom-demo', 'v0.1.0-demo'),
    provenance: {
      tools: ['Meshy', 'Unity'],
      summary: {
        zh: '由项目概念图通过 Meshy 图生 3D 生成，经本人筛选，并在 Unity 中完成比例、朝向、材质和玩法挂点适配。',
        en: 'Generated from project concept art with Meshy image-to-3D, then selected and adapted in Unity for scale, orientation, materials and gameplay anchors.',
      },
      createdAt: '2026-08',
    },
  },
  {
    id: 'slot-kingdom-capital-gate',
    title: { zh: '南门攻城机关视觉壳 P1', en: 'Capital Siege Gate Visual Shell P1' },
    description: {
      zh: '敌方主城南门的暖石门楼、三锁轮、链条和前置钢板视觉表现。',
      en: 'The visual shell for the enemy capital’s south gate, combining warm stone towers, three lock wheels, chains and a steel barrier.',
    },
    model: '/models/slot-kingdom/capital-siege-gate-v1.glb',
    poster: '/model-posters/slot-kingdom/capital-siege-gate-v1.png',
    tags: ['Meshy AI + Blender', '36K tris', '2.04 MB'],
    project: slotKingdomProject,
    sourceCode: privateSource('Jt4936/slot-kingdom-demo', 'v0.1.0-demo'),
    provenance: {
      tools: ['Meshy', 'Blender', 'Unity'],
      summary: {
        zh: '基础造型和纹理由 Meshy 生成；随后在 Blender 中按 18 件分割结构重建 UV、投射并烘焙贴图，再适配到游戏关卡。',
        en: 'The base form and textures were generated with Meshy, then rebuilt around an 18-part split structure with projected and baked textures in Blender before level integration.',
      },
      createdAt: '2026-08',
    },
  },
]

const timeGardenProject = {
  id: 'time-garden',
  title: { zh: '《他年灯下》解密 Demo', en: 'Time Garden Puzzle Demo' },
  status: { zh: 'Unreal Engine 5 解密 Demo · 开发中', en: 'Unreal Engine 5 puzzle demo · In development' },
}

const timeGardenAssets = [
  {
    id: 'time-garden-tortoise',
    title: { zh: '龟堡灵龟', en: 'Fortress Tortoise' },
    description: {
      zh: '承载龟堡庭院意象的巨型灵龟，用于跨年代场景中的核心视觉锚点。',
      en: 'A giant spirit tortoise that anchors the moving fortress courtyard across different periods of the story.',
    },
    model: '/models/time-garden/tortoise-v1.glb',
    poster: '/model-posters/time-garden/tortoise-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '62K tris', '3.3 MB'],
    aiMode: 'image',
  },
  {
    id: 'time-garden-courtyard-house',
    title: { zh: '庭院屋舍', en: 'Courtyard House' },
    description: {
      zh: '龟堡庭院的主体屋舍，构成玩家探索、观察时间变化与寻找线索的生活空间。',
      en: 'The main courtyard residence, built as an explorable domestic space for clues and visible changes through time.',
    },
    model: '/models/time-garden/courtyard-house-v1.glb',
    poster: '/model-posters/time-garden/courtyard-house-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '90K tris', '5.8 MB'],
    aiMode: 'image',
  },
  {
    id: 'time-garden-ancient-peach-tree',
    title: { zh: '古桃树', en: 'Ancient Peach Tree' },
    description: {
      zh: '庭院中的核心景物，通过形态与状态变化表现年代推进，也是解谜路线的重要参照。',
      en: 'A central courtyard landmark whose changing form communicates the passage of time and guides puzzle navigation.',
    },
    model: '/models/time-garden/ancient-peach-tree-v1.glb',
    poster: '/model-posters/time-garden/ancient-peach-tree-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '111K tris', '8.1 MB'],
    aiMode: 'image',
  },
  {
    id: 'time-garden-root-bridge',
    title: { zh: '盘根桥', en: 'Root Bridge' },
    description: {
      zh: '连接庭院空间的盘根路径，同时用于密室环境中的根系结构与空间引导。',
      en: 'An intertwined root crossing used to connect courtyard spaces and guide the player through the hidden chamber.',
    },
    model: '/models/time-garden/root-bridge-v1.glb',
    poster: '/model-posters/time-garden/root-bridge-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '52K tris', '2.7 MB'],
    aiMode: 'image',
  },
  {
    id: 'time-garden-stone-well',
    title: { zh: '古石井', en: 'Ancient Stone Well' },
    description: {
      zh: '庭院井口与最终密室中的古井造型，是时间线索与关卡解谜的关键场景物件。',
      en: 'The old well shared by the courtyard and final chamber, serving as a key object in the timeline puzzle.',
    },
    model: '/models/time-garden/stone-well-v1.glb',
    poster: '/model-posters/time-garden/stone-well-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '40K tris', '2.8 MB'],
    aiMode: 'image',
  },
  {
    id: 'time-garden-bronze-lantern',
    title: { zh: '青铜灯', en: 'Bronze Lantern' },
    description: {
      zh: '用于庭院、宗祠与密室的交互灯具，以统一造型串联不同年代和空间。',
      en: 'An interactive lantern used across the courtyard, ancestral hall and hidden chamber to connect places and periods.',
    },
    model: '/models/time-garden/bronze-lantern-v1.glb',
    poster: '/model-posters/time-garden/bronze-lantern-v1.png',
    tags: ['Meshy AI', 'Text to 3D', '26K tris', '2.2 MB'],
    aiMode: 'text',
  },
  {
    id: 'time-garden-time-gate',
    title: { zh: '回潮门', en: 'Time Gate' },
    description: {
      zh: '关卡出口与回潮通道的门框造型，也作为密室中切换时间状态的视觉边界。',
      en: 'A gateway framing level exits and time-shift passages, reused as a visual threshold in the hidden chamber.',
    },
    model: '/models/time-garden/time-gate-v1.glb',
    poster: '/model-posters/time-garden/time-gate-v1.png',
    tags: ['Meshy AI', 'Text to 3D', '60K tris', '3.2 MB'],
    aiMode: 'text',
  },
  {
    id: 'time-garden-ancestral-hall',
    title: { zh: '宗祠正殿', en: 'Ancestral Hall' },
    description: {
      zh: '夜间档案场景的主体建筑，用于承载家族历史、文献线索与关键叙事节点。',
      en: 'The principal building of the night archive scene, housing family history, documents and major story clues.',
    },
    model: '/models/time-garden/ancestral-hall-v1.glb',
    poster: '/model-posters/time-garden/ancestral-hall-v1.png',
    tags: ['Meshy AI', 'Text to 3D', '58K tris', '5.7 MB'],
    aiMode: 'text',
  },
  {
    id: 'time-garden-shenzhaoye-child',
    title: { zh: '沈照野 · 少年', en: 'Shen Zhaoye · Age 12' },
    description: {
      zh: '沈照野十二岁时期的原始角色模型；游戏内版本在此基础上完成骨骼绑定与动作适配。',
      en: 'The original model for twelve-year-old Shen Zhaoye, later rigged and adapted for animation in the game.',
    },
    model: '/models/time-garden/shenzhaoye-child-v1.glb',
    poster: '/model-posters/time-garden/shenzhaoye-child-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '67K tris', '3.8 MB'],
    aiMode: 'image',
  },
  {
    id: 'time-garden-shenzhaoye-elder',
    title: { zh: '沈照野 · 晚年', en: 'Shen Zhaoye · Age 109' },
    description: {
      zh: '沈照野一百零九岁时期的原始角色模型，用于表现跨越九十七年的时间跨度。',
      en: 'The original model for Shen Zhaoye at age 109, visualising the story’s ninety-seven-year span.',
    },
    model: '/models/time-garden/shenzhaoye-elder-v1.glb',
    poster: '/model-posters/time-garden/shenzhaoye-elder-v1.png',
    tags: ['Meshy AI', 'Image to 3D', '67K tris', '3.9 MB'],
    aiMode: 'image',
  },
].map((asset) => ({
  ...asset,
  project: timeGardenProject,
  sourceCode: privateSource('Jt4936/TimeGarden'),
  provenance: {
    tools: ['Meshy'],
    summary: asset.aiMode === 'text'
      ? {
          zh: '由 Meshy 文生 3D 与 AI 贴图流程生成，经本人筛选、压缩并适配到项目中。',
          en: 'Generated with Meshy text-to-3D and AI texturing, then selected, compressed and adapted for the project by me.',
        }
      : {
          zh: '由 Meshy 图生 3D 流程生成，经本人筛选、压缩并适配到项目中。',
          en: 'Generated with Meshy image-to-3D, then selected, compressed and adapted for the project by me.',
        },
    createdAt: '2026-09',
  },
}))

export const modelAssets = [...slotKingdomAssets, ...timeGardenAssets]

export default modelAssets

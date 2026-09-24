export const timeGarden = {
  slug: 'time-garden',
  accent: '#dfbd7c',
  title: 'Time Garden',
  titleZh: '他年灯下',
  subtitle: { zh: '五个年龄，共同寻找一条回家的路', en: 'Five ages. One path home.' },
  tags: ['Unreal Engine 5.7', 'Windows Demo', '时间因果解谜', '叙事', 'AI 辅助制作'],
  tagsEn: ['Unreal Engine 5.7', 'Windows Demo', 'Time Puzzles', 'Narrative', 'AI-assisted'],
  cover: '/games/time-garden/cover.webp',
  links: {
    source: 'https://github.com/Jt4936/TimeGarden',
    sourceLabel: { zh: 'GitHub · 私有工程', en: 'GitHub · private project' },
    assets: '/ai-assets?project=time-garden',
    contact: 'mailto:hujintao12@126.com?subject=Time%20Garden%20Demo',
  },
  sourceStatus: {
    zh: '已有 Windows 可玩 Demo；体验与源码交流请联系我。GitHub 工程为私有，需要访问权限。',
    en: 'A playable Windows demo is available on request. Contact me about trying it or discussing the source; the GitHub project requires access.',
  },
  blocks: [
    { type: 'stats', items: [
      { k: { zh: '类型', en: 'Genre' }, v: { zh: '第三人称 · 叙事解谜', en: 'Third-person narrative puzzle' } },
      { k: { zh: '引擎', en: 'Engine' }, v: { zh: 'Unreal Engine 5.7.3', en: 'Unreal Engine 5.7.3' } },
      { k: { zh: '平台', en: 'Platform' }, v: { zh: 'Windows 64 位', en: 'Windows 64-bit' } },
      { k: { zh: '结构', en: 'Structure' }, v: { zh: '五个主关 + 一个终局', en: 'Five chapters + a finale' } },
      { k: { zh: '分工', en: 'My role' }, v: { zh: '创作主导 · 设计与迭代', en: 'Creative direction · design & iteration' } },
      { k: { zh: '版本', en: 'Version' }, v: { zh: '1.3.0-demo · 持续打磨', en: '1.3.0-demo · in refinement' } },
    ] },
    { type: 'text', h: { zh: '后来走过的路，是年少时留下的', en: 'The path ahead was left by a younger self' }, body: [
      { zh: '《他年灯下》是我主导设计与迭代、借助 AI 完成制作的第三人称时间因果解谜 Demo。故事围绕龟背庭院中的一家人展开：守灯的父亲困在一场时间灾变之中，沈照野在不同年龄追寻线索，尝试找到让家人重聚的方法。', en: 'Time Garden is a third-person time-causality puzzle demo that I led through design and iteration with AI-assisted production. Set around a family courtyard carried by a giant tortoise, it follows Shen Zhaoye across different ages as he searches for a way to reunite his family after his lampkeeper father is caught in a temporal disaster.' },
      { zh: '玩家按线索进入错序年代，观察同一片空间如何变化，把信息与准备从一个时期传到另一个时期。桃树、井口、命灯与屋舍既是生活留下的痕迹，也是理解时间关系的线索；故事逐渐从“把失去的人带回来”，转向如何理解家人的选择与等待。', en: 'The journey unfolds through clues rather than chronological order. Observe how familiar places change and pass information and preparations between periods. A peach tree, well, life lamp and house serve as both traces of family life and clues to temporal relationships. The story asks how a wish to bring someone home can grow into an understanding of their choices and the years spent waiting.' },
    ] },
    { type: 'pillars', h: { zh: '让时间成为解谜的一部分', en: 'Making time part of the puzzle' }, items: [
      { t: { zh: '辨认年代', en: 'Recognise the period' }, d: { zh: '通过人物、环境和对话判断自己身处何时；五个年龄拥有不同信息，玩家跟随故事线索逐章进入不同年代。', en: 'Read characters, surroundings and conversations to understand when you are. Five ages hold different information, and the story leads you through a set sequence of chapters.' } },
      { t: { zh: '传递因果', en: 'Pass cause into effect' }, d: { zh: '童年的种植、中年的养护和晚年的根路彼此联系。眼前缺少的条件，可能需要在另一个年代完成准备。', en: 'Childhood planting, care in middle age and roots in later life are connected. A missing condition in the present may need preparation in another period.' } },
      { t: { zh: '观察与行动', en: 'Observe, then act' }, d: { zh: '在水路、灯房和庭院中观察机关关系，通过交互、物件与线索推进；短战斗穿插其间，服务于故事节奏。', en: 'Study mechanisms in waterworks, light rooms and courtyards, then use interactions, objects and clues to progress. Brief combat encounters support the pacing of the story.' } },
    ] },
    { type: 'gallery', contain: true, h: { zh: '开发实机与界面', en: 'Development gameplay & interface' }, images: [
      { src: '/games/time-garden/title-scroll.webp', cap: { zh: '卷轴主菜单 · 开发阶段界面', en: 'Scroll-inspired title menu · development interface' } },
      { src: '/games/time-garden/tortoise-courtyard.webp', cap: { zh: '晚年龟背庭院 · 编辑器内开发实机', en: 'The courtyard in later life · gameplay in the editor' } },
      { src: '/games/time-garden/city-waterworks.webp', cap: { zh: '长春城水路机关 · 开发阶段观察视角', en: 'Changchun City waterworks · development observation view' } },
      { src: '/games/time-garden/ancestral-light-room.webp', cap: { zh: '宗祠灯房 · 编辑器内开发实机', en: 'Ancestral hall light room · gameplay in the editor' } },
      { src: '/games/time-garden/childhood-alignment.webp', cap: { zh: '童年庭院视角机关 · 早期迭代', en: 'Childhood courtyard alignment puzzle · an earlier iteration' } },
      { src: '/games/time-garden/cover.webp', cap: { zh: '龟堡与桃树 · 开发阶段 UE 场景展示', en: 'Tortoise fortress and peach tree · development scene in Unreal Engine' } },
    ], note: { zh: '以上为开发过程中留存的实机与场景展示，不同画面来自不同迭代；界面和关卡细节与当前交付版可能有所不同。', en: 'These gameplay and scene captures document different stages of development. Interface and level details may differ from the current delivery build.' } },
    { type: 'cards', h: { zh: '当前 Demo 内容', en: 'In the current demo' }, items: [
      { t: { zh: '五个主关与终局', en: 'Five chapters and a finale' }, d: { zh: '围绕庭院、长春城、宗祠与井底展开跨年代旅程，逐步串起调查、机关与救援。', en: 'A journey through courtyards, Changchun City, an ancestral hall and the well, connecting investigation, mechanisms and rescue across time.' } },
      { t: { zh: '两种难度', en: 'Two difficulty modes' }, d: { zh: '简易模式提供任务与分步提示；困难模式保留原始证据，要求到机关旁操作，再回观察点检查结果。', en: 'Easy mode provides objectives and staged hints. Hard mode retains original evidence and requires operating mechanisms in person before checking the result from an observation point.' } },
      { t: { zh: '掌中时录', en: 'A journal across time' }, d: { zh: '记录任务与已发现的线索，帮助玩家回顾当前目标和跨年代关联。', en: 'Track objectives and discovered clues to revisit the current task and relationships between periods.' } },
      { t: { zh: '保存与继续', en: 'Save and continue' }, d: { zh: '支持存档继续、暂停与重试，并用过场衔接故事节点。', en: 'Save and continue, pause and retry, with cutscenes connecting key story moments.' } },
    ] },
    { type: 'cards', h: { zh: '基本操作', en: 'Controls' }, items: [
      { t: { zh: 'WASD / 鼠标', en: 'WASD / mouse' }, d: { zh: '移动 / 环视；Space 跳跃，Shift 奔跑。', en: 'Move / look; Space to jump and Shift to sprint.' } },
      { t: { zh: 'E / V', en: 'E / V' }, d: { zh: 'E 交互、对话、拾取或交付；V 在机关观察点查看整体状态。', en: 'E to interact, talk, pick up or deliver; V to inspect a puzzle from its observation point.' } },
      { t: { zh: 'Tab / Esc', en: 'Tab / Esc' }, d: { zh: '打开掌中时录 / 返回或暂停；H 查看简易模式提示，R 重置本章。', en: 'Open the journal / go back or pause; H for Easy-mode hints and R to reset the chapter.' } },
      { t: { zh: '鼠标左键 / 右键', en: 'Left / right mouse' }, d: { zh: '剧情战斗中的攻击 / 防守。', en: 'Attack / defend during story encounters.' } },
    ] },
    { type: 'text', h: { zh: '我的制作职责与 AI 使用', en: 'My role & use of AI' }, body: [
      { zh: '我提供故事原稿与创作方向，主导时间机制、关卡流程和视觉方向的设计决策，并通过亲自试玩提出问题、调整引导与谜题。制作过程中使用 AI 辅助程序与场景脚本实现、模型和影像生成、合成配音及文档整理，再将这些内容整合为 Unreal Engine 中可运行的 Demo。', en: 'I supplied the story drafts and creative direction, led decisions about time mechanics, level flow and visual presentation, and used my own playtests to refine puzzles and guidance. AI assisted with code and scene scripts, generated models and imagery, synthesised voices and documentation, with the results integrated into a playable Unreal Engine demo.' },
      { zh: '网站资源库单独展示本项目使用的 AI 模型，并标注生成工具与后续处理；可以旋转、缩放查看。模型使用、Demo 体验与源码交流请联系我。完整游戏也使用了引擎模板、字体与音效等其他资源，具体来源在项目资源备注中记录。', en: 'The asset gallery presents the AI-generated models used in this project, including their tools and subsequent processing, with rotation and zoom controls. Contact me about model use, trying the demo or discussing the source. The complete game also uses engine templates, fonts and audio from other sources, documented in the project credits.' },
    ] },
    { type: 'text', h: { zh: 'Demo 与后续打磨', en: 'Demo status & further refinement' }, body: [
      { zh: '目前已有独立 Windows 运行包，并完成启动与部分章节专项检查。后续继续打磨关卡引导、交互反馈、美术一致性与完整流程体验；欢迎联系我交流或体验。', en: 'A standalone Windows build is available, with startup checks and selected chapter checks completed. Further work focuses on level guidance, interaction feedback, visual consistency and the full play experience. Contact me to discuss or try the demo.' },
    ] },
  ],
}

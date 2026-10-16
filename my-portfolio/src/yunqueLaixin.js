export const yunqueLaixin = {
  slug: 'yunque-laixin',
  accent: '#8bc8bd',
  title: 'Yunque Laixin',
  titleZh: '云阙来信',
  subtitle: { zh: '从山村凡人出发，走向修行与更广阔的天地', en: 'From village life to a path of cultivation' },
  tags: ['Unreal Engine 5.7', 'Windows', '修炼与战斗', '开发原型', 'AI 辅助制作'],
  tagsEn: ['Unreal Engine 5.7', 'Windows', 'Cultivation & Combat', 'Prototype', 'AI-assisted'],
  cover: '/games/yunque-laixin/cover.webp',
  links: {
    source: 'https://github.com/Jt4936/yunque-laixin',
    sourceLabel: { zh: 'GitHub · 私有工程', en: 'GitHub · private project' },
    contact: 'mailto:hujintao12@126.com?subject=Yunque%20Laixin%20Preview',
  },
  sourceStatus: {
    zh: 'Windows 开发预览 · 持续制作中。GitHub 工程为私有，试玩与源码交流请联系我。',
    en: 'A Windows development preview, currently in production. The GitHub project is private; contact me about trying it or discussing the source.',
  },
  blocks: [
    { type: 'stats', items: [
      { k: { zh: '方向', en: 'Direction' }, v: { zh: '修仙 · 战斗与成长', en: 'Cultivation · combat & progression' } },
      { k: { zh: '引擎', en: 'Engine' }, v: { zh: 'Unreal Engine 5.7.3', en: 'Unreal Engine 5.7.3' } },
      { k: { zh: '平台', en: 'Platform' }, v: { zh: 'Windows 64 位', en: 'Windows 64-bit' } },
      { k: { zh: '首章原型', en: 'Chapter prototype' }, v: { zh: '0.5.11 · 凡人入道', en: '0.5.11 · entering cultivation' } },
      { k: { zh: '场景预览', en: 'Scene preview' }, v: { zh: '0.5.17 · 081 候选', en: '0.5.17 · scene 081 candidate' } },
      { k: { zh: '分工', en: 'My role' }, v: { zh: '创作方向 · 规则与迭代', en: 'Creative direction · rules & iteration' } },
    ] },
    { type: 'text', h: { zh: '先做一个凡人，再开始修行', en: 'Begin as an ordinary person' }, body: [
      { zh: '《云阙来信》是我主导创作方向、核心规则和质量目标，借助 AI 协作推进的修仙游戏项目。当前开发围绕修炼与战斗展开，让剧情、人物关系和探索服务于角色成长：玩家从普通山村出发，进城交易、带着所得返乡，再逐步接触宗门与修行。', en: 'Yunque Laixin is a cultivation game project whose creative direction, core rules and quality goals I lead, with AI-assisted production. Current development centres on cultivation and combat, supported by story, relationships and exploration. The journey begins in an ordinary mountain village, leads to trade in the city and a return home, then opens a path into a sect and cultivation.' },
      { zh: '我希望玩家能感受到从步行赶路、学习自保到逐渐获得力量的变化。现阶段先验证一条可以走通的旅程与基础战斗规则，再打磨人物、场景和演出；完整开放世界、正式御剑与高阶成长仍是后续开发内容。', en: 'I want progression to be felt through the shift from travelling on foot and learning to defend oneself to gradually gaining power. The current focus is a traversable journey and foundational combat rules, followed by character, environment and presentation work. A complete open world, player sword flight and advanced progression remain future development.' },
    ] },
    { type: 'pillars', h: { zh: '三个设计重点', en: 'Three design priorities' }, items: [
      { t: { zh: '旅程要有因果', en: 'A journey with consequences' }, d: { zh: '出村交易和返乡交付形成连续任务链，入宗与首次修炼接在旅程之后，让成长有清楚的起点。', en: 'Trading in the city and delivering goods back home form a continuous quest chain. Joining a sect and beginning cultivation follow that journey, giving progression a clear starting point.' } },
      { t: { zh: '战斗要有取舍', en: 'Choices in combat' }, d: { zh: '基础剑术以攻击时机、正面格挡、闪避和体力消耗构成试作；小范围法术与灵力恢复补充战斗选择。', en: 'The combat prototype combines attack timing, directional blocking, dodging and stamina costs. Small-scale spells and recovering spiritual energy add further choices.' } },
      { t: { zh: '成长要能感知', en: 'Progression you can feel' }, d: { zh: '从凡人到首次引气，再通过试炼感受属性与能力变化；更完整的境界、功法、装备和机缘体系继续迭代。', en: 'Move from ordinary life to the first cultivation step, then test changes in ability through a trial. Broader realm, technique, equipment and opportunity systems are still being developed.' } },
    ] },
    { type: 'timeline', h: { zh: '首章《凡人入道》的最小流程', en: 'The first chapter’s prototype journey' }, items: [
      { t: { zh: '山村 · 带着目的出发', en: 'Village · leave with a purpose' }, d: { zh: '领取土产，沿道路步行前往城市交易点。', en: 'Collect local goods and travel on foot to the city trading point.' } },
      { t: { zh: '城市 · 交易后返乡', en: 'City · trade and return' }, d: { zh: '换得药物与钱款，再回村交付，完成出行与返乡的闭环。', en: 'Trade for medicine and money, then deliver the medicine back home to complete the outward-and-return journey.' } },
      { t: { zh: '宗门 · 从引气到试炼', en: 'Sect · cultivation and a trial' }, d: { zh: '经过招募与接引，在指定地点首次修炼，再与试炼傀儡交战。当前使用原型标记和文字引导，正式 NPC 与剧情演出尚待完善。', en: 'Proceed through recruitment and reception, cultivate at the designated place, then face a training dummy. The current flow uses prototype markers and text guidance; final NPCs and story presentation are still in progress.' } },
    ] },
    { type: 'cards', h: { zh: '已实现的原型范围', en: 'Implemented prototype scope' }, items: [
      { t: { zh: '任务与交互门槛', en: 'Quest and interaction conditions' }, d: { zh: '连续步行路线串起交易、交付、招募、引气和试炼；交互检查玩家距离与任务顺序。', en: 'A continuous walking route connects trading, delivery, recruitment, cultivation and a trial, with distance and quest-order checks on interactions.' } },
      { t: { zh: '基础战斗与修炼', en: 'Foundational combat and cultivation' }, d: { zh: '已有剑术伤害、格挡、闪避、小法术、基础成长及战败复活的机制试作；动作、音画反馈与长期平衡继续打磨。', en: 'Mechanic prototypes cover sword damage, blocking, dodging, small spells, basic progression and defeat recovery. Animation, audiovisual feedback and long-term balance remain in refinement.' } },
      { t: { zh: '山村、城市与宗门场景', en: 'Village, city and sect environments' }, d: { zh: '已有可运行的场景预览，持续处理山体轮廓、岩石尺度、地面、道路、门窗与植被。当前仍属美术迭代。', en: 'Runnable scene previews support ongoing work on mountain silhouettes, rock scale, ground, roads, doors, windows and vegetation. The environment remains an art work in progress.' } },
      { t: { zh: '独立探景模式', en: 'Separate scene inspection' }, d: { zh: 'F1 用于开发探景，和正式任务、战斗奖励及玩家进度隔离；它不代表正式御剑玩法。', en: 'F1 provides a development inspection mode separated from quests, combat rewards and player progress. It is not the planned sword-flight mechanic.' } },
    ] },
    { type: 'gallery', contain: true, h: { zh: '开发实机与场景迭代', en: 'Gameplay captures & environment iteration' }, images: [
      { src: '/games/yunque-laixin/market.webp', cap: { zh: '首章 0.5.11 · 完成交易，带药返乡', en: 'Chapter 0.5.11 · returning home with medicine after trading' } },
      { src: '/games/yunque-laixin/cultivation.webp', cap: { zh: '首章 0.5.11 · 首次引气，进入炼气一层', en: 'Chapter 0.5.11 · the first cultivation step' } },
      { src: '/games/yunque-laixin/trial.webp', cap: { zh: '首章 0.5.11 · 击破训练目标，获得历练', en: 'Chapter 0.5.11 · completing the training trial' } },
      { src: '/games/yunque-laixin/pharmacy.webp', cap: { zh: '首章 0.5.11 · 药铺柜台与民居近景', en: 'Chapter 0.5.11 · a pharmacy counter and village architecture' } },
      { src: '/games/yunque-laixin/cover.webp', cap: { zh: '场景候选 0.5.17 / 081 · 山体、岩纹与村路迭代', en: 'Scene candidate 0.5.17 / 081 · mountains, rock surfaces and village roads' } },
    ], note: { zh: '均为项目实际运行画面，保留各自版本的原型界面与场景状态；整体美术仍在制作中。', en: 'All images are captured from the running project, retaining each version’s prototype interface and environment state. Overall art production is ongoing.' } },
    { type: 'cards', h: { zh: '开发中的技术实践', en: 'Engineering work behind the prototype' }, items: [
      { t: { zh: '跨帧检查剑术命中', en: 'Sword hit checks across frames' }, d: { zh: '按前后两帧与攻击有效窗的交集检查命中，并为每次挥剑记录已命中目标，降低漏判与重复伤害。', en: 'Check the overlap between successive frames and the attack window, tracking targets already hit by each swing to reduce missed hits and duplicate damage.' } },
      { t: { zh: '把探景和游戏状态分开', en: 'Separate inspection from gameplay' }, d: { zh: '自由观察场景时保留正式玩家的位置、任务和战斗资源，避免开发镜头意外推进玩法。', en: 'Preserve the player’s position, quest state and combat resources during free scene inspection, so the development camera does not advance gameplay.' } },
      { t: { zh: '先做一小片区域加载', en: 'Start streaming with a small region' }, d: { zh: '已在市场装饰区域验证加载样板，合并玩家与观察镜头的需求，以不同进出阈值减少边界反复加载；范围尚未扩展到完整世界。', en: 'A small market-decoration region tests streaming based on both player and inspection-camera needs, using different entry and exit thresholds to reduce boundary churn. This is not yet world-wide streaming.' } },
      { t: { zh: '用实机对照推进美术', en: 'Iterate through in-engine comparisons' }, d: { zh: '分别检查几何、法线与最终材质，使用同机位对照定位山体和岩纹问题；美术、功能与性能分别记录结果。', en: 'Compare geometry, normals and final materials from matching viewpoints to identify mountain and rock-texture issues, recording art, functionality and performance separately.' } },
    ] },
    { type: 'cards', h: { zh: '首章原型操作', en: 'Chapter prototype controls' }, items: [
      { t: { zh: 'WASD / 鼠标', en: 'WASD / mouse' }, d: { zh: '步行与转向；当前战斗使用第一人称试作视角。', en: 'Walk and look; the current combat prototype uses a first-person view.' } },
      { t: { zh: '左键 / 右键 / Space', en: 'Left / right mouse / Space' }, d: { zh: '剑术攻击 / 按住正面格挡 / 消耗体力闪避。', en: 'Sword attack / hold to block frontal attacks / dodge using stamina.' } },
      { t: { zh: 'E / R / Q', en: 'E / R / Q' }, d: { zh: '任务交互 / 在获准地点尝试修炼 / 引气后施放小法术。', en: 'Quest interaction / attempt cultivation where permitted / cast a small spell after the first cultivation step.' } },
      { t: { zh: 'F1 / Esc', en: 'F1 / Esc' }, d: { zh: '切换独立开发探景镜头 / 释放或收回鼠标。探景与正式角色控制不同。', en: 'Toggle the separate development camera / release or recapture the mouse. Inspection controls differ from player controls.' } },
    ], note: { zh: '以上为首章玩法原型的控制方式；081 场景候选主要用于观察环境，不能将探景功能当作完整玩法。', en: 'These controls describe the chapter gameplay prototype. Scene 081 is primarily an environment preview; inspection tools do not represent the complete gameplay experience.' } },
    { type: 'text', h: { zh: '开发过程：从叙事探索到修炼首章', en: 'From narrative experiments to a cultivation chapter' }, body: [
      { zh: '项目早期尝试过五章分支叙事、对白选择、解谜、手记与存读档，并制作了云中山门等环境研究。随着方向明确，开发重心转向“凡人入道”的连续旅程、剑术与成长。旧叙事原型仍作为独立阶段保留，它的章节与存档功能不代表已经全部接入新首章。', en: 'Early development explored a five-chapter branching narrative, dialogue choices, puzzles, a journal and saves, alongside environment studies such as a mountain gate above the clouds. The focus later shifted to a continuous journey into cultivation, sword combat and progression. The earlier narrative prototype remains a separate stage; its chapters and save system are not all integrated into the new opening.' },
    ] },
    { type: 'gallery', contain: true, h: { zh: '早期探索留影', en: 'Earlier development studies' }, images: [
      { src: '/games/yunque-laixin/historical-gate.webp', cap: { zh: '历史场景 047 · 云中山门环境研究', en: 'Historical scene 047 · a mountain-gate environment study' } },
      { src: '/games/yunque-laixin/historical-dialogue.webp', cap: { zh: '旧叙事原型 · 分支对白界面', en: 'Earlier narrative prototype · branching dialogue interface' } },
    ], note: { zh: '以上两图来自旧叙事与场景研究，展示创作过程；不是当前首章或 081 预览的最终画面。', en: 'These two captures document earlier narrative and environment studies, rather than the current chapter or final visuals for preview 081.' } },
    { type: 'text', h: { zh: '版本与开发状态', en: 'Versions & development status' }, body: [
      { zh: '0.5.11 / 058 保留首章玩法基线；0.5.17 / 081 是后续山体与场景的 Windows 开发预览。两者用途不同，场景迭代不等于整款游戏已经完成。源码快照也包含后续诊断候选，不能把它们当作已通过验收的新版本。', en: 'Version 0.5.11 / scene 058 retains the first-chapter gameplay baseline; 0.5.17 / scene 081 is a later Windows preview for mountain and environment work. Scene iteration does not imply completion of the game. The source snapshot also includes later diagnostic candidates that are not approved releases.' },
      { zh: '下一阶段继续完善战斗动作与反馈、正式人物与剧情、完整成长存读档，以及区域加载和画面优化。整体美术与目标硬件性能仍在验证中。', en: 'Further work includes combat animation and feedback, final characters and narrative presentation, complete progression saves, regional loading and rendering improvements. Overall art quality and target-hardware performance are still under evaluation.' },
    ] },
    { type: 'text', h: { zh: '我的职责与制作方式', en: 'My contribution & production process' }, body: [
      { zh: '我负责作品方向、核心规则、体验要求与质量判断，通过验收与反馈推动迭代。AI 协助代码实现、资产生成与集成、资料整理和验证；我对玩法取舍和最终呈现进行选择与确认。', en: 'I lead the creative direction, core rules, experience requirements and quality decisions, using reviews and feedback to guide iteration. AI assists with implementation, asset generation and integration, documentation and verification, while I review gameplay trade-offs and the resulting presentation.' },
      { zh: '项目结合 Meshy 生成模型、Poly Haven 扫描素材、引擎相关资源和本地制作内容。GitHub 保存源代码与资源来源记录；各类素材保留各自使用条件。若想了解制作流程、体验预览或交流资源使用，请联系我。', en: 'The project combines Meshy-generated models, Poly Haven scan assets, engine resources and locally produced content. Source code and provenance records are kept on GitHub, with the respective conditions retained for each asset source. Contact me about the production process, trying the preview or discussing asset use.' },
    ] },
  ],
}

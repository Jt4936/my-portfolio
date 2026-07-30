// ── Game case-study content ──────────────────────────────
// Each game is a list of typed blocks that GamePage renders.
// Text fields are { zh, en } so case studies follow the language toggle.

export const games = {
  abyss: {
    slug: 'abyss',
    accent: '#c8f04a',
    title: 'Abyss of Ends',
    titleZh: '有尽深渊',
    subtitle: { zh: 'GMTK Game Jam 2026 · 84 小时独立完成的 Roguelite', en: 'A roguelite built solo in 84 hours for GMTK Game Jam 2026' },
    tags: ['Unity 6', 'Roguelite', '系统设计', '数值平衡', '关卡'],
    tagsEn: ['Unity 6', 'Roguelite', 'Systems', 'Balancing', 'Level'],
    cover: '/games/abyss/shot-30.jpg',
    links: {
      play: 'https://jt4936.itch.io/abyss-of-ends',
      source: 'https://github.com/Jt4936/abyss-descent',
    },
    blocks: [
      { type: 'stats', items: [
        { k: { zh: '类型', en: 'Genre' }, v: { zh: 'Roguelite 地牢', en: 'Roguelite dungeon' } },
        { k: { zh: '引擎', en: 'Engine' }, v: { zh: 'Unity 6 · WebGL', en: 'Unity 6 · WebGL' } },
        { k: { zh: '周期', en: 'Timeframe' }, v: { zh: '~84 小时 / 4 天', en: '~84 hrs / 4 days' } },
        { k: { zh: '提交', en: 'Commits' }, v: { zh: '140+ 次', en: '140+' } },
        { k: { zh: '分工', en: 'Role' }, v: { zh: '独立 · 设计/程序/数值/关卡/文案', en: 'Solo · design/code/balance/level/writing' } },
        { k: { zh: '语言', en: 'Locale' }, v: { zh: '中 / 英 双语', en: 'CN / EN' } },
      ]},
      { type: 'text', h: { zh: '把主题做成系统，而不是包装', en: 'The theme as a system, not a skin' }, body: [
        { zh: '参赛主题是「COUNT DOWN 倒计时」。我没有把倒计时当成一个界面上的计时器，而是让整个游戏本身就是一次倒数——从三个层面同时成立。', en: 'The jam theme was "COUNT DOWN". Instead of a UI timer, I made the entire game a countdown that holds true on three levels at once.' },
      ]},
      { type: 'cards', h: { zh: '三重倒计时', en: 'Three countdowns' }, items: [
        { t: { zh: '空间倒计时', en: 'Spatial' }, d: { zh: '玩家从第 100 层下潜到第 0 层，层数是全程可见的倒数进度条。', en: 'You descend from floor 100 to floor 0 — the floor number is a progress bar counting down the whole run.' } },
        { t: { zh: '资源倒计时', en: 'Resource' }, d: { zh: '每下一层，深渊索要一次献祭：交出一项属性，或一段与好友的回忆。你的「自我」被一路倒数清空。', en: 'Each floor demands a sacrifice — a stat, or a memory of your friend. Your "self" is counted down to nothing.' } },
        { t: { zh: '叙事倒计时', en: 'Narrative' }, d: { zh: '回忆共 9 段，保留 ≥8 段触发重逢好结局；否则终点等你的是「堕落的阿彻」，你献祭的每一点数值都长在他身上。', en: 'Keep ≥8 of 9 memories for the reunion ending; otherwise a fallen Archer waits at the bottom — every stat you gave up grew on him instead.' } },
      ]},
      { type: 'pillars', h: { zh: '三条不动摇的设计支柱', en: 'Three design pillars' }, items: [
        { t: { zh: '你交出去的都会回来', en: 'What you give up comes back' }, d: { zh: '每次献祭 1:1 映射到最终 BOSS——力量流越强，终局越难。', en: 'Every sacrifice maps 1:1 onto the final boss — the stronger you get, the harder the ending.' } },
        { t: { zh: '力量救自己，回忆救朋友', en: 'Power saves you, memory saves your friend' }, d: { zh: '反哺层二选一，数值校准到「力量诱人但不碾压」。', en: 'A binary reward each tier, tuned so power is tempting but never trivialises the run.' } },
        { t: { zh: '死亡即清零', en: 'Death resets everything' }, d: { zh: '死亡回出生值、献祭清空、金币归零，唯一保留是跳过新手引导。', en: 'On death, stats revert, sacrifices clear, gold zeroes — the only thing kept is skipping the tutorial.' } },
      ]},
      { type: 'text', h: { zh: '核心循环', en: 'Core loop' }, body: [
        { zh: '村庄引导（教学+剧情）→ 进入 100 层 →【每层：清层战斗 → 楼梯口献祭抉择 → 下一层】；每 10 层 BOSS 战后进入反哺层（力量 vs 回忆）；沿途穿插商人层、存档雕像、伏击房、密室、宗师隐藏房 → 第 1 层深渊之主（双形态）→ 第 0 层阿彻（双结局）。', en: 'Village tutorial → enter floor 100 → [each floor: clear combat → sacrifice choice at the stairs → descend]; a boss every 10 floors then a power-vs-memory tier; interspersed with merchants, save statues, ambush rooms, secret rooms and hidden master chambers → the Abyss Lord at floor 1 (two phases) → Archer at floor 0 (two endings).' },
      ]},
      { type: 'cards', h: { zh: '怪物系统蓝图', en: 'Enemy roster' }, items: [
        { t: { zh: '哥布林 · 基础压力', en: 'Goblin · pressure' }, d: { zh: '承诺式短突刺：预警→冲刺+持续判定，可后退/侧移躲避。', en: 'Telegraphed dash — warning → lunge with a lasting hitbox you can sidestep.' } },
        { t: { zh: '小恶魔 · 节奏破坏', en: 'Imp · tempo-breaker' }, d: { zh: '+40% 移速，贴身自爆；血量固定 1、免疫弹道——逼你近战应对。', en: '+40% speed, self-destructs point-blank; 1 HP, immune to projectiles — forces melee.' } },
        { t: { zh: '重甲兵 · 阵地威胁', en: 'Ogre · zone threat' }, d: { zh: '高血高攻低速免击退；4 格外投石，弯腰前摇可读。', en: 'Tanky, slow, knockback-immune; lobs rocks from 4 tiles with a readable wind-up.' } },
        { t: { zh: '深渊法师 · 远程风筝', en: 'Shaman · kiter' }, d: { zh: '保持距离放闪电球（命中麻痹）；被贴脸会闪现拉开，技能需视线。', en: 'Kites with paralysing orbs; blinks away when cornered, needs line of sight.' } },
        { t: { zh: '精英恶魔 · 反哺守关', en: 'Elite demon · gatekeeper' }, d: { zh: '每 10 层 BOSS 战前身，掉落固定金币。', en: 'Mini-boss before each tier, drops fixed gold.' } },
      ], note: { zh: 'AI 底层：以玩家为源的流场（BFS 距离场）寻路，怪物沿梯度绕墙逼近，杜绝撞墙抽搐；怪物间关闭互相碰撞防卡位；所有投射物做视线检测与提前量。', en: 'AI: a BFS flow-field sourced on the player, so enemies flank around walls without jittering; inter-enemy collision is off to avoid clogging; all projectiles use line-of-sight and target leading.' } },
      { type: 'chart', kind: 'armor', h: { zh: '护甲弧形公式 · 永不到 100%', en: 'Diminishing armor curve · never 100%' }, note: { zh: '减伤率 = def/(def+K)，怪物 K=12、玩家 K=6。一个公式同时解决「深层刮痧」和「玩家叠盾无敌」两个对偶问题，保底 0.1 伤。', en: 'Damage reduction = def/(def+K), K=12 for enemies and 6 for the player. One curve fixes both "chip-damage at depth" and "invincible shield-stacking", with a 0.1 damage floor.' } },
      { type: 'chart', kind: 'ttk', h: { zh: 'TTK 目标 · 用成长曲线建模校准', en: 'TTK targets · tuned with a growth-curve model' }, note: { zh: '每 5 层 +1 级、属性 +25%/级（曾用 30%，建模验证后下调）；目标是全程「杀杂兵 2→3 刀」，不让玩家越玩越钝。手感属性（移速/攻速）封顶 +5%。', en: 'Levels every 5 floors, +25% stats each (down from 30% after modelling); the goal is a steady "2–3 hits to kill a mob" the whole way. Feel-stats (move/attack speed) cap at +5%.' } },
      { type: 'text', h: { zh: '10 层 BOSS 图鉴', en: '10-boss bestiary' }, body: [
        { zh: '每 10 层一个手工脚本化连招 BOSS，从南瓜人、骷髅召唤师、焰鬼、死灵法师、蜥蜴屠夫、腐化巨尸、堕落天使（双形态转生）到深渊暴君（心理战型）、深渊之主（双形态）。核心经验：用固定连招脚本替代自由 AI——技能间隙由基础突袭自然填充，既不站桩也不叠招，每段连招间强制留 1 秒走位窗口。', en: 'A hand-scripted combo boss every 10 floors — from a pumpkin king, skeleton summoner and lava fiend to a necromancer, a two-phase fallen angel and a mind-games tyrant, ending with the two-phase Abyss Lord. Key lesson: fixed combo scripts beat free AI — gaps are filled by a base charge attack so bosses neither idle nor stack skills, with a forced 1-second reposition window between strings.' },
      ]},
      { type: 'cards', h: { zh: '武器五流派', en: 'Five weapon schools' }, items: [
        { t: { zh: '短剑 · 均衡', en: 'Short sword · balanced' }, d: { zh: '唯一初始白装，不可出售，快挥入门。', en: 'The only starting weapon, unsellable — fast, forgiving.' } },
        { t: { zh: '长剑 · 面杀', en: 'Long sword · sweeps' }, d: { zh: '蓄力放飞行剑气；宗师技蓄 0-5 秒决定 1→8 格射程、穿墙越飞越大。', en: 'Charged flying slashes; master art charges 0–5s for 1→8 tile range, piercing walls and growing.' } },
        { t: { zh: '弓 · 远程资源', en: 'Bow · ranged' }, d: { zh: '蓄力满蓄双倍、紫品穿透；伤害=面板×0.3，修掉了绿字加成绕过系数的漏洞。', en: 'Charge for double damage, pierce at purple tier; damage = panel×0.3, fixing a bug where shop bonuses bypassed the coefficient.' } },
        { t: { zh: '双匕首 · 高速背刺', en: 'Daggers · backstab' }, d: { zh: '长按隐身（怪物真丢目标）→ 松开背刺冲刺。', en: 'Hold to vanish (enemies truly lose target) → release for a backstab dash.' } },
        { t: { zh: '枪盾 · 攻防一体', en: 'Spear+shield · hybrid' }, d: { zh: '举盾正面弹道 -90%/近战 -50%；蓄力 5 格无敌冲刺。', en: 'Raised shield blocks 90% ranged / 50% melee; charge for a 5-tile i-frame dash.' } },
        { t: { zh: '拳套 · 贴身爆发', en: 'Fists · burst' }, d: { zh: '3 连击 + 冲拳无敌突进撞墙眩晕。', en: 'Three-hit combo + an i-frame rush that stuns on wall impact.' } },
      ], note: { zh: '品阶白→蓝→绿→紫→金，关键机制（弓穿透、匕首背刺）绑定品阶解锁。宗师武器吞噬 3 件同稀有度武器升一阶（恒定 3 件，防后期成长停滞）。', en: 'Tiers white→blue→green→purple→gold, with key mechanics gated behind tier. Master weapons devour 3 same-rarity weapons to rank up (always 3, so late-game growth never stalls).' } },
      { type: 'text', h: { zh: '终局：献祭 1:1 映射', en: 'Endgame: the sacrifice ledger' }, body: [
        { zh: '阿彻的强度不是查表，而是读取玩家整局的献祭账本动态生成：献祭生命→他血量+20/次，献祭攻击→他攻击+0.5/次，献祭攻速→他突袭冷却-0.08秒/次……配合失去的回忆数参与成长。他的技能组正是你能学的五门宗师技——「你能学会的，他也会」。机制、叙事、主题在最后一战完成闭环。', en: "The final boss isn't a stat table — he's generated from your run's sacrifice ledger: sacrifice HP and he gains +20 HP each time, sacrifice attack and he gains +0.5, and so on, with lost memories feeding his growth. His moveset is exactly the five master arts you could learn — \"anything you can learn, he can too\". Mechanic, narrative and theme close the loop in one fight." },
      ]},
      { type: 'timeline', h: { zh: '4 天迭代大事记 · 140+ 提交', en: '4-day iteration log · 140+ commits' }, items: [
        { t: { zh: 'D1 · 立核心循环', en: 'D1 · core loop' }, d: { zh: '程序化多房间地牢+生态带、闪避无敌帧、武器背包、献祭/赎回商店、流场寻路、反哺二选一、双结局框架——当天「从头到尾能玩通」。', en: 'Procedural multi-room dungeon, dodge i-frames, weapons+inventory, sacrifice/redeem shop, flow-field AI, binary reward, two-ending scaffold — playable end-to-end by nightfall.' } },
        { t: { zh: 'D2 · 手感与内容量', en: 'D2 · feel & content' }, d: { zh: '全量本地化(中英+像素字体)、音效体系、小地图、陷阱/伏击、承诺式怪物攻击、特色怪、双匕首隐身、伤害浮点化。', en: 'Full localisation (CN/EN + pixel font), SFX, minimap, traps, telegraphed enemy attacks, signature mobs, dagger stealth, floating damage.' } },
        { t: { zh: 'D2.5 · BOSS 战体系', en: 'D2.5 · boss framework' }, d: { zh: '一夜落地 10 个 BOSS 初版技能 + 存档系统 + 村庄剧情引导 + 新手教学。', en: 'Ten bosses\' first-pass movesets in one night, plus saves, village story and tutorial.' } },
        { t: { zh: 'D3 · 深度系统与经济闭环', en: 'D3 · depth & economy' }, d: { zh: '宗师隐藏关+吞噬升阶、存档房防刷、金币定额、死亡真重置、枪盾重做、护甲弧形公式两次建模校准。', en: 'Hidden master rooms + devour ranking, anti-scum saves, fixed gold, true death reset, spear+shield rework, two armor-curve tuning passes.' } },
        { t: { zh: 'D3.5 · BOSS 连招精修', en: 'D3.5 · boss polish' }, d: { zh: '三段追击斩、弹墙冲撞、双形态变身演出、心理战重做——每个 BOSS 至少「实测→反馈→重做」两轮。', en: 'Three-hit pursuits, wall-bounce charges, two-phase transform cutscenes, mind-games rework — every boss went through at least two test→feedback→rebuild passes.' } },
        { t: { zh: 'D4 · 终局与发布', en: 'D4 · endgame & ship' }, d: { zh: '阿彻献祭映射、闪避手感调校、调试键屏蔽、一键构建、itch 页面+双语文案+截图，提交 jam。', en: 'Archer sacrifice mapping, dodge-feel tuning, debug keys locked, one-click build, itch page with bilingual copy and screenshots, submitted.' } },
      ]},
      { type: 'cards', h: { zh: '关键问题与解决 · 策划视角', en: 'Design problems solved' }, items: [
        { t: { zh: 'BOSS 追着打快慢刀', en: 'Bosses spam mixed cadence' }, d: { zh: '全局技能互斥 + 固定连招脚本，间隙由基础突袭填充，段间强制 1 秒走位。', en: 'Global skill mutex + fixed combo scripts; gaps filled by base charge, 1s reposition per string.' } },
        { t: { zh: '必中改可躲', en: 'Unavoidable → dodgeable' }, d: { zh: '突进最低时长 0.15 秒 + 位移直达；锁「出手瞬间的位置」而非逐帧追踪。', en: 'Min 0.15s dash + position-teleport; locks onto the position at cast, not frame-by-frame.' } },
        { t: { zh: '深层刮痧 vs 叠盾无敌', en: 'Chip damage vs invincibility' }, d: { zh: '一个弧形公式 def/(def+K)，双侧 K 值分调，同时解决对偶问题。', en: 'One curve def/(def+K) with per-side K solves both dual problems at once.' } },
        { t: { zh: '力量流碾压终局', en: 'Power builds trivialise ending' }, d: { zh: '用刀数建模校准反哺（力量 15 刀 vs 回忆 23 刀），再用献祭映射让力量流终局更强，形成风险对冲。', en: 'Modelled hit-counts to tune rewards (15 vs 23 hits), then the sacrifice mapping makes power builds face a harder boss — a risk hedge.' } },
        { t: { zh: 'SL 大法刷钱', en: 'Save-scum farming' }, d: { zh: '雕像存档 + 物价入档 + 死亡全重置三件套。', en: 'Statue-only saves + prices persisted + full death reset.' } },
        { t: { zh: '发布事故复盘', en: 'Ship-day incidents' }, d: { zh: 'PowerShell GBK 读 UTF-8 损毁脚本、Compress-Archive 反斜杠致 itch CDN 503——本地跑通≠线上跑通。', en: 'PowerShell GBK corrupted UTF-8 scripts; Compress-Archive backslashes caused an itch CDN 503 — "works locally" ≠ "works live".' } },
      ]},
      { type: 'gallery', h: { zh: '实机截图', en: 'In-game' }, images: [
        { src: '/games/abyss/shot-30.jpg', cap: { zh: '第 50 层 · 死灵法师 BOSS 战（紫弓宗师之心）', en: 'Floor 50 · Necromancer boss (purple master bow)' } },
        { src: '/games/abyss/shot-18.jpg', cap: { zh: '下潜战斗 · HUD 与技能冷却', en: 'Descent combat · HUD & cooldowns' } },
        { src: '/games/abyss/shot-42.jpg', cap: { zh: '深层遭遇', en: 'Deep-floor encounter' } },
        { src: '/games/abyss/shot-66.jpg', cap: { zh: '终局逼近', en: 'Approaching the endgame' } },
      ]},
      { type: 'video', src: '/games/abyss/highlight.mp4', poster: '/games/abyss/shot-30.jpg' },
    ],
  },

  zhongkui: {
    slug: 'zhongkui',
    accent: '#ff5533',
    title: 'Zhong Kui · Ch.2 Design',
    titleZh: '钟馗传 · 第二章方案',
    subtitle: { zh: '第一章 Demo 深度拆解 + 第二章「地府篇」GDD 方案', en: 'A teardown of the Ch.1 demo + a full GDD proposal for Chapter 2' },
    tags: ['游戏策划', '设计拆解', 'GDD', '关卡', '数值'],
    tagsEn: ['Game Design', 'Teardown', 'GDD', 'Level', 'Systems'],
    cover: null,
    links: {},
    blocks: [
      { type: 'stats', items: [
        { k: { zh: '性质', en: 'Type' }, v: { zh: '策划分析 + 再创造方案', en: 'Analysis + design proposal' } },
        { k: { zh: '对象', en: 'Subject' }, v: { zh: '《钟馗传》Steam 第一章', en: 'Zhong Kui — Steam Ch.1' } },
        { k: { zh: '实测', en: 'Playtested' }, v: { zh: '~2.5 小时 / 41 组截图', en: '~2.5 hrs / 41 screenshots' } },
        { k: { zh: '产出', en: 'Output' }, v: { zh: '拆解评价 + GDD 格式方案', en: 'Teardown + GDD deck' } },
        { k: { zh: '用途', en: 'For' }, v: { zh: '游戏策划岗位投递', en: 'Game-designer application' } },
      ]},
      { type: 'text', h: { zh: '为什么做这份文档', en: 'Why this document' }, body: [
        { zh: '这不是我开发的游戏，而是一份「设计能力自证」：完整试玩一款已上线的卡通动作 RPG，拆解它的系统为什么成立、短板在哪，再以标准 GDD 格式提出第二章的设计方案。它证明的是我读系统、下判断、写文档的策划基本功。', en: "This isn't a game I built — it's a proof of design skill: play a shipped action-RPG end to end, dissect why its systems work and where they fall short, then write a Chapter-2 proposal in proper GDD format. It shows how I read systems, form judgements and document them." },
      ]},
      { type: 'chart', kind: 'radar', h: { zh: '第一章综合评价（10 分制）', en: 'Chapter 1 scorecard (out of 10)' },
        dims: [
          { label: { zh: '美术演出', en: 'Art & staging' }, score: 9 },
          { label: { zh: '系统养成', en: 'Progression' }, score: 8 },
          { label: { zh: '叙事编排', en: 'Narrative' }, score: 7 },
          { label: { zh: '关卡设计', en: 'Level design' }, score: 6.5 },
          { label: { zh: '战斗手感', en: 'Combat feel' }, score: 6 },
          { label: { zh: '引导体验', en: 'Onboarding' }, score: 5 },
        ],
        note: { zh: '结论：短板不在「创意」而在「兑现」——化形、数值分层、完美闪避这些好设计，需要更强的敌人和更清晰的引导才能发挥价值。', en: "Verdict: the weakness isn't ideas but delivery — smart designs (shapeshifting, tiered stats, perfect-dodge) need stronger enemies and clearer guidance to pay off." } },
      { type: 'cards', h: { zh: '拆解亮点：聪明的设计取舍', en: 'What the teardown praised' }, items: [
        { t: { zh: '化形一套两用', en: 'Shapeshift, reused' }, d: { zh: '变身既用于战斗又用于解谜，一套能力两处复用，玩法密度和开发效率双赚。', en: 'Transformations serve both combat and puzzles — one ability, two uses; density and efficiency both win.' } },
        { t: { zh: '上限1+就近供给', en: 'Cap-1 + local supply' }, d: { zh: '只能带一个化形，收新的时旧的掉原地随时换回——免背包管理，也从根上杜绝卡关。', en: 'Carry only one form; the old one drops where you swap — no inventory chores, and puzzles can never soft-lock.' } },
        { t: { zh: '数值分层有想法', en: 'Tiered stat growth' }, d: { zh: '四象真意：命/法每级+10%，攻/防每级+2%——血法大方、攻防谨慎，是想清楚的设计。', en: 'HP/MP +10% per level, ATK/DEF +2% — generous on survival, careful on power. A considered curve.' } },
        { t: { zh: '天赋双通道', en: 'Two talent paths' }, d: { zh: '拾「魂」（探索向）+ 击杀换点（练度向），兼顾探索奖励与刷怪成长。', en: 'Collect souls (exploration) + kills-for-points (grind) — rewards both playstyles.' } },
      ]},
      { type: 'cards', h: { zh: '第二章方案：针对短板补强', en: 'Chapter 2: fixing the gaps' }, items: [
        { t: { zh: '造会用机制的敌人', en: 'Enemies that use the system' }, d: { zh: '第一章「系统深、敌人弱」。第二章先设计必须靠完美闪避/连招分支才能赢的强敌，把现成深度用起来，而非急着加新机制。', en: "Ch.1 had depth but weak foes. Ch.2 designs enemies you must beat with perfect-dodge and combo branches first — activate existing depth before adding new mechanics." } },
        { t: { zh: '地府枢纽补引导', en: 'Underworld hub' }, d: { zh: '把结尾预告的地府鬼市开放为可玩枢纽，补上第一章缺失的补给、任务发布与结构化引导。', en: 'Open the teased ghost-market as a playable hub — supplies, quests and the structured guidance Ch.1 lacked.' } },
        { t: { zh: '飞行化形补垂直空间', en: 'Flight form' }, d: { zh: '新增飞行/滞空化形，弥补第一章纯平面地形，解锁垂直解谜。', en: 'A flight/hover form fills Ch.1\'s flat terrain, unlocking vertical puzzles.' } },
        { t: { zh: '悬念只放大不揭晓', en: 'Amplify, don\'t reveal' }, d: { zh: '「宝宝」与「后土妖帮」两条线只加深不揭底，反派执念从「想要」升级为「必须尽快拿到」，答案留给终章。', en: 'The two mystery threads deepen but stay unresolved — the villain\'s want becomes urgent need; answers wait for the finale.' } },
      ]},
      { type: 'text', h: { zh: 'GDD 格式落地', en: 'Delivered as a GDD' }, body: [
        { zh: '方案以标准 GDD 结构成文：Overview、Story Elements、Core Gameplay、Art Direction、Formal Elements（目标/规则/冲突/流程）、Core Components（复用 vs 新增两栏，控制开发增量）、Asset Wishlist（美术/UI/音频清单）、Game Flow 流程图、Stretch Goals。开发视角贯穿始终——明确区分「直接复用」与「本章真正要新做」，保证方案可实现而非纸上谈兵。', en: 'The proposal is written as a proper GDD: Overview, Story Elements, Core Gameplay, Art Direction, Formal Elements (objective/rules/conflict/procedure), Core Components (reuse vs new, to control scope), an Asset Wishlist (art/UI/audio), a Game Flow diagram and Stretch Goals. A developer lens runs throughout — clearly splitting "reuse" from "genuinely new" so the plan is buildable, not wishful.' },
      ]},
    ],
  },

  farming: {
    slug: 'farming',
    accent: '#66cc44',
    title: 'Farming',
    titleZh: 'Farming 农场经营',
    subtitle: { zh: '独立开发的低多边形农场建造 RPG', en: 'A solo low-poly farm-and-build RPG' },
    tags: ['Unity', 'C#', '独立开发', '系统'],
    tagsEn: ['Unity', 'C#', 'Solo dev', 'Systems'],
    cover: null,
    links: {
      source: 'https://github.com/Jt4936/Farming-',
    },
    blocks: [
      { type: 'stats', items: [
        { k: { zh: '类型', en: 'Genre' }, v: { zh: '农场经营 / 建造 RPG', en: 'Farm-sim / build RPG' } },
        { k: { zh: '引擎', en: 'Engine' }, v: { zh: 'Unity 3D · C#', en: 'Unity 3D · C#' } },
        { k: { zh: '分工', en: 'Role' }, v: { zh: '个人独立项目', en: 'Solo project' } },
        { k: { zh: '状态', en: 'Status' }, v: { zh: '阶段一 · 系统架构', en: 'Phase 1 · systems' } },
      ]},
      { type: 'text', h: { zh: '概述', en: 'Overview' }, body: [
        { zh: '一个 Unity 3D 低多边形农场 RPG，玩法围绕「农场经营 + 村民互动 + 地牢探索」：在农田种植、浇水、施肥、收获、升级，同时与村民建立关系接取任务，并进入随机生成的地下地牢采矿、获取稀有材料。当前处于阶段一，目标是先把系统架构、数据结构与核心代码框架打稳。', en: 'A Unity 3D low-poly farm RPG built around "farming + villager interaction + dungeon exploration": till, water, fertilise, harvest and upgrade crops, build relationships with villagers for quests, and descend into procedurally generated dungeons to mine rare materials. Currently in Phase 1 — the focus is getting the systems architecture, data structures and core code framework solid first.' },
      ]},
      { type: 'cards', h: { zh: '已搭建的系统框架', en: 'Systems framework built' }, items: [
        { t: { zh: 'FarmGrid 网格系统', en: 'FarmGrid system' }, d: { zh: '基于网格的耕种 / 放置逻辑，支撑作物种植与场景搭建。', en: 'Grid-based tilling and placement driving crops and scene building.' } },
        { t: { zh: '数据层', en: 'Data layer' }, d: { zh: 'ScriptableObject + Runtime Data 分层，配置与运行时状态解耦。', en: 'ScriptableObject + runtime-data split — config decoupled from runtime state.' } },
        { t: { zh: '村庄与地牢框架', en: 'Village & dungeon' }, d: { zh: '村民 AI 框架 + 地牢生成框架，预留存档 / 事件系统扩展接口。', en: 'Villager-AI and dungeon-generation frameworks, with save / event extension hooks.' } },
      ]},
      { type: 'text', h: { zh: '截图', en: 'Screenshots' }, body: [
        { zh: '实机截图更新中——项目仍在系统搭建阶段，美术与可玩场景完善后补充。源码见上方 GitHub。', en: 'In-game screenshots coming soon — the project is still in the systems phase; art and playable scenes will follow. Source on GitHub above.' },
      ]},
    ],
  },

  mecha: {
    slug: 'mecha',
    accent: '#44ddff',
    title: 'ECHO',
    titleZh: '回响',
    subtitle: { zh: 'Unreal Engine 5 科幻 CG 短片 · 两个机械生命的故事', en: 'A UE5 sci-fi short film — a tale of two mechanical lives' },
    tags: ['Unreal Engine 5', 'CG 短片', '场景 / 光照', '镜头 / 剪辑', '叙事'],
    tagsEn: ['Unreal Engine 5', 'CG film', 'Lighting', 'Cinematics', 'Narrative'],
    cover: '/games/mecha/shot-1.jpg',
    links: {},
    blocks: [
      { type: 'stats', items: [
        { k: { zh: '类型', en: 'Type' }, v: { zh: '科幻 CG 短片', en: 'Sci-fi CG short' } },
        { k: { zh: '引擎', en: 'Engine' }, v: { zh: 'Unreal Engine 5', en: 'Unreal Engine 5' } },
        { k: { zh: '时长', en: 'Length' }, v: { zh: '约 90 秒', en: '~90 sec' } },
        { k: { zh: '分工', en: 'Role' }, v: { zh: '个人 · 场景/光照/镜头/剪辑', en: 'Solo · scene/light/camera/edit' } },
      ]},
      { type: 'text', h: { zh: '故事背景', en: 'Setting' }, body: [
        { zh: '这颗星球上只剩下两个机械意识生命：主角「Echo」，以及「Ethan」。他们在同一间实验室里苏醒——但世界的记忆只存在于 Ethan 之中。Echo 一无所知，而 Ethan 既不想让他知道世界的真相，也在觊觎他的躯体。', en: "Only two mechanical consciousnesses remain on this planet: the protagonist, Echo, and Ethan. They awaken in the same laboratory — but the memory of the world exists only inside Ethan. Echo knows nothing, and Ethan intends to keep it that way — while coveting Echo's body." },
      ]},
      { type: 'cards', h: { zh: '三幕', en: 'Three acts' }, items: [
        { t: { zh: '实验室 · 同行', en: 'The Lab · Together' }, d: { zh: '起初两人尚算融洽，一起探索这座沉睡的实验室。但越深入，Echo 越接近那些不该被他看到的东西——Ethan 开始遮蔽真相。', en: 'At first the two get along, exploring the sleeping laboratory side by side. But the deeper they go, the closer Echo comes to what he was never meant to see — and Ethan begins to hide the truth.' } },
        { t: { zh: '背叛 · 机械荒漠', en: 'Betrayal · The Mechanical Waste' }, d: { zh: 'Ethan 露出獠牙，袭击了 Echo，并将他传送至遥远的流沙荒漠。在这片机械尸骸铺成的荒原上，Echo 只能靠自己一路挣扎折返。', en: 'Ethan turns on Echo and hurls him across the world into a desert of flowing sand. On that waste paved with mechanical carcasses, Echo must claw his own way back — alone.' } },
        { t: { zh: '风暴 · 废墟之城', en: 'The Storm · Ruined City' }, d: { zh: '归途未尽，一场风暴将 Echo 卷入废墟之城。这里埋着世界的答案，也埋着 Ethan 布下的最后战场。', en: 'The journey is cut short: a storm sweeps Echo into a ruined city — where the answers about this world lie buried, and where Ethan has laid his final battlefield.' } },
      ]},
      { type: 'pillars', h: { zh: '开放结局 · 三条分支', en: 'Open ending · three branches' }, items: [
        { t: { zh: '融合 · 共生', en: 'Fusion · Coexist' }, d: { zh: '两个意识合而为一，共同存活下去——真相与躯体不再需要争夺，却也再没有"谁是谁"。', en: 'The two consciousnesses merge into one and survive together — no more fighting over truth or body, but also no more "who is who".' } },
        { t: { zh: '败北 · 被夺舍', en: 'Defeat · Overwritten' }, d: { zh: 'Echo 战败，躯体被 Ethan 占据。世界仍旧只有一个声音，而记忆永远不会属于他。', en: 'Echo loses; Ethan takes his body. The world still has only one voice — and the memory will never be his.' } },
        { t: { zh: '胜利 · 夺回', en: 'Victory · Reclaim' }, d: { zh: 'Echo 击败 Ethan，夺回属于自己的大脑与记忆——第一次，他真正知道了这个世界是什么。', en: 'Echo defeats Ethan and reclaims his own brain and memory — for the first time, he truly knows what this world is.' } },
      ]},
      { type: 'text', h: { zh: '设计意图', en: 'Design intent' }, body: [
        { zh: '这个故事的核心冲突不是"打赢谁"，而是「记忆的所有权」：当世界只剩两个意识、而真相只存在于敌人体内，"了解世界"本身就成了必须争夺的资源。三个结局分别对应三种代价——放弃自我、失去一切、和承担真相；我刻意不给"正确答案"，让玩家自己决定 Echo 该成为什么。这与《有尽深渊》的母题一脉相承：你交出去的、你想夺回的，最终都会在终点等你。', en: 'The core conflict isn\'t about winning a fight — it\'s about the ownership of memory. When only two minds remain and the truth lives inside your enemy, understanding the world becomes the resource you must fight for. The three endings are three prices: surrender the self, lose everything, or carry the truth. I deliberately withhold a "correct" answer and let the player decide what Echo becomes — a throughline it shares with Abyss of Ends: what you give up, and what you fight to reclaim, is waiting for you at the end.' },
      ]},
      { type: 'text', h: { zh: 'UE5 制作', en: 'Made in UE5' }, body: [
        { zh: '个人使用 Unreal Engine 5 完成：低多边形机械角色与场景搭建、体积光与粒子氛围、以青色自发光眼作为情绪锚点；用 Sequencer 编排镜头运动与三幕节奏，并用色温区分三个舞台——实验室的暖橙警报、机械荒漠的冷灰死寂、废墟之城的高对比风暴。', en: 'Built solo in Unreal Engine 5: low-poly mechanical characters and environments, volumetric light and particle atmosphere, the cyan emissive eyes as an emotional anchor; camera motion and three-act rhythm staged in Sequencer, with colour temperature separating the three stages — the lab\'s warm-orange alarm, the cold-gray silence of the mechanical waste, and the high-contrast storm of the ruined city.' },
      ]},
      { type: 'gallery', h: { zh: '画面', en: 'Stills' }, images: [
        { src: '/games/mecha/shot-1.jpg', cap: { zh: '实验室 · 警报', en: 'The lab · alarm' } },
        { src: '/games/mecha/shot-2.jpg', cap: { zh: 'Echo · 独自前行', en: 'Echo · alone' } },
        { src: '/games/mecha/shot-3.jpg', cap: { zh: '机械荒漠 · 归途', en: 'Mechanical waste · the way back' } },
      ]},
      { type: 'video', src: '/games/mecha/film.mp4', poster: '/games/mecha/poster.jpg' },
    ],
  },
}

export const gameList = ['abyss', 'zhongkui', 'farming', 'mecha']

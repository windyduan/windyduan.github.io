export const siteContent = {
  meta: {
    updated: "2026-10-05",
    github: "https://github.com/windyduan",
    cvUrl: "",
    email: ""
  },

  profile: {
    kicker: {
      zh: "嗨，我是 windyduan。",
      en: "Hi, I’m windyduan."
    },
    headline: {
      zh: "喜欢把新东西拆开看看，再顺手做点东西。",
      en: "I like taking new things apart and making something along the way."
    },
    intro: {
      zh: "论文、代码、agents、科学、系统、创作——好奇什么就学一点，也尽量留下些什么。",
      en: "Papers, code, agents, science, systems, creative work — I follow what interests me and try to leave something useful behind."
    },
    about: {
      zh: "我现在还在找最适合长期做的方向。平时会折腾 agents，也会补具身智能、AI Infra、AI for Science、ML systems 和创作工具；碰到完全不相干但有意思的东西，也很容易被带跑。比起先给自己贴标签，我更习惯做个小项目、写点代码、提个 issue，看看自己到底理解到了哪一步。",
      en: "I’m still figuring out which directions I want to stay with for the long run. I spend time on agents and also learn about embodied AI, AI infrastructure, AI for Science, ML systems, and creative tools. I’m equally happy to get distracted by something unrelated if it looks interesting. I prefer testing what I understand by building, writing code, or opening an issue before putting a label on it."
    }
  },

  exploreCards: [
    {
      key: "agents", icon: "brain", accent: "blue",
      title: { zh: "Agents", en: "Agents" },
      note: { zh: "工具使用、上下文、记忆、工作流，以及它们什么时候真的有用。", en: "Tool use, context, memory, workflows, and when they are actually useful." }
    },
    {
      key: "embodied", icon: "spark", accent: "orange",
      title: { zh: "具身智能", en: "Embodied AI" },
      note: { zh: "感知、行动、环境与模型如何连起来，是我想认真补课的一条线。", en: "I want to learn how perception, action, environments, and models fit together." }
    },
    {
      key: "infra", icon: "terminal", accent: "violet",
      title: { zh: "AI Infra", en: "AI Infra" },
      note: { zh: "训练、推理、系统、效率和工程工具，都是值得学的工作方向。", en: "Training, inference, systems, efficiency, and engineering tooling are all directions worth learning." }
    },
    {
      key: "ai4s", icon: "atom", accent: "green",
      title: { zh: "AI for Science", en: "AI for Science" },
      note: { zh: "我认可并在探索的科研方向之一，更偏模型、数据与科学问题。", en: "One research direction I value and explore, with an emphasis on models, data, and scientific problems." }
    },
    {
      key: "creation", icon: "palette", accent: "pink",
      title: { zh: "AI 创作", en: "AI Creation" },
      note: { zh: "图像、音乐、交互、creative coding——也想把 AI 当成创作工具来玩。", en: "Images, music, interaction, creative coding — I also want to use AI as a creative tool." }
    },
    {
      key: "mlsys", icon: "chart", accent: "yellow",
      title: { zh: "ML Systems", en: "ML Systems" },
      note: { zh: "把模型真正跑起来、跑稳、跑得更快，本身也很有意思。", en: "Making models run reliably and efficiently is interesting in its own right." }
    }
  ],

  projects: [
    {
      id: "ai4s-chem", icon: "flask", accent: "green",
      eyebrow: "AI × CHEMISTRY · COURSE", title: "AI4S-Chem",
      summary: {
        zh: "面向 AI 初学者的双语交互课程，把基础概念、模型训练、泛化与真实 AI × Chemistry 科研案例连到一起。",
        en: "A bilingual interactive course for AI beginners, connecting fundamentals, model training, generalization, and real AI × Chemistry research examples."
      },
      tags: ["AI4S", "Chemistry", "Teaching", "Interactive Web"],
      live: "https://ai4s.do123.eu.org/",
      repo: "https://github.com/windyduan/AI4S-Chem"
    },
    {
      id: "try", icon: "book", accent: "blue",
      eyebrow: "LEARNING SYSTEM", title: "Try",
      summary: {
        zh: "双语互动式深度学习阅读器，把章节实验、笔记、模型资料、学习进度和知识网络组织进同一个静态网页。",
        en: "A bilingual interactive deep-learning reader combining experiments, notes, model references, progress tracking, and a knowledge network in one static web app."
      },
      tags: ["React", "Learning UX", "Visualization", "Static Web"],
      live: "https://try.do123.eu.org/",
      repo: "https://github.com/windyduan/try"
    }
  ],

  publications: [
    /*
    {
      id: "paper-short-id",
      year: "2027",
      type: "Preprint",
      title: "Your paper title",
      authors: "Author A, windyduan, Author B",
      venue: "arXiv / Journal / Conference",
      summary: { zh: "两句话讲清楚做了什么。", en: "Two plain-language sentences." },
      links: { paper: "", code: "", project: "", poster: "" }
    }
    */
  ],

  contributions: [
    {
      id: "dsh-conversation-override",
      status: "adopted",
      badge: { zh: "上游采纳", en: "ADOPTED" },
      project: "NativeDog1/dsh-boot-animation",
      ref: "issue #3",
      url: "https://github.com/NativeDog1/dsh-boot-animation/issues/3",
      evidenceUrl: "https://github.com/NativeDog1/dsh-boot-animation/blob/main/CHANGELOG.md#040--2026-09-30",
      note: {
        zh: "讨论 conversation-level override 的方向；上游 0.4.0 按这个思路落地，并在 CHANGELOG 里注明来自 issue #3（@windyduan）。",
        en: "Proposed a conversation-level override direction; upstream 0.4.0 implemented it and credits issue #3 (@windyduan) in the changelog."
      }
    },
    {
      id: "dsh-lifecycle",
      status: "merged",
      badge: { zh: "已合并", en: "MERGED" },
      project: "NativeDog1/dsh-boot-animation",
      ref: "PR #2",
      url: "https://github.com/NativeDog1/dsh-boot-animation/pull/2",
      evidenceUrl: "https://github.com/NativeDog1/dsh-boot-animation/blob/main/CHANGELOG.md#030--2026-09-29",
      note: {
        zh: "补了媒体卸载、clip 版本刷新和 session identity 三个客户端生命周期问题；PR 已合并，上游 0.3.0 CHANGELOG 单独记录了这次社区贡献。",
        en: "Fixed media teardown, clip-version refresh, and session identity issues. The PR was merged and upstream 0.3.0 records the community contribution separately."
      }
    },
    {
      id: "pv-60fps",
      status: "merged",
      badge: { zh: "已合并", en: "MERGED" },
      project: "MisakaZentai/world-execute-me-dsh-pv",
      ref: "PR #5",
      url: "https://github.com/MisakaZentai/world-execute-me-dsh-pv/pull/5",
      evidenceUrl: "https://github.com/MisakaZentai/world-execute-me-dsh-pv/blob/main/docs/60FPS_EXPORT.md",
      note: {
        zh: "补了一份可选的 60 fps FFmpeg 导出流程和验证记录；2026-10-06 已合并到上游。",
        en: "Added an optional 60 fps FFmpeg export workflow and verification notes; merged upstream on 2026-10-06."
      }
    },
    {
      id: "dsh-session-memory",
      status: "open",
      badge: { zh: "讨论中", en: "OPEN" },
      project: "NativeDog1/dsh-boot-animation",
      ref: "PR #4",
      url: "https://github.com/NativeDog1/dsh-boot-animation/pull/4",
      evidenceUrl: "",
      note: {
        zh: "在 conversation override 之后继续尝试 per-session clip 记忆；目前仍在上游讨论中。",
        en: "A follow-up experiment for per-session clip memory after conversation overrides; still open upstream."
      }
    }
  ],

  interests: [
    {
      icon: "brain",
      title: { zh: "AI / Agents", en: "AI / Agents" },
      note: { zh: "会持续补基础，也会看不同工作方向和新论文；更想通过项目知道自己到底学会了什么。", en: "I keep learning fundamentals and new directions, and prefer projects as a test of what I actually understand." }
    },
    {
      icon: "atom",
      title: { zh: "Science", en: "Science" },
      note: { zh: "AI for Science 是我认可并在探索的科研方向之一，但不会把所有兴趣都装进这个标签。", en: "AI for Science is one research direction I value, but it does not need to contain every interest." }
    },
    {
      icon: "terminal",
      title: { zh: "Systems & tools", en: "Systems & tools" },
      note: { zh: "AI Infra、ML systems、开发者工具，以及把麻烦流程变得更顺手的小工具。", en: "AI infrastructure, ML systems, developer tools, and small utilities that make awkward workflows easier." }
    },
    {
      icon: "palette",
      title: { zh: "Creative work", en: "Creative work" },
      note: { zh: "AI 创作、可视化、creative coding、媒体和一些纯粹因为好玩的东西。", en: "AI-assisted creation, visualization, creative coding, media, and things built simply because they are fun." }
    },
    {
      icon: "book",
      title: { zh: "Learning systems", en: "Learning systems" },
      note: { zh: "交互课程、知识组织、笔记和更舒服的学习体验。", en: "Interactive courses, knowledge organization, notes, and more comfortable learning experiences." }
    },
    {
      icon: "compass",
      title: { zh: "Next thing", en: "Next thing" },
      note: { zh: "求职方向和学术热点都会变化；看到值得学的新东西，就认真试一下。", en: "Job directions and research trends change. If something looks worth learning, I want to try it seriously." }
    }
  ],

  experience: [
    /*
    {
      id: "role-short-id",
      period: "2027 — Now",
      role: { zh: "研究助理", en: "Research Assistant" },
      org: "Organization",
      note: { zh: "一句话写真正做了什么。", en: "One sentence about what you actually did." }
    }
    */
  ]
};

export const sections = [
  { id: "home", type: "home", icon: "home", fixed: true, localToc: false, label: { zh: "首页", en: "Home" } },
  { id: "work", type: "work", icon: "folder", fixed: false, localToc: true, label: { zh: "作品", en: "Work" } },
  { id: "papers", type: "papers", icon: "file", fixed: false, localToc: true, label: { zh: "论文", en: "Papers" } },
  { id: "oss", type: "oss", icon: "git", fixed: false, localToc: true, label: { zh: "开源", en: "Open source" } },
  { id: "interests", type: "interests", icon: "compass", fixed: true, localToc: false, label: { zh: "兴趣", en: "Interests" } },
  { id: "profile", type: "profile", icon: "user", fixed: true, localToc: false, label: { zh: "Profile", en: "Profile" } }
];
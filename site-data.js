window.PORTFOLIO_DATA = {
  profile: {
    displayName: "windyduan",
    github: "https://github.com/windyduan",
    cvUrl: "",
    email: "",
    lastUpdated: "2026-10-05",
    kicker: {
      zh: "保持好奇，慢慢做东西。",
      en: "Stay curious. Keep making things."
    },
    headline: {
      zh: "读论文，写代码，也常常被新东西吸引。",
      en: "I read papers, write code, and get curious about new things."
    },
    intro: {
      zh: "我会认真试很多方向。这里不急着给自己下定义，只留下真正做过、学过、验证过的东西。",
      en: "I like trying different directions seriously. This page is less about defining an identity and more about leaving behind things I have actually built, learned, or tested."
    }
  },

  exploreCards: [
    {
      key: "agents",
      icon: "brain",
      accent: "blue",
      title: { zh: "Agents", en: "Agents" },
      note: { zh: "工具使用、上下文、记忆、工作流，以及它们什么时候真的有用。", en: "Tool use, context, memory, workflows, and when they are actually useful." }
    },
    {
      key: "embodied",
      icon: "spark",
      accent: "orange",
      title: { zh: "具身智能", en: "Embodied AI" },
      note: { zh: "感知、行动、环境与模型如何连起来，是我想认真补课的一条线。", en: "I want to learn how perception, action, environments, and models fit together." }
    },
    {
      key: "infra",
      icon: "terminal",
      accent: "violet",
      title: { zh: "AI Infra", en: "AI Infra" },
      note: { zh: "训练、推理、系统、效率和工程工具，都是值得学的工作方向。", en: "Training, inference, systems, efficiency, and engineering tooling are all directions worth learning." }
    },
    {
      key: "ai4s",
      icon: "atom",
      accent: "green",
      title: { zh: "AI for Science", en: "AI for Science" },
      note: { zh: "我认可并在探索的科研方向之一，更偏模型、数据与科学问题。", en: "One research direction I value and explore, with an emphasis on models, data, and scientific problems." }
    },
    {
      key: "creation",
      icon: "palette",
      accent: "pink",
      title: { zh: "AI 创作", en: "AI Creation" },
      note: { zh: "图像、音乐、交互、creative coding——我也想把 AI 当成创作工具来玩。", en: "Images, music, interaction, creative coding — I also want to use AI as a creative tool." }
    },
    {
      key: "mlsys",
      icon: "chart",
      accent: "yellow",
      title: { zh: "ML Systems", en: "ML Systems" },
      note: { zh: "把模型真正跑起来、跑稳、跑得更快，本身也很有意思。", en: "Making models run reliably and efficiently is interesting in its own right." }
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

  projects: [
    {
      id: "ai4s-chem",
      accent: "green",
      eyebrow: "AI × CHEMISTRY · COURSE",
      title: "AI4S-Chem",
      summary: {
        zh: "面向 AI 初学者的双语交互课程，把基础概念、模型训练、泛化与真实 AI × Chemistry 科研案例连到一起。",
        en: "A bilingual interactive course for AI beginners, connecting fundamentals, model training, generalization, and real AI × Chemistry research examples."
      },
      tags: ["AI4S", "Chemistry", "Teaching", "Interactive Web"],
      live: "https://ai4s.do123.eu.org/",
      repo: "https://github.com/windyduan/AI4S-Chem"
    },
    {
      id: "try",
      accent: "blue",
      eyebrow: "LEARNING SYSTEM",
      title: "Try",
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
      year: "2026",
      type: "Preprint",
      title: "Your paper title",
      authors: "Author A, windyduan, Author B",
      venue: "arXiv / Journal / Conference",
      summary: {
        zh: "两句话讲清楚这篇工作做了什么。",
        en: "Two plain-language sentences describing the work."
      },
      links: {
        paper: "https://doi.org/...",
        code: "https://github.com/...",
        project: "",
        poster: ""
      }
    }
    */
  ],

  experience: [
    /*
    {
      period: "2026 — Now",
      role: { zh: "研究助理 / 实习生 / ...", en: "Research Assistant / Intern / ..." },
      org: "Organization",
      note: {
        zh: "一句话写真正做了什么。",
        en: "One sentence about what you actually did."
      }
    }
    */
  ],

  contributions: [
    {
      status: "merged",
      project: "NativeDog1/dsh-boot-animation",
      pr: "#2",
      url: "https://github.com/NativeDog1/dsh-boot-animation/pull/2",
      note: {
        zh: "在已有实现上补了几个客户端生命周期问题：媒体释放、clip 版本刷新和 session identity。",
        en: "Small client-lifecycle fixes on top of the existing project: media cleanup, clip-version refresh, and session identity."
      }
    },
    {
      status: "open",
      project: "NativeDog1/dsh-boot-animation",
      pr: "#4",
      url: "https://github.com/NativeDog1/dsh-boot-animation/pull/4",
      note: {
        zh: "补充 per-session clip 记忆，同时保留旧数据兼容和 fallback。",
        en: "Added per-session clip memory while preserving backward compatibility and fallbacks."
      }
    },
    {
      status: "open",
      project: "MisakaZentai/world-execute-me-dsh-pv",
      pr: "#5",
      url: "https://github.com/MisakaZentai/world-execute-me-dsh-pv/pull/5",
      note: {
        zh: "给已有渲染流程补了一份可选的 60 fps 导出说明和验证记录。",
        en: "Added an optional 60 fps export guide and verification notes to the existing rendering workflow."
      }
    }
  ]
};
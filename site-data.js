window.PORTFOLIO_DATA = {
  profile: {
    displayName: "windyduan",
    github: "https://github.com/windyduan",
    cvUrl: "",
    email: "",
    lastUpdated: "2026-10-05",
    kicker: {
      zh: "做一点研究，也做一点东西。",
      en: "Researching a little. Building a little."
    },
    headline: {
      zh: "写点工具，读点论文，偶尔给开源项目添一块小拼图。",
      en: "I build tools, read papers, and occasionally add a small piece to open source."
    },
    intro: {
      zh: "我对 agents、科学计算、AI for Science、开发者工具、可视化、学习系统，以及各种有趣的软件都感兴趣。这个页面只放我愿意公开的部分；还不能公开的科研，就先认真做。",
      en: "I am interested in agents, scientific computing, AI for Science, developer tools, visualization, learning systems, and whatever software happens to be interesting. This site only contains work I am comfortable making public."
    }
  },

  interests: [
    {
      icon: "◎",
      title: { zh: "Agents", en: "Agents" },
      note: { zh: "工具使用、上下文、记忆、工作流，以及它们到底什么时候真的有用。", en: "Tool use, context, memory, workflows, and when they are actually useful." }
    },
    {
      icon: "⌁",
      title: { zh: "Science", en: "Science" },
      note: { zh: "AI for Science 是我认可并在探索的科研方向之一，更偏模型、数据与方法。", en: "AI for Science is one research direction I care about, with an emphasis on models, data, and methods." }
    },
    {
      icon: "⌘",
      title: { zh: "Developer tools", en: "Developer tools" },
      note: { zh: "喜欢把麻烦的流程变成更顺手、更可验证的小工具。", en: "I like turning awkward workflows into smaller, inspectable tools." }
    },
    {
      icon: "◌",
      title: { zh: "Visualization", en: "Visualization" },
      note: { zh: "把抽象的东西画出来、动起来，通常比堆更多文字有意思。", en: "Making abstract things visible and interactive is often more useful than adding more text." }
    },
    {
      icon: "✦",
      title: { zh: "Learning systems", en: "Learning systems" },
      note: { zh: "交互课程、知识组织、笔记和可重复学习体验。", en: "Interactive courses, knowledge organization, notes, and repeatable learning experiences." }
    },
    {
      icon: "↯",
      title: { zh: "Side quests", en: "Side quests" },
      note: { zh: "creative coding、媒体、小动画，以及一些纯粹因为好玩而做的东西。", en: "Creative coding, media, small animations, and things built simply because they are fun." }
    }
  ],

  projects: [
    {
      id: "ai4s-chem",
      accent: "green",
      eyebrow: "AI × CHEMISTRY · COURSE",
      title: "AI4S-Chem",
      summary: {
        zh: "一个面向 AI 初学者的双语交互课程。把基础概念、模型训练、泛化与真实 AI × Chemistry 科研案例连到一起。",
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
        zh: "一个双语互动式深度学习阅读器，把章节实验、笔记、模型资料、学习进度和知识网络组织进同一个静态网页。",
        en: "A bilingual interactive deep-learning reader combining experiments, notes, model references, progress tracking, and a knowledge network in one static web app."
      },
      tags: ["React", "Learning UX", "Visualization", "Static Web"],
      live: "https://try.do123.eu.org/",
      repo: "https://github.com/windyduan/try"
    }
  ],

  publications: [
    /*
    填论文时复制下面这段，取消注释并修改内容：
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
    求职时可以填：
    {
      period: "2026 — Now",
      role: { zh: "研究助理 / 实习生 / ...", en: "Research Assistant / Intern / ..." },
      org: "Organization",
      note: {
        zh: "一句话写你真正做了什么，不要堆职责。",
        en: "One sentence describing what you actually did."
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
        zh: "在现有实现上补了几个客户端生命周期问题：媒体释放、clip 版本刷新和 session identity。",
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
export const siteContent = {
  meta: {
    updated: "2026-10-06",
    github: "https://github.com/windyduan",
    cvUrl: "",
    email: ""
  },

  profile: {
    kicker: {
      zh: "嗨，我是",
      en: "Hi, I’m"
    },
    headline: {
      zh: "喜欢把新东西拆开看看，再顺手做点东西。",
      en: "I like taking new things apart and making something along the way."
    },
    intro: {
      zh: "论文、代码、AI、科学、系统、创作——好奇什么就学一点，也尽量留下些什么。",
      en: "Papers, code, AI, science, systems, creative work — I follow what interests me and try to leave something useful behind."
    },
    about: {
      zh: "我现在还在找最适合长期做的方向。求职上会重点看 AI Engineer / Applied AI、Research Engineer、ML Engineer 这类岗位；技术上会继续补 LLM & Agent Systems、Multimodal、Post-training / RL、AI Infra / ML Systems / Inference、具身智能与 Robotics。科研上，我认可 AI for Science，也更关心其中偏 AI 的模型、数据、学习与系统问题。AI 之外，我也会做软件、可视化、学习工具和创作类的小项目。",
      en: "I’m still figuring out which directions I want to stay with for the long run. For jobs, I’m mainly watching AI Engineer / Applied AI, Research Engineer, and ML Engineer roles. Technically, I’m learning LLM & agent systems, multimodal AI, post-training / RL, AI infrastructure / ML systems / inference, and embodied AI / robotics. On the research side, I’m interested in AI for Science, especially the AI-facing questions around models, data, learning, and systems. Outside AI, I also enjoy software, visualization, learning tools, and creative projects."
    }
  },

  exploreGroup: {
    zh: "AI · 求职与研究方向",
    en: "AI · roles & research directions"
  },

  exploreCards: [
    {
      key: "applied-ai", icon: "spark", accent: "blue",
      title: { zh: "AI Engineer / Applied AI", en: "AI Engineer / Applied AI" },
      note: { zh: "更靠近产品和真实问题：把模型、检索、工具调用、评测与工程系统组合起来。", en: "Closer to products and real problems: combining models, retrieval, tool use, evaluation, and engineering systems." }
    },
    {
      key: "research-engineering", icon: "brain", accent: "violet",
      title: { zh: "Research Engineering", en: "Research Engineering" },
      note: { zh: "我很在意的一类岗位：既需要读论文和做实验，也需要把想法可靠地实现出来。", en: "A role family I care about: reading papers and running experiments, while also turning ideas into reliable implementations." }
    },
    {
      key: "agents", icon: "brain", accent: "cyan",
      title: { zh: "LLM & Agent Systems", en: "LLM & Agent Systems" },
      note: { zh: "Agents、tool use、memory、RAG / search、computer use，以及多智能体系统。", en: "Agents, tool use, memory, RAG / search, computer use, and multi-agent systems." }
    },
    {
      key: "infra", icon: "terminal", accent: "orange",
      title: { zh: "AI Infra / ML Systems", en: "AI Infra / ML Systems" },
      note: { zh: "训练与推理、分布式系统、GPU、性能、部署与 inference systems。", en: "Training and inference, distributed systems, GPUs, performance, deployment, and inference systems." }
    },
    {
      key: "multimodal", icon: "eye", accent: "pink",
      title: { zh: "Multimodal AI", en: "Multimodal AI" },
      note: { zh: "视觉、语言、视频与生成模型如何连起来，也是现在很值得补的一条线。", en: "How vision, language, video, and generative models fit together is another direction I want to learn seriously." }
    },
    {
      key: "embodied", icon: "spark", accent: "yellow",
      title: { zh: "Embodied AI / Robotics", en: "Embodied AI / Robotics" },
      note: { zh: "从感知、world models 到 robot learning、planning、control 和 sim-to-real。", en: "From perception and world models to robot learning, planning, control, and sim-to-real." }
    },
    {
      key: "ai4s", icon: "atom", accent: "green",
      title: { zh: "AI for Science", en: "AI for Science" },
      note: { zh: "这是我认可的科研方向之一；我更偏向其中的 AI 方法、模型、数据和系统问题。", en: "One research direction I value, with more interest in the AI side: methods, models, data, and systems." }
    },
    {
      key: "creative", icon: "palette", accent: "pink",
      title: { zh: "Generative / Creative AI", en: "Generative / Creative AI" },
      note: { zh: "图像、视频、音乐、交互和 creative coding——也想把 AI 当成创作工具。", en: "Images, video, music, interaction, and creative coding — I also want to use AI as a creative tool." }
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
      icon: "briefcase",
      title: { zh: "求职方向", en: "Job directions" },
      note: { zh: "AI Engineer / Applied AI、Research Engineer、ML Engineer。先看岗位真正做什么，再决定该补哪些能力。", en: "AI Engineer / Applied AI, Research Engineer, and ML Engineer. I care more about what the role actually does than the title itself." },
      tags: ["AI Engineer", "Applied AI", "Research Engineer", "ML Engineer"]
    },
    {
      icon: "brain",
      title: { zh: "模型与智能系统", en: "Model & agent systems" },
      note: { zh: "LLM、Agents、RAG / Search、Computer Use、Post-training、RL / Reasoning 都是我会继续补的 AI 技术线。", en: "LLMs, agents, RAG / search, computer use, post-training, and RL / reasoning are AI directions I want to keep learning." },
      tags: ["LLM", "Agents", "RAG", "Post-training", "RL"]
    },
    {
      icon: "terminal",
      title: { zh: "AI 系统与基础设施", en: "AI systems & infrastructure" },
      note: { zh: "AI Infra、ML Systems、Inference、Distributed Training、GPU / Performance，更偏系统与工程的一面。", en: "AI infrastructure, ML systems, inference, distributed training, GPU work, and performance — the systems side of AI." },
      tags: ["AI Infra", "ML Systems", "Inference", "Distributed", "GPU"]
    },
    {
      icon: "eye",
      title: { zh: "多模态与具身", en: "Multimodal & embodied" },
      note: { zh: "Multimodal / VLM、World Models、Embodied AI、Robotics、Robot Learning，横跨模型与物理世界。", en: "Multimodal / VLMs, world models, embodied AI, robotics, and robot learning bridge models with the physical world." },
      tags: ["Multimodal", "VLM", "World Models", "Robotics"]
    },
    {
      icon: "atom",
      title: { zh: "科研兴趣", en: "Research interests" },
      note: { zh: "AI for Science 是我认可并愿意长期探索的科研方向之一；我更偏 AI 侧，关心模型、学习、数据、表示与科学问题之间怎么连接。", en: "AI for Science is one research direction I want to explore over time. I lean toward the AI side: models, learning, data, representations, and their connection to scientific problems." },
      tags: ["AI4S", "Scientific ML", "Scientific Intelligence"]
    },
    {
      icon: "palette",
      title: { zh: "创作与其他兴趣", en: "Creative & other interests" },
      note: { zh: "Generative AI、图像、视频、音乐、可视化、creative coding，以及任何突然让我想动手做点东西的新方向。", en: "Generative AI, images, video, music, visualization, creative coding, and whatever new direction makes me want to build something." },
      tags: ["Generative AI", "Creative AI", "Visualization", "Creative Coding"]
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
  { id: "oss", type: "oss", icon: "git", fixed: false, localToc: true, label: { zh: "开源", en: "OSS" } },
  { id: "interests", type: "interests", icon: "compass", fixed: true, localToc: false, label: { zh: "兴趣", en: "Interests" } },
  { id: "profile", type: "profile", icon: "user", fixed: true, localToc: false, label: { zh: "关于", en: "About" } }
];
import { siteContent, sections } from "../data/content.js";
import { icon } from "./icons.js";

const copy={
  zh:{
    workTitle:"Selected work",workBody:"不把仓库全搬过来，只挑能说明我怎么做事的公开项目。",
    papersTitle:"Research & publications",papersBody:"论文、预印本、海报和公开项目页准备好以后，会从这里长出来。",
    papersEmptyTitle:"这里先留一张空白稿纸。",
    papersEmptyBody:"还没有适合公开写进主页的论文时，就不硬凑。以后只改 content.js，页面结构不用动。",
    ossTitle:"Open source",ossBody:"更多时候，只是在别人已经做得很好的项目上补一点小东西。",
    ossThanks:"<strong>感谢开源。</strong> 这些贡献建立在维护者和原作者已经完成的大量工作上；这里只记录我补上的 bug、文档、验证或小功能。",
    interestsTitle:"Interests",interestsBody:"兴趣可以很多，方向也会变化。AI / Agents / AI4S 会保留，但它们只是探索方向的一部分。",
    profileTitle:"关于我",
    profileRule:"能点开的项目、论文和贡献，比一串形容词更有用。",
    cvTitle:"这里以后会放 CV 和经历。",
    cvBody:"等研究、实习、论文和联系方式适合公开时再补。现在先保持简单。",
    live:"在线看看",repo:"GitHub",paper:"Paper",code:"Code",project:"Project",poster:"Poster",
    updated:"更新于",seeWork:"看看作品",explore:"NOW EXPLORING",profile:"PROFILE"
  },
  en:{
    workTitle:"Selected work",workBody:"Not a repository dump — only a few public projects that show how I approach problems.",
    papersTitle:"Research & publications",papersBody:"Papers, preprints, posters, and public project pages will grow here when they are ready.",
    papersEmptyTitle:"Leaving one clean sheet of paper here for now.",
    papersEmptyBody:"If nothing is ready to publish, there is no need to manufacture a publications section. Later, only content.js needs to change.",
    ossTitle:"Open source",ossBody:"Most of the time, I am only adding a small piece to projects that already did the hard work.",
    ossThanks:"<strong>Grateful for open source.</strong> These contributions build on substantial work by maintainers and original authors; I only document the small fixes, notes, verification, or features I added.",
    interestsTitle:"Interests",interestsBody:"Interests can be broad and directions change. AI / Agents / AI4S stay visible, but they are only part of the exploration.",
    profileTitle:"About me",
    profileRule:"Clickable work, papers, and contributions say more than a list of adjectives.",
    cvTitle:"CV and experience will live here.",
    cvBody:"Research, internships, papers, and contact details can be added when they are ready to be public.",
    live:"Live",repo:"GitHub",paper:"Paper",code:"Code",project:"Project",poster:"Poster",
    updated:"Updated",seeWork:"See the work",explore:"NOW EXPLORING",profile:"PROFILE"
  }
};

export function t(value,lang){return typeof value==="string"?value:(value?.[lang]??value?.en??"")}
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));

function sectionLead(number,iconName,title,body){
  return '<aside class="section-side reveal"><div class="section-num">'+icon(iconName)+number+'</div><h2 class="display">'+title+'</h2><p>'+body+'</p></aside>';
}

function renderHome(lang){
  const p=siteContent.profile;
  return `<div class="shell slide-inner"><div class="hero-grid">
    <div class="hero-copy-wrap reveal">
      <div class="kicker">${icon("spark")}<span>${esc(t(p.kicker,lang))}</span></div>
      <h1 class="display"><span class="wordmark">windyduan</span><br><span>${esc(t(p.headline,lang))}</span></h1>
      <p class="hero-copy">${esc(t(p.intro,lang))}</p>
      <div class="hero-actions" id="hero-links">
        <button class="btn primary" type="button" data-section-go="work">${icon("eye")}<span>${copy[lang].seeWork}</span></button>
        <a class="btn" href="${siteContent.meta.github}" target="_blank" rel="noreferrer">${icon("github")}GitHub</a>
      </div>
    </div>
    <div class="explore-stage reveal" id="explore-rotator" tabindex="0" aria-label="Current exploration"></div>
  </div></div>`;
}

function projectCard(project,lang){
  return `<article class="project content-block reveal" id="work-${esc(project.id)}" data-toc-item data-toc-label="${esc(project.title)}" data-accent="${esc(project.accent)}">
    <div class="project-icon">${icon(project.icon)}</div>
    <div class="eyebrow">${esc(project.eyebrow)}</div>
    <h3>${esc(project.title)}</h3>
    <p>${esc(t(project.summary,lang))}</p>
    <div class="tags">${project.tags.map(x=>'<span class="tag">'+esc(x)+'</span>').join("")}</div>
    <div class="project-links"><a href="${esc(project.live)}" target="_blank" rel="noreferrer">${copy[lang].live} ↗</a><a href="${esc(project.repo)}" target="_blank" rel="noreferrer">${copy[lang].repo} ↗</a></div>
  </article>`;
}

function renderWork(lang){
  return `<div class="shell slide-inner content-layout">
    ${sectionLead("01 / WORK","folder",copy[lang].workTitle,copy[lang].workBody)}
    <div class="content-column project-deck">${siteContent.projects.map(p=>projectCard(p,lang)).join("")}</div>
  </div>`;
}

function publicationCard(p,lang){
  const links=Object.entries(p.links||{}).filter(([,url])=>url).map(([k,url])=>'<a href="'+esc(url)+'" target="_blank" rel="noreferrer">'+esc(copy[lang][k]||k)+' ↗</a>').join("");
  const id=p.id||p.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  return `<article class="pub content-block" id="paper-${esc(id)}" data-toc-item data-toc-label="${esc(p.title)}">
    <div class="pub-meta"><span>${esc(p.year)}</span><span>${esc(p.type)}</span></div>
    <h3 class="display">${esc(p.title)}</h3><div class="authors">${esc(p.authors)}</div><div class="venue">${esc(p.venue)}</div>
    <p>${esc(t(p.summary,lang))}</p><div class="pub-links">${links}</div>
  </article>`;
}

function renderPapers(lang){
  const content=siteContent.publications.length
    ? siteContent.publications.map(p=>publicationCard(p,lang)).join("")
    : `<div class="paper-empty"><div class="paper-empty-card"><div class="paper-empty-icon">${icon("file")}</div><h3 class="display">${copy[lang].papersEmptyTitle}</h3><p>${copy[lang].papersEmptyBody}</p></div></div>`;
  return `<div class="shell slide-inner content-layout">
    ${sectionLead("02 / RESEARCH","file",copy[lang].papersTitle,copy[lang].papersBody)}
    <div class="content-column paper-stack">${content}</div>
  </div>`;
}

function contributionCard(c,lang){
  const label=t(c.badge,lang)||c.status.toUpperCase();
  const ref=c.ref||c.pr||"";
  const evidence=c.evidenceUrl
    ? `<a class="evidence-link" href="${esc(c.evidenceUrl)}" target="_blank" rel="noreferrer">${lang==="zh"?"上游记录":"Upstream record"} ↗</a>`
    : "";
  return `<article class="contrib content-block" id="oss-${esc(c.id)}" data-toc-item data-toc-label="${esc(c.project+" "+ref)}">
    <span class="state ${esc(c.status)}">${esc(label)}</span>
    <div class="contrib-main"><strong>${esc(c.project)} ${esc(ref)}</strong><p>${esc(t(c.note,lang))}</p><div class="contrib-links"><a href="${esc(c.url)}" target="_blank" rel="noreferrer">${lang==="zh"?"原始讨论":"Original"} ↗</a>${evidence}</div></div>
  </article>`;
}

function renderOss(lang){
  return `<div class="shell slide-inner content-layout">
    ${sectionLead("03 / OSS","git",copy[lang].ossTitle,copy[lang].ossBody)}
    <div class="content-column"><div class="oss-note reveal">${copy[lang].ossThanks}</div><div class="contrib-list">${siteContent.contributions.map(c=>contributionCard(c,lang)).join("")}</div></div>
  </div>`;
}

function renderInterests(lang){
  const cards=siteContent.interests.map(i=>`<article class="interest reveal"><span class="interest-icon">${icon(i.icon)}</span><h3>${esc(t(i.title,lang))}</h3><p>${esc(t(i.note,lang))}</p></article>`).join("");
  return `<div class="shell slide-inner"><div class="fixed-grid">
    ${sectionLead("04 / INTERESTS","compass",copy[lang].interestsTitle,copy[lang].interestsBody)}
    <div class="interest-board">${cards}</div>
  </div></div>`;
}

function renderProfile(lang){
  const meta=siteContent.meta,p=siteContent.profile;
  const links=[['GitHub',meta.github,'github']];
  if(meta.cvUrl)links.push(['CV',meta.cvUrl,'briefcase']);
  if(meta.email)links.push(['Email','mailto:'+meta.email,'user']);
  const linkHtml=links.map(([name,url,ico])=>'<a class="btn" href="'+esc(url)+'" target="_blank" rel="noreferrer">'+icon(ico)+esc(name)+'</a>').join("");
  const experience=siteContent.experience.length
    ? `<div class="experience-list">${siteContent.experience.map(e=>`<article class="experience content-block" data-toc-item data-toc-label="${esc(t(e.role,lang))}"><small>${esc(e.period)}</small><h4>${esc(t(e.role,lang))} · ${esc(e.org)}</h4><p>${esc(t(e.note,lang))}</p></article>`).join("")}</div>`
    :"";
  return `<div class="shell slide-inner"><div class="profile-grid">
    <article class="profile-card reveal">
      <div class="kicker">${icon("user")}<span>${copy[lang].profile}</span></div>
      <h2 class="display">${copy[lang].profileTitle}</h2>
      <p>${esc(t(p.about,lang))}</p>
      <div class="profile-links">${linkHtml}</div>
      <div class="profile-rule"><strong>A small rule:</strong> ${copy[lang].profileRule}</div>
      ${experience}
    </article>
    <aside class="cv-card reveal"><div class="cv-head"><span>CV / EXPERIENCE</span><span class="cv-badge">${icon("briefcase")}</span></div>
      <h3 class="display">${copy[lang].cvTitle}</h3><p>${copy[lang].cvBody}</p>
      <div class="cv-lines"><i></i><i></i><i></i><i></i></div><div class="cv-meta">${copy[lang].updated} ${esc(meta.updated)}</div>
    </aside>
  </div></div>`;
}

const renderers={home:renderHome,work:renderWork,papers:renderPapers,oss:renderOss,interests:renderInterests,profile:renderProfile};

export function renderSite(lang){
  const root=document.getElementById("carousel");
  root.innerHTML=sections.map(section=>{
    const dynamicScrollable=section.id==="profile"&&siteContent.experience.length>0;
    const fixed=section.fixed&&!dynamicScrollable;
    return `<section class="slide ${fixed?"fixed":""}" id="section-${section.id}" data-section="${section.id}" data-local-toc="${section.localToc?"true":"false"}" aria-label="${esc(t(section.label,lang))}">${renderers[section.type](lang)}</section>`;
  }).join("");
}

export function renderTopbar(lang){
  document.getElementById("brand-sub").textContent=lang==="zh"?"个人主页 / 作品 / 兴趣":"personal page / work / interests";
  document.getElementById("top-nav").innerHTML=sections.map(s=>`<button type="button" data-section-go="${s.id}">${icon(s.icon)}<span>${esc(t(s.label,lang))}</span></button>`).join("");
}

export function getCopy(){return copy}

(()=> {
  const D=window.PORTFOLIO_DATA, root=document.documentElement;
  const carousel=document.getElementById('carousel'), topbar=document.getElementById('topbar');
  const slides=[...document.querySelectorAll('.slide')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lang=localStorage.getItem('portfolio-lang')||'zh';
  let theme=localStorage.getItem('portfolio-theme')||'light';
  let active=0, wheelLock=false, idleTimer;

  const paths={
    home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>',
    folder:'<path d="M3 6.5h6l2 2h10v9.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 6.5v-.5a2 2 0 0 1 2-2h4l2 2"/>',
    file:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h6"/>',
    git:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h4a4 4 0 0 1 4 4v8M6 7v8a4 4 0 0 0 4 4h6"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z"/>',
    user:'<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',
    github:'<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 3 5.2 5.2 0 0 0 19.2 0S18 0 15 1.7a13.4 13.4 0 0 0-6 0C6 0 4.8 0 4.8 0a5.2 5.2 0 0 0-.1 3A5.5 5.5 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 19c-4 .9-4-2-5-2"/>',
    moon:'<path d="M21 12.8A8.4 8.4 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>',
    chevronLeft:'<path d="m15 18-6-6 6-6"/>',
    chevronRight:'<path d="m9 18 6-6-6-6"/>',
    flask:'<path d="M9 3h6M10 3v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V3"/><path d="M7.5 15h9"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    spark:'<path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z"/><path d="m18 15 .9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9Z"/>',
    atom:'<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
    terminal:'<path d="m5 7 4 4-4 4"/><path d="M11 17h8"/>',
    chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    brain:'<path d="M9.5 4.5A3 3 0 0 0 4 6v1a3 3 0 0 0 0 5v1a3 3 0 0 0 3 3 3.5 3.5 0 0 0 2.5-1"/><path d="M14.5 4.5A3 3 0 0 1 20 6v1a3 3 0 0 1 0 5v1a3 3 0 0 1-3 3 3.5 3.5 0 0 1-2.5-1"/><path d="M9.5 4.5V20M14.5 4.5V20"/>',
    palette:'<path d="M12 3a9 9 0 1 0 0 18h1.3a1.7 1.7 0 0 0 1.2-2.9l-.6-.6a1.7 1.7 0 0 1 1.2-2.9H18a3 3 0 0 0 3-3A8.6 8.6 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="10" cy="6.5" r=".8"/><circle cx="14" cy="6.5" r=".8"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18"/>',
    eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>'
  };
  const icon=n=>'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+(paths[n]||paths.spark)+'</svg>';

  const copy={
    zh:{
      nav:['首页','作品','论文','开源','兴趣','Profile'],
      brandSub:'个人主页 / 作品 / 兴趣',
      curiousTitle:'最近在学什么，就认真试一试什么。',
      curiousBody:'AI、Agents、AI4S、工具、系统、可视化……可以同时存在，也可以随时间变化。',
      workTitle:'Selected work',workBody:'不把仓库全搬过来，只挑能说明我怎么做事的公开项目。',
      papersTitle:'Research & publications',papersBody:'论文、预印本、海报和公开项目页准备好以后，会从这里长出来。',
      emptyTitle:'这里先留一张空白稿纸。',
      emptyBody:'还没有适合公开写进主页的论文时，就不硬凑。以后在 site-data.js 里加一条 publication，它会自动变成正式条目。',
      ossTitle:'Open source',ossBody:'更多时候，只是在别人已经做得很好的项目上补一点小东西。',
      ossThanks:'<strong>感谢开源。</strong> 这些贡献建立在维护者和原作者已经完成的大量工作上；这里只记录我补上的 bug、文档、验证或小功能。',
      interestsTitle:'Interests',interestsBody:'兴趣可以很多，方向也会变化。AI / Agents / AI4S 会保留，但它们只是探索方向的一部分。',
      profileTitle:'留一点安静的地方，放真正值得公开的东西。',
      profileRule:'少一点自我包装，多一点可以点开的证据。',
      cvTitle:'这个页面可以慢慢长成求职主页。',
      cvBody:'等真正需要时，再加 CV、研究经历、实习、报告、论文和联系方式；现在先不替未来的自己编内容。',
      live:'在线看看',repo:'GitHub',paper:'Paper',code:'Code',project:'Project',poster:'Poster',updated:'更新于',
      swipe:'左右滑动，继续看看 →',seeWork:'看看作品'
    },
    en:{
      nav:['Home','Work','Papers','Open source','Interests','Profile'],
      brandSub:'personal page / work / interests',
      curiousTitle:'Whatever I am learning lately, I try to test it seriously.',
      curiousBody:'AI, agents, AI4S, tools, systems, and visualization can coexist — and change over time.',
      workTitle:'Selected work',workBody:'Not a repository dump — only a few public projects that show how I approach problems.',
      papersTitle:'Research & publications',papersBody:'Papers, preprints, posters, and public project pages will grow here when they are ready.',
      emptyTitle:'Leaving one clean sheet of paper here for now.',
      emptyBody:'If there is nothing ready to publish, there is no need to manufacture a publication section. Add one publication to site-data.js later and it will render here.',
      ossTitle:'Open source',ossBody:'Most of the time, I am only adding a small piece to projects that already did the hard work.',
      ossThanks:'<strong>Grateful for open source.</strong> These contributions build on substantial work by maintainers and original authors; I only document the small fixes, notes, verification, or features I added.',
      interestsTitle:'Interests',interestsBody:'Interests can be broad and directions change. AI / Agents / AI4S stay visible, but they are only part of the exploration.',
      profileTitle:'A quiet place for the things that are actually worth showing.',
      profileRule:'less self-branding, more evidence you can click.',
      cvTitle:'This page can grow into a proper job-search profile.',
      cvBody:'Add a CV, research experience, internships, talks, publications, and contact details when they are genuinely ready to be public.',
      live:'Live',repo:'GitHub',paper:'Paper',code:'Code',project:'Project',poster:'Poster',updated:'Updated',
      swipe:'Swipe sideways to keep going →',seeWork:'See the work'
    }
  };

  const t=v=>typeof v==='string'?v:(v?.[lang]??v?.en??'');
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const navIcons=['home','folder','file','git','compass','user'];
  const interestIcons=['brain','atom','terminal','chart','book','palette'];

  function moving(){
    topbar.classList.add('is-moving');
    clearTimeout(idleTimer);
    idleTimer=setTimeout(()=>topbar.classList.remove('is-moving'),520);
  }

  function renderText(){
    root.lang=lang==='zh'?'zh-CN':'en';
    document.getElementById('brandSub').textContent=copy[lang].brandSub;
    document.getElementById('kickerText').textContent=t(D.profile.kicker);
    document.getElementById('headline').textContent=t(D.profile.headline);
    document.getElementById('intro').textContent=t(D.profile.intro);
    document.getElementById('curiousTitle').textContent=copy[lang].curiousTitle;
    document.getElementById('curiousBody').textContent=copy[lang].curiousBody;
    document.getElementById('workTitle').textContent=copy[lang].workTitle;
    document.getElementById('workBody').textContent=copy[lang].workBody;
    document.getElementById('papersTitle').textContent=copy[lang].papersTitle;
    document.getElementById('papersBody').textContent=copy[lang].papersBody;
    document.getElementById('ossTitle').textContent=copy[lang].ossTitle;
    document.getElementById('ossBody').textContent=copy[lang].ossBody;
    document.getElementById('ossThanks').innerHTML=copy[lang].ossThanks;
    document.getElementById('interestsTitle').textContent=copy[lang].interestsTitle;
    document.getElementById('interestsBody').textContent=copy[lang].interestsBody;
    document.getElementById('profileTitle').textContent=copy[lang].profileTitle;
    document.getElementById('profileCopy').textContent=t(D.profile.intro);
    document.getElementById('profileRule').textContent=copy[lang].profileRule;
    document.getElementById('cvTitle').textContent=copy[lang].cvTitle;
    document.getElementById('cvBody').textContent=copy[lang].cvBody;
    document.getElementById('profileMeta').textContent=copy[lang].updated+' '+D.profile.lastUpdated;
    document.getElementById('swipeHint').textContent=copy[lang].swipe;
    document.getElementById('langBtn').textContent=lang==='zh'?'EN':'中';
  }

  function renderNav(){
    const top=document.getElementById('topNav'), track=document.getElementById('trackNav');
    top.innerHTML=copy[lang].nav.map((n,i)=>'<button type="button" data-go="'+i+'">'+icon(navIcons[i])+'<span>'+esc(n)+'</span></button>').join('');
    track.innerHTML=copy[lang].nav.map((n,i)=>'<button class="track-btn" type="button" data-go="'+i+'" aria-label="'+esc(n)+'">'+icon(navIcons[i])+'<span>'+esc(n)+'</span></button>').join('');
    bindGo();syncActive();
  }

  function renderExploring(){
    document.getElementById('exploreChips').innerHTML=D.exploring.map((x,i)=>'<span class="chip">'+icon(i===0?'spark':i===1?'brain':i===2?'atom':'compass')+esc(x)+'</span>').join('');
    document.getElementById('exploreRow').innerHTML=D.exploring.map((x,i)=>'<span class="explore-tag">'+icon(i===0?'spark':i===1?'brain':i===2?'atom':'compass')+esc(x)+'</span>').join('');
  }

  function renderProjects(){
    document.getElementById('projectDeck').innerHTML=D.projects.map(p=>{
      const ico=p.id==='ai4s-chem'?'flask':'book';
      return '<article class="project reveal" data-accent="'+esc(p.accent)+'"><div class="project-icon">'+icon(ico)+'</div><div class="eyebrow">'+esc(p.eyebrow)+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(t(p.summary))+'</p><div class="tags">'+p.tags.map(x=>'<span class="tag">'+esc(x)+'</span>').join('')+'</div><div class="project-links"><a href="'+esc(p.live)+'" target="_blank" rel="noreferrer">'+copy[lang].live+' ↗</a><a href="'+esc(p.repo)+'" target="_blank" rel="noreferrer">'+copy[lang].repo+' ↗</a></div></article>';
    }).join('');
  }

  function renderPubs(){
    const box=document.getElementById('publicationDeck');
    if(!D.publications.length){
      box.innerHTML='<div class="paper-empty"><div class="paper-empty-card"><div class="paper-empty-icon">'+icon('file')+'</div><h3 class="display">'+copy[lang].emptyTitle+'</h3><p>'+copy[lang].emptyBody+'</p></div></div>';
      return;
    }
    box.innerHTML=D.publications.map(p=>{
      const links=Object.entries(p.links||{}).filter(([,u])=>u).map(([k,u])=>'<a href="'+esc(u)+'" target="_blank" rel="noreferrer">'+esc(copy[lang][k]||k)+' ↗</a>').join('');
      return '<article class="pub"><div class="pub-meta"><span>'+esc(p.year)+'</span><span>'+esc(p.type)+'</span></div><h3 class="display">'+esc(p.title)+'</h3><div class="authors">'+esc(p.authors)+'</div><div class="venue">'+esc(p.venue)+'</div><p>'+esc(t(p.summary))+'</p><div class="pub-links">'+links+'</div></article>';
    }).join('');
  }

  function renderContrib(){
    document.getElementById('contribDeck').innerHTML=D.contributions.map(c=>'<a class="contrib" href="'+esc(c.url)+'" target="_blank" rel="noreferrer"><span class="state '+esc(c.status)+'">'+esc(c.status.toUpperCase())+'</span><strong>'+esc(c.project)+' '+esc(c.pr)+'</strong><p>'+esc(t(c.note))+'</p><span class="go">↗</span></a>').join('');
  }

  function renderInterests(){
    document.getElementById('interestBoard').innerHTML=D.interests.map((i,n)=>'<article class="interest reveal"><span class="interest-icon">'+icon(interestIcons[n]||'compass')+'</span><h3>'+esc(t(i.title))+'</h3><p>'+esc(t(i.note))+'</p></article>').join('');
  }

  function renderLinks(){
    const links=[['GitHub',D.profile.github,'github']];
    if(D.profile.cvUrl) links.push(['CV',D.profile.cvUrl,'briefcase']);
    if(D.profile.email) links.push(['Email','mailto:'+D.profile.email,'user']);
    document.getElementById('heroLinks').innerHTML='<button class="btn primary" type="button" data-go="1">'+icon('eye')+copy[lang].seeWork+'</button>'+links.map(([n,u,i])=>'<a class="btn" href="'+esc(u)+'" target="_blank" rel="noreferrer">'+icon(i)+esc(n)+'</a>').join('');
    document.getElementById('profileLinks').innerHTML=links.map(([n,u,i])=>'<a class="btn" href="'+esc(u)+'" target="_blank" rel="noreferrer">'+icon(i)+esc(n)+'</a>').join('');
    bindGo();
  }

  function bindGo(){document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(Number(b.dataset.go)))}

  function reveal(){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.05,root:carousel});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }

  function renderAll(){
    renderText();renderNav();renderExploring();renderProjects();renderPubs();renderContrib();renderInterests();renderLinks();reveal();
  }

  function go(i){
    active=Math.max(0,Math.min(slides.length-1,i));
    moving();
    slides[active].scrollIntoView({behavior:reduced?'auto':'smooth',inline:'start',block:'nearest'});
    syncActive();
  }

  function syncActive(){
    document.querySelectorAll('[data-go]').forEach(b=>b.classList.toggle('active',Number(b.dataset.go)===active));
    document.getElementById('counter').textContent=String(active+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    document.getElementById('prevBtn').disabled=active===0;
    document.getElementById('nextBtn').disabled=active===slides.length-1;
  }

  carousel.addEventListener('scroll',()=>{
    moving();
    const i=Math.round(carousel.scrollLeft/Math.max(1,carousel.clientWidth));
    if(i!==active){active=i;syncActive()}
  },{passive:true});
  slides.forEach(s=>s.addEventListener('scroll',moving,{passive:true}));
  carousel.addEventListener('touchmove',moving,{passive:true});
  carousel.addEventListener('pointermove',e=>{if(e.buttons) moving()},{passive:true});

  document.getElementById('prevBtn').onclick=()=>go(active-1);
  document.getElementById('nextBtn').onclick=()=>go(active+1);
  document.getElementById('brandHome').onclick=e=>{e.preventDefault();go(0)};

  addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();go(active+1)}
    if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(active-1)}
    if(e.key==='Home')go(0);
    if(e.key==='End')go(slides.length-1);
  });

  carousel.addEventListener('wheel',e=>{
    moving();
    if(innerWidth<900||wheelLock||Math.abs(e.deltaY)<18||Math.abs(e.deltaY)<Math.abs(e.deltaX))return;
    const s=slides[active], canScroll=s.scrollHeight>s.clientHeight+4, atTop=s.scrollTop<=1, atBottom=s.scrollTop+s.clientHeight>=s.scrollHeight-2;
    if(canScroll&&!((e.deltaY>0&&atBottom)||(e.deltaY<0&&atTop)))return;
    e.preventDefault();wheelLock=true;go(active+(e.deltaY>0?1:-1));setTimeout(()=>wheelLock=false,650);
  },{passive:false});

  const themeIcon=document.getElementById('themeIcon');
  function applyTheme(){
    root.dataset.theme=theme;
    themeIcon.innerHTML=theme==='light'?paths.moon:paths.sun;
    document.querySelector('meta[name="theme-color"]').content=theme==='light'?'#f6f1e7':'#232827';
  }
  document.getElementById('themeBtn').onclick=()=>{theme=theme==='light'?'dark':'light';localStorage.setItem('portfolio-theme',theme);applyTheme()};
  document.getElementById('langBtn').onclick=()=>{lang=lang==='zh'?'en':'zh';localStorage.setItem('portfolio-lang',lang);renderAll()};

  applyTheme();renderAll();syncActive();
})();
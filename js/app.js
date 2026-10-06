import { renderSite, renderTopbar } from "./render.js";
import { Preferences } from "./theme.js";
import { ExploreRotator } from "./home-rotator.js";
import { HorizontalPager, LocalTocManager } from "./navigation.js";
import { sections } from "../data/content.js";

let pager,toc,rotator,prefs;
let currentSectionId="home";

function reveal(root=document){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.05});
  root.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}

function wire(lang){
  if(pager)currentSectionId=sections[pager.active]?.id||currentSectionId;
  pager?.destroy?.();
  toc?.destroy?.();
  rotator?.destroy?.();
  const carousel=document.getElementById("carousel");
  renderSite(lang);renderTopbar(lang);reveal(carousel);
  const homeRotatorRoot=document.getElementById("explore-rotator");
  rotator=new ExploreRotator(homeRotatorRoot,{lang,interval:3000});
  toc=new LocalTocManager({carousel,lang});
  pager=new HorizontalPager({
    carousel,
    topbar:document.getElementById("topbar"),
    indicator:document.getElementById("direction-hint"),
    lang,
    onSectionChange:id=>{currentSectionId=id;rotator?.setActive(id==="home")}
  });
  const restoreIndex=sections.findIndex(s=>s.id===currentSectionId);
  if(restoreIndex>0)pager.go(restoreIndex);
}

prefs=new Preferences({onLanguageChange:lang=>wire(lang)});
wire(prefs.lang);

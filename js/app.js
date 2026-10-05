import { renderSite, renderTopbar } from "./render.js";
import { Preferences } from "./theme.js";
import { ExploreRotator } from "./home-rotator.js";
import { HorizontalPager, LocalTocManager } from "./navigation.js";

let pager,toc,rotator,prefs;

function reveal(root=document){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.05});
  root.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}

function wire(lang){
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
    pageDots:document.getElementById("page-dots"),
    lang,
    onSectionChange:id=>rotator?.setActive(id==="home")
  });
}

prefs=new Preferences({onLanguageChange:lang=>wire(lang)});
wire(prefs.lang);

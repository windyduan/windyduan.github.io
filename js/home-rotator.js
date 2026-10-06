import { siteContent } from "../data/content.js";
import { icon } from "./icons.js";
import { t } from "./render.js";

export class ExploreRotator{
  constructor(root,{lang="zh",interval=3000}={}){
    this.root=root;this.lang=lang;this.interval=interval;this.index=0;this.timer=null;this.paused=false;
    this.onEnter=()=>this.pause();this.onLeave=()=>this.resume();this.onFocus=()=>this.pause();
    root.addEventListener("pointerenter",this.onEnter);root.addEventListener("pointerleave",this.onLeave);
    root.addEventListener("focusin",this.onFocus);root.addEventListener("focusout",()=>this.resume());
    root.addEventListener("touchstart",this.onFocus,{passive:true});
    this.render();this.resume();
  }
  setLanguage(lang){this.lang=lang;this.render()}
  setActive(isActive){isActive?this.resume():this.pause()}
  pause(){this.paused=true;clearTimeout(this.timer);this.root.classList.add("paused")}
  resume(){this.paused=false;this.root.classList.remove("paused");clearTimeout(this.timer);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)this.timer=setTimeout(()=>this.next(),this.interval)}
  next(){this.index=(this.index+1)%siteContent.exploreCards.length;this.swap()}
  go(i){this.index=(i+siteContent.exploreCards.length)%siteContent.exploreCards.length;this.swap()}
  swap(){
    const card=this.root.querySelector(".explore-card");
    if(card){card.classList.add("swap-out");setTimeout(()=>this.render(),180)}else this.render();
  }
  render(){
    const card=siteContent.exploreCards[this.index];
    const dots=siteContent.exploreCards.map((_,i)=>`<button class="explore-dot ${i===this.index?"active":""}" type="button" data-rotator-go="${i}" aria-label="Card ${i+1}"><i></i></button>`).join("");
    this.root.style.setProperty("--card-accent",`var(--${card.accent})`);
    const keepPaused=this.paused;
    this.root.innerHTML=`<div class="explore-ghost one"></div><div class="explore-ghost two"></div>
      <article class="explore-card swap-in">
        <div class="explore-head"><span class="explore-icon">${icon(card.icon)}</span><span class="explore-index">${String(this.index+1).padStart(2,"0")} / ${String(siteContent.exploreCards.length).padStart(2,"0")}</span></div>
        <h2 class="display">${t(card.title,this.lang)}</h2><p>${t(card.note,this.lang)}</p>
        <div class="explore-bottom"><span class="explore-label">${t(siteContent.exploreGroup,this.lang)}</span><div class="explore-dots">${dots}</div></div>
      </article>`;
    this.root.querySelectorAll("[data-rotator-go]").forEach(b=>b.onclick=()=>{this.pause();this.go(Number(b.dataset.rotatorGo));setTimeout(()=>this.resume(),1200)});
    if(keepPaused)this.pause();else this.resume();
  }
  destroy(){clearTimeout(this.timer);this.root?.replaceChildren?.()}
}

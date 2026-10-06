import { siteContent } from "../data/content.js";
import { icon } from "./icons.js";
import { t } from "./render.js";

export class ExploreRotator{
  constructor(root,{lang="zh",interval=3000}={}){
    this.root=root;
    this.lang=lang;
    this.interval=interval;
    this.index=0;
    this.timer=null;
    this.active=true;
    this.interacting=false;
    this.manualPauseUntil=0;

    this.abort=new AbortController();
    const signal=this.abort.signal;

    root.addEventListener("pointerenter",()=>this.setInteracting(true),{signal});
    root.addEventListener("pointerleave",()=>this.setInteracting(false),{signal});
    root.addEventListener("focusin",()=>this.setInteracting(true),{signal});
    root.addEventListener("focusout",()=>this.setInteracting(false),{signal});
    root.addEventListener("touchstart",()=>this.pauseBriefly(1400),{passive:true,signal});

    this.render();
    this.schedule();
  }

  setLanguage(lang){
    this.lang=lang;
    this.render();
  }

  setActive(isActive){
    this.active=Boolean(isActive);

    // Leaving a page should never leave a stale hover/focus pause behind.
    if(!this.active){
      this.interacting=false;
      this.manualPauseUntil=0;
    }

    this.syncPlayback();
  }

  setInteracting(value){
    if(!this.active&&value)return;
    this.interacting=Boolean(value);
    this.syncPlayback();
  }

  pauseBriefly(ms=1200){
    this.manualPauseUntil=performance.now()+ms;
    this.syncPlayback();
    clearTimeout(this.manualResumeTimer);
    this.manualResumeTimer=setTimeout(()=>{
      this.manualPauseUntil=0;
      this.syncPlayback();
    },ms);
  }

  shouldPlay(){
    return this.active &&
      !this.interacting &&
      performance.now()>=this.manualPauseUntil &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  syncPlayback(){
    clearTimeout(this.timer);
    const playing=this.shouldPlay();
    this.root.classList.toggle("paused",!playing);
    if(playing)this.schedule();
  }

  schedule(){
    clearTimeout(this.timer);
    if(!this.shouldPlay())return;
    this.timer=setTimeout(()=>this.next(),this.interval);
  }

  next(){
    if(!this.shouldPlay())return;
    this.index=(this.index+1)%siteContent.exploreCards.length;
    this.swap();
  }

  go(i){
    this.index=(i+siteContent.exploreCards.length)%siteContent.exploreCards.length;
    this.swap();
  }

  swap(){
    const card=this.root.querySelector(".explore-card");
    if(card){
      card.classList.add("swap-out");
      setTimeout(()=>this.render(),180);
    }else{
      this.render();
    }
  }

  render(){
    const card=siteContent.exploreCards[this.index];
    const dots=siteContent.exploreCards.map((_,i)=>`<button class="explore-dot ${i===this.index?"active":""}" type="button" data-rotator-go="${i}" aria-label="Card ${i+1}"><i></i></button>`).join("");

    this.root.style.setProperty("--card-accent",`var(--${card.accent})`);
    this.root.innerHTML=`<div class="explore-ghost one"></div><div class="explore-ghost two"></div>
      <article class="explore-card swap-in">
        <div class="explore-head"><span class="explore-icon">${icon(card.icon)}</span><span class="explore-index">${String(this.index+1).padStart(2,"0")} / ${String(siteContent.exploreCards.length).padStart(2,"0")}</span></div>
        <h2 class="display">${t(card.title,this.lang)}</h2><p>${t(card.note,this.lang)}</p>
        <div class="explore-bottom"><span class="explore-label">${t(siteContent.exploreGroup,this.lang)}</span><div class="explore-dots">${dots}</div></div>
      </article>`;

    this.root.querySelectorAll("[data-rotator-go]").forEach(button=>{
      button.onclick=()=>{
        this.go(Number(button.dataset.rotatorGo));
        this.pauseBriefly(1400);
      };
    });

    this.syncPlayback();
  }

  destroy(){
    clearTimeout(this.timer);
    clearTimeout(this.manualResumeTimer);
    this.abort.abort();
    this.root?.replaceChildren?.();
  }
}

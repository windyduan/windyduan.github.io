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
    this.transitionTimer=null;
    this.manualResumeTimer=null;
    this.active=true;
    this.focused=false;
    this.transitioning=false;
    this.manualPauseUntil=0;
    this.documentVisible=!document.hidden;

    this.abort=new AbortController();
    const signal=this.abort.signal;

    // Deliberately do not pause on hover. When the horizontal page slides back
    // under a stationary pointer, browsers can fire pointerenter and leave the
    // carousel looking permanently paused.
    root.addEventListener("pointerdown",()=>this.pauseBriefly(900),{passive:true,signal});
    root.addEventListener("touchstart",()=>this.pauseBriefly(1100),{passive:true,signal});
    root.addEventListener("focusin",()=>{this.focused=true;this.syncPlayback()},{signal});
    root.addEventListener("focusout",()=>{this.focused=false;this.syncPlayback()},{signal});

    document.addEventListener("visibilitychange",()=>{
      this.documentVisible=!document.hidden;
      this.syncPlayback();
    },{signal});

    this.render();
    this.syncPlayback();
  }

  setLanguage(lang){
    this.lang=lang;
    this.render();
  }

  setActive(isActive){
    this.active=Boolean(isActive);

    if(!this.active){
      this.focused=false;
      this.manualPauseUntil=0;
      clearTimeout(this.manualResumeTimer);
    }

    this.syncPlayback();
  }

  pauseBriefly(ms=1000){
    this.manualPauseUntil=performance.now()+ms;
    clearTimeout(this.manualResumeTimer);
    this.manualResumeTimer=setTimeout(()=>{
      this.manualPauseUntil=0;
      this.syncPlayback();
    },ms);
    this.syncPlayback();
  }

  shouldPlay(){
    return this.active &&
      this.documentVisible &&
      !this.focused &&
      !this.transitioning &&
      performance.now()>=this.manualPauseUntil &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  syncPlayback(){
    clearTimeout(this.timer);
    const playing=this.shouldPlay();
    this.root.classList.toggle("paused",!playing);

    if(playing){
      this.timer=setTimeout(()=>this.advanceTo(this.index+1),this.interval);
    }
  }

  cardAt(offset){
    const cards=siteContent.exploreCards;
    return cards[(this.index+offset+cards.length)%cards.length];
  }

  renderPeek(card,layer){
    return `<div class="explore-layer layer-${layer}">
      <article class="explore-card explore-card-peek">
        <div class="explore-head">
          <span class="explore-icon">${icon(card.icon)}</span>
          <span class="explore-index">${t(siteContent.exploreGroup,this.lang)}</span>
        </div>
        <h2 class="display">${t(card.title,this.lang)}</h2>
      </article>
    </div>`;
  }

  renderFront(card){
    const dots=siteContent.exploreCards.map((_,i)=>`<button class="explore-dot ${i===this.index?"active":""}" type="button" data-rotator-go="${i}" aria-label="Card ${i+1}"><i></i></button>`).join("");

    return `<div class="explore-layer layer-front">
      <article class="explore-card">
        <div class="explore-head">
          <span class="explore-icon">${icon(card.icon)}</span>
          <span class="explore-index">${String(this.index+1).padStart(2,"0")} / ${String(siteContent.exploreCards.length).padStart(2,"0")}</span>
        </div>
        <h2 class="display">${t(card.title,this.lang)}</h2>
        <p>${t(card.note,this.lang)}</p>
        <div class="explore-bottom">
          <span class="explore-label">${t(siteContent.exploreGroup,this.lang)}</span>
          <div class="explore-dots">${dots}</div>
        </div>
      </article>
    </div>`;
  }

  render(){
    const front=this.cardAt(0);
    const mid=this.cardAt(1);
    const back=this.cardAt(2);

    this.root.style.setProperty("--card-accent",`var(--${front.accent})`);
    this.root.style.setProperty("--mid-accent",`var(--${mid.accent})`);
    this.root.style.setProperty("--back-accent",`var(--${back.accent})`);

    this.root.innerHTML=`<div class="explore-space">
      ${this.renderPeek(back,"back")}
      ${this.renderPeek(mid,"mid")}
      ${this.renderFront(front)}
    </div>`;

    this.root.querySelectorAll("[data-rotator-go]").forEach(button=>{
      button.onclick=()=>{
        const target=Number(button.dataset.rotatorGo);
        this.pauseBriefly(1200);
        if(target!==this.index)this.advanceTo(target,{manual:true});
      };
    });

    this.syncPlayback();
  }

  advanceTo(target,{manual=false}={}){
    if(this.transitioning)return;

    const cards=siteContent.exploreCards;
    const normalized=(target+cards.length)%cards.length;
    if(normalized===this.index){
      this.syncPlayback();
      return;
    }

    clearTimeout(this.timer);
    this.transitioning=true;
    this.root.classList.add("is-advancing");
    this.root.classList.add("paused");

    clearTimeout(this.transitionTimer);
    this.transitionTimer=setTimeout(()=>{
      this.index=normalized;
      this.transitioning=false;
      this.root.classList.remove("is-advancing");
      this.render();

      if(manual)this.pauseBriefly(850);
      else this.syncPlayback();
    },430);
  }

  destroy(){
    clearTimeout(this.timer);
    clearTimeout(this.transitionTimer);
    clearTimeout(this.manualResumeTimer);
    this.abort.abort();
    this.root?.replaceChildren?.();
  }
}

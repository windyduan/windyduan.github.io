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

    root.addEventListener("pointerdown",()=>this.pauseBriefly(900),{passive:true,signal});
    root.addEventListener("touchstart",()=>this.pauseBriefly(1100),{passive:true,signal});
    root.addEventListener("focusin",()=>{this.focused=true;this.syncPlayback()},{signal});
    root.addEventListener("focusout",()=>{this.focused=false;this.syncPlayback()},{signal});

    document.addEventListener("visibilitychange",()=>{
      this.documentVisible=!document.hidden;
      this.syncPlayback();
    },{signal});

    this.renderDeck();
    this.syncPlayback();
  }

  setLanguage(lang){
    this.lang=lang;
    this.renderDeck();
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

  normalizeIndex(index){
    const total=siteContent.exploreCards.length;
    return (index+total)%total;
  }

  cardMarkup(card,index){
    const dots=siteContent.exploreCards.map((_,i)=>
      `<button class="explore-dot ${i===index?"active":""}" type="button" data-rotator-go="${i}" aria-label="Card ${i+1}"><i></i></button>`
    ).join("");

    return `<article class="explore-card" style="--layer-accent:var(--${card.accent})">
      <div class="explore-head">
        <span class="explore-icon">${icon(card.icon)}</span>
        <span class="explore-index">${String(index+1).padStart(2,"0")} / ${String(siteContent.exploreCards.length).padStart(2,"0")}</span>
      </div>
      <h2 class="display">${t(card.title,this.lang)}</h2>
      <p>${t(card.note,this.lang)}</p>
      <div class="explore-bottom">
        <span class="explore-label">${t(siteContent.exploreGroup,this.lang)}</span>
        <div class="explore-dots">${dots}</div>
      </div>
    </article>`;
  }

  layerMarkup(role,index){
    const normalized=this.normalizeIndex(index);
    const card=siteContent.exploreCards[normalized];
    return `<div class="explore-layer layer-${role}" data-role="${role}" data-card-index="${normalized}">
      ${this.cardMarkup(card,normalized)}
    </div>`;
  }

  renderDeck(){
    this.root.classList.remove("is-advancing","is-jumping");
    this.root.innerHTML=`<div class="explore-space">
      ${this.layerMarkup("incoming",this.index+3)}
      ${this.layerMarkup("back",this.index+2)}
      ${this.layerMarkup("mid",this.index+1)}
      ${this.layerMarkup("front",this.index)}
    </div>`;
    this.bindDots();
    this.syncPlayback();
  }

  bindDots(){
    this.root.querySelectorAll("[data-rotator-go]").forEach(button=>{
      button.onclick=()=>{
        const target=Number(button.dataset.rotatorGo);
        if(target===this.index)return;
        this.pauseBriefly(1200);
        this.advanceTo(target,{manual:true});
      };
    });
  }

  updateLayer(layer,index){
    const normalized=this.normalizeIndex(index);
    const card=siteContent.exploreCards[normalized];
    layer.dataset.cardIndex=String(normalized);
    layer.innerHTML=this.cardMarkup(card,normalized);
  }

  advanceTo(target,{manual=false}={}){
    if(this.transitioning)return;

    const normalized=this.normalizeIndex(target);
    if(normalized===this.index){
      this.syncPlayback();
      return;
    }

    const next=this.normalizeIndex(this.index+1);
    if(normalized!==next){
      this.jumpTo(normalized);
      if(manual)this.pauseBriefly(850);
      return;
    }

    clearTimeout(this.timer);
    this.transitioning=true;
    this.root.classList.add("is-advancing","paused");

    clearTimeout(this.transitionTimer);
    this.transitionTimer=setTimeout(()=>{
      const front=this.root.querySelector(".layer-front");
      const mid=this.root.querySelector(".layer-mid");
      const back=this.root.querySelector(".layer-back");
      const incoming=this.root.querySelector(".layer-incoming");

      this.index=normalized;

      front.classList.remove("layer-front");
      front.classList.add("layer-incoming");
      front.dataset.role="incoming";
      this.updateLayer(front,this.index+3);

      mid.classList.remove("layer-mid");
      mid.classList.add("layer-front");
      mid.dataset.role="front";

      back.classList.remove("layer-back");
      back.classList.add("layer-mid");
      back.dataset.role="mid";

      incoming.classList.remove("layer-incoming");
      incoming.classList.add("layer-back");
      incoming.dataset.role="back";

      this.root.classList.remove("is-advancing");
      this.transitioning=false;
      this.bindDots();

      if(manual)this.pauseBriefly(850);
      else this.syncPlayback();
    },560);
  }

  jumpTo(target){
    clearTimeout(this.timer);
    this.transitioning=true;
    this.root.classList.add("is-jumping","paused");

    clearTimeout(this.transitionTimer);
    this.transitionTimer=setTimeout(()=>{
      this.index=target;
      this.renderDeck();
      this.root.classList.add("jump-enter");
      requestAnimationFrame(()=>requestAnimationFrame(()=>this.root.classList.remove("jump-enter")));
      this.transitioning=false;
      this.syncPlayback();
    },220);
  }

  destroy(){
    clearTimeout(this.timer);
    clearTimeout(this.transitionTimer);
    clearTimeout(this.manualResumeTimer);
    this.abort.abort();
    this.root?.replaceChildren?.();
  }
}

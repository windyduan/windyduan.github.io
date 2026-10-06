import { sections } from "../data/content.js";
import { t } from "./render.js";

class ChromeActivity{
  constructor(topbar,indicator){
    this.topbar=topbar;
    this.indicator=indicator;
    this.targets=[topbar,indicator].filter(Boolean);
    this.timer=null;
    this.reading=false;
  }
  moving(){
    this.targets.forEach(el=>el.classList.add("is-moving"));
    clearTimeout(this.timer);
    this.timer=setTimeout(()=>{
      this.targets.forEach(el=>el.classList.remove("is-moving"));
      this.applyReadingState();
    },420);
  }
  setReading(value){
    this.reading=Boolean(value);
    this.applyReadingState();
  }
  applyReadingState(){
    this.topbar?.classList.toggle("is-reading",this.reading);
  }
  destroy(){
    clearTimeout(this.timer);
    this.targets.forEach(el=>el.classList.remove("is-moving"));
    this.topbar?.classList.remove("is-reading");
  }
}

export class HorizontalPager{
  constructor({carousel,topbar,indicator,lang="zh",onSectionChange}){
    this.carousel=carousel;
    this.topbar=topbar;
    this.indicator=indicator;
    this.lang=lang;
    this.onSectionChange=onSectionChange;
    this.slides=[...carousel.querySelectorAll(".slide")];
    this.active=0;
    this.wheelLock=false;
    this.edgeIntent={direction:0,total:0,lastAt:0};
    this.chrome=new ChromeActivity(topbar,indicator);
    this.abort=new AbortController();
    this.renderIndicator();
    this.bind();
    this.sync();
  }

  setLanguage(lang){
    this.lang=lang;
    this.renderIndicator();
    this.sync();
  }

  renderIndicator(){
    this.indicator.innerHTML='<span class="direction-copy" id="direction-copy"></span><span class="direction-arrow" id="direction-arrow">→</span>';
  }

  bind(){
    const signal=this.abort.signal;

    this.carousel.addEventListener("scroll",()=>{
      this.chrome.moving();
      const i=Math.round(this.carousel.scrollLeft/Math.max(1,this.carousel.clientWidth));
      if(i!==this.active){
        this.active=i;
        this.resetEdgeIntent();
        this.sync();
      }else{
        this.updateReadingChrome();
        this.updateHint();
      }
    },{passive:true,signal});

    this.slides.forEach(slide=>slide.addEventListener("scroll",()=>{
      this.chrome.moving();
      if(slide===this.slides[this.active]){
        this.resetEdgeIntent();
        this.updateReadingChrome();
        this.updateHint();
      }
    },{passive:true,signal}));

    this.carousel.addEventListener("touchmove",()=>{
      this.chrome.moving();
      this.resetEdgeIntent();
    },{passive:true,signal});

    window.addEventListener("keydown",e=>{
      if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;
      if(e.key==="ArrowRight"){e.preventDefault();this.go(this.active+1)}
      if(e.key==="ArrowLeft"){e.preventDefault();this.go(this.active-1)}
      if(e.key==="Home"){e.preventDefault();this.go(0)}
      if(e.key==="End"){e.preventDefault();this.go(this.slides.length-1)}
    },{signal});

    this.carousel.addEventListener("wheel",e=>this.onWheel(e),{passive:false,signal});

    document.addEventListener("click",e=>{
      const target=e.target.closest("[data-section-go]");
      if(!target)return;
      const id=target.dataset.sectionGo;
      const i=sections.findIndex(s=>s.id===id);
      if(i>=0)this.go(i);
    },{signal});

    this.indicator.addEventListener("click",()=>this.followHint(),{signal});
  }

  onWheel(e){
    this.chrome.moving();

    const absX=Math.abs(e.deltaX);
    const absY=Math.abs(e.deltaY);

    // Trackpads with a clear horizontal gesture should keep native horizontal scrolling.
    if(absX>absY*1.15){
      this.resetEdgeIntent();
      return;
    }
    if(absY<12)return;

    const slide=this.slides[this.active];
    const scrollable=slide.scrollHeight>slide.clientHeight+8;
    const atTop=slide.scrollTop<=1;
    const atBottom=slide.scrollTop+slide.clientHeight>=slide.scrollHeight-3;
    const direction=e.deltaY>0?1:-1;

    // Vertical reading always wins while there is content left in that direction.
    if(scrollable&&!((direction>0&&atBottom)||(direction<0&&atTop))){
      this.resetEdgeIntent();
      return;
    }

    if((direction<0&&this.active===0)||(direction>0&&this.active===this.slides.length-1)){
      this.resetEdgeIntent();
      return;
    }

    e.preventDefault();
    if(this.wheelLock)return;

    // On long pages, require a little extra "overscroll intent" at the edge so
    // reaching the end of an article never instantly throws the reader sideways.
    const now=performance.now();
    if(this.edgeIntent.direction!==direction||now-this.edgeIntent.lastAt>340){
      this.edgeIntent={direction,total:0,lastAt:now};
    }
    this.edgeIntent.direction=direction;
    this.edgeIntent.total+=absY;
    this.edgeIntent.lastAt=now;

    const threshold=scrollable?150:70;
    if(this.edgeIntent.total<threshold){
      this.updateHint();
      return;
    }

    this.resetEdgeIntent();
    this.wheelLock=true;
    this.go(this.active+direction);
    setTimeout(()=>this.wheelLock=false,620);
  }

  resetEdgeIntent(){
    this.edgeIntent={direction:0,total:0,lastAt:0};
  }

  followHint(){
    const direction=this.indicator.dataset.direction;
    const slide=this.slides[this.active];
    if(direction==="down"){
      this.chrome.moving();
      slide.scrollBy({
        top:Math.max(320,slide.clientHeight*.72),
        behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"
      });
    }else if(direction==="right"){
      this.go(this.active+1);
    }
  }

  go(i){
    const next=Math.max(0,Math.min(this.slides.length-1,i));
    this.active=next;
    this.resetEdgeIntent();
    this.chrome.moving();
    this.slides[next].scrollIntoView({
      behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",
      inline:"start",
      block:"nearest"
    });
    this.sync();
  }

  destroy(){
    this.abort.abort();
    this.chrome.destroy();
  }

  updateReadingChrome(){
    const slide=this.slides[this.active];
    const scrollable=slide?.scrollHeight>slide?.clientHeight+8;
    const reading=Boolean(scrollable&&slide.scrollTop>34);
    this.chrome.setReading(reading);
  }

  sync(){
    this.slides.forEach((s,i)=>s.classList.toggle("is-active",i===this.active));
    document.querySelectorAll("[data-section-go]").forEach(b=>b.classList.toggle("active",sections[this.active]?.id===b.dataset.sectionGo));
    this.updateReadingChrome();
    this.updateHint();
    this.onSectionChange?.(sections[this.active]?.id,this.active);
  }

  updateHint(){
    const slide=this.slides[this.active];
    const label=this.indicator.querySelector("#direction-copy");
    const arrow=this.indicator.querySelector("#direction-arrow");
    if(!slide||!label||!arrow)return;

    const scrollable=slide.scrollHeight>slide.clientHeight+8;
    const atBottom=slide.scrollTop+slide.clientHeight>=slide.scrollHeight-3;

    if(scrollable&&!atBottom){
      label.textContent=this.lang==="zh"?"向下滚动":"scroll down";
      arrow.textContent="↓";
      this.indicator.dataset.direction="down";
      this.indicator.disabled=false;
      this.indicator.setAttribute("aria-label",this.lang==="zh"?"向下阅读当前章节":"Scroll down in this section");
    }else if(this.active<this.slides.length-1){
      label.textContent=this.lang==="zh"?(innerWidth<900?"左滑 · 下一页":"滚动 · 下一页"):(innerWidth<900?"swipe · next":"scroll · next");
      arrow.textContent="→";
      this.indicator.dataset.direction="right";
      this.indicator.disabled=false;
      this.indicator.setAttribute("aria-label",this.lang==="zh"?"前往下一页":"Go to next section");
    }else{
      label.textContent=this.lang==="zh"?"到这里啦":"end";
      arrow.textContent="·";
      this.indicator.dataset.direction="end";
      this.indicator.disabled=true;
      this.indicator.setAttribute("aria-label",this.lang==="zh"?"已经到最后一页":"End of portfolio");
    }
  }
}

export class LocalTocManager{
  constructor({carousel,lang="zh"}){
    this.carousel=carousel;this.lang=lang;this.entries=new Map();this.build();
  }
  rebuild(lang=this.lang){this.destroy();this.lang=lang;this.entries=new Map();this.build()}
  build(){
    this.carousel.querySelectorAll('.slide[data-local-toc="true"]').forEach(slide=>{
      const items=[...slide.querySelectorAll("[data-toc-item]")];
      if(items.length<2)return;
      const toc=document.createElement("aside");
      toc.className="local-toc";
      toc.setAttribute("aria-label",this.lang==="zh"?"本页目录":"Section contents");
      toc.innerHTML='<div class="local-progress"><i></i></div><div class="local-toc-list">'+items.map((el,i)=>'<button type="button" data-local-go="'+i+'"><span class="local-dot"></span><span class="local-label">'+el.dataset.tocLabel+'</span></button>').join("")+'</div>';
      slide.appendChild(toc);
      toc.querySelectorAll("[data-local-go]").forEach(b=>b.onclick=()=>{
        const item=items[Number(b.dataset.localGo)];
        item.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"center"});
      });
      const update=()=>this.update(slide,toc,items);
      slide.addEventListener("scroll",update,{passive:true});
      this.entries.set(slide,{toc,items,update});
      requestAnimationFrame(update);
    });
  }
  update(slide,toc,items){
    const max=Math.max(1,slide.scrollHeight-slide.clientHeight);
    const progress=Math.min(1,Math.max(0,slide.scrollTop/max));
    toc.style.setProperty("--local-progress",(progress*100)+"%");
    const anchor=slide.getBoundingClientRect().top+slide.clientHeight*.43;
    let active=0,best=Infinity;
    items.forEach((item,i)=>{const d=Math.abs(item.getBoundingClientRect().top-anchor);if(d<best){best=d;active=i}});
    toc.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("active",i===active));
  }
  destroy(){
    this.entries?.forEach(({toc})=>toc.remove());
    this.entries?.clear?.();
  }
}

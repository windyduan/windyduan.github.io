import { sections } from "../data/content.js";
import { icon } from "./icons.js";
import { t } from "./render.js";

class ChromeActivity{
  constructor(topbar){this.topbar=topbar;this.timer=null}
  moving(){
    this.topbar.classList.add("is-moving");
    clearTimeout(this.timer);
    this.timer=setTimeout(()=>this.topbar.classList.remove("is-moving"),520);
  }
}

export class HorizontalPager{
  constructor({carousel,topbar,indicator,lang="zh",onSectionChange}){
    this.carousel=carousel;this.topbar=topbar;this.indicator=indicator;this.lang=lang;this.onSectionChange=onSectionChange;
    this.slides=[...carousel.querySelectorAll(".slide")];this.active=0;this.wheelLock=false;this.chrome=new ChromeActivity(topbar);
    this.abort=new AbortController();
    this.renderIndicator();this.bind();this.sync();
  }
  setLanguage(lang){this.lang=lang;this.renderIndicator();this.sync()}
  renderIndicator(){
    this.indicator.innerHTML='<span class="page-count" id="page-count"></span><span class="direction-copy" id="direction-copy"></span><span class="direction-arrow" id="direction-arrow">→</span>';
  }
  bind(){
    const opt={signal:this.abort.signal};
    this.carousel.addEventListener("scroll",()=>{
      this.chrome.moving();
      const i=Math.round(this.carousel.scrollLeft/Math.max(1,this.carousel.clientWidth));
      if(i!==this.active){this.active=i;this.sync()}else this.updateHint();
    },{passive:true,signal:this.abort.signal});
    this.slides.forEach(slide=>slide.addEventListener("scroll",()=>{this.chrome.moving();if(slide===this.slides[this.active])this.updateHint()},{passive:true,signal:this.abort.signal}));
    this.carousel.addEventListener("touchmove",()=>this.chrome.moving(),{passive:true,signal:this.abort.signal});
    window.addEventListener("keydown",e=>{
      if(["INPUT","TEXTAREA"].includes(document.activeElement?.tagName))return;
      if(e.key==="ArrowRight"){e.preventDefault();this.go(this.active+1)}
      if(e.key==="ArrowLeft"){e.preventDefault();this.go(this.active-1)}
      if(e.key==="Home")this.go(0);
      if(e.key==="End")this.go(this.slides.length-1);
    },opt);
    this.carousel.addEventListener("wheel",e=>this.onWheel(e),{passive:false,signal:this.abort.signal});
    document.addEventListener("click",e=>{
      const target=e.target.closest("[data-section-go]");
      if(!target)return;
      const id=target.dataset.sectionGo;
      const i=sections.findIndex(s=>s.id===id);
      if(i>=0)this.go(i);
    },opt);
  }
  onWheel(e){
    this.chrome.moving();
    if(this.wheelLock||Math.abs(e.deltaY)<20||Math.abs(e.deltaY)<Math.abs(e.deltaX))return;
    const slide=this.slides[this.active];
    const scrollable=slide.scrollHeight>slide.clientHeight+4;
    if(scrollable){
      const atTop=slide.scrollTop<=1;
      const atBottom=slide.scrollTop+slide.clientHeight>=slide.scrollHeight-2;
      if(!((e.deltaY>0&&atBottom)||(e.deltaY<0&&atTop)))return;
    }
    e.preventDefault();
    this.wheelLock=true;this.go(this.active+(e.deltaY>0?1:-1));
    setTimeout(()=>this.wheelLock=false,650);
  }
  go(i){
    const next=Math.max(0,Math.min(this.slides.length-1,i));
    this.active=next;this.chrome.moving();
    this.slides[next].scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",inline:"start",block:"nearest"});
    this.sync();
  }
  destroy(){this.abort.abort();clearTimeout(this.chrome.timer)}
  sync(){
    this.slides.forEach((s,i)=>s.classList.toggle("is-active",i===this.active));
    document.querySelectorAll("[data-section-go]").forEach(b=>b.classList.toggle("active",sections[this.active]?.id===b.dataset.sectionGo));
    const count=this.indicator.querySelector("#page-count");
    if(count)count.textContent=String(this.active+1).padStart(2,"0")+" / "+String(this.slides.length).padStart(2,"0");
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
    }else if(this.active<this.slides.length-1){
      label.textContent=this.lang==="zh"?(innerWidth<900?"左右滑动":"继续滚动"):(innerWidth<900?"swipe":"keep scrolling");
      arrow.textContent="→";
      this.indicator.dataset.direction="right";
    }else{
      label.textContent=this.lang==="zh"?"到这里啦":"end";
      arrow.textContent="·";
      this.indicator.dataset.direction="end";
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

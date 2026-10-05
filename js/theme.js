import { iconPath } from "./icons.js";

export class Preferences{
  constructor({onLanguageChange}={}){
    this.lang=localStorage.getItem("portfolio-lang")||"zh";
    this.theme=localStorage.getItem("portfolio-theme")||"light";
    this.onLanguageChange=onLanguageChange;
    this.langButton=document.getElementById("lang-btn");
    this.themeButton=document.getElementById("theme-btn");
    this.themeIcon=document.getElementById("theme-icon");
    this.langButton.onclick=()=>this.toggleLanguage();
    this.themeButton.onclick=()=>this.toggleTheme();
    this.applyTheme();this.applyLanguageLabel();
  }
  applyTheme(){
    document.documentElement.dataset.theme=this.theme;
    this.themeIcon.innerHTML=iconPath(this.theme==="light"?"moon":"sun");
    document.querySelector('meta[name="theme-color"]').content=this.theme==="light"?"#f6f1e7":"#232827";
  }
  applyLanguageLabel(){document.documentElement.lang=this.lang==="zh"?"zh-CN":"en";this.langButton.textContent=this.lang==="zh"?"EN":"中"}
  toggleTheme(){this.theme=this.theme==="light"?"dark":"light";localStorage.setItem("portfolio-theme",this.theme);this.applyTheme()}
  toggleLanguage(){this.lang=this.lang==="zh"?"en":"zh";localStorage.setItem("portfolio-lang",this.lang);this.applyLanguageLabel();this.onLanguageChange?.(this.lang)}
}

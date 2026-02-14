function updateTime(){
  const now = new Date();
  const options={timeZone:"Asia/Jakarta",hour:"2-digit",minute:"2-digit"};
  const time=now.toLocaleTimeString("id-ID",options);
  const el=document.getElementById("time");
  if(el){el.textContent=time+" WIB";}
}
setInterval(updateTime,1000);
updateTime();

function attachCopyHandlers(){
  const email="ramzyxce@gmail.com";
  const username="@ramzyxce_";
  const btnEmail=document.getElementById("btnCopyEmail");
  const btnUser=document.getElementById("btnCopyUsername");
  if(btnEmail){
    btnEmail.addEventListener("click",()=>{
      navigator.clipboard.writeText(email);
      const original=btnEmail.textContent;
      btnEmail.textContent="copied!";
      setTimeout(()=>btnEmail.textContent=original,2000);
    });
  }
  if(btnUser){
    btnUser.addEventListener("click",()=>{
      navigator.clipboard.writeText(username);
      const original=btnUser.textContent;
      btnUser.textContent="copied!";
      setTimeout(()=>btnUser.textContent=original,2000);
    });
  }
}

function initGuestNote(){
  const textarea=document.getElementById("guestNote");
  const save=document.getElementById("btnSaveNote");
  const clear=document.getElementById("btnClearNote");
  const container=document.getElementById("savedNoteContainer");
  const display=document.getElementById("savedNoteDisplay");
  
  if(!textarea)return;
  const KEY="guest_note";
  
  // Load saved note
  const stored=localStorage.getItem(KEY);
  if(stored){
    textarea.value=stored;
    if(display && container){
      display.textContent=stored;
      container.style.display="block";
    }
  }
  
  if(save){
    save.addEventListener("click",()=>{
      const val=textarea.value.trim();
      if(!val)return;
      localStorage.setItem(KEY,val);
      if(display && container){
        display.textContent=val;
        container.style.display="block";
      }
      const original=save.textContent;
      save.textContent="saved!";
      setTimeout(()=>save.textContent=original,2000);
    });
  }
  
  if(clear){
    clear.addEventListener("click",()=>{
      textarea.value="";
      localStorage.removeItem(KEY);
      if(container)container.style.display="none";
      if(display)display.textContent="";
    });
  }
}

window.addEventListener("DOMContentLoaded",()=>{
  attachCopyHandlers();
  initGuestNote();
  initPlay();
  setSocialLinks();
  initThemeToggle();
  initSectionNav();
  initSwipeNav();
  initLongPressSocial();
  initShareGithub();
  initTypewriter();
});

function initTypewriter(){
  const el=document.getElementById("typewriter");
  if(!el)return;
  const texts=["midnight loop.","quiet logs","love jila"];
  let textIndex=0;
  let charIndex=0;
  let isDeleting=false;
  
  function type(){
    const current=texts[textIndex];
    let speed=40; // Super fast typing speed
    
    if(isDeleting){
      el.textContent=current.substring(0,charIndex-1);
      charIndex--;
      speed=20; // Super fast deleting
    }else{
      el.textContent=current.substring(0,charIndex+1);
      charIndex++;
    }
    
    if(!isDeleting && charIndex===current.length){
      isDeleting=true;
      speed=1000; // Shorter pause at end
    }else if(isDeleting && charIndex===0){
      isDeleting=false;
      textIndex=(textIndex+1)%texts.length;
      speed=200; // Short pause before next
    }
    
    setTimeout(type,speed);
  }
  type();
}

function initPlay(){
  const btn=document.getElementById("btnPlay");
  if(!btn)return;
  
  // Track ID from user: 7bPWdJgx8vek7S5i5yAtvG (Clouds - BØRNS?)
  // Using Spotify Embed with autoplay
  const TRACK_ID = "7bPWdJgx8vek7S5i5yAtvG";
  let iframe = null;

  btn.addEventListener("click",()=>{
    const playing=btn.getAttribute("data-state")==="playing";
    
    if(playing){
      // Stop
      btn.setAttribute("data-state", "paused");
      btn.innerHTML = '<span class="ico-mini">🎧</span><span>play</span>';
      if(iframe){
        iframe.remove();
        iframe = null;
      }
    } else {
      // Play
      btn.setAttribute("data-state", "playing");
      btn.innerHTML = '<span class="ico-mini">⏸</span><span>pause</span>';
      
      // Create invisible autoplay iframe
      iframe = document.createElement("iframe");
      iframe.src = `https://open.spotify.com/embed/track/${TRACK_ID}?autoplay=1`;
      iframe.width = "1";
      iframe.height = "1";
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture";
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      iframe.style.opacity = "0";
      document.body.appendChild(iframe);
    }
  });
}

function setSocialLinks(){
  const ROBLOX_URL="https://www.roblox.com/users/3111082965/profile";
  const SPOTIFY_URL="https://open.spotify.com/user/31wmimnbduqkbkp3rdmryazrlcv4?si=c513f457abfd4907";
  const INSTAGRAM_URL="https://instagram.com/ramzyxce_";
  const WEBSITE_URL="https://ramzyxce.github.io";
  const DISCORD_URL="https://discord.gg/mystralacademy";
  const GITHUB_URL="https://github.com/ramzyxce";

  const r=document.getElementById("linkRoblox");
  if(r){r.href=ROBLOX_URL;}
  const s=document.getElementById("linkSpotify");
  if(s){s.href=SPOTIFY_URL;}
  const ig=document.getElementById("linkInstagram");
  if(ig){ig.href=INSTAGRAM_URL;}
  const w=document.getElementById("linkWebsite");
  if(w){w.href=WEBSITE_URL;}
  const d=document.getElementById("linkDiscord");
  if(d){d.href=DISCORD_URL;}
  const g=document.getElementById("linkGithub");
  if(g){g.href=GITHUB_URL;}
}

function initThemeToggle(){
  const chip=document.querySelector(".mode-chip");
  if(!chip)return;
  const themes=["dark","light"];
  let current=localStorage.getItem("theme")||"dark";
  apply(current);
  chip.addEventListener("click",()=>{
    const i=themes.indexOf(current);
    current=themes[(i+1)%themes.length];
    apply(current);
  });
  function apply(name){
    document.body.classList.remove("theme-dark","theme-light","theme-green","theme-blue","theme-violet");
    document.body.classList.add("theme-"+name);
    chip.textContent="mode: "+name;
    localStorage.setItem("theme",name);
  }
}

function initSectionNav(){
  const navLinks=[...document.querySelectorAll(".nav a")];
  if(!navLinks.length)return;
  const ids=["home","social","music","extras"];
  const sections=ids.map(id=>document.getElementById(id)).filter(Boolean);
  function setActive(id){
    navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
  }
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          setActive(e.target.id);
        }
      });
    },{rootMargin:"-30% 0px -60% 0px",threshold:0.1});
    sections.forEach(s=>io.observe(s));
  }
  navLinks.forEach(a=>{
    a.addEventListener("click",()=>{
      const id=a.getAttribute("href").slice(1);
      setActive(id);
    });
  });
}

function initSwipeNav(){
  const ids=["home","social","music","extras"];
  const sections=ids.map(id=>document.getElementById(id)).filter(Boolean);
  if(!sections.length)return;
  let startX=0,startY=0,swiping=false;
  const threshold=50;
  document.addEventListener("touchstart",(e)=>{
    if(!e.touches||!e.touches.length)return;
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
    swiping=true;
  },{passive:true});
  document.addEventListener("touchmove",(e)=>{
    if(!swiping||!e.touches||!e.touches.length)return;
    const dx=e.touches[0].clientX-startX;
    const dy=e.touches[0].clientY-startY;
    if(Math.abs(dx)>Math.abs(dy) && Math.abs(dx)>threshold){
      const currentIndex=sections.findIndex(s=>{
        const rect=s.getBoundingClientRect();
        return rect.top<window.innerHeight*0.5 && rect.bottom>window.innerHeight*0.5;
      });
      let target=currentIndex;
      if(dx<0) target=Math.min(currentIndex+1,sections.length-1); // swipe left -> next
      else target=Math.max(currentIndex-1,0); // swipe right -> prev
      sections[target].scrollIntoView({behavior:"smooth",block:"start"});
      swiping=false;
    }
  },{passive:true});
  document.addEventListener("touchend",()=>{swiping=false},{passive:true});
}

function initLongPressSocial(){
  const items=[...document.querySelectorAll(".social-btn[href]")];
  if(!items.length)return;
  const LONG_PRESS_MS=550;
  items.forEach(a=>{
    let timer=null;
    const start=()=>{
      timer=setTimeout(async()=>{
        const url=a.getAttribute("href");
        try{
          await navigator.clipboard.writeText(url);
          const original=a.lastElementChild?.textContent||"↗";
          if(a.lastElementChild)a.lastElementChild.textContent="copied";
          setTimeout(()=>{if(a.lastElementChild)a.lastElementChild.textContent=original},1500);
        }catch{}
      },LONG_PRESS_MS);
    };
    const cancel=()=>{if(timer){clearTimeout(timer);timer=null;}};
    a.addEventListener("touchstart",start,{passive:true});
    a.addEventListener("touchend",cancel,{passive:true});
    a.addEventListener("touchmove",cancel,{passive:true});
    a.addEventListener("touchcancel",cancel,{passive:true});
  });
}
function initShareGithub(){
  const btn=document.getElementById("btnShareGithub");
  if(!btn)return;
  const GITHUB_URL="https://github.com/ramzyxce";
  btn.addEventListener("click",()=>{
    window.open(GITHUB_URL,"_blank","noopener,noreferrer");
  });
}


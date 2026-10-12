const projects={"grow": {"title": "Dr.Grow Labs", "category": "AQUACULTURE BIOLOGICALS · BRAND WEBSITE", "description": "A science-led website introducing aquaculture biologicals, pond care and health care formulations, research, and farmer education.", "contribution": "Built the website from scratch for Aquaconnect’s new brand launch, with product pages and enquiry forms.", "features": ["Research and development storytelling", "Formulation catalogue and product information", "Farmer community and contact journeys"], "tags": ["React.js", "Tailwind CSS", "Product catalogue"], "url": "https://drgrow.in", "domain": "drgrow.in", "image": "project-drgrow.jpg", "caption": "Science, pond care, and a new brand launch."}, "aqua": {"title": "Aquaconnect Global", "category": "SEAFOOD SOURCING · GLOBAL PLATFORM", "description": "A multilingual seafood sourcing website connecting international buyers with Indian processors, supported by product discovery, quality inspection information, and quote enquiries.", "contribution": "Maintained and improved Aquaconnect’s main website and global version. Built BluTik, the quality-check tool featured on the global site, generating tamper-proof inspection reports before export.", "features": ["Seafood product discovery and buyer enquiries", "English, Russian, Chinese and Vietnamese support", "BluTik quality-inspection platform introduction"], "tags": ["React.js", "Tailwind CSS", "Multilingual"], "url": "https://aquaconnect.blue/global/", "domain": "aquaconnect.blue/global", "image": "project-aquaconnect.jpg", "caption": "Seafood sourcing, across languages and borders."}, "logistics": {"title": "Panchathan Logistics", "category": "COURIER & CARGO · COMPANY WEBSITE", "description": "A logistics website bringing freight services, shipment tracking, quote enquiries, and nationwide branch information into one digital experience.", "contribution": "Built the complete company website from scratch, including the live shipment tracking tool, quote request form, and scroll-based storytelling on the homepage.", "features": ["Shipment tracking and service availability", "Air, ground, and ocean freight information", "Quote enquiries and branch discovery"], "tags": ["React.js", "Shipment tracking", "Scroll storytelling"], "url": "https://panchathanlogistics.com", "domain": "panchathanlogistics.com", "image": "project-logistics.jpg", "caption": "Reliable logistics. Clear tracking and enquiries."}, "fish": {"title": "Fish Choice", "category": "FISH NUTRITION · PRODUCT EXPERIENCE", "description": "A product website explaining floating fish feed for IMC and exotic carps through nutrition storytelling, ingredients, pellet sizes, and species-specific information.", "contribution": "Built the website with React.js and Tailwind CSS, using GSAP scroll animations to communicate the product story.", "features": ["Ingredient and nutrition storytelling", "Feed sizes and product variants", "Species information and customer enquiries"], "tags": ["React.js", "Tailwind CSS", "GSAP"], "url": "https://fishchoice.in", "domain": "fishchoice.in", "image": "project-fishchoice.jpg", "caption": "A nutrition story told through scroll and motion."}, "vjoin": {"title": "VJoin", "category": "SPORTS COMMUNITIES · FREELANCE PROJECT", "description": "A community sports platform where organisers manage groups and recurring sessions, and members discover groups and book events.", "contribution": "Built front-end features for a UK client’s badminton events platform, including event scheduling and member-facing screens.", "features": ["Group discovery and member journeys", "Recurring sessions and event booking", "Community event organisation"], "tags": ["Frontend features", "Event scheduling", "UK freelance client"], "url": "https://vjoin.app", "domain": "vjoin.app", "image": "project-vjoin.jpg", "caption": "Helping sports communities get together."}};
const dialog=document.querySelector('#project-dialog');document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=projects[button.dataset.project];document.querySelector('#dialog-category').textContent=p.category;document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-features').replaceChildren(...p.features.map(feature=>{const li=document.createElement('li');li.textContent=feature;return li}));dialog.dataset.theme=button.dataset.project;document.querySelector('#dialog-contribution').textContent=p.contribution;document.querySelector('#dialog-link').href=p.url;document.querySelector('#dialog-tags').replaceChildren(...p.tags.map(tag=>{let s=document.createElement('span');s.textContent=tag;return s}));dialog.showModal()}));document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

// All sections are readable until their animation assets and libraries are ready.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let motionOff = preference.matches;
let animationContext;
let hoverCleanups = [];
let introTrigger, journeyTrigger, workTrigger;
let assetsReady = false;
const toggle = document.querySelector('#motion-toggle');
const story = document.querySelector('.story');
const about = document.querySelector('#about');
const greeting = document.querySelector('.story-greeting');
const milestones = [...document.querySelectorAll('.milestone')];
const projectPanels = [...document.querySelectorAll('.project')];
const milestoneLabels = [...document.querySelectorAll('.journey-index > span')];
const beat = document.querySelector('#story-beat');
const beatNames = ['01 / HELLO THERE', '02 / A LITTLE ABOUT ME', '03 / LET IT FLY', '04 / A CLOSER LOOK', '05 / THE PERSON BEHIND THE PIXELS'];

function restoreDocument() {
  if (animationContext) animationContext.revert();
  animationContext = null;
  hoverCleanups.forEach(cleanup => cleanup());
  hoverCleanups = [];
  introTrigger = journeyTrigger = workTrigger = null;
  story.classList.remove('story-active');
  document.querySelector('#journey').classList.remove('journey-pinned');
  document.querySelector('#work').classList.remove('work-pinned');
  document.querySelector('.work-chapter').removeAttribute('data-theme');
  [about, greeting, ...milestones, ...projectPanels].forEach(el => el.inert = false);
  milestoneLabels.forEach(el => el.removeAttribute('aria-current'));
  beat.textContent = beatNames[0];
}

function setupMotion() {
  restoreDocument();
  document.documentElement.classList.toggle('motion-off', motionOff);
  toggle.textContent = motionOff ? 'Enable motion' : 'Pause motion';
  toggle.setAttribute('aria-pressed', String(motionOff));
  if (motionOff || !assetsReady || !window.gsap || !window.ScrollTrigger || innerHeight < 620) return;
  const mobile = innerWidth <= 700;
  const w = innerWidth, h = innerHeight;
  gsap.registerPlugin(ScrollTrigger);
  story.classList.add('story-active');
  document.querySelector('#journey').classList.add('journey-pinned');
  if (!mobile) document.querySelector('#work').classList.add('work-pinned');
  animationContext = gsap.context(() => {
    gsap.set('.avatar-hold, .flying-paper, .paper-about', {autoAlpha: 0});
    gsap.set('.pose-a,.wave-arm', {autoAlpha: 1});
    gsap.set('.wave-arm', {rotation:0});
    // The head and torso stay still while only the hand/forearm waves.
    const wave = gsap.timeline();
    wave.to('.wave-arm',{rotation:9,duration:.35,ease:'sine.inOut'})
      .to('.wave-arm',{rotation:-7,duration:.5,ease:'sine.inOut'})
      .to('.wave-arm',{rotation:8,duration:.5,ease:'sine.inOut'})
      .to('.wave-arm',{rotation:0,duration:.4,ease:'sine.inOut'});
    gsap.set('.flying-paper', {xPercent:-50, yPercent:-50, transformPerspective:900});
    gsap.set('.paper-about .about-copy', {y:24});
    gsap.set('.journey-line', {scaleX:0});
    const avatar = document.querySelector('.story-avatar');
    const avatarRect = avatar.getBoundingClientRect();
    const sceneRect = story.getBoundingClientRect();
    const shiftX = mobile ? w * .19 : w * .09;
    // The invisible-paper grip is around (33%, 52%) of the matching avatar asset.
    const initialScale = mobile ? .48 : .65;
    const originX = avatarRect.left - sceneRect.left + shiftX + avatarRect.width * .33 - w / 2 - 90 * initialScale;
    const originY = avatarRect.top - sceneRect.top + avatarRect.height * .52 - h / 2 + 120 * initialScale;
    const coverScale = Math.max(w / 180, h / 240) * 1.18;
    const intro = gsap.timeline({defaults:{ease:'none'}, scrollTrigger:{
      id:'intro-story', trigger:story, start:'top top', end:()=>'+=' + innerHeight * (mobile ? 1.65 : 2),
      pin:true, scrub:.25, anticipatePin:1,
      onUpdate(self) {
        const p = self.progress;
        const index = p < .12 ? 0 : p < .35 ? 1 : p < .65 ? 2 : p < .85 ? 3 : 4;
        beat.textContent = beatNames[index];
        about.inert = p < .9;
        greeting.inert = p > .75;
      }
    }});
    introTrigger = intro.scrollTrigger;
    intro.to({}, {duration:100}, 0);
    intro.to('.story-avatar', {x:shiftX,rotation:mobile?1:2,scale:.96,duration:23,ease:'sine.inOut'},12)
      .to('.story-copy', {x:mobile?-10:-30,autoAlpha:0,duration:21},12)
      .to('.hello-tag,.avatar-note', {autoAlpha:0,duration:12},18)
      .to('.pose-a,.wave-arm',{autoAlpha:0,duration:8},22)
      .to('.avatar-hold',{autoAlpha:1,duration:8},22)
      .fromTo('.flying-paper', {x:originX,y:originY,rotation:-12,rotationY:-14,scale:initialScale},
        {autoAlpha:1,duration:5},30);
    // Two joined cubic curves form one uninterrupted, gently looping flight.
    const flight = {t:0};
    const endX=w*.04,endY=-h*.06;
    const cubic=(a,b,c,d,t)=>{
      const u=1-t;return u*u*u*a+3*u*u*t*b+3*u*t*t*c+t*t*t*d;
    };
    const renderFlight=()=>{
      const t=flight.t;
      let x,y;
      if(t<=.5){
        const q=t*2;
        x=cubic(originX,originX-w*.15,-w*.26,-w*.22,q);
        y=cubic(originY,originY-h*.35,-h*.26,h*.08,q);
      }else{
        const q=(t-.5)*2;
        x=cubic(-w*.22,-w*.18,w*.26,endX,q);
        y=cubic(h*.08,h*.42,h*.34,endY,q);
      }
      gsap.set('.flying-paper',{
        x,y,rotation:-12*(1-t)+Math.sin(t*Math.PI*2)*12,
        rotationY:Math.sin(t*Math.PI*2)*18-14*(1-t),
        rotationX:Math.sin(t*Math.PI*4)*4,
        scale:initialScale+(1.45-initialScale)*t
      });
    };
    intro.to(flight,{t:1,duration:30,ease:'sine.inOut',onUpdate:renderFlight},35)
      .fromTo('.flying-paper',{x:endX,y:endY,rotation:0,rotationY:0,rotationX:0,scale:1.45},
        {x:0,y:0,scale:coverScale,borderColor:'#fbf9f2',boxShadow:'0px 0px 0px transparent',duration:20,ease:'power2.inOut',immediateRender:false},65)
      .to('.paper-ink,.paper-fold',{autoAlpha:0,duration:10},70)
      .to('.story-greeting',{autoAlpha:0,duration:9},73)
      .to('.paper-about',{autoAlpha:1,duration:8},86)
      .to('.paper-about .about-copy',{y:0,duration:8},86);
    about.inert = true;

    gsap.set(milestones,{autoAlpha:0,y:25});
    gsap.set(milestones[0],{autoAlpha:1,y:0});
    const journey = gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
      id:'journey-chapter',trigger:'#journey',start:'top top',end:()=>'+='+innerHeight*2,
      pin:true,scrub:.25,anticipatePin:1,onUpdate(self){
        const index=Math.min(3,Math.floor(self.progress*4));
        milestones.forEach((el,i)=>el.inert=i!==index);
        milestoneLabels.forEach((el,i)=>i===index?el.setAttribute('aria-current','step'):el.removeAttribute('aria-current'));
      }
    }});
    journeyTrigger=journey.scrollTrigger;
    journey.to({}, {duration:100},0).to('.journey-line',{scaleX:1,duration:100},0);
    milestones.forEach((el,i)=>{
      if(i)journey.to(el,{autoAlpha:1,y:0,duration:5},i*25-3);
      if(i<3)journey.to(el,{autoAlpha:0,y:-18,duration:4},(i+1)*25-5);
      el.inert=i!==0;
    });
    milestoneLabels[0].setAttribute('aria-current','step');

    if(!mobile){
      gsap.set(projectPanels,{autoAlpha:0,x:45});
      gsap.set(projectPanels[0],{autoAlpha:1,x:0});
      document.querySelector('.work-chapter').dataset.theme='grow';
      gsap.set('.work-track i',{scaleX:.25});
      const work=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
        id:'work-chapter',trigger:'.work-chapter',start:'top top',end:()=>'+='+innerHeight*3,
        pin:true,scrub:.25,anticipatePin:1,onUpdate(self){
          const index=Math.min(3,Math.floor(self.progress*4));
          document.querySelector('#work-current').textContent=String(index+1).padStart(2,'0');
          document.querySelector('.work-chapter').dataset.theme=['grow','aqua','logistics','fish'][index];
          projectPanels.forEach((el,i)=>el.inert=i!==index);
        }
      }});
      workTrigger=work.scrollTrigger;
      work.to({}, {duration:100},0).to('.work-track i',{scaleX:1,duration:100},0);
      projectPanels.forEach((el,i)=>{
        if(i)work.to(el,{autoAlpha:1,x:0,duration:5},i*25-3);
        if(i<3)work.to(el,{autoAlpha:0,x:-40,duration:4},(i+1)*25-5);
        el.inert=i!==0;
      });
    }
    // Ordinary sections keep their native document flow.
    const ordinary=mobile?'.skills .reveal,.project.reveal,.other-work,.process .reveal,.contact .reveal':'.skills .reveal,.other-work,.process .reveal,.contact .reveal';
    gsap.utils.toArray(ordinary).forEach(el=>gsap.from(el,{y:24,autoAlpha:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}}));
    gsap.to('.progress',{width:'100%',ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:true}});
  });
  if(window.Motion){
    document.querySelectorAll('.button,.contact-circle').forEach(el=>{
      hoverCleanups.push(Motion.hover(el,()=>{
        Motion.animate(el,{scale:1.035},{duration:.2});
        return()=>Motion.animate(el,{scale:1},{duration:.2});
      }));
    });
  }
  ScrollTrigger.refresh();
}

function chapterDestination(id){
  if(id==='about'&&introTrigger)return introTrigger.end;
  if(id==='home'&&introTrigger)return introTrigger.start;
  if(id==='journey'&&journeyTrigger)return journeyTrigger.start;
  if(id==='work'&&workTrigger)return workTrigger.start;
  const target=document.getElementById(id);
  return target?target.getBoundingClientRect().top+scrollY-76:null;
}
function goToChapter(id,behavior='instant'){
  const top=chapterDestination(id);
  if(top===null)return;
  window.scrollTo({top:Math.max(0,top),behavior});
}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const id=link.getAttribute('href').slice(1);
  if(!document.getElementById(id))return;
  event.preventDefault();
  history.pushState(null,'','#'+id);
  goToChapter(id,'instant');
}));
window.addEventListener('popstate',()=>goToChapter(location.hash.slice(1)||'home'));
function currentChapter(){
  const y=scrollY;
  if(introTrigger&&y<=introTrigger.end+10)return y>introTrigger.end*.9?'about':'home';
  if(journeyTrigger&&y>=journeyTrigger.start&&y<=journeyTrigger.end+innerHeight)return 'journey';
  if(workTrigger&&y>=workTrigger.start&&y<=workTrigger.end+innerHeight)return 'work';
  return ['contact','work','skills','journey','about','home'].find(id=>document.getElementById(id).getBoundingClientRect().top<innerHeight*.45)||'home';
}
let scrollTick=false;
window.addEventListener('scroll',()=>{
  if(scrollTick)return;
  scrollTick=true;
  requestAnimationFrame(()=>{
    const id=currentChapter();
    document.querySelectorAll('nav a').forEach(link=>link.hash==='#'+id?link.setAttribute('aria-current','location'):link.removeAttribute('aria-current'));
    scrollTick=false;
  });
},{passive:true});
toggle.addEventListener('click',()=>{
  const id=currentChapter();
  motionOff=!motionOff;
  setupMotion();
  goToChapter(id);
});
preference.addEventListener('change',event=>{
  const id=currentChapter();motionOff=event.matches;setupMotion();goToChapter(id);
});
let resizeTimer,previousWidth=innerWidth,previousHeight=innerHeight;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{
    if(innerWidth===previousWidth&&Math.abs(innerHeight-previousHeight)<85)return;
    const id=currentChapter();
    const trigger=id==='home'||id==='about'?introTrigger:id==='journey'?journeyTrigger:id==='work'?workTrigger:null;
    const progress=trigger?.progress;
    previousWidth=innerWidth;previousHeight=innerHeight;setupMotion();
    const next=id==='home'||id==='about'?introTrigger:id==='journey'?journeyTrigger:id==='work'?workTrigger:null;
    if(next&&progress!==undefined)window.scrollTo({top:next.start+(next.end-next.start)*progress,behavior:'instant'});
    else goToChapter(id);
  },180);
});
const poseImages=[...document.querySelectorAll('.avatar-poses img')];
Promise.all(poseImages.map(image=>image.decode())).then(()=>{
  assetsReady=true;setupMotion();if(location.hash)goToChapter(location.hash.slice(1));
}).catch(()=>{
  // Keep the whole résumé in document flow if any character pose is unavailable.
  poseImages.forEach(image=>{if(!image.complete||!image.naturalWidth)image.style.display='none'});
  restoreDocument();
});
setupMotion();

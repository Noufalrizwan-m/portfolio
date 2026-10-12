const projects={grow:{title:'DrGrow',category:'AQUACULTURE · BRAND WEBSITE',description:'A website for Aquaconnect’s aquaculture biologicals brand, covering probiotics, oxygen boosters, disinfectants, and feed supplements.',contribution:'Built the website from scratch for the brand’s market launch, including product pages and enquiry forms.',tags:['React.js','Tailwind CSS','Product pages'],url:'https://drgrow.in'},aqua:{title:'Aquaconnect Global',category:'SEAFOOD SOURCING · MULTILINGUAL PLATFORM',description:'A global seafood sourcing platform connecting international buyers with Indian processors, with English, Russian, Chinese, and Vietnamese language support.',contribution:'Maintained and improved Aquaconnect’s main website and multilingual global version. Also built Blutik, a quality-check tool generating tamper-proof inspection reports before export.',tags:['React.js','Tailwind CSS','Multilingual'],url:'https://aquaconnect.blue/global'},logistics:{title:'Panchathan Logistics',category:'LOGISTICS · COMPANY WEBSITE',description:'A complete digital presence for a logistics firm, designed around enquiries and shipment information.',contribution:'Built the company website from scratch, including live shipment tracking, a quote request form, and a scroll-based storytelling section on the homepage.',tags:['React.js','Tracking','Scroll storytelling'],url:'https://panchathanlogistics.com'},fish:{title:'Fish Choice',category:'AQUACULTURE · PRODUCT WEBSITE',description:'A product website for floating fish feed used in IMC and exotic carp farming, explaining the nutrient formula and support for growth and feed conversion.',contribution:'Built the website using React.js and Tailwind CSS, with GSAP scroll animations to support the product story.',tags:['React.js','Tailwind CSS','GSAP'],url:'https://fishchoice.in'}};
const dialog=document.querySelector('#project-dialog');document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=projects[button.dataset.project];document.querySelector('#dialog-category').textContent=p.category;document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-contribution').textContent=p.contribution;document.querySelector('#dialog-link').href=p.url;document.querySelector('#dialog-tags').replaceChildren(...p.tags.map(tag=>{let s=document.createElement('span');s.textContent=tag;return s}));dialog.showModal()}));document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

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
    gsap.set('.pose-b, .avatar-hold, .flying-paper, .paper-about', {autoAlpha: 0});
    gsap.set('.pose-a', {autoAlpha: 1});
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
      id:'intro-story', trigger:story, start:'top top', end:()=>'+=' + innerHeight * (mobile ? 2.5 : 4),
      pin:true, scrub:.25, anticipatePin:1,
      onUpdate(self) {
        const p = self.progress;
        const index = p < .2 ? 0 : p < .4 ? 1 : p < .7 ? 2 : p < .9 ? 3 : 4;
        beat.textContent = beatNames[index];
        about.inert = p < .91;
        greeting.inert = p > .75;
      }
    }});
    introTrigger = intro.scrollTrigger;
    intro.to({}, {duration:100}, 0);
    // Alternating matched hand poses gives a greeting wave controlled by scrolling.
    [2, 8, 14].forEach(at => {
      intro.to('.pose-a', {autoAlpha:0,duration:1.4}, at)
        .to('.pose-b', {autoAlpha:1,duration:1.4}, at)
        .to('.pose-b', {autoAlpha:0,duration:1.4}, at+3)
        .to('.pose-a', {autoAlpha:1,duration:1.4}, at+3);
    });
    intro.to('.story-avatar', {x:shiftX,rotation:mobile?2:3,scale:.94,duration:20,ease:'power1.inOut'},20)
      .to('.story-copy', {x:mobile?-15:-45,autoAlpha:0,duration:17},23)
      .to('.hello-tag,.avatar-note', {autoAlpha:0,duration:10},25)
      .to('.pose-a,.pose-b',{autoAlpha:0,duration:5},29)
      .to('.avatar-hold',{autoAlpha:1,duration:5},29)
      .fromTo('.flying-paper', {x:originX,y:originY,rotation:-12,rotationY:-18,scale:initialScale},
        {autoAlpha:1,duration:5},35);
    // A continuous curved loop: travel left/up, sweep down, return, then approach.
    intro.to('.flying-paper',{x:mobile?-w*.20:-w*.22,y:-h*.17,rotation:-32,rotationY:32,rotationX:12,scale:mobile?.65:.9,duration:8,ease:'sine.inOut'},40)
      .to('.flying-paper',{x:-w*.25,y:h*.14,rotation:24,rotationY:-28,rotationX:-12,scale:mobile?.8:1.15,duration:8,ease:'sine.inOut'},48)
      .to('.flying-paper',{x:w*.10,y:h*.04,rotation:55,rotationY:22,rotationX:8,scale:mobile?1:1.45,duration:8,ease:'sine.inOut'},56)
      .to('.flying-paper',{x:0,y:-h*.06,rotation:12,rotationY:-12,rotationX:0,scale:2,duration:6,ease:'sine.inOut'},64)
      .to('.flying-paper',{x:0,y:0,rotation:0,rotationY:0,rotationX:0,scale:coverScale,borderColor:'#fbf9f2',boxShadow:'0px 0px 0px transparent',duration:20,ease:'power2.in'},70)
      .to('.paper-ink,.paper-fold',{autoAlpha:0,duration:12},73)
      .to('.story-greeting',{autoAlpha:0,duration:8},79)
      .to('.paper-about',{autoAlpha:1,duration:9},91)
      .to('.paper-about .about-copy',{y:0,duration:9},91);
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
      gsap.set('.work-track i',{scaleX:.25});
      const work=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
        id:'work-chapter',trigger:'.work-chapter',start:'top top',end:()=>'+='+innerHeight*3,
        pin:true,scrub:.25,anticipatePin:1,onUpdate(self){
          const index=Math.min(3,Math.floor(self.progress*4));
          document.querySelector('#work-current').textContent=String(index+1).padStart(2,'0');
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

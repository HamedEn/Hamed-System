/* Hamed's System v3 — Sanad-style study & personal growth system (Firebase Realtime DB) */
const FB={apiKey:"AIzaSyCyew0b33fO7EWBYhvDGspCOEFQPL1v4XI",authDomain:"hamed-s-system.firebaseapp.com",databaseURL:"https://hamed-s-system-default-rtdb.firebaseio.com",projectId:"hamed-s-system",storageBucket:"hamed-s-system.firebasestorage.app",messagingSenderId:"798317297627",appId:"1:798317297627:web:56be2410b47883454ef1fe"};
const ROOT="hamed_system_v3",OLD="hamed_clean_system",CK="hs_cache_v3";
const T={ar:{app:"Hamed's System",home:"الرئيسية",courses:"المواد",schedule:"الجدول",reports:"التقارير",platforms:"المنصات",settings:"الإعدادات",
setPin:"عيّن رمز القفل",setPinS:"أول مرة؟ اختر رمزاً من 4 إلى 8 أرقام",again:"أعد إدخال الرمز للتأكيد",enter:"أدخل رمز القفل",wrong:"الرمز غير صحيح",mismatch:"الرمزان غير متطابقين، حاول من جديد",short:"الرمز 4 أرقام على الأقل",wait:"محاولات كثيرة، انتظر 30 ثانية",
offline:"تعذّر الاتصال بالسحابة. تأكد من الإنترنت ثم أعد المحاولة.",retry:"إعادة المحاولة",synced:"متصل بالسحابة",notsynced:"غير متصل — يُحفظ على هذا الجهاز",local:"وضع محلي (بدون سحابة)",
uni:"جامعية",personal:"شخصية",addSem:"فصل جديد",addCourse:"مادة جديدة",editCourse:"تعديل المادة",sem:"الفصل",semName:"اسم الفصل",type:"النوع",name:"اسم المادة",inst:"المدرّس",place:"المكان / القاعة",credits:"الساعات المعتمدة",goal:"الهدف من المادة",link:"رابط (منصة / كورس)",
times:"أيام وأوقات المادة",addSlot:"إضافة موعد",remind:"التنبيه قبل الموعد",min:"د",hour:"ساعة",day:"يوم",start:"من",end:"إلى",save:"حفظ",cancel:"إلغاء",del:"حذف",edit:"تعديل",sure:"هل أنت متأكد من الحذف؟",
noSem:"ابدأ بإضافة فصل دراسي",noSemS:"الفصل يجمع موادك الجامعية والشخصية",noCourse:"لا توجد مواد في هذا الفصل",noClass:"لا توجد مواعيد",today:"محاضرات اليوم",next:"الموعد القادم",none:"لا شيء قادم",
logStudy:"تسجيل ساعات دراسة",minutes:"المدة بالدقائق",date:"التاريخ",general:"عام (بدون مادة)",totalH:"إجمالي الساعات",weekH:"ساعات هذا الأسبوع",streak:"أيام متتالية",courseN:"عدد المواد",
hDay:"ساعات الدراسة يومياً",hCourse:"الساعات حسب المادة",progress:"تقدّم المواد الشخصية",last7:"آخر 7 أيام",last30:"آخر 30 يوماً",print:"طباعة التقرير",noData:"سجّل أول جلسة دراسة لتظهر الرسوم هنا",
addPlat:"منصة جديدة",platName:"اسم المنصة",cat:"التصنيف",url:"الرابط",desc:"وصف",open:"فتح",noPlat:"أضف منصاتك (بوابة الجامعة، مودل، كورسات...) مع روابطها",
lang:"اللغة",notif:"تفعيل الإشعارات",notifTest:"تجربة تنبيه",notifOk:"الإشعارات مفعّلة",notifNo:"المتصفح لا يدعم الإشعارات",sound:"صوت التنبيه",changePin:"تغيير رمز القفل",newPin:"الرمز الجديد (4-8 أرقام)",pinDone:"تم تغيير الرمز",lock:"قفل",export:"نسخة احتياطية (JSON)",reset:"حذف كل البيانات",resetQ:"سيتم حذف كل بياناتك من السحابة نهائياً. متابعة؟",
notifNote:"التنبيهات تعمل أثناء فتح التطبيق (حتى لو في تبويب خلفي). للتنبيه وهو مغلق ثبّته على الشاشة الرئيسية.",
alertIn:"بعد",alertNow:"الآن",startsAt:"تبدأ الساعة"},
en:{app:"Hamed's System",home:"Home",courses:"Courses",schedule:"Schedule",reports:"Reports",platforms:"Platforms",settings:"Settings",
setPin:"Set your passcode",setPinS:"First time? Choose 4–8 digits",again:"Re-enter the passcode to confirm",enter:"Enter your passcode",wrong:"Wrong passcode",mismatch:"Passcodes don't match, try again",short:"At least 4 digits",wait:"Too many attempts, wait 30 seconds",
offline:"Can't reach the cloud. Check your connection and retry.",retry:"Retry",synced:"Connected to cloud",notsynced:"Offline — saved on this device",local:"Local mode (no cloud)",
uni:"University",personal:"Personal",addSem:"New semester",addCourse:"New course",editCourse:"Edit course",sem:"Semester",semName:"Semester name",type:"Type",name:"Course name",inst:"Instructor",place:"Location / room",credits:"Credit hours",goal:"Goal of this course",link:"Link (platform / course)",
times:"Days & times",addSlot:"Add slot",remind:"Remind me before",min:"min",hour:"h",day:"day",start:"From",end:"To",save:"Save",cancel:"Cancel",del:"Delete",edit:"Edit",sure:"Delete this item?",
noSem:"Start by adding a semester",noSemS:"A semester groups your university and personal courses",noCourse:"No courses in this semester",noClass:"No sessions",today:"Today's sessions",next:"Next up",none:"Nothing coming up",
logStudy:"Log study time",minutes:"Minutes",date:"Date",general:"General (no course)",totalH:"Total hours",weekH:"Hours this week",streak:"Day streak",courseN:"Courses",
hDay:"Study hours per day",hCourse:"Hours by course",progress:"Personal course progress",last7:"Last 7 days",last30:"Last 30 days",print:"Print report",noData:"Log your first study session to see charts",
addPlat:"New platform",platName:"Platform name",cat:"Category",url:"URL",desc:"Description",open:"Open",noPlat:"Add your platforms (university portal, Moodle, courses…) with links",
lang:"Language",notif:"Enable notifications",notifTest:"Test alert",notifOk:"Notifications enabled",notifNo:"Notifications not supported",sound:"Alert sound",changePin:"Change passcode",newPin:"New passcode (4–8 digits)",pinDone:"Passcode changed",lock:"Lock",export:"Backup (JSON)",reset:"Delete all data",resetQ:"All your cloud data will be permanently deleted. Continue?",
notifNote:"Alerts fire while the app is open (even in a background tab). To be alerted while closed, add it to your home screen.",
alertIn:"in",alertNow:"now",startsAt:"starts at"}};
let lang=localStorage.getItem("hs_lang")||"ar",tab="home",S=blank(),ref=null,online=false,curSem=localStorage.getItem("hs_sem")||"";
const t=k=>T[lang][k]||k,$=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const arr=x=>Array.isArray(x)?x.filter(v=>v!=null):Object.values(x||{});
const L=k=>Object.values(S[k]||{});
const uid=p=>p+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const safeUrl=u=>/^https?:\/\//i.test(u||"")?u:"";
const ymd=d=>{d=new Date(d);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dayName=d=>new Date(2024,0,7+d).toLocaleDateString(lang==="ar"?"ar-JO":"en-US",{weekday:"long"});
function blank(){return{settings:{},semesters:{},courses:{},sessions:{},platforms:{},attendance:{},weak:{},overrides:{},breaks:{},tasks:{},exams:{},rewards:{},claims:{}}}
try{firebase.initializeApp(FB);ref=firebase.database().ref(ROOT)}catch(e){ref=null}
const cache=()=>localStorage.setItem(CK,JSON.stringify(S));
function put(path,val){ // single write path: local state + cache + cloud
 const p=path.split("/");let o=S;p.slice(0,-1).forEach(k=>o=o[k]=o[k]||{});
 val===null?delete o[p.at(-1)]:o[p.at(-1)]=val;cache();
 if(ref)ref.child(path).set(val===null?null:JSON.parse(JSON.stringify(val)));
 draw();
}
/* ---------- PIN ---------- */
async function hashPin(pin,salt){
 if(crypto.subtle){const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(pin),"PBKDF2",false,["deriveBits"]);
  const b=await crypto.subtle.deriveBits({name:"PBKDF2",salt:new TextEncoder().encode(salt),iterations:100000,hash:"SHA-256"},k,256);
  return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
 let h=5381;for(const c of salt+pin+salt)h=(h*33^c.charCodeAt(0))>>>0;return"w"+h}
let buf="",mode="",first="",fails=0,lockedUntil=0,msg="";
function lockScreen(m,note){mode=m;buf="";first="";msg=note||"";drawLock()}
function drawLock(){
 const sub=mode==="setup"?t("setPinS"):mode==="confirm"?t("again"):t("enter");
 const ttl=mode==="login"?t("enter"):t("setPin");
 $("#lock").classList.remove("hidden");
 if(mode==="offline"){$("#lock").innerHTML=`<div class="lockbox"><div class="logo"><i class="fa-solid fa-cloud-bolt"></i></div><h2>${t("app")}</h2><p>${t("offline")}</p><button class="btn blk" data-a="boot">${t("retry")}</button></div>`;return}
 if(mode==="loading"){$("#lock").innerHTML=`<div class="lockbox"><div class="logo"><i class="fa-solid fa-graduation-cap"></i></div><h2>${t("app")}</h2></div>`;return}
 $("#lock").innerHTML=`<div class="lockbox"><div class="logo"><i class="fa-solid fa-graduation-cap"></i></div><h2>${t("app")}</h2><p>${ttl}</p>
 <div class="padcard"><p style="color:var(--s);margin:0 0 14px">${sub}</p><div class="dots">${[...Array(Math.max(4,buf.length))].map((_,i)=>`<i class="${i<buf.length?"on":""}"></i>`).join("")}</div>
 <div class="pad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-k="${n}">${n}</button>`).join("")}<button data-k="del"><i class="fa-solid fa-delete-left"></i></button><button data-k="0">0</button><button data-k="ok" style="background:var(--b);color:#fff"><i class="fa-solid fa-check"></i></button></div>
 <div class="err">${esc(msg)}</div></div><button class="btn o sm" style="margin-top:14px;background:#fff" data-a="lang">${lang==="ar"?"English":"عربي"}</button></div>`;
}
async function keyIn(k){
 if(mode==="offline"||mode==="loading")return;
 if(k==="del")buf=buf.slice(0,-1);else if(k==="ok")return submitPin();else if(buf.length<8)buf+=k;
 msg="";drawLock();
}
async function submitPin(){
 if(buf.length<4){msg=t("short");return drawLock()}
 if(mode==="setup"){first=buf;buf="";mode="confirm";msg="";return drawLock()}
 if(mode==="confirm"){
  if(buf!==first){buf="";first="";mode="setup";msg=t("mismatch");return drawLock()}
  const salt=uid("s");S.settings={pinHash:await hashPin(buf,salt),salt,created:Date.now()};cache();
  if(ref)await ref.child("settings").set(S.settings);
  return unlock()}
 if(Date.now()<lockedUntil){msg=t("wait");buf="";return drawLock()}
 if(await hashPin(buf,S.settings.salt)===S.settings.pinHash){fails=0;return unlock()}
 buf="";if(++fails>=5){lockedUntil=Date.now()+30000;fails=0;msg=t("wait")}else msg=t("wrong");drawLock();
}
async function boot(){
 lockScreen("loading");let cloud=null,ok=false;
 if(ref){try{cloud=(await Promise.race([ref.child("settings").once("value"),new Promise((_,r)=>setTimeout(r,7000))])).val();ok=true}catch(e){}}
 const c=JSON.parse(localStorage.getItem(CK)||"null");
 if(ok){S.settings=cloud||{};if(!cloud)await migrateOld()}
 else if(c&&c.settings&&c.settings.pinHash)S=Object.assign(blank(),c);
 else if(ref)return lockScreen("offline");
 else if(c)S=Object.assign(blank(),c);
 lockScreen(S.settings&&S.settings.pinHash?"login":"setup");
}
async function migrateOld(){ // import data from the previous version once, if any
 try{const o=(await ref.parent.child(OLD).once("value")).val();if(!o)return;const m=(a,p)=>Object.fromEntries(arr(a).map(x=>[x.id||uid(p),x]));
  const d={semesters:m(o.semesters,"sem"),courses:m(o.courses,"crs"),platforms:m(o.platforms,"pl")};
  Object.assign(S,d);await ref.update(d)}catch(e){}
}
function unlock(){
 $("#lock").classList.add("hidden");$("#app").classList.remove("hidden");
 if(ref){ref.on("value",s=>{const v=s.val()||{};S=Object.assign(blank(),v);cache();draw()});
  firebase.database().ref(".info/connected").on("value",s=>{online=!!s.val();syncLabel()})}
 draw();setInterval(tick,20000);tick();
}
const lockNow=()=>{$("#app").classList.add("hidden");lockScreen("login")};
document.addEventListener("visibilitychange",()=>{if(document.hidden)hiddenAt=Date.now();else if(hiddenAt&&Date.now()-hiddenAt>300000&&!$("#app").classList.contains("hidden"))lockNow()});
let hiddenAt=0;
/* ---------- Views ---------- */
const NAV=[["home","fa-house"],["courses","fa-book-open"],["schedule","fa-calendar-week"],["reports","fa-chart-pie"],["platforms","fa-layer-group"],["settings","fa-gear"]];
function syncLabel(){const e=$("#sync");if(e)e.innerHTML=`<i class="fa-solid fa-circle" style="font-size:8px;color:${online?"#7CF0A8":"#FFB4B4"}"></i> ${ref?(online?t("synced"):t("notsynced")):t("local")}`}
function draw(){
 if($("#app").classList.contains("hidden"))return;
 document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
 $("#side").innerHTML=`<div class="brand"><span><i class="fa-solid fa-graduation-cap"></i></span>${t("app")}</div>`+NAV.map(n=>`<button class="nv ${tab===n[0]?"on":""}" data-a="tab" data-v="${n[0]}"><i class="fa-solid ${n[1]} fa-fw"></i>${t(n[0])}</button>`).join("")+`<div class="sp"></div><button class="nv" data-a="lock"><i class="fa-solid fa-lock fa-fw"></i>${t("lock")}</button>`;
 $("#bar").innerHTML=NAV.map(n=>`<button class="${tab===n[0]?"on":""}" data-a="tab" data-v="${n[0]}"><i class="fa-solid ${n[1]}"></i>${t(n[0])}</button>`).join("");
 $("#title").textContent=t(tab);syncLabel();
 $("#view").innerHTML=V[tab]();if(tab==="reports")charts();
}
const sems=()=>L("semesters").sort((a,b)=>a.created-b.created);
const slotsOf=c=>arr(c.schedule);
const hm=m=>m>=60?`${m/60%1?(m/60).toFixed(1):m/60} ${t("hour")}`:`${m} ${t("min")}`;
function courseCard(c){
 const sl=slotsOf(c).sort((a,b)=>a.day-b.day||a.start.localeCompare(b.start));
 return`<div class="card course ${c.type}"><div class="hd"><b>${esc(c.name)}</b><span class="tag">${t(c.type==="university"?"uni":"personal")}</span></div>
 <div class="meta">${c.instructor?`<span><i class="fa-solid fa-user-tie fa-fw"></i> ${esc(c.instructor)}</span>`:""}${c.location?`<span><i class="fa-solid fa-location-dot fa-fw"></i> ${esc(c.location)}</span>`:""}
 ${c.type==="university"&&c.credits?`<span><i class="fa-solid fa-star fa-fw"></i> ${esc(c.credits)} ${t("credits")}</span>`:""}${c.goal?`<span><i class="fa-solid fa-bullseye fa-fw"></i> ${esc(c.goal)}</span>`:""}
 ${safeUrl(c.link)?`<a href="${esc(c.link)}" target="_blank" rel="noopener" style="color:var(--b)"><i class="fa-solid fa-link fa-fw"></i> ${esc(c.link.replace(/^https?:\/\/(www\.)?/,""))}</a>`:""}</div>
 ${sl.map(s=>`<div class="slot"><b>${dayName(s.day)}</b><span style="direction:ltr">${s.start} – ${s.end}</span>${s.place?`<span>${esc(s.place)}</span>`:""}</div>`).join("")}
 ${arr(c.reminders).length?`<div class="meta" style="margin-bottom:0"><span><i class="fa-regular fa-bell fa-fw"></i> ${arr(c.reminders).sort((a,b)=>a-b).map(rl).join("، ")}</span></div>`:""}
 ${c.type==="personal"?`<input type="range" min="0" max="100" value="${c.progress||0}" data-prog="${c.id}" style="padding:0;border:0;margin-top:10px"><div class="prog"><i style="width:${c.progress||0}%"></i></div>`:""}
 <div class="row" style="margin:12px 0 0"><button class="btn o sm" data-a="course" data-v="${c.id}">${t("edit")}</button><button class="btn d sm" data-a="delCourse" data-v="${c.id}">${t("del")}</button></div></div>`;
}
const rl=m=>m>=1440?`${m/1440} ${t("day")}`:m>=60?`${m/60} ${t("hour")}`:`${m} ${t("min")}`;
const activeSems=()=>sems().filter(s=>s.id===curSem||!curSem).map(s=>s.id);
const V={
 home(){
  const now=new Date(),d=now.getDay(),mins=now.getHours()*60+now.getMinutes();
  const all=allSlots(),today=all.filter(s=>s.day===d).sort((a,b)=>a.start.localeCompare(b.start));
  let nx=null;for(let i=0;i<8&&!nx;i++){const dd=(d+i)%7;nx=all.filter(s=>s.day===dd&&(i>0||toM(s.start)>mins)).sort((a,b)=>a.start.localeCompare(b.start))[0]}
  const li=s=>`<div class="item"><div><b>${esc(s.course.name)}</b><div style="color:var(--s);font-size:14px">${esc(s.place||s.course.location||"")}</div></div><span style="direction:ltr;font-weight:700;color:var(--b)">${s.start} – ${s.end}</span></div>`;
  return`<div class="card"><h3><i class="fa-regular fa-clock"></i> ${t("next")}</h3>${nx?`<b style="font-size:19px">${esc(nx.course.name)}</b><div style="color:var(--s)">${dayName(nx.day)} • <span style="direction:ltr;display:inline-block">${nx.start}</span> ${esc(nx.place||nx.course.location||"")}</div>`:`<span style="color:var(--s)">${t("none")}</span>`}</div>
  <div class="grid">${statsHtml()}</div>
  <div class="card"><h3><i class="fa-solid fa-calendar-day"></i> ${t("today")}</h3>${today.length?today.map(li).join(""):`<span style="color:var(--s)">${t("noClass")}</span>`}</div>
  <button class="btn blk" data-a="log"><i class="fa-solid fa-stopwatch"></i> ${t("logStudy")}</button>`;
 },
 courses(){
  const ss=sems();if(!ss.length)return`<div class="card empty"><i class="fa-solid fa-folder-open"></i><h3>${t("noSem")}</h3><p>${t("noSemS")}</p><button class="btn" style="margin-top:14px" data-a="sem">${t("addSem")}</button></div>`;
  if(!ss.find(s=>s.id===curSem))curSem=ss.at(-1).id;
  const cs=L("courses").filter(c=>c.semesterId===curSem);
  const grp=ty=>{const x=cs.filter(c=>c.type===ty);return x.length?`<h3 style="margin:6px 2px 10px">${t(ty==="university"?"uni":"personal")}</h3>${x.map(courseCard).join("")}`:""};
  return`<div class="card"><div class="chips">${ss.map(s=>`<button class="chip ${s.id===curSem?"on":""}" data-a="pickSem" data-v="${s.id}">${esc(s.name)}</button>`).join("")}<button class="chip" data-a="sem"><i class="fa-solid fa-plus"></i> ${t("addSem")}</button></div></div>
  <div class="row"><button class="btn" data-a="course"><i class="fa-solid fa-plus"></i> ${t("addCourse")}</button><button class="btn d sm" data-a="delSem">${t("del")} ${t("sem")}</button></div>
  ${cs.length?grp("university")+grp("personal"):`<div class="card empty">${t("noCourse")}</div>`}`;
 },
 schedule(){
  const all=allSlots(),td=new Date().getDay();
  return[0,1,2,3,4,5,6].map(d=>{const x=all.filter(s=>s.day===d).sort((a,b)=>a.start.localeCompare(b.start));
   return`<div class="card day ${d===td?"today":""}"><h3>${dayName(d)}</h3>${x.length?x.map(s=>`<div class="item"><div><b>${esc(s.course.name)}</b> <span class="tag">${t(s.course.type==="university"?"uni":"personal")}</span><div style="color:var(--s);font-size:14px">${esc(s.place||s.course.location||"")} ${s.course.instructor?"• "+esc(s.course.instructor):""}</div></div><b style="direction:ltr;color:var(--b)">${s.start} – ${s.end}</b></div>`).join(""):`<span style="color:var(--s)">${t("noClass")}</span>`}</div>`}).join("");
 },
 reports(){
  const ss=L("sessions");
  return`<div class="row"><div class="chips"><button class="chip ${rng===1?"on":""}" data-a="rng" data-v="1">يومي</button><button class="chip ${rng===7?"on":""}" data-a="rng" data-v="7">${t("last7")}</button><button class="chip ${rng===30?"on":""}" data-a="rng" data-v="30">${t("last30")}</button><button class="chip ${rng===60?"on":""}" data-a="rng" data-v="60">شهرين</button></div><button class="btn sm" data-a="log"><i class="fa-solid fa-plus"></i> ${t("logStudy")}</button><button class="btn o sm" data-a="print"><i class="fa-solid fa-print"></i> ${t("print")}</button></div>
  <div class="grid">${statsHtml()}</div>
  ${ss.length&&window.Chart?`<div class="card"><h3>${t("hDay")}</h3><canvas id="c1"></canvas></div><div class="card"><h3>${t("hCourse")}</h3><canvas id="c2"></canvas></div>`:`<div class="card empty"><i class="fa-solid fa-chart-column"></i><p>${t("noData")}</p></div>`}
  ${L("courses").some(c=>c.type==="personal")?`<div class="card"><h3>${t("progress")}</h3>${L("courses").filter(c=>c.type==="personal").map(c=>`<div style="margin-bottom:12px"><div class="item" style="border:0;padding:0"><b>${esc(c.name)}</b><span>${c.progress||0}%</span></div><div class="prog"><i style="width:${c.progress||0}%"></i></div></div>`).join("")}</div>`:""}`;
 },
 platforms(){
  const ps=L("platforms");
  return`<div class="row"><button class="btn" data-a="plat"><i class="fa-solid fa-plus"></i> ${t("addPlat")}</button></div>`+(ps.length?`<div class="grid">${ps.map(p=>`<div class="card"><span class="tag">${esc(p.category)}</span><h3 style="margin:10px 0 4px">${esc(p.name)}</h3><p style="color:var(--s);font-size:14px;min-height:20px">${esc(p.desc)}</p><div class="row" style="margin:12px 0 0">${safeUrl(p.url)?`<a class="btn sm" href="${esc(p.url)}" target="_blank" rel="noopener">${t("open")} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`:""}<button class="btn o sm" data-a="plat" data-v="${p.id}">${t("edit")}</button><button class="btn d sm" data-a="delPlat" data-v="${p.id}">${t("del")}</button></div></div>`).join("")}</div>`:`<div class="card empty"><i class="fa-solid fa-layer-group"></i><p>${t("noPlat")}</p></div>`);
 },
 settings(){
  const nt="Notification"in window;
  return`<div class="card"><h3>${t("lang")}</h3><div class="chips"><button class="chip ${lang==="ar"?"on":""}" data-a="setLang" data-v="ar">العربية</button><button class="chip ${lang==="en"?"on":""}" data-a="setLang" data-v="en">English</button></div></div>
  <div class="card"><h3><i class="fa-regular fa-bell"></i> ${t("notif")}</h3><p style="color:var(--s);font-size:14px;margin-bottom:12px">${t("notifNote")}</p>
  <div class="row"><button class="btn sm" data-a="enableNotif">${nt?(Notification.permission==="granted"?t("notifOk"):t("notif")):t("notifNo")}</button><button class="btn o sm" data-a="testAlert">${t("notifTest")}</button>
  <label style="margin:0;display:flex;gap:8px;align-items:center"><input type="checkbox" style="width:auto" data-snd ${localStorage.getItem("hs_snd")!=="0"?"checked":""}> ${t("sound")}</label></div></div>
  <div class="card"><h3>${t("changePin")}</h3><div class="row" style="margin:0"><input id="np" type="password" inputmode="numeric" maxlength="8" placeholder="${t("newPin")}" style="max-width:260px"><button class="btn" data-a="changePin">${t("save")}</button></div></div>
  <div class="card"><div class="row" style="margin:0"><button class="btn o" data-a="export"><i class="fa-solid fa-file-export"></i> ${t("export")}</button><button class="btn d" data-a="reset"><i class="fa-solid fa-trash"></i> ${t("reset")}</button></div></div>`;
 }
};
let rng=7;
const toM=s=>{const[a,b]=s.split(":");return+a*60+ +b};
function allSlots(){const ok=new Set(activeSems());return L("courses").filter(c=>!curSem||ok.has(c.semesterId)).flatMap(c=>slotsOf(c).map(s=>({...s,day:+s.day,course:c})))}
function statsHtml(){
 const ss=L("sessions"),tot=ss.reduce((a,s)=>a+ +s.minutes,0),wk=ss.filter(s=>Date.now()-new Date(s.date)<7*864e5).reduce((a,s)=>a+ +s.minutes,0);
 const days=new Set(ss.map(s=>s.date));let st=0,d=new Date();if(!days.has(ymd(d)))d.setDate(d.getDate()-1);while(days.has(ymd(d))){st++;d.setDate(d.getDate()-1)}
 const x=[["fa-hourglass-half",hm(tot),"totalH"],["fa-calendar-week",hm(wk),"weekH"],["fa-fire",st,"streak"],["fa-book",L("courses").length,"courseN"]];
 return x.map(a=>`<div class="stat"><i class="fa-solid ${a[0]}"></i><div><b>${a[1]}</b><small>${t(a[2])}</small></div></div>`).join("");
}
let ch=[];
function charts(){
 ch.forEach(c=>c.destroy());ch=[];if(!window.Chart||!$("#c1"))return;
 const ss=L("sessions"),lab=[],val=[];
 for(let i=rng-1;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=ymd(d);lab.push(d.toLocaleDateString(lang==="ar"?"ar-JO":"en-US",{day:"numeric",month:"short"}));val.push(+(ss.filter(s=>s.date===k).reduce((a,s)=>a+ +s.minutes,0)/60).toFixed(2))}
 Chart.defaults.font.family="Tajawal";
 ch.push(new Chart($("#c1"),{type:rng>7?"line":"bar",data:{labels:lab,datasets:[{data:val,backgroundColor:"#0A5BC4",borderColor:"#0A5BC4",borderRadius:8,tension:.3,fill:false}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}}));
 const by={};ss.forEach(s=>{const n=S.courses[s.courseId]?.name||t("general");by[n]=(by[n]||0)+ +s.minutes/60});
 ch.push(new Chart($("#c2"),{type:"doughnut",data:{labels:Object.keys(by),datasets:[{data:Object.values(by).map(v=>+v.toFixed(2)),backgroundColor:["#0A5BC4","#7A4FD6","#1E9E5A","#F2A33A","#D64545","#2BB5C9","#8892A6"]}]}}));
}
/* ---------- Modals & actions ---------- */
const open=h=>{$("#modal").innerHTML=`<div class="sheet">${h}</div>`;$("#modal").classList.remove("hidden")};
const close=()=>$("#modal").classList.add("hidden");
const slotRow=(s={})=>`<div class="srow"><select name="day">${[0,1,2,3,4,5,6].map(d=>`<option value="${d}" ${+s.day===d?"selected":""}>${dayName(d)}</option>`).join("")}</select><input type="time" name="start" value="${s.start||"08:00"}" required><input type="time" name="end" value="${s.end||"09:00"}" required><select name="mode"><option value="inperson" ${s.mode!=="online"?"selected":""}>وجاهي</option><option value="online" ${s.mode==="online"?"selected":""}>عن بُعد</option></select><button type="button" class="btn d sm" data-a="rmSlot">×</button></div>`;
const A={
 tab:d=>{tab=d.v;draw()},lock:lockNow,boot,
 lang:()=>{setLang(lang==="ar"?"en":"ar");drawLock()},setLang:d=>setLang(d.v),
 pickSem:d=>{curSem=d.v;localStorage.setItem("hs_sem",curSem);draw()},rng:d=>{rng=+d.v;draw()},print:()=>print(),
 sem:()=>open(`<h3>${t("addSem")}</h3><form data-f="sem"><label>${t("semName")}</label><input name="name" required><div class="row" style="margin:16px 0 0"><button class="btn">${t("save")}</button><button type="button" class="btn o" data-a="close">${t("cancel")}</button></div></form>`),
 close,
 delSem:()=>{if(!confirm(t("sure")))return;L("courses").filter(c=>c.semesterId===curSem).forEach(c=>put("courses/"+c.id,null));put("semesters/"+curSem,null);curSem=""},
 course:d=>{const c=d.v?S.courses[d.v]:{type:"university",semesterId:curSem,reminders:[10],schedule:[{day:new Date().getDay(),start:"08:00",end:"09:00"}]};const rm=arr(c.reminders).map(Number);
  open(`<h3>${t(d.v?"editCourse":"addCourse")}</h3><form data-f="course"><input type="hidden" name="id" value="${c.id||""}">
  <div class="f2"><div><label>${t("sem")}</label><select name="semesterId">${sems().map(s=>`<option value="${s.id}" ${s.id===c.semesterId?"selected":""}>${esc(s.name)}</option>`).join("")}</select></div>
  <div><label>${t("type")}</label><select name="type" data-ty><option value="university" ${c.type==="university"?"selected":""}>${t("uni")}</option><option value="personal" ${c.type==="personal"?"selected":""}>${t("personal")}</option></select></div></div>
  <label>${t("name")}</label><input name="name" required value="${esc(c.name)}">
  <div class="f2"><div><label>${t("inst")}</label><input name="instructor" value="${esc(c.instructor)}"></div><div><label>${t("place")}</label><input name="location" value="${esc(c.location)}"></div></div>
  <div data-u class="${c.type==="personal"?"hidden":""}"><label>${t("credits")}</label><input name="credits" type="number" min="0" max="12" value="${esc(c.credits||3)}"></div>
  <div data-p class="${c.type==="personal"?"":"hidden"}"><label>${t("goal")}</label><input name="goal" value="${esc(c.goal)}"></div><label>${t("link")} (للحصص عن بُعد)</label><input name="link" type="url" placeholder="https://" value="${esc(c.link)}">
  <label>${t("times")}</label><div id="slots">${slotsOf(c).map(slotRow).join("")}</div><button type="button" class="btn o sm" data-a="addSlot">+ ${t("addSlot")}</button>
  <label>${t("remind")}</label><div class="chips">${[0,5,10,15,30,60,120,1440].map(m=>`<label class="chip ${rm.includes(m)?"on":""}" style="margin:0"><input type="checkbox" name="rem" value="${m}" ${rm.includes(m)?"checked":""} hidden>${m?rl(m):t("alertNow")}</label>`).join("")}</div>
  <div class="row" style="margin:18px 0 0"><button class="btn">${t("save")}</button><button type="button" class="btn o" data-a="close">${t("cancel")}</button></div></form>`)},
 addSlot:()=>$("#slots").insertAdjacentHTML("beforeend",slotRow()),rmSlot:(d,e)=>e.target.closest(".srow").remove(),
 delCourse:d=>{if(confirm(t("sure")))put("courses/"+d.v,null)},
 log:()=>open(`<h3>${t("logStudy")}</h3><form data-f="log"><label>${t("courses")}</label><select name="courseId"><option value="">${t("general")}</option>${L("courses").map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("")}</select>
  <div class="f2"><div><label>${t("minutes")}</label><input name="minutes" type="number" min="1" max="1440" value="60" required></div><div><label>${t("date")}</label><input name="date" type="date" value="${ymd(new Date())}" required></div></div>
  <div class="row" style="margin:18px 0 0"><button class="btn">${t("save")}</button><button type="button" class="btn o" data-a="close">${t("cancel")}</button></div></form>`),
 plat:d=>{const p=d.v?S.platforms[d.v]:{category:t("uni")};open(`<h3>${t("addPlat")}</h3><form data-f="plat"><input type="hidden" name="id" value="${p.id||""}"><label>${t("platName")}</label><input name="name" required value="${esc(p.name)}"><label>${t("cat")}</label><input name="category" value="${esc(p.category)}"><label>${t("url")}</label><input name="url" type="url" required placeholder="https://" value="${esc(p.url)}"><label>${t("desc")}</label><input name="desc" value="${esc(p.desc)}"><div class="row" style="margin:18px 0 0"><button class="btn">${t("save")}</button><button type="button" class="btn o" data-a="close">${t("cancel")}</button></div></form>`)},
 delPlat:d=>{if(confirm(t("sure")))put("platforms/"+d.v,null)},
 enableNotif:()=>{if("Notification"in window)Notification.requestPermission().then(draw)},
 testAlert:()=>alertUser(t("app"),t("notifTest")),
 changePin:async()=>{const v=$("#np").value.trim();if(!/^\d{4,8}$/.test(v))return alert(t("short"));const salt=uid("s");put("settings",{...S.settings,salt,pinHash:await hashPin(v,salt)});$("#np").value="";alert(t("pinDone"))},
 export:()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify({...S,settings:{}},null,2)],{type:"application/json"}));a.download="Hameds_System_backup.json";a.click()},
 reset:async()=>{if(!confirm(t("resetQ")))return;const s=S.settings;S=blank();S.settings=s;cache();if(ref)await ref.set({settings:s});draw()}
};
function setLang(l){lang=l;localStorage.setItem("hs_lang",l);document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";draw()}
const F={
 sem:f=>{const id=uid("sem");put("semesters/"+id,{id,name:f.get("name"),created:Date.now()});curSem=id;localStorage.setItem("hs_sem",id);close()},
 course:(f,form)=>{const id=f.get("id")||uid("crs"),old=S.courses[id]||{};
  const schedule=[...form.querySelectorAll(".srow")].map(r=>({day:+r.querySelector("[name=day]").value,start:r.querySelector("[name=start]").value,end:r.querySelector("[name=end]").value,mode:r.querySelector("[name=mode]").value,place:f.get("location")||""}));
  put("courses/"+id,{...old,id,semesterId:f.get("semesterId"),type:f.get("type"),name:f.get("name"),instructor:f.get("instructor"),location:f.get("location"),credits:f.get("credits")||"",goal:f.get("goal")||"",link:f.get("link")||"",schedule,reminders:f.getAll("rem").map(Number),progress:old.progress||0});close()},
 log:f=>{const id=uid("ses");put("sessions/"+id,{id,courseId:f.get("courseId"),minutes:+f.get("minutes"),date:f.get("date")});close()},
 plat:f=>{const id=f.get("id")||uid("pl");put("platforms/"+id,{id,name:f.get("name"),category:f.get("category")||"",url:f.get("url"),desc:f.get("desc")||""});close()}
};
document.addEventListener("click",e=>{
 const k=e.target.closest("[data-k]");if(k)return keyIn(k.dataset.k);
 const a=e.target.closest("[data-a]");if(a&&A[a.dataset.a])A[a.dataset.a](a.dataset,e);
 if(e.target.id==="modal")close();
 if(e.target.id==="toast"||e.target.closest("#toast"))$("#toast").classList.add("hidden");
 const c=e.target.closest("label.chip");if(c)setTimeout(()=>c.classList.toggle("on",c.querySelector("input").checked));
});
document.addEventListener("submit",e=>{const f=e.target.dataset.f;if(f&&F[f]){e.preventDefault();F[f](new FormData(e.target),e.target)}});
document.addEventListener("change",e=>{
 if(e.target.matches("[data-ty]")){const p=e.target.value==="personal",m=e.target.closest("form");m.querySelector("[data-u]").classList.toggle("hidden",p);m.querySelector("[data-p]").classList.toggle("hidden",!p)}
 if(e.target.dataset.prog)put("courses/"+e.target.dataset.prog+"/progress",+e.target.value);
 if(e.target.matches("[data-snd]"))localStorage.setItem("hs_snd",e.target.checked?"1":"0");
});
document.addEventListener("keydown",e=>{if(!$("#lock").classList.contains("hidden")){if(/^\d$/.test(e.key))keyIn(e.key);else if(e.key==="Backspace")keyIn("del");else if(e.key==="Enter")keyIn("ok")}});
/* ---------- Alarms (while app is open) ---------- */
function alertUser(title,body){
 const el=$("#toast");el.innerHTML=`<i class="fa-solid fa-bell"></i> ${esc(title)}<div style="font-weight:400;margin-top:4px">${esc(body)}</div>`;el.classList.remove("hidden");
 if(localStorage.getItem("hs_snd")!=="0"){try{const c=new(window.AudioContext||window.webkitAudioContext)();[0,.25,.5].forEach(o=>{const s=c.createOscillator(),g=c.createGain();s.connect(g);g.connect(c.destination);s.frequency.value=880;g.gain.value=.15;s.start(c.currentTime+o);s.stop(c.currentTime+o+.15)})}catch(e){}}
 navigator.vibrate&&navigator.vibrate([200,100,200]);
 if("Notification"in window&&Notification.permission==="granted"){(navigator.serviceWorker?navigator.serviceWorker.ready.then(r=>r.showNotification(title,{body,icon:"education.png"})):Promise.reject()).catch(()=>{try{new Notification(title,{body})}catch(e){}})}
}
function tick(){
 const n=new Date();$("#clock").textContent=n.toLocaleTimeString(lang==="ar"?"ar-JO":"en-US",{hour:"2-digit",minute:"2-digit"});
 const fired=JSON.parse(localStorage.getItem("hs_fired")||"{}"),today=ymd(n),nm=n.getHours()*60+n.getMinutes()+n.getSeconds()/60;
 Object.keys(fired).forEach(k=>{if(!k.startsWith(today))delete fired[k]});
 L("courses").forEach(c=>slotsOf(c).forEach((s,i)=>{
  if(+s.day!==n.getDay())return;const st=toM(s.start),en=toM(s.end);
  const due=arr(c.reminders).map(Number).filter(m=>st-m<=nm&&nm<en).sort((a,b)=>a-b);
  const fresh=due.filter(m=>!fired[`${today}|${c.id}|${i}|${m}`]);
  if(fresh.length){due.forEach(m=>fired[`${today}|${c.id}|${i}|${m}`]=1);const m=due[0];
   alertUser(c.name,m>0?`${t("alertIn")} ${rl(m)} • ${s.start}${c.location?" • "+c.location:""}`:`${t("alertNow")} • ${s.start}${c.location?" • "+c.location:""}`)}
 }));
 localStorage.setItem("hs_fired",JSON.stringify(fired));
}
document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
boot();

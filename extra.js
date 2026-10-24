/* Hamed's System v4 — extensions (attendance, lesson log, tasks, exams, breaks, one-day swaps, reports, assistant, fingerprint, theme, import) */
(()=>{
const pad=n=>String(n).padStart(2,"0"),pd=s=>{const[a,b,c]=s.split("-");return new Date(+a,b-1,+c)},add=(h,m)=>{m=Math.min(1439,toM(h)+m);return pad(m/60|0)+":"+pad(m%60)};
const ar2=x=>Array.isArray(x)?x:Object.values(x||{}),dl=s=>pd(s).toLocaleDateString(lang==="ar"?"ar-JO":"en-US",{weekday:"long",day:"numeric",month:"short"});
const nowS=()=>{const n=new Date();return ymd(n)+"T"+pad(n.getHours())+":"+pad(n.getMinutes())};
const MN={inperson:"وجاهي",online:"عن بُعد"},ST={present:["حضرت","#1E9E5A"],late:["تأخرت","#F2A33A"],excused:["غياب بعذر","#2BB5C9"],absent:["غياب بدون عذر","#D64545"]};
const EX={quiz:"كويز",project:"مشروع",mid:"اختبار نصفي",final:"اختبار نهائي",other:"أخرى"};
const modeOf=(s,c)=>s.mode||(/يوتيوب|youtube|أونلاين|اونلاين|online|zoom|teams|meet/i.test((s.place||"")+(c.location||"")+(c.instructor||""))?"online":"inperson");
const attId=(c,d,s)=>`${c}_${d}_${s.replace(":","")}`;
T.ar.tasks="المهام";T.en.tasks="Tasks";NAV.splice(3,0,["tasks","fa-list-check"]);
/* ---------- schedule engine: weekly slots + one-day swaps + exams/prep + tasks + breaks ---------- */
function plan(ds){
 const d=pd(ds),wd=d.getDay(),out=[],ov=L("overrides").filter(o=>o.date===ds),ok=new Set(activeSems());
 const pre=L("exams").filter(e=>{const n=Math.round((pd(e.date)-d)/864e5);return n>=1&&n<=(+e.prepDays||0)});
 const susAll=pre.some(e=>e.suspend==="all"),susP=pre.some(e=>e.suspend!=="none");
 L("courses").filter(c=>!curSem||ok.has(c.semesterId)).forEach(c=>slotsOf(c).forEach(s=>{
  if(+s.day!==wd)return;const o=ov.find(o=>o.courseId===c.id&&o.orig===s.start);
  out.push({k:"class",c,name:c.name,orig:s.start,start:o?o.start:s.start,end:o?o.end:s.end,place:s.place||c.location,mode:modeOf(s,c),moved:!!o,sus:susAll||(susP&&c.type==="personal"),att:(S.attendance||{})[attId(c.id,ds,s.start)]})}));
 L("exams").forEach(e=>{if(e.date===ds)out.push({k:"exam",e,name:`${EX[e.type]||""}: ${e.title}`,start:e.time||"09:00",end:add(e.time||"09:00",+e.dur||60),place:e.place})});
 pre.forEach(e=>out.push({k:"prep",e,name:"دراسة: "+e.title,start:e.pstart||"16:00",end:add(e.pstart||"16:00",(+e.phours||2)*60)}));
 L("tasks").forEach(x=>{if(!x.done&&x.due&&x.due.slice(0,10)===ds)out.push({k:"task",x,name:"تسليم: "+x.title,start:x.due.slice(11,16),end:x.due.slice(11,16)})});
 L("breaks").forEach(b=>{if(b.date?b.date!==ds:(ar2(b.days).length&&!ar2(b.days).map(Number).includes(wd)))return;
  (toM(b.end)<=toM(b.start)?[[b.start,"24:00"],["00:00",b.end]]:[[b.start,b.end]]).forEach(([a,z])=>out.push({k:"break",b,name:b.name,start:a,end:z}))});
 out.sort((a,b)=>a.start.localeCompare(b.start)||a.end.localeCompare(b.end));
 const w=out.filter(i=>i.k!=="break"&&i.k!=="task"&&!i.sus);w.forEach(a=>w.forEach(b=>{if(a!==b&&a.start<b.end&&b.start<a.end)a.cf=1}));return out}
function rowH(it,ds){
 const tm=`<b style="direction:ltr;color:var(--b);white-space:nowrap">${it.start}${it.end!==it.start?" – "+it.end:""}</b>`,I={class:"fa-book-open",exam:"fa-file-pen",prep:"fa-pencil",task:"fa-list-check",break:"fa-mug-hot"}[it.k];
 let tag="",btn="",sub=esc(it.place||"");
 if(it.k==="class"){const a=it.att;tag=`<span class="tag">${MN[it.mode]}</span>`+(it.moved?` <span class="tag" style="background:#FFF1D6;color:#9A6200">مبدّل لليوم</span>`:"")+(it.sus?` <span class="tag">معلّق للاختبار</span>`:"")+(a?` <span class="tag" style="background:${ST[a.status][1]};color:#fff">${ST[a.status][0]}</span>`:"");
  if(!it.sus)btn=`<button class="btn o sm" data-a="att" data-v="${it.c.id}|${ds}|${it.orig}">سجّل الحضور</button>`+(it.c.type==="personal"?`<button class="btn o sm" data-a="mv" data-v="${it.c.id}|${ds}|${it.orig}">تبديل لليوم</button>`:"");
  if(it.mode==="online"&&safeUrl(it.c.link))btn+=`<a class="btn sm" href="${esc(it.c.link)}" target="_blank" rel="noopener">فتح الرابط</a>`}
 return`<div class="item ${it.k==="break"?"brk":""}"><div style="flex:1;${it.sus?"opacity:.5;text-decoration:line-through":""}"><i class="fa-solid ${I} fa-fw" style="color:var(--s)"></i> <b>${esc(it.name)}</b> ${tag}${it.cf?` <span class="tag" style="background:#D64545;color:#fff">تعارض</span>`:""}<div style="color:var(--s);font-size:14px">${sub}</div>${btn?`<div class="row" style="margin:8px 0 0">${btn}</div>`:""}</div>${tm}</div>`}
const dayCard=(ds,lbl)=>{const P=plan(ds);return`<div class="card day ${ds===ymd(new Date())?"today":""}"><h3>${lbl||dl(ds)}</h3>${P.length?P.map(i=>rowH(i,ds)).join(""):`<span style="color:var(--s)">${t("noClass")}</span>`}</div>`};
/* ---------- helpers for forms ---------- */
const fl=(l,h)=>`<label>${l}</label>${h}`,sv=`<div class="row" style="margin:18px 0 0"><button class="btn">${t("save")}</button><button type="button" class="btn o" data-a="close">${t("cancel")}</button></div>`;
const opt=(a,sel)=>a.map(([v,n])=>`<option value="${v}" ${v==sel?"selected":""}>${esc(n)}</option>`).join("");
const chipsH=(nm,list,sel,fmt)=>`<div class="chips">${list.map(m=>`<label class="chip ${sel.includes(m)?"on":""}" style="margin:0"><input type="checkbox" name="${nm}" value="${m}" ${sel.includes(m)?"checked":""} hidden>${fmt(m)}</label>`).join("")}</div>`;
const crs=sel=>opt(L("courses").map(c=>[c.id,c.name]),sel),relF=m=>m?rl(m):"عند الموعد";
const atRow=v=>`<div class="srow" style="grid-template-columns:1fr 34px"><input type="datetime-local" name="at" value="${v||""}"><button type="button" class="btn d sm" data-a="rmSlot">×</button></div>`;
/* ---------- attendance + lesson log + weak points ---------- */
A.att=d=>{const[cid,ds,o]=d.v.split("|"),c=S.courses[cid],a=(S.attendance||{})[attId(cid,ds,o)]||{status:"present"},wk=L("weak").filter(w=>w.courseId===cid&&!w.done);
 open(`<h3>${esc(c.name)}</h3><p style="color:var(--s);font-size:14px">${dl(ds)} • ${o}</p><form data-f="att"><input type="hidden" name="k" value="${d.v}">
 ${fl("الحالة",`<select name="status">${opt(Object.entries(ST).map(([k,v])=>[k,v[0]]),a.status)}</select>`)}${fl("موضوع المحاضرة / الحصة",`<input name="topic" value="${esc(a.topic)}">`)}${fl("وين وصلت في المادة؟",`<input name="reached" value="${esc(a.reached)}">`)}
 ${c.type==="personal"?fl("نسبة التقدم %",`<input name="progress" type="number" min="0" max="100" value="${c.progress||0}">`):""}${fl("نقاط ضعف جديدة (كل نقطة بسطر)",`<textarea name="weak" rows="2"></textarea>`)}
 ${wk.length?fl("نقاط ضعف سابقة — حدّد ما أتقنته",chipsH("done",wk.map(w=>w.id),[],id=>esc(S.weak[id].text))):""}${hwSec(cid)}${fl("ملاحظة / سبب الغياب",`<input name="note" value="${esc(a.note)}">`)}${sv}</form>`)};
F.att=f=>{const[cid,ds,o]=f.get("k").split("|"),id=attId(cid,ds,o);
 put("attendance/"+id,{id,courseId:cid,date:ds,orig:o,status:f.get("status"),topic:f.get("topic")||"",reached:f.get("reached")||"",note:f.get("note")||""});
 (f.get("weak")||"").split("\n").map(s=>s.trim()).filter(Boolean).forEach(x=>{const w=uid("wk");put("weak/"+w,{id:w,courseId:cid,text:x,date:ds})});
 f.getAll("done").forEach(i=>put("weak/"+i+"/done",true));if(f.get("progress")!==null)put("courses/"+cid+"/progress",+f.get("progress"));close()};
A.hist=d=>{const c=S.courses[d.v],a=L("attendance").filter(x=>x.courseId===d.v).sort((x,y)=>y.date.localeCompare(x.date)),wk=L("weak").filter(w=>w.courseId===d.v&&!w.done);
 open(`<h3>${esc(c.name)} — سجل الدروس</h3>${wk.length?`<div class="card"><b>🎯 نقاط ضعف مفتوحة</b>${wk.map(w=>`<div class="item"><span>${esc(w.text)}</span><button class="btn o sm" data-a="wdone" data-v="${w.id}">أتقنتها</button></div>`).join("")}</div>`:""}
 ${a.length?a.map(x=>`<div class="item"><div><span class="tag" style="background:${ST[x.status][1]};color:#fff">${ST[x.status][0]}</span> <small>${dl(x.date)}</small><div style="font-size:14px">${esc(x.topic||"")}${x.reached?` <span style="color:var(--s)">• وصلت: ${esc(x.reached)}</span>`:""}</div>${x.note?`<small style="color:var(--s)">${esc(x.note)}</small>`:""}</div></div>`).join(""):`<p style="color:var(--s)">لا سجلات بعد</p>`}<div class="row" style="margin:14px 0 0"><button class="btn o" data-a="close">إغلاق</button></div>`)};
A.wdone=d=>{put("weak/"+d.v+"/done",true);close()};A.rm=d=>{if(confirm(t("sure")))put(d.v,null)};
const _cc=courseCard;courseCard=function(c){const sl=slotsOf(c),n=m=>sl.filter(s=>modeOf(s,c)===m).length,wk=L("weak").filter(w=>w.courseId===c.id&&!w.done).length;
 return _cc(c).replace(/<\/div>$/,`<div class="row" style="margin:10px 0 0"><span class="tag">وجاهي ${n("inperson")} • عن بُعد ${n("online")}</span>${wk?`<span class="tag" style="background:#D64545;color:#fff">${wk} نقطة ضعف</span>`:""}<button class="btn o sm" data-a="hist" data-v="${c.id}">سجل الدروس</button></div></div>`)};
/* ---------- one-day swap / move ---------- */
A.mv=d=>{const[cid,ds,o]=d.v.split("|"),P=plan(ds),it=P.find(i=>i.k==="class"&&i.c.id===cid&&i.orig===o),oth=P.filter(i=>i.k==="class"&&i.c.type==="personal"&&i!==it&&!i.sus);
 open(`<h3>تبديل لليوم فقط</h3><p style="color:var(--s);font-size:14px">${esc(it.name)} — ${dl(ds)}<br>جدولك الأسبوعي الأساسي لا يتغير.</p><form data-f="mv"><input type="hidden" name="k" value="${d.v}">
 ${fl("تبديل مع مادة أخرى اليوم",`<select name="sw"><option value="">— بدون —</option>${opt(oth.map(i=>[i.c.id+"|"+i.orig,`${i.name} (${i.start})`]),"")}</select>`)}${fl("أو نقل إلى وقت",`<div class="f2"><input type="time" name="s" value="${it.start}"><input type="time" name="e" value="${it.end}"></div>`)}${sv}
 ${it.moved?`<button type="button" class="btn d sm" style="margin-top:10px" data-a="unmv" data-v="${d.v}">إلغاء التبديل</button>`:""}</form>`)};
F.mv=f=>{const[cid,ds,o]=f.get("k").split("|"),P=plan(ds),it=P.find(i=>i.k==="class"&&i.c.id===cid&&i.orig===o),sw=f.get("sw"),ov=(c,og,s,e)=>{const id=attId(c,ds,og);put("overrides/"+id,{id,courseId:c,date:ds,orig:og,start:s,end:e})};
 if(sw){const[c2,o2]=sw.split("|"),j=P.find(i=>i.k==="class"&&i.c.id===c2&&i.orig===o2);ov(cid,o,j.start,j.end);ov(c2,o2,it.start,it.end)}else ov(cid,o,f.get("s"),f.get("e"));close()};
A.unmv=d=>{const[c,ds,o]=d.v.split("|");put("overrides/"+attId(c,ds,o),null);close()};
/* ---------- breaks ---------- */
A.brk=()=>open(`<h3>استراحة</h3><form data-f="brk">${fl("الاسم",`<input name="name" required list="bn"><datalist id="bn">${["نوم","فطور","غداء","عشاء","راحة","صلاة","نشاط آخر"].map(x=>`<option>${x}</option>`).join("")}</datalist>`)}
 <div class="f2">${fl("من",`<input type="time" name="start" value="13:00" required>`)}${fl("إلى",`<input type="time" name="end" value="13:30" required>`)}</div>${fl("الأيام (بدون اختيار = كل يوم)",chipsH("days",[0,1,2,3,4,5,6],[],dayName))}${fl("أو ليوم محدد فقط",`<input type="date" name="date">`)}${sv}</form>`);
F.brk=f=>{const id=uid("brk");put("breaks/"+id,{id,name:f.get("name"),start:f.get("start"),end:f.get("end"),days:f.getAll("days").map(Number),date:f.get("date")||""});close()};
/* ---------- tasks (homework) & exams ---------- */
A.task=d=>{const x=d.v?S.tasks[d.v]:{rel:[60,1440]};open(`<h3>واجب</h3><form data-f="task"><input type="hidden" name="id" value="${x.id||""}">${fl("عنوان الواجب",`<input name="title" required value="${esc(x.title)}">`)}${fl("المادة التابع لها",`<select name="courseId" required>${crs(x.courseId)}</select>`)}
 ${fl("التفاصيل",`<textarea name="details" rows="3">${esc(x.details)}</textarea>`)}${fl("موعد التسليم",`<input type="datetime-local" name="due" required value="${esc(x.due)}">`)}${fl("ذكّرني قبل الموعد بـ",chipsH("rel",[0,30,60,180,1440,2880],ar2(x.rel).map(Number),relF))}
 ${fl("وتذكير بوقت محدد بالضبط (اختياري)",`<div id="ats">${ar2(x.at).map(atRow).join("")}</div><button type="button" class="btn o sm" data-a="addAt">+ وقت تذكير</button>`)}${sv}</form>`)};
A.addAt=()=>$("#ats").insertAdjacentHTML("beforeend",atRow());
F.task=f=>{const id=f.get("id")||uid("tsk"),o=S.tasks[id]||{};put("tasks/"+id,{...o,id,title:f.get("title"),courseId:f.get("courseId"),details:f.get("details")||"",due:f.get("due"),rel:f.getAll("rel").map(Number),at:f.getAll("at").filter(Boolean),done:!!o.done});close()};
A.tdone=d=>{const x=S.tasks[d.v],b=pts();put("tasks/"+d.v,{...x,done:!x.done,doneAt:x.done?"":nowS()});toastPts(b)};
A.exam=d=>{const e=d.v?S.exams[d.v]:{type:"quiz",date:ymd(new Date()),time:"10:00",dur:60,prepDays:2,pstart:"16:00",phours:3,suspend:"personal",rem:[60,1440]};
 open(`<h3>اختبار / كويز / مشروع</h3><form data-f="exam"><input type="hidden" name="id" value="${e.id||""}">${fl("العنوان",`<input name="title" required value="${esc(e.title)}">`)}
 <div class="f2">${fl("النوع",`<select name="type">${opt(Object.entries(EX),e.type)}</select>`)}${fl("المادة",`<select name="courseId"><option value="">—</option>${crs(e.courseId)}</select>`)}</div>
 <div class="f2">${fl("التاريخ",`<input type="date" name="date" required value="${e.date}">`)}${fl("الوقت",`<input type="time" name="time" value="${e.time}">`)}</div><div class="f2">${fl("المدة (دقيقة)",`<input type="number" name="dur" min="5" value="${e.dur}">`)}${fl("المكان",`<input name="place" value="${esc(e.place)}">`)}</div>
 <div class="card" style="margin-top:14px"><b>📚 فترة التحضير (تعدّل الجدول تلقائياً)</b><div class="f2">${fl("عدد أيام الدراسة قبله",`<input type="number" name="prepDays" min="0" max="30" value="${e.prepDays}">`)}${fl("ساعات الدراسة يومياً",`<input type="number" name="phours" min="1" max="12" value="${e.phours}">`)}</div>
 <div class="f2">${fl("تبدأ الساعة",`<input type="time" name="pstart" value="${e.pstart}">`)}${fl("تعليق خلال الفترة",`<select name="suspend">${opt([["personal","المواد الشخصية فقط"],["none","لا شيء"],["all","كل شيء (حتى الجامعية)"]],e.suspend)}</select>`)}</div></div>
 ${fl("ذكّرني قبل الاختبار بـ",chipsH("rem",[30,60,180,1440,2880,10080],ar2(e.rem).map(Number),relF))}${sv}</form>`)};
F.exam=f=>{const id=f.get("id")||uid("exm");put("exams/"+id,{id,title:f.get("title"),type:f.get("type"),courseId:f.get("courseId")||"",date:f.get("date"),time:f.get("time")||"09:00",dur:+f.get("dur")||60,place:f.get("place")||"",prepDays:+f.get("prepDays")||0,phours:+f.get("phours")||2,pstart:f.get("pstart")||"16:00",suspend:f.get("suspend"),rem:f.getAll("rem").map(Number)});close()};
V.tasks=()=>{const ns=nowS(),ds=ymd(new Date()),all=L("tasks"),pen=all.filter(x=>!x.done).sort((a,b)=>a.due.localeCompare(b.due)),dn=all.filter(x=>x.done).sort((a,b)=>b.due.localeCompare(a.due)).slice(0,5),exs=L("exams").sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).filter(e=>e.date>=ds);
 const tk=x=>`<div class="item"><div style="flex:1"><b style="${x.done?"text-decoration:line-through;opacity:.6":""}">${esc(x.title)}</b> <span class="tag">${esc(S.courses[x.courseId]?.name||"")}</span>${!x.done&&x.due<ns?` <span class="tag" style="background:#D64545;color:#fff">متأخر</span>`:""}<div style="color:var(--s);font-size:14px">${esc(x.details||"")}</div><div style="color:var(--s);font-size:13px">⏰ ${esc(dl(x.due.slice(0,10)))} ${x.due.slice(11)}</div>
 <div class="row" style="margin:8px 0 0"><button class="btn o sm" data-a="tdone" data-v="${x.id}">${x.done?"إعادة فتح":"تم ✓"}</button><button class="btn o sm" data-a="task" data-v="${x.id}">${t("edit")}</button><button class="btn d sm" data-a="rm" data-v="tasks/${x.id}">${t("del")}</button></div></div></div>`;
 return`<div class="row"><button class="btn" data-a="task"><i class="fa-solid fa-plus"></i> واجب جديد</button><button class="btn o" data-a="exam"><i class="fa-solid fa-plus"></i> اختبار / مشروع</button></div>
 <div class="card"><h3>📝 الاختبارات والمشاريع القادمة</h3>${exs.length?exs.map(e=>{const n=Math.round((pd(e.date)-pd(ds))/864e5);return`<div class="item"><div style="flex:1"><b>${esc(e.title)}</b> <span class="tag">${EX[e.type]}</span><div style="color:var(--s);font-size:14px">${dl(e.date)} • ${e.time} • ${n?"بعد "+n+" يوم":"اليوم"}${e.prepDays?` • تحضير ${e.prepDays} يوم`:""}</div><div class="row" style="margin:8px 0 0"><button class="btn o sm" data-a="exam" data-v="${e.id}">${t("edit")}</button><button class="btn d sm" data-a="rm" data-v="exams/${e.id}">${t("del")}</button></div></div></div>`}).join(""):`<span style="color:var(--s)">لا اختبارات قادمة</span>`}</div>
 <div class="card"><h3>📌 الواجبات المطلوبة</h3>${pen.length?pen.map(tk).join(""):`<span style="color:var(--s)">لا واجبات 🎉</span>`}</div>${dn.length?`<div class="card"><h3>✅ أنجزتها مؤخراً</h3>${dn.map(tk).join("")}</div>`:""}`};
/* ---------- schedule / home / reports ---------- */
V.schedule=()=>{const bs=L("breaks").filter(b=>!b.date),days=[...Array(7)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return dayCard(ymd(d),i?null:"اليوم — "+dl(ymd(d)))}).join("");
 return`<div class="row"><button class="btn o" data-a="brk"><i class="fa-solid fa-mug-hot"></i> إضافة استراحة</button><button class="btn o" data-a="pDay"><i class="fa-solid fa-print"></i> PDF اليوم</button><button class="btn o" data-a="pWeek"><i class="fa-solid fa-file-pdf"></i> PDF الأسبوع</button></div>${bs.length?`<div class="card"><h3>استراحاتي اليومية</h3>${bs.map(b=>`<div class="item"><span>${esc(b.name)} <small style="direction:ltr;display:inline-block">${b.start}–${b.end}</small>${ar2(b.days).length?` <small>(${ar2(b.days).map(d=>dayName(+d)).join("، ")})</small>`:""}</span><button class="btn d sm" data-a="rm" data-v="breaks/${b.id}">×</button></div>`).join("")}</div>`:""}${days}`};
V.home=()=>{const n=new Date(),ds=ymd(n),nm=n.getHours()*60+n.getMinutes(),P=plan(ds),K=["class","exam","prep"];let nx=P.find(i=>K.includes(i.k)&&!i.sus&&toM(i.start)>nm),nd="اليوم";
 if(!nx){const d=new Date();d.setDate(d.getDate()+1);nx=plan(ymd(d)).find(i=>K.includes(i.k)&&!i.sus);nd="بكرا"}
 const pend=L("tasks").filter(x=>!x.done).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,3),wk=L("weak").filter(w=>!w.done).slice(0,4);
 return`<div class="card"><h3><i class="fa-regular fa-clock"></i> ${t("next")}</h3>${nx?`<b style="font-size:19px">${esc(nx.name)}</b><div style="color:var(--s)">${nd} • <span style="direction:ltr;display:inline-block">${nx.start}</span> ${esc(nx.place||"")}</div>`:`<span style="color:var(--s)">${t("none")}</span>`}</div>
 <div class="grid">${statsHtml()}</div>${dayCard(ds,"جدول اليوم")}
 ${pend.length?`<div class="card"><h3>📌 واجبات قريبة</h3>${pend.map(x=>`<div class="item"><span>${esc(x.title)} <span class="tag">${esc(S.courses[x.courseId]?.name||"")}</span></span><small>${x.due.slice(5,10)} ${x.due.slice(11)}</small></div>`).join("")}</div>`:""}
 ${wk.length?`<div class="card"><h3>🎯 نقاط ضعف تحتاج مراجعة</h3>${wk.map(w=>`<div class="item"><span>${esc(w.text)}</span><small>${esc(S.courses[w.courseId]?.name||"")}</small></div>`).join("")}</div>`:""}
 <button class="btn blk" data-a="log"><i class="fa-solid fa-stopwatch"></i> ${t("logStudy")}</button>`};
function insights(){const o=[],now=nowS(),td=ymd(new Date()),tdd=pd(td);
 const ex=L("exams").filter(e=>e.date>=td).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time))[0];
 if(ex){const n=Math.round((pd(ex.date)-tdd)/864e5),p=+ex.prepDays||0;o.push(`📝 ${EX[ex.type]||""} «${ex.title}» ${n?"بعد "+n+" يوم":"اليوم"}. ${n>p?"فترة التحضير تبدأ بعد "+(n-p)+" يوم — ابدأ بتلخيص المادة من الآن.":"أنت في فترة التحضير، التزم بكتل الدراسة."}`)}
 const tk=L("tasks").filter(x=>!x.done&&x.due).sort((a,b)=>a.due.localeCompare(b.due)),od=tk.filter(x=>x.due<now);
 if(od.length)o.push(`⚠️ عندك ${od.length} واجب متأخر: ${od.slice(0,3).map(x=>x.title).join("، ")}. ابدأ بأقدمها.`);else if(tk[0])o.push(`📌 أقرب واجب: «${tk[0].title}» (${tk[0].due.replace("T"," ")}).`);
 const wk=L("weak").filter(w=>!w.done),bc={};wk.forEach(w=>bc[w.courseId]=(bc[w.courseId]||0)+1);const tp=Object.entries(bc).sort((a,b)=>b[1]-a[1])[0];
 if(tp)o.push(`🎯 عندك ${wk.length} نقطة ضعف مفتوحة، أكثرها في «${S.courses[tp[0]]?.name}» (${tp[1]}). خصّص 30 دقيقة لمراجعتها اليوم.`);
 L("courses").filter(c=>c.type==="university").forEach(c=>{const a=L("attendance").filter(x=>x.courseId===c.id);if(a.length>=3){const ab=a.filter(x=>x.status==="excused"||x.status==="absent").length;if(ab/a.length>.15)o.push(`🚨 غيابك في «${c.name}» ${Math.round(ab/a.length*100)}% — انتبه لحد الحرمان في جامعتك.`)}});
 const wm=d=>L("sessions").filter(s=>{const k=(tdd-pd(s.date))/864e5;return k>=d&&k<d+7}).reduce((a,s)=>a+ +s.minutes,0),a=wm(0),b=wm(7);
 if(b&&a<b*.7)o.push(`📉 ساعات دراستك هذا الأسبوع (${hm(a)}) أقل من الماضي (${hm(b)}).`);
 if(!o.length)o.push("✅ وضعك ممتاز ولا شيء متأخر. سجّل حضورك أول بأول لأعطيك نصائح أدق.");return o}
function repX(){const f0=new Date();f0.setDate(f0.getDate()-rng+1);const f=ymd(f0),e=ymd(new Date()),A_=L("attendance").filter(x=>x.date>=f&&x.date<=e),by={};
 A_.forEach(x=>{const o=by[x.courseId]=by[x.courseId]||{present:0,late:0,excused:0,absent:0};o[x.status]++});
 const rows=Object.entries(by).map(([id,o])=>{const tot=o.present+o.late+o.excused+o.absent;return`<div class="item"><div><b>${esc(S.courses[id]?.name||"—")}</b><div style="color:var(--s);font-size:13px">حضور ${o.present+o.late} • بعذر ${o.excused} • بدون عذر ${o.absent}</div></div><b style="color:${(o.excused+o.absent)/tot>.15?"var(--no)":"var(--ok)"}">${Math.round((o.present+o.late)/tot*100)}%</b></div>`}).join("");
 const tk=L("tasks").filter(x=>x.due&&x.due.slice(0,10)>=f&&x.due.slice(0,10)<=e),tp=A_.filter(x=>x.topic).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8);
 return`<div class="card"><h3>الحضور والغياب</h3>${rows||`<span style="color:var(--s)">لا سجلات في هذه الفترة</span>`}</div><div class="card"><h3>الواجبات</h3>تسليمات الفترة: ${tk.length} • المنجز: ${tk.filter(x=>x.done).length}</div>
 ${tp.length?`<div class="card"><h3>ما أخذته</h3>${tp.map(x=>`<div class="item"><div><b>${esc(S.courses[x.courseId]?.name||"")}</b><div style="color:var(--s);font-size:13px">${esc(x.topic)}${x.reached?" — وصلت: "+esc(x.reached):""}</div></div><small>${x.date.slice(5)}</small></div>`).join("")}</div>`:""}
 <div class="card"><h3>💡 خطة مقترحة</h3>${insights().map(x=>`<p style="margin-bottom:8px">${esc(x)}</p>`).join("")}</div>`}
const _h0=V.home;V.home=()=>pendCard()+rwCard()+_h0();
const _rep=V.reports;V.reports=()=>_rep()+repX();
/* ---------- reminders (classes, end-of-class prompt, exams, tasks, prep blocks) ---------- */
tick=function(){const n=new Date();$("#clock").textContent=n.toLocaleTimeString(lang==="ar"?"ar-JO":"en-US",{hour:"2-digit",minute:"2-digit"});
 const F2=JSON.parse(localStorage.getItem("hs_f2")||"{}"),ds=ymd(n),nm=n.getHours()*60+n.getMinutes(),now=+n,fire=(k,ti,b,act)=>{if(F2[k])return;F2[k]=now;alertUser(ti,b,act)};
 Object.keys(F2).forEach(k=>now-F2[k]>2592e5&&delete F2[k]);
 const ctx=c=>{const a=L("attendance").filter(x=>x.courseId===c.id&&x.reached).sort((x,y)=>y.date.localeCompare(x.date))[0],w=L("weak").filter(w=>w.courseId===c.id&&!w.done).slice(0,3).map(w=>w.text);return(a?` • آخر مرة وصلت: ${a.reached}`:"")+(w.length?` • راجع: ${w.join("، ")}`:"")};
 plan(ds).forEach(it=>{if(it.sus)return;
  if(it.k==="class"){const c=it.c,st=toM(it.start),en=toM(it.end),key=m=>`${ds}|${c.id}|${it.orig}|${m}`,due=ar2(c.reminders).map(Number).filter(m=>st-m<=nm&&nm<en).sort((a,b)=>a-b);
   if(due.some(m=>!F2[key(m)])){due.forEach(m=>F2[key(m)]=now);const m=due[0];alertUser(c.name,(m>0?`${t("alertIn")} ${rl(m)}`:t("alertNow"))+` • ${it.start} • ${MN[it.mode]}${it.place?" • "+it.place:""}`+ctx(c))}
   if(nm>=en&&nm<en+45&&!it.att)fire("end|"+key(0),c.name,"انتهت الحصة — اضغط هنا لتسجّل حضورك وماذا أخذت ✍️",`${c.id}|${ds}|${it.orig}`)}
  if(it.k==="prep"&&nm>=toM(it.start)&&nm<toM(it.end))fire(`prep|${ds}|${it.e.id}`,"وقت المذاكرة 📚",it.name)});
 L("exams").forEach(e=>{const T0=pd(e.date).getTime()+toM(e.time||"09:00")*6e4;ar2(e.rem).forEach(m=>{const T1=T0-m*6e4;if(now>=T1&&now<T0)fire(`ex|${e.id}|${m}`,`${EX[e.type]||""}: ${e.title}`,`بعد ${rl(m)} • ${e.time||""} ${e.place||""}`)})});
 L("tasks").forEach(x=>{if(x.done||!x.due)return;const D=new Date(x.due).getTime();[...ar2(x.rel).map(m=>[D-m*6e4,m]),...ar2(x.at).map(s=>[new Date(s).getTime(),s])].forEach(([T1,k])=>{if(now>=T1&&now-T1<432e5)fire(`tk|${x.id}|${k}`,"واجب: "+x.title,`${S.courses[x.courseId]?.name||""} • التسليم ${x.due.replace("T"," ")}${x.details?" • "+x.details:""}`)})});
 localStorage.setItem("hs_f2",JSON.stringify(F2))};
/* ---------- theme ---------- */
const th=()=>(S.settings&&S.settings.theme)||localStorage.getItem("hs_theme")||"auto",applyTh=()=>document.documentElement.dataset.theme=th();A.theme=d=>{localStorage.setItem("hs_theme",d.v);put("settings",{...S.settings,theme:d.v})};applyTh();
/* ---------- fingerprint / face (WebAuthn platform authenticator, per device) ---------- */
const b64=u=>btoa(String.fromCharCode(...new Uint8Array(u))),rnd=n=>crypto.getRandomValues(new Uint8Array(n));
A.bioOn=async()=>{try{const c=await navigator.credentials.create({publicKey:{challenge:rnd(32),rp:{name:"Hamed's System"},user:{id:rnd(16),name:"hamed",displayName:"Hamed"},pubKeyCredParams:[{type:"public-key",alg:-7},{type:"public-key",alg:-257}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:60000}});localStorage.setItem("hs_bio",b64(c.rawId));draw()}catch(e){alert("تعذّر تفعيل البصمة: تأكد أن الموقع على HTTPS وأن جهازك فيه بصمة/قفل شاشة.")}};
A.bioOff=()=>{localStorage.removeItem("hs_bio");draw()};
A.bio=async()=>{try{await navigator.credentials.get({publicKey:{challenge:rnd(32),allowCredentials:[{type:"public-key",id:Uint8Array.from(atob(localStorage.getItem("hs_bio")),c=>c.charCodeAt(0))}],userVerification:"required",timeout:60000}});fails=0;unlock()}catch(e){msg="لم يتم التحقق بالبصمة";drawLock()}};
const _dl=drawLock;drawLock=function(){_dl();if(mode==="login"&&localStorage.getItem("hs_bio")&&window.PublicKeyCredential){const p=$(".padcard");p&&p.insertAdjacentHTML("beforeend",`<button class="btn blk" style="margin-top:12px" data-a="bio"><i class="fa-solid fa-fingerprint"></i> الدخول بالبصمة</button>`)}};
/* ---------- settings: theme, fingerprint, JSON import ---------- */
const _set=V.settings;V.settings=()=>_set()+`<div class="card"><h3><i class="fa-solid fa-circle-half-stroke"></i> المظهر</h3><div class="chips">${[["auto","تلقائي"],["light","فاتح"],["dark","داكن"]].map(([v,n])=>`<button class="chip ${th()===v?"on":""}" data-a="theme" data-v="${v}">${n}</button>`).join("")}</div></div>
 <div class="card"><h3><i class="fa-solid fa-fingerprint"></i> الدخول بالبصمة</h3><p style="color:var(--s);font-size:14px;margin-bottom:12px">يحتاج HTTPS وجهازاً فيه بصمة/وجه، ويُفعَّل لكل جهاز على حدة. رمز القفل يبقى بديلاً دائماً.</p>${window.PublicKeyCredential?(localStorage.getItem("hs_bio")?`<button class="btn d sm" data-a="bioOff">إيقاف البصمة</button>`:`<button class="btn sm" data-a="bioOn">تفعيل البصمة</button>`):"<small>غير مدعومة في هذا المتصفح</small>"}</div>
 <div class="card"><h3><i class="fa-solid fa-file-import"></i> استيراد نسخة احتياطية (JSON)</h3><p style="color:var(--s);font-size:14px;margin-bottom:12px">ارفع ملف النسخة الاحتياطية لاسترجاع بياناتك (دمج أو استبدال). رمز القفل لا يتأثر.</p><button class="btn o" data-a="imp">اختيار ملف</button><input id="impf" type="file" accept=".json,application/json" hidden></div>`;
A.imp=()=>$("#impf").click();
const K=["semesters","courses","sessions","platforms","attendance","weak","overrides","breaks","tasks","exams","rewards","claims"],norm=v=>Array.isArray(v)?Object.fromEntries(v.filter(Boolean).map(x=>[x.id||uid("i"),x])):(v&&typeof v==="object"?v:{});
document.addEventListener("change",async e=>{if(e.target.id!=="impf")return;const file=e.target.files[0];e.target.value="";if(!file)return;
 try{const j=JSON.parse(await file.text()),n=K.filter(k=>Object.keys(norm(j[k])).length);if(!n.length)throw 0;
  const rep=!confirm(`وجدت: ${n.map(k=>k+" ("+Object.keys(norm(j[k])).length+")").join("، ")}\n\nموافق = دمج مع بياناتك الحالية\nإلغاء = خيار الاستبدال`);
  if(rep&&!confirm("استبدال كل بياناتك الحالية بمحتوى الملف؟"))return;
  const up={};K.forEach(k=>{S[k]=rep?norm(j[k]):{...S[k],...norm(j[k])};up[k]=Object.keys(S[k]).length?S[k]:null});cache();
  if(ref)await ref.update(JSON.parse(JSON.stringify(up)));draw();alert("تم الاستيراد ✅")}catch(err){alert("الملف غير صالح — تأكد أنه نسخة احتياطية JSON من النظام.")}});
/* ---------- AI assistant (free, runs locally on your data) ---------- */
const free=ds=>{const b=plan(ds).filter(i=>!i.sus).map(i=>[toM(i.start),toM(i.end)]).sort((a,b)=>a[0]-b[0]),g=[],f=m=>pad(m/60|0)+":"+pad(m%60);let c=420;b.forEach(([s,e])=>{if(s-c>=45)g.push(f(c)+"–"+f(s));c=Math.max(c,e)});if(1320-c>=45)g.push(f(c)+"–"+f(1320));return g};
const dayTxt=(ds,l)=>{const P=plan(ds).filter(i=>i.k!=="break");return P.length?`جدول ${l}:\n`+P.map(i=>`• ${i.start}${i.end!==i.start?"–"+i.end:""} ${i.name}${i.k==="class"?" ("+MN[i.mode]+")":""}${i.sus?" [معلّق]":""}`).join("\n"):`ما عندك شي ${l} 🎉`};
function reply(q0){const q=q0.replace(/[أإآ]/g,"ا").replace(/ة/g,"ه"),has=(...w)=>w.some(x=>q.includes(x)),td=ymd(new Date()),tm=(()=>{const d=new Date();d.setDate(d.getDate()+1);return ymd(d)})();
 if(has("فاضي","فراغ","وقت حر"))return"أوقات فراغك اليوم (07:00–22:00):\n"+(free(td).join("\n")||"لا يوجد فراغ ≥45 دقيقة");
 if(has("بكرا","بكره","غدا"))return dayTxt(tm,"بكرا")+"\n\nفراغك: "+(free(tm).join("، ")||"—");
 if(has("اختبار","امتحان","كويز","مشروع")){const e=L("exams").filter(e=>e.date>=td).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));return e.length?e.map(e=>`• ${EX[e.type]}: ${e.title} — ${dl(e.date)} ${e.time} (بعد ${Math.round((pd(e.date)-pd(td))/864e5)} يوم)`).join("\n"):"لا اختبارات قادمة مسجّلة."}
 if(has("واجب","مهام","تسليم")){const k=L("tasks").filter(x=>!x.done).sort((a,b)=>a.due.localeCompare(b.due));return k.length?k.map(x=>`• ${x.title} (${S.courses[x.courseId]?.name||""}) — ${x.due.replace("T"," ")}`).join("\n"):"ما في واجبات مفتوحة ✅"}
 if(has("غياب","حضور","غبت")){const r=L("courses").map(c=>{const a=L("attendance").filter(x=>x.courseId===c.id);if(!a.length)return"";const ab=a.filter(x=>x.status==="excused"||x.status==="absent").length;return`• ${c.name}: ${a.length-ab} حضور / ${ab} غياب`}).filter(Boolean);return r.length?r.join("\n"):"لا سجلات حضور بعد."}
 if(has("ضعف","ضعيف","راجع")){const w=L("weak").filter(w=>!w.done);return w.length?w.map(w=>`• ${w.text} (${S.courses[w.courseId]?.name||""})`).join("\n"):"لا نقاط ضعف مفتوحة 👏"}
 if(has("وين وصلت","تقدم","وصلت")){const r=L("courses").map(c=>{const a=L("attendance").filter(x=>x.courseId===c.id&&x.reached).sort((x,y)=>y.date.localeCompare(x.date))[0];return a?`• ${c.name}: ${a.reached}${c.type==="personal"?" ("+(c.progress||0)+"%)":""}`:""}).filter(Boolean);return r.length?r.join("\n"):"سجّل «وين وصلت» عند تسجيل الحضور وبعرضها لك."}
 if(has("نصيح","خطه","اقترح","انصح","ساعد"))return insights().join("\n\n");
 if(has("اليوم","جدول","شو عندي"))return dayTxt(td,"اليوم");
 return"أقدر أجاوبك عن: جدول اليوم/بكرا، الاختبارات، الواجبات، الغياب، نقاط الضعف، وين وصلت، أوقات الفراغ، أو اطلب «نصيحة».\nأعمل محلياً على بياناتك ومجاني تماماً."}
const fab=document.createElement("div");fab.id="ai";fab.innerHTML='<i class="fa-solid fa-robot"></i>';const pn=document.createElement("div");pn.id="aip";pn.className="hidden";
pn.innerHTML=`<div class="aih"><b>🤖 مساعدك</b><button class="btn sm o" id="aix">×</button></div><div id="aim"></div><div class="chips" style="padding:0 10px">${["جدول اليوم","بكرا","نصيحة","الواجبات","اختبارات","نقاط ضعفي","فراغي"].map(x=>`<button class="chip" data-q="${x}">${x}</button>`).join("")}</div><div class="aii"><input id="aiq" placeholder="اسألني عن جدولك..."><button class="btn" id="ais"><i class="fa-solid fa-paper-plane"></i></button></div>`;
document.body.append(fab,pn);let pos;try{pos=JSON.parse(localStorage.getItem("hs_ai"))}catch(e){}pos=pos||{x:12,y:innerHeight-200};
const place=()=>{pos.x=Math.min(innerWidth-56,Math.max(0,pos.x));pos.y=Math.min(innerHeight-56,Math.max(0,pos.y));fab.style.left=pos.x+"px";fab.style.top=pos.y+"px"};place();
const say=(m,me)=>{const b=document.createElement("div");b.className="aimsg"+(me?" me":"");b.textContent=m;$("#aim").append(b);$("#aim").scrollTop=1e6},send=q=>{q=q.trim();if(!q)return;say(q,1);say(reply(q));$("#aiq").value=""};
fab.addEventListener("pointerdown",e=>{const sx=e.clientX,sy=e.clientY,ox=pos.x,oy=pos.y;let mv=0;fab.setPointerCapture(e.pointerId);
 const m=ev=>{if(Math.abs(ev.clientX-sx)+Math.abs(ev.clientY-sy)>6)mv=1;pos.x=ox+ev.clientX-sx;pos.y=oy+ev.clientY-sy;place()},u=()=>{fab.removeEventListener("pointermove",m);fab.removeEventListener("pointerup",u);localStorage.setItem("hs_ai",JSON.stringify(pos));if(!mv){pn.classList.toggle("hidden");if(!$("#aim").children.length)say("أهلاً حامد 👋 أنا مطّلع على جدولك وبياناتك. اسألني أو اختر من الأسفل.")}};
 fab.addEventListener("pointermove",m);fab.addEventListener("pointerup",u)});
pn.addEventListener("click",e=>{if(e.target.closest("#aix"))pn.classList.add("hidden");const q=e.target.closest("[data-q]");if(q)send(q.dataset.q);if(e.target.closest("#ais"))send($("#aiq").value)});
$("#aiq").addEventListener("keydown",e=>{if(e.key==="Enter")send(e.target.value)});addEventListener("resize",place);
const _d=draw;draw=function(){_d();applyTh();const h=$("#app").classList.contains("hidden");fab.style.display=h?"none":"grid";if(h)pn.classList.add("hidden")};

/* ---------- after-class prompt: pending logs, homework inside the log ---------- */
function hwSec(cid){const k=L("tasks").filter(x=>x.courseId===cid&&!x.done);return`<div class="card" style="margin-top:12px"><b>📌 واجبات المادة</b>${k.length?chipsH("tdone",k.map(x=>x.id),[],id=>"أنجزت: "+esc(S.tasks[id].title)):""}${fl("واجب جديد من هذه الحصة (اختياري)",`<input name="hwt" placeholder="عنوان الواجب">`)}${fl("موعد تسليمه",`<input type="datetime-local" name="hwd">`)}</div>`}
const _fa=F.att;F.att=f=>{const b=pts(),cid=f.get("k").split("|")[0];
 f.getAll("tdone").forEach(i=>{const x=S.tasks[i];if(x)put("tasks/"+i,{...x,done:true,doneAt:nowS()})});
 if(f.get("hwt")&&f.get("hwd")){const id=uid("tsk");put("tasks/"+id,{id,title:f.get("hwt"),courseId:cid,details:"",due:f.get("hwd"),rel:[60,1440],at:[],done:false})}
 _fa(f);toastPts(b)};
function pendCard(){const n=new Date(),ds=ymd(n),nm=n.getHours()*60+n.getMinutes(),p=plan(ds).filter(i=>i.k==="class"&&!i.sus&&!i.att&&toM(i.end)<=nm);
 return p.length?`<div class="card" style="border-color:var(--b)"><h3>✍️ بانتظار تسجيلك بعد الحصة</h3>${p.map(i=>`<div class="item"><span>${esc(i.name)} <small>${i.start}</small></span><button class="btn sm" data-a="att" data-v="${i.c.id}|${ds}|${i.orig}">سجّل</button></div>`).join("")}</div>`:""}
const _au=alertUser;alertUser=function(a,b,act){_au(a,b);const el=$("#toast");if(act){el.dataset.a="att";el.dataset.v=act}else{delete el.dataset.a;delete el.dataset.v}};
/* ---------- rewards (derived from your data, so it syncs on every device) ---------- */
function pts(){let p=0;L("attendance").forEach(a=>{p+=a.status==="present"?10:a.status==="late"?5:0;if(a.topic)p+=2});
 L("tasks").forEach(x=>{if(x.done)p+=(x.doneAt&&x.doneAt<=x.due)?15:x.doneAt?5:10});
 p+=Math.floor(L("sessions").reduce((a,s)=>a+ +s.minutes,0)/30)*5+L("weak").filter(w=>w.done).length*3;return p}
const spent=()=>L("claims").reduce((a,c)=>a+ +c.cost,0),toastPts=b=>{const d=pts()-b;if(d>0)alertUser("🎉 مكافأة","+"+d+" نقطة")};
const badges=()=>{const pr=L("attendance").filter(x=>x.status==="present"||x.status==="late").length;return[["🌱","أول حضور",pr>=1],["🔥","20 حصة حضرتها",pr>=20],["📚","5 واجبات منجزة",L("tasks").filter(x=>x.done).length>=5],["⏱️","10 ساعات دراسة",L("sessions").reduce((s,x)=>s+ +x.minutes,0)>=600],["🎯","أتقنت 5 نقاط ضعف",L("weak").filter(w=>w.done).length>=5],["🏆","500 نقطة",pts()>=500]]};
function rwCard(){const p=pts(),lv=Math.floor(p/150)+1;return`<div class="card"><h3>🏅 مستواك ${lv} • رصيدك ${p-spent()} نقطة</h3><div class="prog"><i style="width:${p%150/1.5}%"></i></div><div class="row" style="margin:10px 0 0"><small style="color:var(--s)">${150-p%150} نقطة للمستوى التالي</small><button class="btn o sm" data-a="rw">الجوائز والأوسمة</button></div></div>`}
A.rw=()=>{const av=pts()-spent(),rw=L("rewards"),cl=L("claims").sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
 open(`<h3>🏅 الجوائز والأوسمة</h3><p style="color:var(--s);font-size:14px">رصيدك المتاح: <b>${av}</b> نقطة<br>حضور +10 • تأخر +5 • تسجيل موضوع +2 • واجب بوقته +15 (متأخر +5) • كل 30 د دراسة +5 • إتقان نقطة ضعف +3</p>
 <div class="chips" style="margin:10px 0">${badges().map(b=>`<span class="chip ${b[2]?"on":""}" style="${b[2]?"":"opacity:.45"}">${b[0]} ${b[1]}</span>`).join("")}</div>
 <h3 style="margin:14px 0 6px">جوائزي</h3>${rw.length?rw.map(r=>`<div class="item"><span>${esc(r.name)} <small>(${r.cost} نقطة)</small></span><span><button class="btn sm" ${av<r.cost?"disabled style=\"opacity:.4\"":""} data-a="claim" data-v="${r.id}">استبدل</button> <button class="btn d sm" data-a="rm" data-v="rewards/${r.id}">×</button></span></div>`).join(""):`<p style="color:var(--s)">أضف جوائز تكافئ نفسك فيها (قهوة، ساعة ألعاب، خروجة...)</p>`}
 <form data-f="rew"><div class="f2"><div><label>الجائزة</label><input name="name" required></div><div><label>تكلفتها (نقاط)</label><input name="cost" type="number" min="10" value="100" required></div></div>
 <div class="row" style="margin:12px 0 0"><button class="btn">إضافة جائزة</button><button type="button" class="btn o" data-a="close">إغلاق</button></div></form>
 ${cl.length?`<h3 style="margin:14px 0 6px">آخر ما استبدلته</h3>${cl.map(c=>`<div class="item"><span>${esc(c.name)}</span><small>${c.date}</small></div>`).join("")}`:""}`)};
F.rew=f=>{const id=uid("rw");put("rewards/"+id,{id,name:f.get("name"),cost:+f.get("cost")});A.rw()};
A.claim=d=>{const r=S.rewards[d.v];if(pts()-spent()<r.cost)return alert("نقاطك لا تكفي");if(!confirm(`استبدال «${r.name}» بـ ${r.cost} نقطة؟`))return;const id=uid("clm");put("claims/"+id,{id,name:r.name,cost:+r.cost,date:ymd(new Date())});A.rw()};
/* ---------- print daily / weekly schedule (use "Save as PDF" in the print dialog) ---------- */
function pr(days,title,brk){let el=$("#pa");if(!el){el=document.createElement("div");el.id="pa";document.body.append(el)}
 el.innerHTML=`<h1>${title} — Hamed's System</h1>`+days.map(ds=>{const P=plan(ds).filter(i=>!i.sus&&(brk||i.k!=="break"));return`<h2>${dl(ds)}</h2>`+(P.length?`<table>${P.map(i=>`<tr><td style="width:130px;direction:ltr;text-align:center">${i.start}${i.end!==i.start?" – "+i.end:""}</td><td><b>${esc(i.name)}</b></td><td>${i.k==="class"?MN[i.mode]+" • ":""}${esc(i.place||"")}</td></tr>`).join("")}</table>`:"<p>—</p>")}).join("");setTimeout(()=>print(),150)}
A.pDay=()=>pr([ymd(new Date())],"جدول اليوم",1);
A.pWeek=()=>{const d=new Date();d.setDate(d.getDate()-d.getDay());pr([...Array(7)].map((_,i)=>{const x=new Date(d);x.setDate(d.getDate()+i);return ymd(x)}),"الجدول الأسبوعي",0)};
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("sw.js").catch(()=>{});
})();

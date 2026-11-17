// Rebuild: serve docs/ on port 8765 (python3 -m http.server 8765), then NODE_PATH=$(npm root -g) node scripts/build-7-2.js;
// it writes abc72_payloads.json, which is folded into docs/wip/abc-test-data-7-2.js with the scenario list.
// Inputs: scripts/spec-7-2.js (one scenario per activity) and scripts/evidence-7-2.js (readiness evidence text).
// Builds the ABC Test Org 7.2 payloads from the scenario spec, using the sandbox's own model (run headless).
const {chromium}=require('playwright'),fs=require('fs');
const SPEC=require('./spec-7-2.js'),EV=require('./evidence-7-2.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.route('**/*-api/**',r=>r.fulfill({status:200,contentType:'application/json',body:'{}'}));
await p.goto('http://localhost:8765/sandbox/pcf7.html');await p.waitForTimeout(2500);
const f=p.frames().find(x=>x.url().includes('four_views'));
const out=await f.evaluate(([SPEC,EV])=>{
 const W=P.FV_SOURCE.WR_DATA,ORG='abc-test-org',DATE='Nov 17, 2026',TAG='ABC Test Org test data (7.2), '+DATE;
 const EVT=['observed','system','audit','interview','document'],REFS={observed:'Observed instances, Oct 2026',system:'System logs, Q3 2026',audit:'Internal audit sample, Oct 2026',interview:'Interviews with the team, Oct 2026',document:'Process documentation, rev. 2026'};
 const res={assess:[],del:[],override:[],review:[],ready:[],stepev:[],checks:[]};
 const oneOf=(arr,i)=>arr[i%arr.length];
 Object.entries(SPEC).forEach(([code,sp],ix)=>{const a=ACT[code];if(!a){res.checks.push('missing '+code);return;}
  if(!sp.cur){res.del.push(code);return;}
  // Element grid: the sandbox's reference grid for the stage, each element with an evidence type and reference.
  const g0=stageEls(a,sp.cur),ctl=ctlOf(a),cp=caps(a);
  if(sp.elPast){const e=Object.keys(g0).find(e=>e!==ctl&&cp[e]&&lr(cp[e][0])<3&&lr(g0[e])<3);if(e){g0[e]='AI';res.checks.push(code+': '+e+' set to AI past its element ceiling '+cp[e][0]);}else res.checks.push(code+': no element to push past its ceiling');}
  const g={};Object.keys(g0).forEach((e,i)=>{const t=e===ctl?sp.ev:oneOf(EVT,ix+i);g[e]=[g0[e],t,REFS[t]];});
  const d=deriveGrid(a,g)[0];if(d!==sp.cur)res.checks.push(code+': grid derives '+d+', not '+sp.cur);
  const A0=a.Aroles[0];
  res.assess.push({org:ORG,code,current:d,el:g,confidence:sp.conf,sourceRole:A0,source:A0,note:'Test data. '+sp.say});
  if(sp.override){const fs=(W[code].ceilingFactors||[]);const fac=fs.find(x=>['technical','governance'].includes(x))||fs[0];
   res.override.push({org:ORG,code,level:'Automation',factor:fac,approverRole:A0,evidence:'Test data. Six months of agent-delegated runs ('+'1,240 instances) with no exception the agent failed to flag; the '+fac+' factor no longer holds for this organization.'});
   res.review.push({org:ORG,code,confirmedRole:A0,note:'Test data. Quarterly review: the evidence still holds.'});}
  const k=rank(d),ceil=sp.override?'Automation':derivedCeil(a);if(k>=rank(ceil)||!sp.te&&!sp.rd)return;
  const to=ST[k+1];
  if(sp.te){const L=TE_L[to],vol=teVol(a,to),wk=teWk(a,to),N=sp.te.mode==='ins'?Math.round(vol*0.4):Math.round(vol*1.2),counts={};
   L.m.forEach((m,mi)=>{let den=m.den[0]==='realexc'?Math.max(20,Math.round(N*0.04)):N,rate;
     const miss=sp.te.mode==='not'&&mi===(sp.te.miss||0);
     rate=m.op==='>='?(miss?m.t-3:Math.min(100,m.t+(100-m.t)/2)):(miss?m.t+2:m.t/2);
     counts[m.den[0]]=den;counts[m.num[0]]=Math.round(rate/100*den);});
   const log=[];
   if(sp.te.mode!=='ins')log.push({inst:'#'+(1000+ix*7),el:ctl,what:'Output missed a required field, caught at the next activity.',sev:'Moderate',why:'Caught downstream before any effect.',by:A0,disp:'Template corrected; re-tested on 50 instances.',re:true});
   log.push({inst:'#'+(1003+ix*7),el:'Communicate',what:'Formatting inconsistent with the house style.',sev:'Minor',why:'No effect on the outcome.',by:A0,disp:'',re:false});
   if(sp.te.mode==='serious')log.unshift({inst:'#'+(1001+ix*7),el:ctl,what:'Agent acted on an instance it should have flagged for a person.',sev:'Serious',why:'Would have bypassed the control point.',by:A0,disp:'',re:false});
   const signed=teSign(a,to)?(rdOver(a)||A0):'';
   res.stepev.push({org:ORG,code,to,counts,wk:sp.te.mode==='ins'?Math.max(1,wk-1):wk+1,auditor:(rdOver(a)||A0),source:'Test data. '+TE_L[to].meth+' in ABC Test Org, Oct–Nov 2026.',signed:sp.te.mode==='ins'?'':signed,log});}
  if(sp.rd){const R=rdRoles(a),cells={},dims={},set=sp.rd.set||{},noAct=sp.rd.noAct||[];
   Object.keys(set).forEach(x=>{const r=x.split('@')[1];if(r&&!R.includes(r))res.checks.push(code+': '+r+' is not one of its roles ('+R.join(', ')+')');});
   // All six fields under every rating (Nov 17, 2026): evidence, provenance, gap, required action, owner, what would move it.
   const own=rdOver(a)||A0,CONF={ready:'high',cond:'medium',not:'medium',ins:'none yet'};
   const rec6=(dm,who,f,src,cov)=>{const T=EV[dm.k],sub=t=>t.replace(/\{R\}/g,who).replace(/\{A\}/g,code+' '+a.name.replace(/\s*\(.*$/,'')).replace(/\{S\}/g,to);
     const prov='Type: '+T.type+' \u00b7 Source role: '+src+' \u00b7 Reference: '+sub(T.ref)+' \u00b7 Confidence: '+CONF[f]+' \u00b7 Coverage: '+cov+' \u00b7 Date: '+(f==='ins'?'planned by Dec 2026':'Oct 2026');
     if(f==='ins')return {ev:'Test data. No organization-specific evidence yet for '+who+' at '+to+'.',prov,gap:'Nothing evidenced, so the finding stays Insufficient Evidence; it is never converted on modeled grounds.',act:'Gather the evidence: '+sub(T.ref).toLowerCase()+'.',owner:own,move:'Evidence from '+sub(T.ref).toLowerCase()+'.'};
     const r={ev:'Test data. '+sub(f==='ready'?T.ready:f==='cond'?T.part:T.not),prov};
     if(f==='ready'){r.gap='None material for '+to+'.';r.act='None before the step; keep it in place and recheck at the next review.';r.owner=own;r.move='Would drop to Conditional on: '+sub(T.down).replace(/^./,c=>c.toLowerCase());}
     else{r.gap=f==='cond'?'Partly in place; the rest must be closed for '+to+'.':'Not in place for '+to+'; this holds the step.';r.act=sub(T.act);r.owner=own;r.move=(f==='cond'?'Ready once: ':'Moves up on: ')+sub(T.up).replace(/^./,c=>c.toLowerCase());}
     return r;};
   RD_DIMS.forEach(dm=>{const keys=dm.l==='role'?R.map(r=>[r+'|'+dm.k,r+'|'+dm.k,set[dm.k+'@'+r]||set[dm.k],r]):[['_|'+dm.k,dm.k,set[dm.k],null]];
     keys.forEach(([ck,dk,f,r])=>{f=f||sp.rd.base;cells[ck]=f;const who=r||'the organization';
       const x=rec6(dm,who,f,r||own,r?'all '+r+' instances on '+code:'the recruiting function');
       if(noAct.includes(dm.k+'@'+who)){delete x.act;}
       dims[dk]=x;});});
   if(rdOver(a)&&HC[a.cons]){const ov=rdOver(a),f=sp.rd.over||sp.rd.base,dm=RD_DIMS.find(d=>d.k==='manager');cells['_over|manager']=f;
     dims['_over|manager']=Object.assign(rec6(dm,ov,f,ov,'oversight of '+code),{owner:(DATA.roles.find(x=>x.name===ov)||{}).reportsTo||ov});}
   const agencyBy={};R.forEach(r=>agencyBy[r]='Test data. '+r+' keeps the judgment at '+ctl+' and can set aside the AI output with a reason; the step changes what they review, not what they answer for.');
   res.ready.push({org:ORG,code,to,cells,dims,meta:{by:'Tim King (test data)',from:TAG,signed:HC[a.cons]?(rdOver(a)||A0):'',agencyBy}});}
 });
 return res;},[SPEC,EV]);
fs.writeFileSync('abc72_payloads.json',JSON.stringify(out,null,1));
console.log('assess',out.assess.length,'del',out.del.length,'override',out.override.length,'ready',out.ready.length,'stepev',out.stepev.length);console.log(out.checks.join('\n'));
await b.close()})();

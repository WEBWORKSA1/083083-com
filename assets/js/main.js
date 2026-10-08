/* 083083.com — site behaviour (no framework, no build step) */
(function(){
  "use strict";
  var C = window.SITE_CONFIG || {};
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* ---------- theme ---------- */
  var root = document.documentElement;
  try{ var t = localStorage.getItem("theme"); if(t) root.setAttribute("data-theme",t); }catch(e){}
  document.addEventListener("click",function(e){
    var b = e.target.closest("[data-theme-toggle]"); if(!b) return;
    var next = root.getAttribute("data-theme")==="light" ? "dark" : "light";
    root.setAttribute("data-theme",next);
    try{ localStorage.setItem("theme",next); }catch(err){}
  });

  /* ---------- nav ---------- */
  var burger = $(".burger"), menu = $(".menu");
  if(burger && menu) burger.addEventListener("click",function(){
    var open = menu.classList.toggle("open"); burger.setAttribute("aria-expanded",open);
  });
  var here = location.pathname.split("/").pop() || "index.html";
  $$(".menu a").forEach(function(a){ if(a.getAttribute("href")===here) a.setAttribute("aria-current","page"); });
  $$("[data-year]").forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* ---------- reveal on scroll ---------- */
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} }); },{threshold:.08});
    $$(".reveal").forEach(function(el){ io.observe(el); });
  } else $$(".reveal").forEach(function(el){ el.classList.add("in"); });

  /* ---------- toast ---------- */
  function toast(msg){
    var t = $(".toast"); if(!t){ t = document.createElement("div"); t.className="toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("show"); },2600);
  }
  window.toast = toast;

  /* ---------- AdSense manual units (Auto Ads loads from <head>) ---------- */
  $$(".ad-slot[data-slot]").forEach(function(box){
    var id = (C.adSlots||{})[box.getAttribute("data-slot")]; if(!id) return;
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle"; ins.style.display = "block";
    ins.setAttribute("data-ad-client",C.adsenseClient);
    ins.setAttribute("data-ad-slot",id);
    ins.setAttribute("data-ad-format","auto");
    ins.setAttribute("data-full-width-responsive","true");
    box.appendChild(ins);
    try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
  });

  /* ---------- inquiry routing (address never rendered) ---------- */
  function endpoint(){
    var key = C.formAlias || (C._r||[]).slice().reverse().map(function(c){return String.fromCharCode(c)}).join("");
    return "https://formsubmit.co/ajax/" + key;
  }
  function send(data, subject){
    data._subject = subject || ("083083.com — " + (data.form || "inquiry"));
    data._template = "table"; data._captcha = "false";
    data.page = location.href;
    return fetch(endpoint(),{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)})
      .then(function(r){ if(!r.ok) throw new Error("bad"); return r.json(); });
  }
  window.sendInquiry = send;

  $$("form[data-form]").forEach(function(f){
    f.addEventListener("submit",function(e){
      e.preventDefault();
      var status = $(".form-status",f), btn = $("button[type=submit]",f);
      var fd = new FormData(f), data = {};
      fd.forEach(function(v,k){ data[k] = data[k] ? data[k] + ", " + v : v; });
      if(data._honey){ return; }
      delete data._honey;
      data.form = f.getAttribute("data-form");
      if(btn){ btn.disabled = true; btn._t = btn.textContent; btn.textContent = "Sending…"; }
      send(data, f.getAttribute("data-subject")).then(function(){
        if(status){ status.className = "form-status ok"; status.textContent = f.getAttribute("data-success") || "Thanks — received. We reply within 1–2 business days."; }
        f.reset(); toast("Sent ✓");
        if(window.gtag) gtag("event","generate_lead",{form:data.form});
      }).catch(function(){
        if(status){ status.className = "form-status err"; status.textContent = "Couldn't send right now. Please try again in a minute."; }
      }).then(function(){ if(btn){ btn.disabled = false; btn.textContent = btn._t; } });
    });
  });

  /* ---------- number decoder ---------- */
  var COUNTRIES = (window.COUNTRIES||[]).slice().sort(function(a,b){ return b.cc.length - a.cc.length; });
  function digitsOnly(s){ return (s||"").replace(/[^\d]/g,""); }
  function analyse(raw){
    var s = (raw||"").trim(); var d = digitsOnly(s);
    if(!d) return null;
    var intl = /^\s*(\+|00)/.test(s); var body = d;
    if(/^\s*00/.test(s)) body = d.slice(2);
    var country = null, national = d;
    if(intl){ for(var i=0;i<COUNTRIES.length;i++){ if(body.indexOf(COUNTRIES[i].cc)===0){ country = COUNTRIES[i]; national = body.slice(country.cc.length); break; } } }
    var prefix = null;
    var natForPrefix = national.replace(/^0/,"");
    (window.PREFIX_083||[]).forEach(function(p){
      if((country && country.cc===p.cc && natForPrefix.indexOf("83")===0) ) prefix = p;
    });
    if(!country && /^083/.test(d)) prefix = {country:"Ireland / South Africa / India (ambiguous)",type:"Mobile or landline",detail:"Without a country code, 083 most often means an Irish (Three) or South African (MTN-range) mobile, or an Indian 083x STD landline.",format:"Add +353, +27 or +91 to disambiguate"};

    // digit stats
    var counts = {}; d.split("").forEach(function(c){ counts[c] = (counts[c]||0)+1; });
    var maxRun = 1, run = 1; for(var j=1;j<d.length;j++){ run = d[j]===d[j-1] ? run+1 : 1; if(run>maxRun) maxRun = run; }
    var unique = Object.keys(counts).length;
    var repeatHalf = d.length%2===0 && d.slice(0,d.length/2)===d.slice(d.length/2);
    var palin = d.length>2 && d===d.split("").reverse().join("");
    var seq = 0; for(var k=1;k<d.length;k++){ if(+d[k]-(+d[k-1])===1) seq++; }
    var lucky = (counts["8"]||0)*2 + (counts["6"]||0) + (counts["9"]||0) - (counts["4"]||0)*2;
    // vanity score 0–100
    var score = 30 + Math.max(0,(10-unique))*5 + (maxRun-1)*7 + (repeatHalf?15:0) + (palin?12:0) + seq*2 + Math.max(-15,Math.min(20,lucky*2));
    score = Math.max(1,Math.min(100,Math.round(score)));
    // numerology
    var sum = d.split("").reduce(function(a,c){return a + (+c)},0), red = sum;
    while(red>9 && red!==11 && red!==22 && red!==33){ red = String(red).split("").reduce(function(a,c){return a+(+c)},0); }
    var patterns = [];
    if(repeatHalf) patterns.push("Mirrored halves (" + d.slice(0,d.length/2) + " · " + d.slice(d.length/2) + ")");
    if(palin) patterns.push("Palindrome");
    if(maxRun>=3) patterns.push(maxRun + "-digit repeat run");
    if(seq>=3) patterns.push("Ascending sequence steps: " + seq);
    if(/8{2,}/.test(d)) patterns.push("Double-8 prosperity cluster");
    if(/4/.test(d)) patterns.push("Contains 4 — often avoided in East Asian markets");
    if(!patterns.length) patterns.push("No strong pattern — a ‘quiet’ number");
    return {raw:s,digits:d,country:country,national:national,prefix:prefix,score:score,sum:sum,root:red,patterns:patterns,unique:unique};
  }
  window.analyseNumber = analyse;

  function renderResult(box,r){
    if(!r){ box.classList.remove("show"); return; }
    var lore = window.DIGIT_LORE||{}, mean = window.NUM_MEANINGS||{};
    var digits = r.digits.split("").slice(0,24).map(function(c){ var l = lore[c]||{}; return '<span class="dg '+(l.tone||"")+'" title="'+(l.zh||"")+' — '+(l.sound||"")+'">'+c+'</span>'; }).join("");
    var where = r.country ? (r.country.n + " (+" + r.country.cc + ")") : (r.prefix ? r.prefix.country : "Not detected — add + and the country code");
    var html = '<div class="result-grid">'
      + '<div class="kv score"><div class="ring" style="--p:'+r.score+'"><span>'+r.score+'</span></div><div><small>Memorability score</small><strong>'+(r.score>=75?"Premium":r.score>=55?"Strong":r.score>=35?"Average":"Low")+'</strong><div class="muted" style="font-size:.85rem">Repeats, symmetry, lucky digits</div></div></div>'
      + '<div class="kv"><small>Country / region</small><strong>'+where+'</strong>'+(r.country?'<div class="muted" style="font-size:.85rem">Exit '+r.country.exit+' · '+r.country.tz+'</div>':'')+'</div>'
      + '<div class="kv"><small>083 prefix match</small><strong>'+(r.prefix? r.prefix.type : "No 083 prefix")+'</strong>'+(r.prefix?'<div class="muted" style="font-size:.85rem">'+r.prefix.detail+'</div>':'')+'</div>'
      + '<div class="kv"><small>Numerology root</small><strong class="mono">'+r.sum+' → '+r.root+'</strong><div class="muted" style="font-size:.85rem">'+(mean[String(r.root)]||"")+'</div></div>'
      + '</div>'
      + '<div class="kv" style="margin-top:12px"><small>Digit-by-digit (hover for Chinese homophone reading)</small><div class="digits-row">'+digits+'</div></div>'
      + '<div class="kv" style="margin-top:12px"><small>Patterns</small><strong>'+r.patterns.join(" · ")+'</strong></div>'
      + '<p class="form-note" style="margin-top:12px">Results are computed in your browser from public numbering rules — we never store or look up personal data about a number’s owner. Got an unwanted call? <a href="scam-safety.html#report">Report it</a> · Want a number like this for your business? <a href="get-quotes.html">Get matched</a>.</p>';
    box.innerHTML = html; box.classList.add("show");
  }
  $$("[data-decoder]").forEach(function(f){
    var input = $("input",f), out = $(f.getAttribute("data-decoder"));
    f.addEventListener("submit",function(e){ e.preventDefault(); renderResult(out, analyse(input.value)); });
    var q = new URLSearchParams(location.search).get("n"); if(q){ input.value = q; renderResult(out, analyse(q)); }
  });
  $$("[data-try]").forEach(function(c){ c.addEventListener("click",function(){
    var f = c.closest(".decoder").querySelector("form"); $("input",f).value = c.getAttribute("data-try"); f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event("submit"));
  }); });

  /* ---------- dialing calculator ---------- */
  var calc = $("#dial-calc");
  if(calc){
    var from = $("#dc-from",calc), to = $("#dc-to",calc), num = $("#dc-num",calc), out = $("#dc-out",calc);
    var list = (window.COUNTRIES||[]);
    var opts = list.map(function(c,i){ return '<option value="'+i+'">'+c.n+' (+'+c.cc+')</option>'; }).join("");
    from.innerHTML = opts; to.innerHTML = opts;
    from.value = list.findIndex(function(c){return c.iso==="US"}); to.value = list.findIndex(function(c){return c.iso==="IE"});
    function run(){
      var a = list[from.value], b = list[to.value], n = digitsOnly(num.value);
      if(b.trunk && n.indexOf(b.trunk)===0 && a!==b) n = n.slice(b.trunk.length);
      var steps;
      if(a===b){ steps = "Same country — dial the number as written: " + (digitsOnly(num.value)||"…"); }
      else { steps = '<span class="mono" style="font-size:1.5rem;color:var(--amber)">'+a.exit+' '+b.cc+' '+(n||"…")+'</span><br><span class="muted">Exit code '+a.exit+' (from '+a.n+') → country code '+b.cc+' ('+b.n+')'+(b.trunk?' → drop the leading '+b.trunk:'')+'. On a mobile you can simply dial <b class="mono">+'+b.cc+' '+(n||"…")+'</b>.</span>'; }
      out.innerHTML = steps;
    }
    [from,to,num].forEach(function(el){ el.addEventListener("input",run); el.addEventListener("change",run); });
    num.value = "083 123 4567"; run();
  }

  /* ---------- country table ---------- */
  var tbl = $("#cc-table");
  if(tbl){
    var body = $("tbody",tbl), filter = $("#cc-filter"), data = (window.COUNTRIES||[]).slice(), sortKey = "n", asc = true;
    function draw(){
      var q = (filter && filter.value || "").toLowerCase().replace("+","");
      var rows = data.filter(function(c){ return !q || c.n.toLowerCase().indexOf(q)>-1 || c.cc.indexOf(q)===0 || c.iso.toLowerCase()===q; })
        .sort(function(a,b){ var x=a[sortKey],y=b[sortKey]; if(sortKey==="cc"){x=+x;y=+y;} return (x>y?1:x<y?-1:0)*(asc?1:-1); });
      body.innerHTML = rows.map(function(c){ return '<tr><td>'+c.n+'</td><td class="mono">'+c.iso+'</td><td class="mono">+'+c.cc+'</td><td class="mono">'+c.exit+'</td><td class="mono">'+(c.trunk||"—")+'</td><td>'+c.tz+'</td></tr>'; }).join("") || '<tr><td colspan="6">No match</td></tr>';
    }
    $$("th[data-k]",tbl).forEach(function(th){ th.addEventListener("click",function(){ var k = th.getAttribute("data-k"); asc = sortKey===k ? !asc : true; sortKey = k; draw(); }); });
    if(filter) filter.addEventListener("input",draw);
    draw();
  }

  /* ---------- quote wizard (lead gen) ---------- */
  var wiz = $("#quote-wizard");
  if(wiz){
    var steps = $$(".step",wiz), bar = $(".progress i",wiz), back = $("[data-back]",wiz), answers = {}, cur = 0;
    function show(i){ cur = i; steps.forEach(function(s,j){ s.classList.toggle("active",j===i); }); bar.style.width = Math.round((i+1)/steps.length*100)+"%"; back.style.visibility = i>0 && i<steps.length-1 ? "visible":"hidden"; var f = $("input,select,button",steps[i]); }
    $$(".opt[data-q]",wiz).forEach(function(o){ o.addEventListener("click",function(){
      var q = o.getAttribute("data-q");
      if(o.hasAttribute("data-multi")){ o.classList.toggle("sel"); answers[q] = $$('.opt.sel[data-q="'+q+'"]',wiz).map(function(x){return x.getAttribute("data-v")}).join(", "); return; }
      $$('.opt[data-q="'+q+'"]',wiz).forEach(function(x){x.classList.remove("sel")}); o.classList.add("sel");
      answers[q] = o.getAttribute("data-v"); setTimeout(function(){ show(cur+1); },160);
    }); });
    $$("[data-next]",wiz).forEach(function(b){ b.addEventListener("click",function(){
      var inp = $$("input[required],select[required]",steps[cur]).filter(function(x){return !x.value});
      if(inp.length){ inp[0].focus(); toast("Please complete this step"); return; }
      $$("input,select",steps[cur]).forEach(function(x){ if(x.name) answers[x.name] = x.value; });
      show(cur+1);
    }); });
    back.addEventListener("click",function(){ if(cur>0) show(cur-1); });
    var lf = $("form",wiz);
    lf.addEventListener("submit",function(e){
      e.preventDefault();
      if($('[name="_honey"]',lf).value) return;
      var data = Object.assign({}, answers); new FormData(lf).forEach(function(v,k){ if(k!=="_honey") data[k]=v; });
      data.form = "business-phone-quote";
      var btn = $("button[type=submit]",lf); btn.disabled = true; btn.textContent = "Matching…";
      send(data,"🔥 New quote lead — 083083.com ("+(answers.users||"")+" users)").then(function(){
        show(steps.length-1); renderPartners(); wiz.scrollIntoView({block:"start"});
        if(window.gtag) gtag("event","generate_lead",{form:"quote"});
      }).catch(function(){ toast("Couldn't send — please retry"); }).then(function(){ btn.disabled=false; btn.textContent="Get my free quotes →"; });
    });
    function renderPartners(){
      var box = $("#partner-results"); if(!box) return;
      box.innerHTML = (C.partners||[]).map(function(p){ return '<div class="card"><span class="tag">'+p.tag+'</span><h3>'+p.name+'</h3>'+(p.url?'<a class="btn btn-mint btn-sm" target="_blank" rel="sponsored noopener" href="'+p.url+'">Visit site →</a>':'<span class="muted">A specialist will email you options within 1 business day.</span>')+'</div>'; }).join("");
    }
    show(0);
  }

  /* ---------- donations ---------- */
  var tiersBox = $("#tiers");
  if(tiersBox){
    var amount = $("#don-amount");
    $$(".tier",tiersBox).forEach(function(t){ t.addEventListener("click",function(){
      $$(".tier",tiersBox).forEach(function(x){x.classList.remove("sel")}); t.classList.add("sel");
      if(amount) amount.value = t.getAttribute("data-amt");
    }); });
    var P = C.payments||{};
    $$("[data-pay]").forEach(function(b){
      var url = P[b.getAttribute("data-pay")];
      if(url){ b.setAttribute("href",url); b.setAttribute("target","_blank"); b.setAttribute("rel","noopener"); }
      else { b.setAttribute("href","#pledge"); b.addEventListener("click",function(){ toast("Online checkout opening soon — leave a pledge below"); }); }
    });
  }

  /* ---------- YouTube (lite embeds) ---------- */
  var vg = $("#video-grid");
  if(vg){
    var Y = C.youtube||{}, vids = Y.videos||[];
    if(!vids.length){ vg.innerHTML = '<div class="card"><h3>New videos are on the way</h3><p class="muted">Short explainers on scam calls, dialing codes and number lore. Subscribe so you don’t miss the first drop.</p><a class="btn btn-primary btn-sm" target="_blank" rel="noopener" href="'+(Y.channelUrl||"#")+'">Watch on YouTube →</a></div>'; }
    else vg.innerHTML = vids.map(function(v){ return '<figure style="margin:0"><div class="video" data-yt="'+v.id+'" role="button" tabindex="0" aria-label="Play: '+v.title+'"><img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg"><div class="play"><span>▶</span></div></div><figcaption style="margin-top:8px;font-weight:600">'+v.title+'</figcaption></figure>'; }).join("");
    vg.addEventListener("click",function(e){ var v = e.target.closest("[data-yt]"); if(!v) return;
      v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/'+v.getAttribute("data-yt")+'?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="YouTube video"></iframe>'; });
  }

  /* ---------- share ---------- */
  $$("[data-share]").forEach(function(b){ b.addEventListener("click",function(){
    var d = {title:document.title,url:location.href};
    if(navigator.share) navigator.share(d).catch(function(){}); else { navigator.clipboard && navigator.clipboard.writeText(location.href); toast("Link copied"); }
  }); });

  /* ---------- newsletter counter flourish ---------- */
  $$("[data-count]").forEach(function(el){
    var end = +el.getAttribute("data-count"), t0 = null;
    function step(ts){ if(!t0) t0 = ts; var p = Math.min(1,(ts-t0)/1200); el.textContent = Math.round(end*p).toLocaleString(); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  });
})();

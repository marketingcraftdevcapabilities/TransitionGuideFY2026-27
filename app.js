// ============================================================
//  RENDER ENGINE — builds the page from DATA (see data.js)
//  You should not need to edit this file for content changes.
// ============================================================
(function(){
  "use strict";

  var SLABEL = { go:'Continue', stop:'Stop', tbd:'TBD', done:'Completed' };
  var CLABEL = { partner:'Partners', vendor:'Vendors', tool:'Tools' };
  var BADGE  = { go:'go', stop:'stop', tbd:'tbd', done:'done' };

  function el(id){ return document.getElementById(id); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  // Force every data link to open in a new tab.
  function fixLinks(html){ return String(html||'').replace(/<a /g, '<a target="_blank" rel="noopener" '); }
  function money(n){ return n >= 10000 ? '$' + Math.round(n/1000) + 'K' : '$' + Number(n).toLocaleString('en-US'); }
  function plural(n, w){ return n + ' ' + w + (n === 1 ? '' : 's'); }

  // Today's date, computed fresh on every page load — never stale.
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var NOW = new Date();
  function todayLong(){ return MONTHS[NOW.getMonth()] + ' ' + NOW.getDate() + ', ' + NOW.getFullYear(); }
  function todayShort(){ return MONTHS[NOW.getMonth()] + ' ' + NOW.getDate(); }
  function todaySortKey(){
    var m = NOW.getMonth()+1, d = NOW.getDate();
    return '' + NOW.getFullYear() + (m<10?'0':'') + m + (d<10?'0':'') + d;
  }
  // Resolve a date field that may be the literal "auto".
  function resolveDate(v){ return (!v || v === 'auto') ? todayLong() : v; }
  // Parse a "YYYYMMDD" sortKey into a Date (local midnight).
  function parseKey(k){
    if(!k || k.length !== 8) return null;
    return new Date(+k.slice(0,4), +k.slice(4,6)-1, +k.slice(6,8));
  }
  // Whole days between today and a sortKey date. Returns a label like
  // "46 days", "today", or "closed" (past).
  function daysFromToday(k){
    var d = parseKey(k); if(!d) return '';
    var t = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
    var diff = Math.round((d - t) / 86400000);
    if(diff < 0)  return 'closed';
    if(diff === 0) return 'today';
    return diff + (diff === 1 ? ' day' : ' days');
  }

  function badge(status){
    return '<span class="badge '+BADGE[status]+'"><span class="d"></span>'+SLABEL[status]+'</span>';
  }
  function linkChip(l){
    var cls = 'lnk' + (l.type==='po'?' po':l.type==='slack'?' slack':'');
    return '<a class="'+cls+'" target="_blank" rel="noopener" href="'+esc(l.url)+'">'+esc(l.label)+'</a>';
  }
  function resBlock(links, label){
    if(!links || !links.length) return '';
    return '<div class="res"><span class="rlbl">'+(label||'Resources')+'</span>'+links.map(linkChip).join('')+'</div>';
  }
  function contactLine(c){
    var bits = ['<span class="nm">'+esc(c.name)+'</span>'];
    if(c.role)  bits.push('<span class="role">'+esc(c.role)+'</span>');
    if(c.phone) bits.push(esc(c.phone));
    if(c.email) bits.push('<a href="mailto:'+esc(c.email)+'">'+esc(c.email)+'</a>');
    return bits.join(' · ');
  }

  /* ---------- Header / hero / strips ---------- */
  function renderHeader(){
    var m = DATA.meta;
    el('h-team').textContent = m.team;
    el('h-pill').style.display = m.confidential ? '' : 'none';
    el('h-meta').innerHTML =
      '<span>Prepared by <b>'+esc(m.preparedBy)+'</b> on behalf of <b>'+esc(m.onBehalfOf)+'</b></span>'+
      '<span>For: <b>'+esc(m.preparedFor)+'</b></span>'+
      '<span>Prepared <b>'+esc(m.preparedDate)+'</b> · Updated <b>'+esc(resolveDate(m.updatedDate))+'</b></span>';
    document.title = m.title + ' · ' + m.team;

    // Fill the {{tokens}} in the headline from the live matrix so the
    // 1-minute read can never drift from the KPI cards.
    var hc = { stop:0, tbd:0, go:0, done:0 };
    DATA.matrix.forEach(function(r){ hc[r.status]++; });
    var hRecover = DATA.matrix.filter(function(r){ return r.status==='stop' && r.budget; })
                              .reduce(function(a,r){ return a + r.budget; }, 0);
    // Days until the Jul 31, 2026 cliff, computed from today — evergreen.
    var cliffDays = daysFromToday('20260731');
    var cliffPhrase = (cliffDays === 'closed') ? 'now past' :
                      (cliffDays === 'today')  ? 'due today' : (cliffDays + ' out');
    function fillTokens(str){
      return str
        .replace('{{count}}',     DATA.matrix.length)
        .replace('{{tbd}}',       hc.tbd)
        .replace('{{stop}}',      hc.stop)
        .replace('{{go}}',        hc.go)
        .replace('{{done}}',      hc.done)
        .replace('{{recover}}',   money(hRecover))
        .replace('{{cliffdays}}', cliffPhrase);
    }
    el('hero-text').innerHTML = fillTokens(DATA.summary.headline);

    // Prominent vertical key-resources card.
    var rs = el('resource-list');
    if(rs){
      rs.innerHTML = DATA.summary.resources.map(function(r){
        return '<a class="reso-link" target="_blank" rel="noopener" href="'+esc(r.url)+'">'+
          '<span class="ri">↗</span><span class="rt">'+esc(r.label)+'</span>'+
          '<span class="rarrow">›</span></a>';
      }).join('');
    }

    el('strat-strip').innerHTML = DATA.summary.strategicDirections.map(function(s){
      return '<div class="sc"><div class="t">'+esc(s.title)+'</div><div class="d">'+esc(s.desc)+'</div></div>';
    }).join('');
    el('open-action').innerHTML = '<b>Open action across the board:</b> ' + esc(DATA.summary.openAction);

    el('insights').innerHTML = DATA.summary.insights.map(function(i){
      return '<div class="callout '+i.status+'"><b>'+fillTokens(esc(i.title))+'</b> '+fixLinks(i.body)+'</div>';
    }).join('');

    el('footer-text').innerHTML =
      '<b>'+esc(m.team)+'</b> — '+esc(m.title)+' · Confidential — Internal · Prepared '+esc(m.preparedDate)+' · Source last updated '+esc(resolveDate(m.updatedDate))+'.<br>'+
      'Mirrors the Transition Guide source document with all original links preserved. Prepared by '+esc(m.preparedBy)+' on behalf of '+esc(m.onBehalfOf)+' for the '+esc(m.preparedFor)+'.';
  }

  /* ---------- KPIs (computed) ---------- */
  function renderKPIs(){
    var rows = DATA.matrix, n = rows.length;
    var cnt = { stop:0, tbd:0, go:0, done:0 };
    rows.forEach(function(r){ cnt[r.status]++; });
    var stopRecover = rows.filter(function(r){ return r.status==='stop' && r.budget; })
                          .reduce(function(a,r){ return a + r.budget; }, 0);
    var owned = DATA.workstreams.filter(function(w){ return w.owner && !/TBD/i.test(w.owner.name) && !w.owner.departed; }).length;
    var streams = DATA.workstreams.length;
    function pct(c){ return (c/n*100).toFixed(1); }

    el('kpi-grid').innerHTML =
      '<div class="kpi"><div class="label">Decision items</div><div class="num">'+n+'</div>'+
        '<div class="sub">Partners, vendors &amp; tools under review</div>'+
        '<div class="ministack" title="'+cnt.stop+' Stop · '+cnt.tbd+' TBD · '+cnt.go+' Continue · '+cnt.done+' Completed">'+
          '<i style="width:'+pct(cnt.stop)+'%;background:var(--stop)"></i>'+
          '<i style="width:'+pct(cnt.tbd)+'%;background:var(--tbd)"></i>'+
          '<i style="width:'+pct(cnt.go)+'%;background:var(--go)"></i>'+
          '<i style="width:'+pct(cnt.done)+'%;background:var(--done)"></i></div></div>'+
      '<div class="kpi"><div class="label">Decisions pending</div><div class="num">'+cnt.tbd+'</div>'+
        '<div class="sub">Items marked TBD after transition</div><div class="chip">'+(cnt.tbd>=n/2?'half of the matrix':'open decisions')+'</div></div>'+
      '<div class="kpi"><div class="label">Annual spend to wind down</div><div class="num small">'+money(stopRecover)+'</div>'+
        '<div class="sub">Stop-status non-renewals</div><div class="chip">recoverable now</div></div>'+
      '<div class="kpi"><div class="label">Workstreams with an owner</div><div class="num">'+owned+'<span style="font-size:.55em;color:var(--muted)"> / '+streams+'</span></div>'+
        '<div class="sub">RTB workstreams assigned</div><div class="chip">ownership = critical path</div></div>';
  }

  /* ---------- Donut + legend (computed) ---------- */
  // Renders into donutId + legendId; both the Overview and Decisions tabs use it.
  function renderDonut(donutId, legendId){
    var donutEl = el(donutId), legendEl = el(legendId);
    if(!donutEl || !legendEl) return;
    var rows = DATA.matrix, n = rows.length;
    var order = ['stop','tbd','go','done'];
    var color = { stop:'#FF5C37', tbd:'#F9C741', go:'#3BD85E', done:'#236CFF' };
    var cnt = { stop:0, tbd:0, go:0, done:0 };
    rows.forEach(function(r){ cnt[r.status]++; });
    var C = 2 * Math.PI * 80; // circumference, r=80
    var offset = 0, segs = '';
    order.forEach(function(s){
      var frac = cnt[s] / n;
      var len = (C * frac).toFixed(1);
      var gap = (C - len).toFixed(1);
      segs += '<circle class="seg" data-status="'+s+'" cx="110" cy="110" r="80" stroke="'+color[s]+'" stroke-dasharray="'+len+' '+gap+'" stroke-dashoffset="'+(-offset).toFixed(1)+'"></circle>';
      offset += parseFloat(len);
    });
    donutEl.innerHTML =
      '<svg viewBox="0 0 220 220" role="img" aria-label="Disposition donut">'+
        '<circle cx="110" cy="110" r="80" fill="none" stroke="#EDF1F6" stroke-width="28"></circle>'+
        '<g transform="rotate(-90 110 110)" fill="none" stroke-width="28">'+segs+'</g>'+
        '<text class="donut-center" x="110" y="104" text-anchor="middle" font-size="40">'+n+'</text>'+
        '<text x="110" y="128" text-anchor="middle" font-size="13" fill="#647389" font-weight="600">items</text>'+
      '</svg>';

    legendEl.innerHTML = order.map(function(s){
      return '<div class="row" data-status="'+s+'"><span class="sw '+s+'"></span>'+
        '<span class="nm">'+SLABEL[s]+(s==='tbd'?' after transition':'')+'</span>'+
        '<span class="ct">'+cnt[s]+'</span><span class="pc">'+Math.round(cnt[s]/n*100)+'%</span></div>';
    }).join('');
  }

  /* ---------- Cross-tab (computed) ---------- */
  function renderXtab(){
    var cats = ['partner','vendor','tool'];
    var stats = ['stop','tbd','go','done'];
    var grid = {}, colTot = { stop:0, tbd:0, go:0, done:0 }, grand = 0;
    cats.forEach(function(c){ grid[c] = { stop:0, tbd:0, go:0, done:0 }; });
    DATA.matrix.forEach(function(r){ if(grid[r.cat]){ grid[r.cat][r.status]++; } });
    cats.forEach(function(c){ stats.forEach(function(s){ colTot[s]+=grid[c][s]; grand+=grid[c][s]; }); });
    var max = 1;
    cats.forEach(function(c){ stats.forEach(function(s){ if(grid[c][s]>max) max=grid[c][s]; }); });
    var COLOR = { stop:'var(--stop)', tbd:'var(--tbd)', go:'var(--go)', done:'var(--done)' };
    var CC    = { stop:'stopc', tbd:'tbdc', go:'goc', done:'donec' };

    var html = '<thead><tr><th class="rowh"></th><th>Stop</th><th>TBD</th><th>Continue</th><th>Done</th><th class="tot">All</th></tr></thead><tbody>';
    cats.forEach(function(c){
      var rowTot = stats.reduce(function(a,s){ return a+grid[c][s]; }, 0);
      html += '<tr><td class="rl">'+CLABEL[c].replace(/s$/,'')+'</td>';
      stats.forEach(function(s){
        var v = grid[c][s];
        if(v===0){ html += '<td><button class="xcell zero" disabled><span class="c">0</span><span class="mb"></span></button></td>'; }
        else { html += '<td><button class="xcell '+CC[s]+'" data-cat="'+c+'" data-status="'+s+'"><span class="c">'+v+'</span><span class="mb" style="width:'+Math.round(v/max*100)+'%;background:'+COLOR[s]+'"></span></button></td>'; }
      });
      html += '<td><button class="xcell totc" data-cat="'+c+'" data-status="all"><span class="c">'+rowTot+'</span></button></td></tr>';
    });
    html += '<tr class="totrow"><td class="rl tot">All</td>';
    stats.forEach(function(s){ html += '<td><button class="xcell totc" data-cat="all" data-status="'+s+'"><span class="c">'+colTot[s]+'</span></button></td>'; });
    html += '<td><button class="xcell totc corner" data-cat="all" data-status="all"><span class="c">'+grand+'</span></button></td></tr></tbody>';
    el('xtab').innerHTML = html;
  }

  /* ---------- Timeline ---------- */
  var DUELABEL = {};
  function renderTimeline(trackId){
    var track = el(trackId);
    if(!track) return;
    var colorFor = function(item){
      if(/stop/i.test(item)) return ['var(--stop)','var(--stop-text)'];
      if(/renew|continue|completed/i.test(item)) return ['var(--go)','var(--go-text)'];
      if(/completed/i.test(item)) return ['var(--done)','var(--done-text)'];
      return ['var(--tbd)','var(--tbd-text)'];
    };
    DATA.timeline.forEach(function(stop){
      // The "now" marker uses live values so it always reads today's date.
      var dateText = stop.date === 'TODAY' ? (todayShort() + ' · Today') : stop.date;
      var sortKey  = stop.sortKey === 'TODAY' ? todaySortKey() : stop.sortKey;
      // Visual state: keep the authored label for now/cliff/soon, but if a dated
      // stop has already passed, fall back to the muted "past" styling.
      var label = stop.label;
      if(label !== 'now' && daysFromToday(sortKey) === 'closed') label = 'past';
      var cls = 'tl-stop' + (label ? ' '+label : '');
      var items = (stop.items||[]).map(function(it){
        var c = colorFor(it);
        if(/completed/i.test(it)) c = ['var(--done)','var(--done-text)'];
        return '<span class="tl-chip" style="border-color:'+c[0]+';color:'+c[1]+'"><span class="d" style="background:'+c[0]+'"></span>'+esc(it)+'</span>';
      }).join('');
      // Day-count is computed from today so it never goes stale. A stop in the
      // past reads "closed"; the now-marker reads "now"; future stops show
      // "N days" counting from today.
      var days;
      if(stop.label === 'now'){ days = 'now'; }
      else { days = daysFromToday(sortKey); }
      var div = document.createElement('div');
      div.className = cls;
      div.innerHTML = '<div class="tl-items">'+items+'</div><span class="tl-dot"></span>'+
        '<span class="tl-date">'+esc(dateText)+'</span><span class="tl-meta">'+esc(stop.meta||'')+'</span>'+
        (days ? '<span class="tl-days">'+esc(days)+'</span>' : '');
      track.appendChild(div);
      // map short date label -> due sortKey for click-filtering
      var shortLabel = dateText.split('·')[0].trim();
      if(sortKey) DUELABEL[sortKey] = shortLabel;
    });
  }

  /* ---------- Decision matrix table ---------- */
  function renderMatrix(){
    var body = el('matrix-body');
    DATA.matrix.forEach(function(r){
      var tr = document.createElement('tr');
      tr.setAttribute('data-status', r.status);
      tr.setAttribute('data-cat', r.cat);
      var budgetCell = r.budget != null
        ? '<td class="num" data-sort="'+r.budget+'">'+(r.budget>=10000?money(r.budget):'$'+r.budget.toLocaleString('en-US'))+'</td>'
        : '<td class="num" data-sort="-1">TBD</td>';
      var dueCell = r.due
        ? '<td class="num" data-sort="'+r.due+'">'+esc(DUEFMT(r.due))+'</td>'
        : '<td class="num" data-sort="99999999">TBD</td>';
      tr.innerHTML =
        '<td><span class="item-nm">'+esc(r.item)+'</span></td>'+
        '<td><span class="badge cat">'+CLABEL[r.cat].replace(/s$/,'')+'</span></td>'+
        '<td>'+badge(r.status)+'</td>'+
        budgetCell + dueCell +
        '<td>'+fixLinks(r.action)+'</td>';
      body.appendChild(tr);
    });
    var empty = document.createElement('tr');
    empty.className = 'empty-row'; empty.id = 'matrix-empty'; empty.style.display = 'none';
    empty.innerHTML = '<td colspan="6">No items match these filters.</td>';
    body.appendChild(empty);
  }
  function DUEFMT(due){
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var y = due.slice(0,4), m = parseInt(due.slice(4,6),10), d = parseInt(due.slice(6,8),10);
    return months[m-1] + ' ' + d + ', ' + y;
  }

  /* ---------- Partners cards ---------- */
  function renderPartners(){
    el('partners-grid').innerHTML = DATA.partners.map(function(p){
      var facts = Object.keys(p.facts).map(function(k){
        return '<div class="fact"><span class="k">'+esc(k)+'</span><span class="v">'+esc(p.facts[k])+'</span></div>';
      }).join('');
      var contacts = p.contacts.map(contactLine).join('<br>');
      return '<div class="ecard"><div class="top '+p.status+'"></div><div class="body">'+
        '<div class="ehead"><div><h4>'+esc(p.name)+'</h4><div class="etype">'+esc(p.type)+'</div></div>'+badge(p.status)+'</div>'+
        '<div class="facts">'+facts+'</div>'+
        '<div class="contact">'+contacts+'</div>'+
        '<div class="rec">'+fixLinks(p.rec)+'</div>'+
        resBlock(p.links)+
      '</div></div>';
    }).join('');
  }

  /* ---------- Vendors table ---------- */
  function renderVendors(){
    el('vendor-body').innerHTML = DATA.vendors.map(function(v){
      var sub = v.subtitle ? '<div style="color:var(--muted);font-size:12px">'+esc(v.subtitle)+'</div>' : '';
      var contacts = v.contacts.map(contactLine).join('<br>');
      var res = v.links && v.links.length ? '<div class="res" style="margin-top:0">'+v.links.map(linkChip).join('')+'</div>' : '';
      return '<tr>'+
        '<td><span class="item-nm">'+esc(v.name)+'</span>'+sub+'</td>'+
        '<td>'+badge(v.status)+'</td>'+
        '<td class="num" data-sort="'+(v.poSort||0)+'">'+esc(v.poValue)+'</td>'+
        '<td>'+esc(v.workstream)+'</td>'+
        '<td>'+contacts+'</td>'+
        '<td>'+esc(v.nextStep)+'</td>'+
        '<td>'+res+'</td>'+
      '</tr>';
    }).join('');
  }

  /* ---------- Tools table ---------- */
  function renderTools(){
    var srt = { stop:1, tbd:2, go:3 };
    el('tools-body').innerHTML = DATA.tools.map(function(t){
      var res = t.links && t.links.length ? ' <span class="res" style="margin-top:6px">'+t.links.map(linkChip).join('')+'</span>' : '';
      return '<tr data-tg="'+t.status+'">'+
        '<td><span class="item-nm">'+esc(t.name)+'</span></td>'+
        '<td data-sort="'+(srt[t.status]||9)+'">'+badge(t.status)+'</td>'+
        '<td>'+esc(t.poc)+'</td>'+
        '<td>'+esc(t.use)+'</td>'+
        '<td>'+esc(t.nextStep)+res+'</td>'+
      '</tr>';
    }).join('') + '<tr class="empty-row" id="tools-empty" style="display:none"><td colspan="5">No tools match.</td></tr>';
  }

  /* ---------- Workstreams ---------- */
  function renderStreams(){
    el('streams-grid').innerHTML = DATA.workstreams.map(function(w){
      var flag = w.owner.departed
        ? '<span class="owner-flag departed">Prior: '+esc(w.owner.name)+'</span>'
        : '<span class="owner-flag">Owner: '+esc(w.owner.name)+'</span>';
      return '<div class="ecard"><div class="top '+w.status+'"></div><div class="body">'+
        '<div class="ehead"><div><h4>'+esc(w.name)+'</h4><div class="etype">'+esc(w.type)+'</div></div>'+badge(w.status)+'</div>'+
        '<div style="margin-top:14px">'+flag+'</div>'+
        '<div class="rec">'+fixLinks(w.rec)+'</div>'+
        resBlock(w.links)+
      '</div></div>';
    }).join('');
  }

  /* ---------- Dashboards + people ---------- */
  function renderDash(){
    el('dash-body').innerHTML = DATA.dashboards.map(function(d){
      var detail = d.url
        ? '<a class="lnk" target="_blank" rel="noopener" href="'+esc(d.url)+'">'+esc(d.detail||'Open')+'</a>'
        : '<span class="num">'+esc(d.detail||'')+'</span>';
      return '<tr><td><span class="item-nm">'+esc(d.name)+'</span></td><td>'+badge(d.status)+'</td>'+
        '<td>'+detail+'</td><td>'+fixLinks(d.action)+'</td><td>'+esc(d.notes)+'</td></tr>';
    }).join('');

    el('people-grid').innerHTML = DATA.people.map(function(g){
      var entries = g.entries.map(function(e, i){
        var nameHtml = e.email ? '<a href="mailto:'+esc(e.email)+'">'+esc(e.name)+'</a>' : esc(e.name);
        if(i===0) return '<div class="pn">'+nameHtml+'</div><div class="pd">'+esc(e.detail)+'</div>';
        return '<div class="pd"><b style="color:var(--ink)">'+nameHtml+'</b> — '+esc(e.detail)+'</div>';
      }).join('');
      return '<div class="pbox"><div class="ph">'+esc(g.group)+'</div>'+entries+'</div>';
    }).join('');
  }

  /* ============================================================
     INTERACTIVITY (tabs, sort, filter, drawers, planner)
  ============================================================ */
  function wireTabs(){
    var tabs = [].slice.call(document.querySelectorAll('.tab'));
    var panels = [].slice.call(document.querySelectorAll('.panel'));
    var valid = tabs.map(function(t){ return t.getAttribute('data-tab'); });
    function activate(id, focus, push){
      if(valid.indexOf(id) < 0) id = 'summary';
      tabs.forEach(function(t){
        var on = t.getAttribute('data-tab') === id;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        if(on && focus) t.focus();
      });
      panels.forEach(function(p){ p.classList.toggle('active', p.id === id); });
      if(push && history.replaceState){ history.replaceState(null,'','#'+id); }
    }
    tabs.forEach(function(tab, i){
      tab.addEventListener('click', function(){ activate(tab.getAttribute('data-tab'), false, true); });
      tab.addEventListener('keydown', function(e){
        var idx = i;
        if(e.key==='ArrowRight'||e.key==='ArrowDown'){ idx=(i+1)%tabs.length; e.preventDefault(); }
        else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){ idx=(i-1+tabs.length)%tabs.length; e.preventDefault(); }
        else if(e.key==='Home'){ idx=0; e.preventDefault(); }
        else if(e.key==='End'){ idx=tabs.length-1; e.preventDefault(); }
        else return;
        activate(tabs[idx].getAttribute('data-tab'), true, true);
      });
    });
    if(location.hash){ activate(location.hash.slice(1), false, false); }
    window._activateTab = activate;
  }

  function wireSort(){
    function cellVal(td){
      if(!td) return '';
      var ds = td.getAttribute('data-sort');
      if(ds !== null){ var n = parseFloat(ds); return isNaN(n) ? ds.toLowerCase() : n; }
      return td.textContent.trim().toLowerCase();
    }
    [].slice.call(document.querySelectorAll('table.sortable')).forEach(function(table){
      var heads = [].slice.call(table.querySelectorAll('th.th-sort'));
      heads.forEach(function(th){
        th.addEventListener('click', function(){
          var tbody = table.querySelector('tbody');
          if(table.id==='matrix-table') closeAllDrawers();
          var rows = [].slice.call(tbody.querySelectorAll('tr')).filter(function(r){ return !r.classList.contains('empty-row') && !r.classList.contains('mdetail'); });
          var dir = th.classList.contains('asc') ? 'desc' : 'asc';
          heads.forEach(function(h){ h.classList.remove('asc','desc'); });
          th.classList.add(dir);
          var idx = [].indexOf.call(th.parentNode.children, th);
          rows.sort(function(a,b){
            var av = cellVal(a.children[idx]), bv = cellVal(b.children[idx]);
            if(av < bv) return dir==='asc' ? -1 : 1;
            if(av > bv) return dir==='asc' ? 1 : -1;
            return 0;
          });
          rows.forEach(function(r){ tbody.appendChild(r); });
        });
      });
    });
  }

  /* ----- matrix filters + drawers + analytics ----- */
  var mRows, mEmpty, mCount, mSearch, mReset;
  var mState = { status:'all', cat:'all', q:'', due:null };
  var ITEM = {}; // item name -> {type, lookupName}

  function buildItemIndex(){
    DATA.matrix.forEach(function(r){
      var lookup = r.item;
      if(r.cat === 'partner'){
        var p = DATA.partners.filter(function(x){ return x.name===r.item || x.name.indexOf(r.item)===0; })[0];
        if(p) lookup = p.name;
        else { // map shorthand (e.g. "MTM")
          p = DATA.partners.filter(function(x){ return x.name.indexOf(r.item)>=0; })[0];
          if(p) lookup = p.name;
        }
        ITEM[r.item] = { type:'partner', name:lookup };
      } else if(r.cat === 'vendor'){
        var v = DATA.vendors.filter(function(x){ return x.name.indexOf(r.item.split(' · ')[0])>=0 || r.item.indexOf(x.name)>=0; })[0];
        ITEM[r.item] = { type:'vendor', name: v ? v.name : r.item };
      } else {
        var t = DATA.tools.filter(function(x){ return x.name===r.item || x.name.indexOf(r.item)===0 || r.item.indexOf(x.name)>=0; })[0];
        ITEM[r.item] = { type:'tool', name: t ? t.name : r.item };
      }
    });
  }

  function rowName(r){ var n = r.children[0].querySelector('.item-nm'); return n ? n.textContent.trim() : ''; }
  function setTxt(id, v){ var e = el(id); if(e) e.textContent = v; }

  function syncChips(){
    document.querySelectorAll('.chipbtn[data-fg="status"]').forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-val')===mState.status); });
    document.querySelectorAll('.chipbtn[data-fg="cat"]').forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-val')===mState.cat); });
  }

  function refreshStrip(){
    var inView = 0, value = 0, tbd = 0, cliff = 0;
    mRows.forEach(function(r){
      if(r.style.display === 'none') return;
      inView++;
      var b = parseFloat(r.children[3].getAttribute('data-sort')); if(!isNaN(b) && b > 0) value += b;
      if(r.getAttribute('data-status') === 'tbd') tbd++;
      // "Cliff" = anything still open and due between today and the Jul 31 deadline.
      var d = parseInt(r.children[4].getAttribute('data-sort'), 10);
      var todayKey = parseInt(todaySortKey(), 10);
      if(!isNaN(d) && d >= todayKey && d <= 20260731) cliff++;
    });
    setTxt('ms-count', inView);
    setTxt('ms-count-s', 'of ' + mRows.length + ' items');
    setTxt('ms-value', money(value));
    setTxt('ms-tbd', tbd);
    setTxt('ms-cliff', cliff);
    var parts = [];
    if(mState.status !== 'all') parts.push(SLABEL[mState.status] || mState.status);
    if(mState.cat !== 'all')    parts.push(CLABEL[mState.cat] || mState.cat);
    if(mState.due)              parts.push('due ' + (DUELABEL[mState.due] || mState.due));
    if(mState.q)                parts.push('matching “' + mState.q + '”');
    setTxt('ms-ctx', parts.length ? ('Filtered to ' + parts.join(' · ') + ' — ' + inView + ' of ' + mRows.length) : ('Showing all ' + mRows.length + ' items'));
    if(mReset) mReset.hidden = (parts.length === 0);
  }

  function buildDrawer(name){
    var wrap = document.createElement('div');
    wrap.className = 'mdetail-inner';
    var info = ITEM[name];
    if(!info) return wrap;
    if(info.type === 'partner'){
      var p = DATA.partners.filter(function(x){ return x.name === info.name; })[0];
      if(p){
        var c = document.createElement('div'); c.className='contact'; c.innerHTML = p.contacts.map(contactLine).join('<br>');
        var rec = document.createElement('div'); rec.className='rec'; rec.innerHTML = fixLinks(p.rec);
        wrap.appendChild(c); wrap.appendChild(rec);
        if(p.links && p.links.length){ var rb = document.createElement('div'); rb.innerHTML = resBlock(p.links); wrap.appendChild(rb.firstChild); }
      }
    } else if(info.type === 'vendor'){
      var v = DATA.vendors.filter(function(x){ return x.name === info.name; })[0];
      if(v){
        wrap.innerHTML =
          '<div class="contact">'+v.contacts.map(contactLine).join('<br>')+'</div>'+
          '<div class="rec"><b>Workstream:</b> '+esc(v.workstream)+'</div>'+
          '<div class="rec"><b>Next step:</b> '+esc(v.nextStep)+'</div>'+
          resBlock(v.links);
      }
    } else {
      var t = DATA.tools.filter(function(x){ return x.name === info.name; })[0];
      if(t){
        wrap.innerHTML =
          '<div class="rec"><b>POC:</b> '+esc(t.poc)+'</div>'+
          '<div class="rec"><b>Use &amp; access:</b> '+esc(t.use)+'</div>'+
          '<div class="rec"><b>Next step:</b> '+esc(t.nextStep)+'</div>'+
          resBlock(t.links);
      }
    }
    return wrap;
  }

  function closeAllDrawers(){
    document.querySelectorAll('#matrix-body tr.mdetail').forEach(function(d){ d.parentNode.removeChild(d); });
    if(mRows) mRows.forEach(function(r){ r.classList.remove('open'); if(r.classList.contains('mrow')) r.setAttribute('aria-expanded','false'); });
  }
  function toggleDrawer(row){
    var next = row.nextElementSibling;
    if(next && next.classList.contains('mdetail')){
      next.parentNode.removeChild(next);
      row.classList.remove('open'); row.setAttribute('aria-expanded','false');
      return;
    }
    var dr = document.createElement('tr'); dr.className = 'mdetail';
    var td = document.createElement('td'); td.colSpan = 6;
    td.appendChild(buildDrawer(rowName(row)));
    dr.appendChild(td);
    row.parentNode.insertBefore(dr, row.nextSibling);
    row.classList.add('open'); row.setAttribute('aria-expanded','true');
  }

  function applyMatrix(){
    closeAllDrawers();
    var shown = 0;
    mRows.forEach(function(r){
      var ok = (mState.status==='all' || r.getAttribute('data-status')===mState.status)
            && (mState.cat==='all' || r.getAttribute('data-cat')===mState.cat)
            && (mState.due===null || r.children[4].getAttribute('data-sort')===mState.due)
            && (!mState.q || r.textContent.toLowerCase().indexOf(mState.q) >= 0);
      r.style.display = ok ? '' : 'none';
      if(ok) shown++;
    });
    if(mEmpty) mEmpty.style.display = shown ? 'none' : '';
    mCount.textContent = shown + ' of ' + mRows.length;
    syncChips();
    refreshStrip();
  }

  function focusMatrix(status, cat){
    mState.status = status || 'all'; mState.cat = cat || 'all'; mState.due = null; mState.q = '';
    if(mSearch) mSearch.value = '';
    window._activateTab('matrix', false, true);
    applyMatrix();
    var t = el('matrix-table'); if(t) t.scrollIntoView({behavior:'smooth', block:'center'});
  }
  function focusMatrixDue(due){
    mState.status = 'all'; mState.cat = 'all'; mState.q = ''; mState.due = due;
    if(mSearch) mSearch.value = '';
    window._activateTab('matrix', false, true);
    applyMatrix();
    var t = el('matrix-table'); if(t) t.scrollIntoView({behavior:'smooth', block:'center'});
  }

  function wireMatrix(){
    mRows = [].slice.call(document.querySelectorAll('#matrix-body tr')).filter(function(r){ return !r.classList.contains('empty-row'); });
    mEmpty = el('matrix-empty'); mCount = el('matrix-count'); mSearch = el('matrix-search'); mReset = el('matrix-reset');

    // expandable rows
    mRows.forEach(function(r){
      var nm = rowName(r);
      if(!ITEM[nm]) return;
      r.classList.add('mrow'); r.setAttribute('tabindex','0'); r.setAttribute('aria-expanded','false');
      r.setAttribute('title','Show contacts & links for ' + nm);
      var tog = document.createElement('span');
      tog.className = 'row-toggle'; tog.setAttribute('aria-hidden','true'); tog.textContent = '›';
      r.children[0].insertBefore(tog, r.children[0].firstChild);
      r.addEventListener('click', function(e){ if(e.target.closest('a')) return; toggleDrawer(r); });
      r.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggleDrawer(r); } });
    });

    document.querySelectorAll('.chipbtn[data-fg]').forEach(function(chip){
      chip.addEventListener('click', function(){ mState[chip.getAttribute('data-fg')] = chip.getAttribute('data-val'); mState.due = null; applyMatrix(); });
    });
    if(mSearch) mSearch.addEventListener('input', function(){ mState.q = this.value.trim().toLowerCase(); applyMatrix(); });
    if(mReset) mReset.addEventListener('click', function(){ mState = { status:'all', cat:'all', q:'', due:null }; if(mSearch) mSearch.value=''; applyMatrix(); });

    // Decisions-tab donut/legend → jump to the matrix and filter it.
    document.querySelectorAll('#donut .seg, #dlegend .row').forEach(function(e){
      e.addEventListener('click', function(){ focusMatrix(e.getAttribute('data-status'), 'all'); });
    });
    document.querySelectorAll('#xtab .xcell').forEach(function(cell){
      if(cell.disabled) return;
      cell.addEventListener('click', function(){ focusMatrix(cell.getAttribute('data-status'), cell.getAttribute('data-cat')); });
    });

    // Overview donut/legend → filter the action list IN PLACE (stay on Overview).
    document.querySelectorAll('#donut-x .seg, #dlegend-x .row').forEach(function(e){
      e.style.cursor = 'pointer';
      e.addEventListener('click', function(){
        var s = e.getAttribute('data-status');
        // Clicking the active slice again clears the filter.
        setExecFilter(execFilter && execFilter.status === s ? null : { status: s });
      });
    });
    var execReset = el('exec-reset');
    if(execReset) execReset.addEventListener('click', function(){ setExecFilter(null); });
    var execClear = el('exec-empty-clear');
    if(execClear) execClear.addEventListener('click', function(ev){ ev.preventDefault(); setExecFilter(null); });

    // Timeline markers: Decisions-tab → jump+filter matrix; Overview → filter in place.
    document.querySelectorAll('.tl-stop').forEach(function(stop){
      var d = stop.querySelector('.tl-date'); if(!d) return;
      var label = d.textContent.split('·')[0].trim();
      var due = Object.keys(DUELABEL).filter(function(k){ return DUELABEL[k] === label; })[0];
      if(!due) return;
      if(!mRows.some(function(r){ return r.children[4].getAttribute('data-sort') === due; })) return;
      var inOverview = !!stop.closest('#summary');
      stop.classList.add('tl-click'); stop.setAttribute('tabindex','0'); stop.setAttribute('role','button');
      stop.setAttribute('title', (inOverview ? 'Filter the list to contracts due ' : 'Filter the matrix to contracts due ') + label);
      var act = inOverview
        ? function(){ setExecFilter(execFilter && execFilter.due === due ? null : { due: due }); }
        : function(){ focusMatrixDue(due); };
      stop.addEventListener('click', act);
      stop.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); act(); } });
    });

    applyMatrix();
  }

  /* ----- decision planner ----- */
  function wirePlanner(){
    var host = el('plan-rows'); if(!host) return;
    var DLABEL = { stop:'Stop', keep:'Keep', undecided:'Undecided' };
    var DEF = { stop:'stop', go:'keep', tbd:'undecided', done:'keep' };
    var items = [];
    DATA.matrix.forEach(function(r){
      if(r.budget == null || r.budget <= 0 || r.status === 'done') return;
      items.push({ name:r.item, cat: CLABEL[r.cat].replace(/s$/,''), status:r.status, budget:r.budget, disp: DEF[r.status] || 'undecided' });
    });
    function paint(seg, disp){
      [].slice.call(seg.children).forEach(function(b){
        var on = b.getAttribute('data-d') === disp;
        b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    function recompute(){
      var sum = {stop:0,keep:0,undecided:0}, cnt = {stop:0,keep:0,undecided:0};
      items.forEach(function(it){ sum[it.disp] += it.budget; cnt[it.disp]++; });
      setTxt('pt-stop', money(sum.stop)); setTxt('pt-stop-n', plural(cnt.stop,'contract'));
      setTxt('pt-keep', money(sum.keep)); setTxt('pt-keep-n', plural(cnt.keep,'contract'));
      setTxt('pt-tbd',  money(sum.undecided)); setTxt('pt-tbd-n', plural(cnt.undecided,'contract'));
    }
    items.forEach(function(it){
      var row = document.createElement('div'); row.className = 'prow';
      var nm = document.createElement('div'); nm.className = 'prow-nm';
      nm.appendChild(document.createTextNode(it.name));
      var ct = document.createElement('span'); ct.className = 'prow-cat'; ct.textContent = it.cat; nm.appendChild(ct);
      var val = document.createElement('div'); val.className = 'prow-val'; val.textContent = money(it.budget);
      var seg = document.createElement('div'); seg.className = 'seg3'; seg.setAttribute('role','group'); seg.setAttribute('aria-label','Disposition for ' + it.name);
      ['stop','keep','undecided'].forEach(function(d){
        var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-d', d); b.textContent = DLABEL[d];
        b.addEventListener('click', function(){ it.disp = d; paint(seg, d); recompute(); });
        seg.appendChild(b);
      });
      paint(seg, it.disp);
      row.appendChild(nm); row.appendChild(val); row.appendChild(seg);
      host.appendChild(row);
      it._seg = seg;
    });
    recompute();
    var reset = el('plan-reset');
    if(reset) reset.addEventListener('click', function(){ items.forEach(function(it){ it.disp = DEF[it.status] || 'undecided'; paint(it._seg, it.disp); }); recompute(); });
    var csv = el('plan-csv');
    if(csv) csv.addEventListener('click', function(){
      var sum = {stop:0,keep:0,undecided:0};
      items.forEach(function(it){ sum[it.disp] += it.budget; });
      var rows = [['Item','Category','Current recommendation','Annual value (USD)','Your decision']];
      items.forEach(function(it){ rows.push([it.name, it.cat, SLABEL[it.status] || it.status, it.budget, DLABEL[it.disp]]); });
      rows.push([]);
      rows.push(['Recover by stopping','','', sum.stop, '']);
      rows.push(['Committed to keep','','', sum.keep, '']);
      rows.push(['Still undecided','','', sum.undecided, '']);
      var text = rows.map(function(r){ return r.map(function(c){ var v = String(c); return /[",\n]/.test(v) ? '"' + v.replace(/"/g,'""') + '"' : v; }).join(','); }).join('\r\n');
      var blob = new Blob([text], {type:'text/csv;charset=utf-8'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a'); a.href = url; a.download = 'transition-decision-plan.csv';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    });
  }

  /* ----- tools + vendors search ----- */
  function wireToolsVendors(){
    var tRows = [].slice.call(document.querySelectorAll('#tools-body tr')).filter(function(r){ return !r.classList.contains('empty-row'); });
    var tEmpty = el('tools-empty'), tCount = el('tools-count');
    var tState = { tg:'all', q:'' };
    function applyTools(){
      var shown = 0;
      tRows.forEach(function(r){
        var ok = (tState.tg==='all'||r.getAttribute('data-tg')===tState.tg) && (!tState.q || r.textContent.toLowerCase().indexOf(tState.q) >= 0);
        r.style.display = ok ? '' : 'none'; if(ok) shown++;
      });
      if(tEmpty) tEmpty.style.display = shown ? 'none' : '';
      if(tCount) tCount.textContent = shown + ' of ' + tRows.length;
      document.querySelectorAll('.chipbtn[data-tg]').forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-tg')===tState.tg); });
    }
    document.querySelectorAll('.chipbtn[data-tg]').forEach(function(chip){ chip.addEventListener('click', function(){ tState.tg = chip.getAttribute('data-tg'); applyTools(); }); });
    var tSearch = el('tools-search');
    if(tSearch) tSearch.addEventListener('input', function(){ tState.q = this.value.trim().toLowerCase(); applyTools(); });
    applyTools();

    var vRows = [].slice.call(document.querySelectorAll('#vendor-body tr'));
    var vSearch = el('vendor-search');
    if(vSearch) vSearch.addEventListener('input', function(){
      var q = this.value.trim().toLowerCase();
      vRows.forEach(function(r){ r.style.display = (!q || r.textContent.toLowerCase().indexOf(q)>=0) ? '' : 'none'; });
    });
  }

  /* ---------- Executive action list (Overview tab) ---------- */
  // execFilter: null (default curated view) or { status } or { due }.
  var execFilter = null;
  var ICON = { stop:'✕', go:'✓', tbd:'?', done:'✓' };
  var VERB = { stop:'Wind down', tbd:'Decide on', go:'Continue', done:'Close out' };

  function execActionCard(r){
    var amt = r.budget ? ' <span class="ea-amt">'+(r.status==='stop'?'→ recover ':'')+money(r.budget)+'</span>' : '';
    var due = r.due ? ('Due ' + DUEFMT(r.due) + ' · ' + daysFromTodayPhrase(r.due)) : 'No fixed deadline';
    var desc = String(r.action).replace(/<[^>]+>/g, ''); // strip inline links for a clean sentence
    return '<div class="exec-act '+r.status+'">'+
      '<div class="ea-icon">'+ICON[r.status]+'</div>'+
      '<div class="ea-body">'+
        '<div class="ea-title">'+VERB[r.status]+' '+esc(r.item)+amt+'</div>'+
        '<div class="ea-desc">'+esc(desc)+'</div>'+
        '<div class="ea-meta">'+esc(due)+'</div>'+
      '</div></div>';
  }

  function renderExec(){
    var host = el('exec-actions'); if(!host) return;
    var rows, title, tag;

    if(execFilter && execFilter.status){
      rows = DATA.matrix.filter(function(r){ return r.status === execFilter.status; });
      title = SLABEL[execFilter.status] + ' — ' + plural(rows.length, 'item');
      tag = 'Showing every item recommended to ' + SLABEL[execFilter.status].toLowerCase() + '.';
    } else if(execFilter && execFilter.due){
      rows = DATA.matrix.filter(function(r){ return r.due === execFilter.due; });
      title = 'Due ' + (DUELABEL[execFilter.due] || execFilter.due) + ' — ' + plural(rows.length, 'item');
      tag = 'Everything with this contract date.';
    } else {
      // Default curated view: the moves that matter — every Stop + every partner TBD.
      rows = DATA.matrix.filter(function(r){
        return r.status === 'stop' || (r.status === 'tbd' && r.cat === 'partner');
      });
      title = 'What needs a decision now';
      tag = 'The moves that matter most before the deadlines. Everything else is detail.';
    }
    // Sort: soonest due first (no-date last), then largest dollars.
    rows.sort(function(a,b){
      var ad = a.due || '99999999', bd = b.due || '99999999';
      if(ad !== bd) return ad < bd ? -1 : 1;
      return (b.budget||0) - (a.budget||0);
    });

    setTxt('exec-title', title);
    setTxt('exec-tag', tag);
    host.innerHTML = rows.map(execActionCard).join('');
    var empty = el('exec-empty'); if(empty) empty.hidden = rows.length > 0;
    var reset = el('exec-reset'); if(reset) reset.hidden = !execFilter;

    // Bottom-line summary always reflects the full portfolio, not the filter.
    var all = DATA.matrix;
    var stopSum = all.filter(function(r){ return r.status==='stop' && r.budget; })
                     .reduce(function(a,r){ return a+r.budget; }, 0);
    var tbdN = all.filter(function(r){ return r.status==='tbd' && r.cat==='partner'; }).length;
    el('exec-sowhat').innerHTML = '<b>Bottom line:</b> stopping the non-renewals recovers about <b>'+
      money(stopSum)+'</b> a year, and <b>'+tbdN+'</b> partner '+(tbdN===1?'decision':'decisions')+
      ' need a yes/no before the deadlines. Naming owners for each is the first move.';
  }

  // Apply / clear the in-place Overview filter (called by donut + timeline clicks).
  function setExecFilter(f){
    execFilter = f;
    renderExec();
    // Reflect the active slice/marker visually on the Overview widgets.
    document.querySelectorAll('#dlegend-x .row').forEach(function(row){
      row.classList.toggle('on', !!(f && f.status && row.getAttribute('data-status')===f.status));
    });
    document.querySelectorAll('#donut-x .seg').forEach(function(seg){
      seg.classList.toggle('on', !!(f && f.status && seg.getAttribute('data-status')===f.status));
    });
    // Highlight the active roadmap milestone when filtering by due date.
    document.querySelectorAll('#summary .tl-stop').forEach(function(stop){
      var lbl = (stop.querySelector('.tl-date')||{}).textContent || '';
      lbl = lbl.split('·')[0].trim();
      var due = Object.keys(DUELABEL).filter(function(k){ return DUELABEL[k] === lbl; })[0];
      stop.classList.toggle('tl-active', !!(f && f.due && due === f.due));
    });
  }
  function daysFromTodayPhrase(key){
    var d = daysFromToday(key);
    if(d === 'closed') return 'now past';
    if(d === 'today')  return 'today';
    return d + ' out';
  }

  /* ---------- Tab count badges ---------- */
  function renderTabCounts(){
    var counts = {
      matrix:   DATA.matrix.length,
      partners: DATA.partners.length,
      vendors:  DATA.vendors.length,
      tools:    DATA.tools.length,
      streams:  DATA.workstreams.length,
    };
    document.querySelectorAll('.tnum[data-count]').forEach(function(b){
      var k = b.getAttribute('data-count');
      if(counts[k] != null) b.textContent = counts[k];
    });
  }

  /* ---------- boot ---------- */
  function init(){
    renderHeader();
    renderKPIs();
    renderTabCounts();
    renderExec();
    renderDonut('donut', 'dlegend');       // Decisions tab
    renderDonut('donut-x', 'dlegend-x');   // Overview tab
    renderXtab();
    renderTimeline('tl-track');            // Decisions tab
    renderTimeline('tl-track-x');          // Overview tab
    renderMatrix();
    renderPartners();
    renderVendors();
    renderTools();
    renderStreams();
    renderDash();
    buildItemIndex();

    wireTabs();
    wireSort();
    wireMatrix();
    wirePlanner();
    wireToolsVendors();
  }
  // Run as soon as the DOM is ready. If the script is parsed while the document
  // is still loading we wait for DOMContentLoaded; otherwise (deferred/async load,
  // or appended after load) we run on the next tick.
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();

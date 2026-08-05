/* IAMSA interactive chapter map — pin selection + detail panel */
(function () {
  var map = document.getElementById('chapterMap');
  if (!map) return;

  var DATA = {
    sunderland: { city: "Sunderland", region: "North East", status: "active", lead: "Mokshagna Krishna Kasireddy", schools: ["University of Sunderland"] },
    liverpool: { city: "Liverpool", region: "North West", status: "active", lead: "Antonios Gaitanis", schools: ["University of Liverpool"] },
    preston: { city: "Preston", region: "North West", status: "active", lead: "Raya Shiju Abraham", schools: ["University of Lancashire"] },
    leicester: { city: "Leicester", region: "East Midlands", status: "active", lead: "Nishant Soni", schools: ["University of Leicester"] },
    bristol: { city: "Bristol", region: "South West", status: "active", lead: "Daniella Adebayo", schools: ["University of Bristol"] },
    plymouth: { city: "Plymouth", region: "South West", status: "active", lead: "Sabrin Osman", schools: ["University of Plymouth (Peninsula Medical School)"] },
    london: { city: "London", region: "London", status: "open", lead: null, schools: ["Imperial College London", "King's College London", "University College London", "Queen Mary University of London", "City St George's, University of London"] },
    birmingham: { city: "Birmingham", region: "West Midlands", status: "open", lead: null, schools: ["University of Birmingham", "Aston University"] },
    manchester: { city: "Manchester", region: "North West", status: "open", lead: null, schools: ["University of Manchester"] },
    leeds: { city: "Leeds", region: "Yorkshire", status: "open", lead: null, schools: ["University of Leeds"] },
    newcastle: { city: "Newcastle", region: "North East", status: "open", lead: null, schools: ["Newcastle University"] },
    edinburgh: { city: "Edinburgh", region: "Scotland", status: "open", lead: null, schools: ["University of Edinburgh"] },
    glasgow: { city: "Glasgow", region: "Scotland", status: "open", lead: null, schools: ["University of Glasgow"] },
    cardiff: { city: "Cardiff", region: "Wales", status: "open", lead: null, schools: ["Cardiff University"] },
    aberdeen: { city: "Aberdeen", region: "Scotland", status: "open", lead: null, schools: ["University of Aberdeen"] },
    dundee: { city: "Dundee", region: "Scotland", status: "open", lead: null, schools: ["University of Dundee", "Scottish Graduate Entry Medicine (Dundee & St Andrews)"] },
    belfast: { city: "Belfast", region: "Northern Ireland", status: "open", lead: null, schools: ["Queen's University Belfast"] },
    derry: { city: "Derry", region: "Northern Ireland", status: "open", lead: null, schools: ["Ulster University"] },
    swansea: { city: "Swansea", region: "Wales", status: "open", lead: null, schools: ["Swansea University"] },
    sheffield: { city: "Sheffield", region: "Yorkshire", status: "open", lead: null, schools: ["University of Sheffield"] },
    york: { city: "York", region: "Yorkshire", status: "open", lead: null, schools: ["Hull York Medical School (Hull & York)"] },
    nottingham: { city: "Nottingham", region: "East Midlands", status: "open", lead: null, schools: ["University of Nottingham"] },
    keele: { city: "Keele", region: "West Midlands", status: "open", lead: null, schools: ["Keele University"] },
    coventry: { city: "Coventry", region: "West Midlands", status: "open", lead: null, schools: ["University of Warwick"] },
    lancaster: { city: "Lancaster", region: "North West", status: "open", lead: null, schools: ["Lancaster University"] },
    ormskirk: { city: "Ormskirk", region: "North West", status: "open", lead: null, schools: ["Edge Hill University"] },
    norwich: { city: "Norwich", region: "East of England", status: "open", lead: null, schools: ["University of East Anglia"] },
    cambridge: { city: "Cambridge", region: "East of England", status: "open", lead: null, schools: ["University of Cambridge"] },
    chelmsford: { city: "Chelmsford", region: "East of England", status: "open", lead: null, schools: ["Anglia Ruskin University"] },
    buckingham: { city: "Buckingham", region: "South East", status: "open", lead: null, schools: ["University of Buckingham"] },
    oxford: { city: "Oxford", region: "South East", status: "open", lead: null, schools: ["University of Oxford"] },
    canterbury: { city: "Canterbury", region: "South East", status: "open", lead: null, schools: ["Kent and Medway Medical School"] },
    brighton: { city: "Brighton", region: "South East", status: "open", lead: null, schools: ["Brighton and Sussex Medical School"] },
    southampton: { city: "Southampton", region: "South East", status: "open", lead: null, schools: ["University of Southampton"] },
    exeter: { city: "Exeter", region: "South West", status: "open", lead: null, schools: ["University of Exeter"] }
  };

  var elDefault = map.querySelector('[data-mp="default"]');
  var elDetail  = map.querySelector('[data-mp="detail"]');
  var elRegion  = document.getElementById('mpRegion');
  var elCity    = document.getElementById('mpCity');
  var elSchools = document.getElementById('mpSchools');
  var elLead    = document.getElementById('mpLead');
  var elStatus  = document.getElementById('mpStatus');
  var elCta     = document.getElementById('mpCta');
  var elBack    = document.getElementById('mpBack');
  var pins      = map.querySelectorAll('.pin');

  function clear() {
    for (var i = 0; i < pins.length; i++) pins[i].classList.remove('is-selected');
  }

  function reset() {
    clear();
    elDetail.hidden = true;
    elDefault.hidden = false;
  }

  function select(pin) {
    var d = DATA[pin.getAttribute('data-id')];
    if (!d) return;

    clear();
    pin.classList.add('is-selected');

    elRegion.textContent = d.region;
    elCity.textContent = d.city;

    elSchools.innerHTML = '';
    for (var i = 0; i < d.schools.length; i++) {
      var li = document.createElement('li');
      li.textContent = d.schools[i];
      elSchools.appendChild(li);
    }

    if (d.status === 'active') {
      elLead.innerHTML = '';
      var k = document.createElement('span');
      k.className = 'mp-lead__role';
      k.textContent = 'Regional Lead';
      var v = document.createElement('strong');
      v.textContent = d.lead;
      elLead.appendChild(k);
      elLead.appendChild(v);
      elLead.hidden = false;

      elStatus.textContent = '● Chapter active';
      elStatus.className = 'mp-status is-active';
      elCta.textContent = 'Join this chapter';
      elCta.setAttribute('href', 'join.html');
    } else {
      elLead.hidden = true;
      elStatus.textContent = '● Regional lead wanted';
      elStatus.className = 'mp-status is-open';
      elCta.textContent = 'Become Regional Lead';
      elCta.setAttribute('href', 'join.html#tab-lead');
    }

    elDefault.hidden = true;
    elDetail.hidden = false;
  }

  for (var i = 0; i < pins.length; i++) {
    (function (pin) {
      pin.addEventListener('click', function () { select(pin); });
      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          select(pin);
        }
      });
    })(pins[i]);
  }

  if (elBack) elBack.addEventListener('click', reset);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !elDetail.hidden) reset();
  });
})();


/* ── International map ─────────────────────────────────── */
(function () {
  var map = document.getElementById('worldMap');
  if (!map) return;

  var WORLD = {
    uae: { country: "United Arab Emirates", reps: [{ name: "Ayesha Siddiqui", uni: "Gulf Medical University" }, { name: "Rabiya Iffath", uni: "Gulf Medical University" }, { name: "Yasamin Mohanad Fawzi", uni: "Dubai Medical University" }, { name: "Judy Al Haj Hasan", uni: "Dubai Medical University" }] },
    egypt: { country: "Egypt", reps: [{ name: "Mohammedjehad H M Jouda", uni: "Al-Azhar University, Cairo" }, { name: "Rehab Mamdouh Yousef", uni: "Assiut University" }] },
    cyprus: { country: "Cyprus", reps: [{ name: "Syed Yashal Ahmed", uni: "University of Nicosia" }] },
    morocco: { country: "Morocco", reps: [{ name: "Aya Abouchatir", uni: "Cadi Ayyad University, Marrakech" }] },
    iraq: { country: "Iraq", reps: [{ name: "Zheer Salah", uni: "Qaiwan International University" }] },
    jordan: { country: "Jordan", reps: [{ name: "Omar Yousef Farghal", uni: "Jordan University of Science and Technology" }] },
    afghanistan: { country: "Afghanistan", reps: [{ name: "Mohammad Osman Haidari", uni: "Kateb University" }] },
    lebanon: { country: "Lebanon", reps: [{ name: "Ali Majed", uni: "Lebanese American University" }] },
    usa: { country: "United States", reps: [{ name: "Neha Jain", uni: "Medical College of Wisconsin" }] }
  };

  var elDefault = map.querySelector('[data-mp="default"]');
  var elDetail  = map.querySelector('[data-mp="detail"]');
  var elCount   = document.getElementById('wmpCount');
  var elCountry = document.getElementById('wmpCountry');
  var elReps    = document.getElementById('wmpReps');
  var elBack    = document.getElementById('wmpBack');
  var pins      = map.querySelectorAll('.wpin');

  function reset() {
    for (var i = 0; i < pins.length; i++) pins[i].classList.remove('is-selected');
    elDetail.hidden = true;
    elDefault.hidden = false;
  }

  function select(pin) {
    var d = WORLD[pin.getAttribute('data-id')];
    if (!d) return;

    for (var i = 0; i < pins.length; i++) pins[i].classList.remove('is-selected');
    pin.classList.add('is-selected');

    elCount.textContent = d.reps.length + (d.reps.length > 1 ? ' representatives' : ' representative');
    elCountry.textContent = d.country;

    elReps.innerHTML = '';
    for (var j = 0; j < d.reps.length; j++) {
      var li = document.createElement('li');
      var nm = document.createElement('strong');
      nm.textContent = d.reps[j].name;
      var un = document.createElement('span');
      un.textContent = d.reps[j].uni;
      li.appendChild(nm); li.appendChild(un);
      elReps.appendChild(li);
    }

    elDefault.hidden = true;
    elDetail.hidden = false;
  }

  for (var i = 0; i < pins.length; i++) {
    (function (pin) {
      pin.addEventListener('click', function () { select(pin); });
      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault(); select(pin);
        }
      });
    })(pins[i]);
  }

  if (elBack) elBack.addEventListener('click', reset);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !elDetail.hidden) reset();
  });
})();


/* ── Pan / zoom for both maps ───────────────────────────── */
(function () {
  var MAX = 7, MIN = 1;

  function init(mapId) {
    var wrap = document.getElementById(mapId);
    if (!wrap) return;
    var svg = wrap.querySelector('svg');
    if (!svg) return;

    var vb = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
    var base = { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
    var cur  = { x: base.x, y: base.y, w: base.w, h: base.h };
    var ratio = base.h / base.w;
    var btns = wrap.querySelectorAll('.mz');
    var raf = null;

    function zoom() { return base.w / cur.w; }

    function clamp() {
      cur.w = Math.min(base.w, Math.max(base.w / MAX, cur.w));
      cur.h = cur.w * ratio;
      cur.x = Math.min(base.x + base.w - cur.w, Math.max(base.x, cur.x));
      cur.y = Math.min(base.y + base.h - cur.h, Math.max(base.y, cur.y));
    }

    function apply() {
      clamp();
      var z = zoom();
      svg.setAttribute('viewBox', cur.x + ' ' + cur.y + ' ' + cur.w + ' ' + cur.h);
      svg.style.setProperty('--z', z.toFixed(3));
      svg.classList.toggle('is-zoomed', z > 1.01);
      svg.classList.toggle('is-zoomed-far', z >= 2.2);
      for (var i = 0; i < btns.length; i++) {
        var k = btns[i].getAttribute('data-zoom');
        if (k === 'in')    btns[i].disabled = z >= MAX - 0.01;
        if (k === 'out')   btns[i].disabled = z <= MIN + 0.01;
        if (k === 'reset') btns[i].disabled = z <= MIN + 0.01;
      }
    }

    // convert a client point to current user-space coords
    function pt(clientX, clientY) {
      var r = svg.getBoundingClientRect();
      return {
        x: cur.x + (clientX - r.left) / r.width  * cur.w,
        y: cur.y + (clientY - r.top)  / r.height * cur.h
      };
    }

    function zoomAt(factor, ax, ay) {
      var nw = Math.min(base.w, Math.max(base.w / MAX, cur.w / factor));
      var f = cur.w / nw;
      cur.x = ax - (ax - cur.x) / f;
      cur.y = ay - (ay - cur.y) / f;
      cur.w = nw;
      cur.h = nw * ratio;
      apply();
    }

    // eased zoom for the buttons
    function tweenTo(target) {
      if (raf) cancelAnimationFrame(raf);
      var from = { x: cur.x, y: cur.y, w: cur.w };
      var t0 = null, DUR = 260;
      var reduce = window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) { cur.x = target.x; cur.y = target.y; cur.w = target.w; apply(); return; }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / DUR);
        var e = 1 - Math.pow(1 - p, 3);
        cur.x = from.x + (target.x - from.x) * e;
        cur.y = from.y + (target.y - from.y) * e;
        cur.w = from.w + (target.w - from.w) * e;
        cur.h = cur.w * ratio;
        apply();
        if (p < 1) raf = requestAnimationFrame(step); else raf = null;
      }
      raf = requestAnimationFrame(step);
    }

    function buttonZoom(factor) {
      var cx = cur.x + cur.w / 2, cy = cur.y + cur.h / 2;
      var nw = Math.min(base.w, Math.max(base.w / MAX, cur.w / factor));
      var f = cur.w / nw;
      tweenTo({ x: cx - (cx - cur.x) / f, y: cy - (cy - cur.y) / f, w: nw });
    }

    for (var b = 0; b < btns.length; b++) {
      (function (btn) {
        btn.addEventListener('click', function () {
          var k = btn.getAttribute('data-zoom');
          if (k === 'in')  buttonZoom(1.7);
          if (k === 'out') buttonZoom(1 / 1.7);
          if (k === 'reset') tweenTo({ x: base.x, y: base.y, w: base.w });
        });
      })(btns[b]);
    }

    svg.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && zoom() <= MIN + 0.01 && e.deltaY > 0) return; // let the page scroll
      e.preventDefault();
      var p = pt(e.clientX, e.clientY);
      zoomAt(e.deltaY < 0 ? 1.16 : 1 / 1.16, p.x, p.y);
    }, { passive: false });

    // ── drag to pan, pinch to zoom ──
    // A pointer must travel further than DRAG_MIN before we treat it as a pan.
    // Capturing the pointer on pointerdown would retarget the subsequent click
    // to the <svg>, so pin selection would never fire — capture only once the
    // gesture is definitely a drag.
    var DRAG_MIN = 6;
    var pointers = {}, dragFrom = null, moved = 0, pinch0 = null, captured = false;

    function activePointers() {
      var a = []; for (var k in pointers) a.push(pointers[k]); return a;
    }

    svg.addEventListener('pointerdown', function (e) {
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ps = activePointers();
      if (ps.length === 1) {
        moved = 0;
        captured = false;
        // remember which user-space point sits under the cursor; keep it there while dragging
        dragFrom = { p: pt(e.clientX, e.clientY), cx: e.clientX, cy: e.clientY, id: e.pointerId };
      } else if (ps.length === 2) {
        dragFrom = null;
        pinch0 = { d: Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y), w: cur.w };
      }
    });

    svg.addEventListener('pointermove', function (e) {
      if (!(e.pointerId in pointers)) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ps = activePointers();

      if (ps.length === 2 && pinch0) {
        var d = Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y);
        if (!d || !pinch0.d) return;
        var mid = pt((ps[0].x + ps[1].x) / 2, (ps[0].y + ps[1].y) / 2);
        var nw = Math.min(base.w, Math.max(base.w / MAX, pinch0.w * (pinch0.d / d)));
        var f = cur.w / nw;
        cur.x = mid.x - (mid.x - cur.x) / f;
        cur.y = mid.y - (mid.y - cur.y) / f;
        cur.w = nw; cur.h = nw * ratio;
        apply();
        return;
      }

      if (!dragFrom) return;
      moved = Math.abs(e.clientX - dragFrom.cx) + Math.abs(e.clientY - dragFrom.cy);
      if (moved <= DRAG_MIN) return;   // still a click, not a drag — don't pan or capture
      if (!captured) {
        captured = true;
        svg.classList.add('is-panning');
        try { svg.setPointerCapture(dragFrom.id); } catch (err) {}
      }
      var r = svg.getBoundingClientRect();
      // solve for the viewBox origin that puts dragFrom.p back under the cursor
      cur.x = dragFrom.p.x - (e.clientX - r.left) / r.width  * cur.w;
      cur.y = dragFrom.p.y - (e.clientY - r.top)  / r.height * cur.h;
      apply();
    });

    function endPointer(e) {
      delete pointers[e.pointerId];
      if (activePointers().length < 2) pinch0 = null;
      if (activePointers().length === 0) {
        if (captured) {
          try { svg.releasePointerCapture(e.pointerId); } catch (err) {}
          captured = false;
        }
        dragFrom = null;
        svg.classList.remove('is-panning');
      }
    }
    svg.addEventListener('pointerup', endPointer);
    svg.addEventListener('pointercancel', endPointer);
    svg.addEventListener('pointerleave', endPointer);

    // a drag must not also fire a pin selection
    svg.addEventListener('click', function (e) {
      if (moved > 6) { e.stopPropagation(); e.preventDefault(); moved = 0; }
    }, true);

    // keyboard panning when focus is on the map
    svg.setAttribute('tabindex', '0');
    svg.addEventListener('keydown', function (e) {
      var step = cur.w * 0.12, used = true;
      if (e.key === 'ArrowLeft')       cur.x -= step;
      else if (e.key === 'ArrowRight') cur.x += step;
      else if (e.key === 'ArrowUp')    cur.y -= step;
      else if (e.key === 'ArrowDown')  cur.y += step;
      else if (e.key === '+' || e.key === '=') buttonZoom(1.7);
      else if (e.key === '-' || e.key === '_') buttonZoom(1 / 1.7);
      else if (e.key === '0') tweenTo({ x: base.x, y: base.y, w: base.w });
      else used = false;
      if (used) { e.preventDefault(); apply(); }
    });

    apply();
  }

  init('chapterMap');
  init('worldMap');
})();

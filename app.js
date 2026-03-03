/* eslint-disable no-alert */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  const state = {
    content: null,
    slideEls: [],
    current: 0,
    ratios: new Map(),
    toastTimer: null,
    isProgrammatic: false,
    progTimer: null
  };

  function showToast(msg, ms = 1800){
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => el.classList.remove("is-on"), ms);
  }

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function initialsFromName(name){
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    const a = (parts[0] || "A")[0] || "A";
    const b = (parts[1] || parts[0] || "K")[0] || "K";
    return (a + b).toUpperCase();
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function linkifyText(str){
    // Escape first so we never inject raw HTML from content.json
    const escaped = escapeHtml(String(str ?? ""));

    // Mask emails so URL linkification can’t corrupt the generated <a>
    const emailMatches = [];
    let s = escaped.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (m) => {
      const token = `__EMAIL_${emailMatches.length}__`;
      emailMatches.push(m);
      return token;
    });

    // Simple URLs (with or without protocol)
    s = s.replace(/((https?:\/\/)?([a-z0-9.-]+\.)+[a-z]{2,}(\/[^\s<]*)?)/gi, (m) => {
      const raw = m;
      const hasProto = /^https?:\/\//i.test(raw);
      const href = hasProto ? raw : `https://${raw}`;
      // Avoid linkifying things like "C++" or short tokens: require a dot-domain
      if (!/[a-z0-9-]+\.[a-z]{2,}/i.test(raw)) return raw;
      return `<a href="${href}" target="_blank" rel="noopener">${raw}</a>`;
    });

    // Restore masked emails as mailto links
    s = s.replace(/__EMAIL_(\d+)__/g, (_, n) => {
      const email = emailMatches[Number(n)];
      return `<a href="mailto:${email}" rel="noopener">${email}</a>`;
    });

    return s;
  }

  async function loadJson(url){
    // 1) fetch (best for GitHub Pages / HTTP)
    try{
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return await res.json();
      throw new Error(`HTTP ${res.status}`);
    }catch(e){
      // 2) XHR fallback (some file:// setups)
      try{
        const txt = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.overrideMimeType("application/json");
          xhr.onload = () => (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) ? resolve(xhr.responseText) : reject(new Error(`XHR ${xhr.status}`));
          xhr.onerror = () => reject(new Error("XHR network error"));
          xhr.send(null);
        });
        return JSON.parse(txt);
      }catch(_e2){
        // 3) Friendly error
        throw new Error(
          "Couldn’t load content.json. If you opened index.html directly, " +
          "some browsers block local file requests. Try hosting the folder (e.g., a simple local server) " +
          "or open this on GitHub Pages / any HTTP server."
        );
      }
    }
  }

  function setCompactMode(){
    const compact = window.innerHeight < 740;
    document.body.classList.toggle("compact", compact);
  }

  function setTopOffset(){
    const nav = $("#topnav");
    if (!nav) return;
    const h = Math.ceil(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--topOffset", `${h}px`);
  }

  function bulletLayoutClass(count){
    if (count <= 1) return "bullets--one";
    if (count <= 4) return "bullets--two";
    return "";
  }

  function makeBulletIcon(){
    const wrap = document.createElement("div");
    wrap.className = "bullet__icon";
    wrap.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    return wrap;
  }

  function applyStagger(el, idx, base = 0.02){
    el.style.setProperty("--d", `${(idx * base).toFixed(3)}s`);
    el.setAttribute("data-animate", "");
  }

  function renderSlide(slide, idx){
    const section = document.createElement("section");
    section.className = `slide slide--${slide.type || "content"}`;
    section.setAttribute("data-index", String(idx));

    const inner = document.createElement("div");
    inner.className = "slide__inner";

    const title = (slide.headline || "").trim();
    const sub = (slide.subheadline || "").trim();

    if (slide.type === "title"){
      const hero = document.createElement("div");
      hero.className = "hero";

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = initialsFromName(state.content?.meta?.title || title);
      applyStagger(avatar, 0, 0.03);

      const block = document.createElement("div");

      const h = document.createElement("h1");
      h.className = "h1 grad";
      h.innerHTML = linkifyText(title);
      applyStagger(h, 1, 0.03);

      block.appendChild(h);

      if (sub){
        const p = document.createElement("p");
        p.className = "sub";
        p.innerHTML = linkifyText(sub);
        applyStagger(p, 2, 0.03);
        block.appendChild(p);
      }

      if (Array.isArray(slide.bullets) && slide.bullets.length){
        const meta = document.createElement("div");
        meta.className = "metaCards";
        slide.bullets.slice(0, 10).forEach((b, i) => {
          const c = document.createElement("div");
          c.className = "metaCard";
          c.innerHTML = linkifyText(b);
          applyStagger(c, 3 + i, 0.03);
          meta.appendChild(c);
        });
        block.appendChild(meta);
      }

      hero.appendChild(avatar);
      hero.appendChild(block);
      inner.appendChild(hero);

    } else if (slide.type === "section"){
      const h = document.createElement("h2");
      h.className = "h1 grad";
      h.innerHTML = linkifyText(title);
      applyStagger(h, 0, 0.03);
      inner.appendChild(h);

      if (sub){
        const p = document.createElement("p");
        p.className = "sub";
        p.innerHTML = linkifyText(sub);
        applyStagger(p, 1, 0.03);
        inner.appendChild(p);
      }

    } else if (slide.type === "beforeAfter"){
      const h = document.createElement("h2");
      h.className = "h2 grad";
      h.innerHTML = linkifyText(title);
      applyStagger(h, 0, 0.03);
      inner.appendChild(h);

      if (sub){
        const p = document.createElement("p");
        p.className = "sub";
        p.innerHTML = linkifyText(sub);
        applyStagger(p, 1, 0.03);
        inner.appendChild(p);
      }

      const wrap = document.createElement("div");
      wrap.style.display = "grid";
      wrap.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
      wrap.style.gap = "10px";

      const left = document.createElement("div");
      left.className = "bullet";
      left.innerHTML = `<div class="bullet__text"><strong>${escapeHtml(slide.left?.title || "Before")}</strong></div>`;
      applyStagger(left, 2, 0.03);

      const right = document.createElement("div");
      right.className = "bullet";
      right.innerHTML = `<div class="bullet__text"><strong>${escapeHtml(slide.right?.title || "After")}</strong></div>`;
      applyStagger(right, 3, 0.03);

      wrap.appendChild(left);
      wrap.appendChild(right);

      function makeList(target, bullets){
        if (!Array.isArray(bullets) || !bullets.length) return;
        const ul = document.createElement("ul");
        ul.className = "bullets bullets--one";
        bullets.slice(0, 10).forEach((b, i) => {
          const li = document.createElement("li");
          li.className = "bullet";
          li.appendChild(makeBulletIcon());
          const t = document.createElement("div");
          t.className = "bullet__text";
          t.innerHTML = linkifyText(b);
          li.appendChild(t);
          applyStagger(li, 4 + i, 0.02);
          ul.appendChild(li);
        });
        target.appendChild(ul);
      }

      makeList(left, slide.left?.bullets);
      makeList(right, slide.right?.bullets);
      inner.appendChild(wrap);

    } else {
      const h = document.createElement("h2");
      h.className = "h2 grad";
      h.innerHTML = linkifyText(title);
      applyStagger(h, 0, 0.03);
      inner.appendChild(h);

      if (sub){
        const p = document.createElement("p");
        p.className = "sub";
        p.innerHTML = linkifyText(sub);
        applyStagger(p, 1, 0.03);
        inner.appendChild(p);
      }

      if (slide.type === "closing" && Array.isArray(slide.bullets) && slide.bullets.length){
        const row = document.createElement("div");
        row.className = "ctaRow";
        slide.bullets.slice(0, 10).forEach((b, i) => {
          const pill = document.createElement("div");
          pill.className = "ctaPill";
          pill.innerHTML = linkifyText(b);
          applyStagger(pill, 2 + i, 0.03);
          row.appendChild(pill);
        });
        inner.appendChild(row);

      } else if (Array.isArray(slide.bullets) && slide.bullets.length){
        const ul = document.createElement("ul");
        ul.className = `bullets ${bulletLayoutClass(slide.bullets.length)}`.trim();
        slide.bullets.slice(0, 10).forEach((b, i) => {
          const li = document.createElement("li");
          li.className = "bullet";
          li.appendChild(makeBulletIcon());
          const t = document.createElement("div");
          t.className = "bullet__text";
          t.innerHTML = linkifyText(b);
          li.appendChild(t);
          applyStagger(li, 2 + i, 0.03);
          ul.appendChild(li);
        });
        inner.appendChild(ul);
      }
    }

    if (slide.note){
      const raw = String(slide.note);
      const urlMatch = raw.match(/(https?:\/\/[^\s]+|(?:[a-z0-9.-]+\.)+[a-z]{2,}(\/[^\s]+)?)/i);

      const note = document.createElement("div");
      note.className = "note";

      if (urlMatch){
        const url = urlMatch[1];
        const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
        const label = raw.replace(url, "").replace(/[:\-–]+\s*$/, "").trim();

        note.innerHTML = `
          <div class="note__label">${linkifyText(label || "Link")}</div>
          <a class="note__link" href="${href}" target="_blank" rel="noopener">Open link →</a>
        `;
      } else {
        note.innerHTML = linkifyText(raw);
      }

      applyStagger(note, 20, 0.01);
      inner.appendChild(note);
    }

    section.appendChild(inner);
    return section;
  }

  function tightenIfNeeded(){
    // If a slide overflows, progressively tighten padding/type.
    state.slideEls.forEach((slideEl) => {
      slideEl.classList.remove("tight", "micro");
      const inner = slideEl.querySelector(".slide__inner");
      if (!inner) return;
      const over1 = inner.scrollHeight > inner.clientHeight + 2;
      if (over1) slideEl.classList.add("tight");
      const over2 = inner.scrollHeight > inner.clientHeight + 2;
      if (over2) slideEl.classList.add("micro");
    });
  }

  function updateNav(){
    $("#currentIdx").textContent = String(state.current + 1);

    const total = state.slideEls.length || 1;
    const fill = $("#progressFill");
    if (fill){
      const pct = total <= 1 ? 100 : (state.current / (total - 1)) * 100;
      fill.style.width = `${pct}%`;
    }

    const dots = $("#dots");
    if (dots){
      [...dots.children].forEach((d, i) => d.classList.toggle("is-on", i === state.current));
    }
  }

  function goTo(idx, behavior = "smooth"){
    const next = clamp(idx, 0, state.slideEls.length - 1);
    state.current = next;
    updateNav();

    const scroller = $("#scroller");
    const el = state.slideEls[next];
    if (!el || !scroller) return;

    state.isProgrammatic = true;
    clearTimeout(state.progTimer);

    const topOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topOffset")) || 0;
    const top = el.offsetTop - topOffset;
    scroller.scrollTo({ top: Math.max(0, top), behavior });

    state.progTimer = setTimeout(() => { state.isProgrammatic = false; }, behavior === "smooth" ? 520 : 120);
  }

  function setupDots(){
    const dots = $("#dots");
    if (!dots) return;
    dots.innerHTML = "";
    state.slideEls.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot";
      d.type = "button";
      d.setAttribute("aria-label", `Go to slide ${i + 1}`);
      if (i === 0) d.classList.add("is-on");
      d.addEventListener("click", () => goTo(i));
      dots.appendChild(d);
    });
  }

  function setupKeyboard(){
    window.addEventListener("keydown", (e) => {
      const tag = (document.activeElement && document.activeElement.tagName) ? document.activeElement.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      const k = e.key;
      const isSpace = (k === " " || k === "Spacebar");
      const isNext = isSpace || k === "ArrowRight" || k === "ArrowDown" || k === "PageDown";
      const isPrev = (k === "ArrowLeft" || k === "ArrowUp" || k === "PageUp") || (isSpace && e.shiftKey);

      if (isNext || isPrev){
        e.preventDefault();
        if (isNext && !e.shiftKey) goTo(state.current + 1);
        else goTo(state.current - 1);
      }
    }, { passive: false });
  }

  function setupButtons(){
    $("#prevBtn")?.addEventListener("click", () => goTo(state.current - 1));
    $("#nextBtn")?.addEventListener("click", () => goTo(state.current + 1));
    $(".brand")?.addEventListener("click", () => goTo(0));
  }

  function setupSlideObservers(){
    const scroller = $("#scroller");

    // Enter animation observer
    const enterObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          entry.target.classList.add("is-active");
        }
      });
    }, { root: scroller, threshold: 0.28 });

    state.slideEls.forEach((el) => enterObs.observe(el));

    // Current slide observer (highest visible ratio)
    const activeObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const idx = Number(entry.target.getAttribute("data-index") || "0");
        state.ratios.set(idx, entry.intersectionRatio);
      });

      let bestIdx = state.current;
      let best = -1;
      state.ratios.forEach((ratio, idx) => {
        if (ratio > best){
          best = ratio;
          bestIdx = idx;
        }
      });

      if (!state.isProgrammatic && bestIdx !== state.current && best > 0.45){
        state.current = bestIdx;
        updateNav();
      }
    }, { root: scroller, threshold: [0, 0.25, 0.45, 0.6, 0.75, 0.9, 1] });

    state.slideEls.forEach((el) => activeObs.observe(el));
  }

  function loadScript(src){
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(s);
    });
  }

  async function ensurePdfLibs(){
    if (window.html2canvas && window.jspdf && window.jspdf.jsPDF) return;
    try{
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    }catch(err){
      throw new Error(
        "PDF export needs cdnjs.cloudflare.com access (html2canvas + jsPDF). " +
        "If your network blocks it, allow cdnjs.cloudflare.com or self-host the libraries."
      );
    }
  }

  function forceSlidesVisibleForExport(){
    state.slideEls.forEach((el) => el.classList.add("is-active"));
  }

  function createPdfStageFromSlide(slideEl){
    const stage = document.createElement("div");
    stage.id = "pdfStage";

    const bg = document.querySelector(".bg");
    if (bg) stage.appendChild(bg.cloneNode(true));

    const clone = slideEl.cloneNode(true);
    clone.classList.add("is-active");
    stage.appendChild(clone);

    document.body.appendChild(stage);
    return stage;
  }

  async function setupPdfExport(){
    const btn = $("#exportPdfBtn");
    const label = $("#exportBtnLabel");
    if (!btn || !label) return;

    btn.addEventListener("click", async () => {
      btn.disabled = true;
      label.textContent = "Exporting…";
      showToast("Preparing PDF…", 1400);

      try{
        await ensurePdfLibs();

        document.body.classList.add("exportingPdf");
        forceSlidesVisibleForExport();

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [1920, 1080] });

        for (let i = 0; i < state.slideEls.length; i++){
          const slideEl = state.slideEls[i];
          const stage = createPdfStageFromSlide(slideEl);

          // Ensure fonts/layout settle
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

          const scale = Math.max(window.devicePixelRatio || 1, 2);
          const canvas = await window.html2canvas(stage, {
            backgroundColor: "#050611",
            scale,
            useCORS: true,
            width: 1920,
            height: 1080
          });

          const imgData = canvas.toDataURL("image/png");

          if (i > 0) pdf.addPage([1920, 1080], "landscape");
          pdf.addImage(imgData, "PNG", 0, 0, 1920, 1080);

          stage.remove();

          showToast(`Captured ${i + 1}/${state.slideEls.length}`, 700);
        }

        pdf.save("FlowPitch.pdf"); // per spec
        showToast("PDF exported", 1600);
      }catch(err){
        alert(err.message || String(err));
      }finally{
        document.body.classList.remove("exportingPdf");
        btn.disabled = false;
        label.textContent = "Export PDF";
      }
    });
  }

  async function init(){
    setCompactMode();
    setTopOffset();

    window.addEventListener("resize", () => {
      setCompactMode();
      setTopOffset();
      tightenIfNeeded();
    });

    try{
      state.content = await loadJson("content.json");
    }catch(err){
      alert(err.message || String(err));
      return;
    }

    // Apply meta
    const title = state.content?.meta?.title || "Deck";
    const theme = state.content?.meta?.theme || "";
    document.title = title;

    $("#deckTitle").textContent = title;
    $("#deckTheme").textContent = theme;

    // Recompute navbar height after title/theme populate
    setTopOffset();

    // Render
    const host = $("#slides");
    host.innerHTML = "";
    const slides = Array.isArray(state.content?.slides) ? state.content.slides.slice(0, 15) : [];

    slides.forEach((s, i) => {
      const el = renderSlide(s, i);
      host.appendChild(el);
    });

    state.slideEls = [...host.querySelectorAll(".slide")];
    $("#totalIdx").textContent = String(state.slideEls.length || 1);

    setupDots();
    setupButtons();
    setupKeyboard();
    setupSlideObservers();
    await setupPdfExport();

    // Activate the first slide quickly
    state.slideEls[0]?.classList.add("is-active");

    // Tighten if needed after layout
    requestAnimationFrame(() => {
      tightenIfNeeded();
    });

    showToast("Space: next • Shift+Space: back", 2100);
  }

  init();
})();

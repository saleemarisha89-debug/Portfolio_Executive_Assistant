/*
 * Avenza Business Growth — scroll-driven scenes (GSAP + ScrollTrigger).
 *
 * Runs only when GSAP is loaded and the visitor has not asked for reduced
 * motion. Every scene is registered inside gsap.matchMedia(), so timelines,
 * pins and listeners are reverted automatically when a breakpoint or the
 * motion preference changes. Nothing here hijacks scrolling: pins are plain
 * ScrollTrigger pins with native scroll, and all content stays in the DOM.
 */
(function () {
  "use strict";
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);

  var UI = window.AvenzaUI || {};
  var root = document.documentElement;
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function cssVar(el, name) { return el.style.getPropertyValue(name).trim(); }

  var MOTION = "(prefers-reduced-motion: no-preference)";
  var BG = { plum: "#49304A", night: "#221622", dark: "#0D080D" };
  var SCRUB = 0.8; // one smoothing value for every scroll-linked scene

  var mm = gsap.matchMedia();

  /* ---------------------------------------------------------------
   * 1. HERO → WORKFLOW (pinned, desktop only)
   * Scattered tasks fly into the workspace, the window straightens,
   * the side tools dock and the interface steps through its views.
   * ------------------------------------------------------------- */
  mm.add("(min-width: 1081px) and " + MOTION, function () {
    var hero = $(".hero");
    var visual = $("[data-parallax]");
    var win = $(".mock-window", visual);
    var chips = $$(".h-chip", visual);
    var floats = $$("[data-float]", visual);
    var syncs = $$(".fc-sync", visual);
    root.classList.add("hero-scene");

    function chipDelta(axis) {
      return function (i, el) {
        if (axis === "x") return (win.offsetLeft + win.offsetWidth / 2) - (el.offsetLeft + el.offsetWidth / 2);
        return (win.offsetTop + win.offsetHeight / 2) - (el.offsetTop + el.offsetHeight / 2);
      };
    }

    gsap.set(win, { rotationY: -14, rotationX: 6, scale: 0.94, transformPerspective: 1400, transformOrigin: "60% 50%" });
    gsap.set(floats, { autoAlpha: 0, y: 46, scale: 0.92 });
    gsap.set(syncs, { autoAlpha: 0, scale: 0.6 });

    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=110%",
        pin: true,
        scrub: SCRUB,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          var p = self.progress;
          if (UI.showMock) UI.showMock(p < 0.42 ? 0 : p < 0.74 ? 1 : 2);
          if (UI.setChecklist) UI.setChecklist(Math.round(gsap.utils.clamp(0, 1, (p - 0.5) / 0.4) * 4));
        },
      },
    });
    tl.to(".scroll-cue", { autoAlpha: 0, y: 20, duration: 0.12 }, 0)
      .to(chips, { x: chipDelta("x"), y: chipDelta("y"), rotation: 0, scale: 0.35, autoAlpha: 0, duration: 0.42, stagger: 0.035, ease: "power2.in" }, 0.02)
      .to(win, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.5, ease: "power2.inOut" }, 0.08)
      .to(floats, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.08, ease: "power3.out" }, 0.42)
      .to(syncs, { autoAlpha: 1, scale: 1, duration: 0.12, stagger: 0.08, ease: "back.out(2)" }, 0.66)
      .to("[data-hero-copy]", { y: -36, duration: 1 }, 0)
      .to(".hero-emblem-ghost", { yPercent: 14, duration: 1 }, 0)
      .to({}, { duration: 0.12 }); // short hold on the finished system before releasing

    return function () { root.classList.remove("hero-scene"); };
  });

  /* ---------------------------------------------------------------
   * 2. SCATTERED → STRUCTURED (scroll-linked, all sizes, not pinned)
   * ------------------------------------------------------------- */
  mm.add(MOTION, function () {
    var sorter = $("[data-sorter]");
    if (!sorter) return;
    sorter.classList.add("is-scrub");
    var chips = $$(".chip", sorter);
    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: sorter, start: "top 82%", end: "center 42%", scrub: SCRUB },
    });
    chips.forEach(function (c, i) {
      tl.fromTo(c,
        { left: cssVar(c, "--sx"), top: cssVar(c, "--sy"), rotation: parseFloat(cssVar(c, "--sr")) || 0 },
        { left: cssVar(c, "--ox"), top: cssVar(c, "--oy"), rotation: 0, duration: 0.6, ease: "power2.inOut" },
        i * 0.035);
    });
    tl.fromTo($$(".sorter-col-h", sorter), { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.06 }, 0.5)
      .fromTo(chips, { "--dot": 0 }, { "--dot": 1, duration: 0.15 }, 0.62)
      .fromTo($(".sorter-foot", sorter), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.78);
    return function () { sorter.classList.remove("is-scrub"); };
  });

  /* ---------------------------------------------------------------
   * 3. WORKFLOW CHAPTERS (scroll-linked; sticky index on desktop)
   * ------------------------------------------------------------- */
  mm.add(MOTION, function () {
    // Index highlight follows the chapter in the middle of the screen.
    $$("[data-wf-chapter]").forEach(function (ch) {
      ScrollTrigger.create({
        trigger: ch, start: "top 55%", end: "bottom 55%",
        onToggle: function (self) { if (self.isActive && UI.setWfIndex) UI.setWfIndex(+ch.getAttribute("data-wf-chapter")); },
      });
    });

    // CRM: the clean table wipes in over the messy one.
    var crm = $("[data-crm]");
    if (crm) {
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: crm, start: "top 78%", end: "bottom 48%", scrub: SCRUB } })
        .fromTo("[data-crm-after]", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0)
        .fromTo("[data-crm-scan]", { left: "0%", autoAlpha: 1 }, { left: "100%", duration: 1 }, 0)
        .to("[data-crm-scan]", { autoAlpha: 0, duration: 0.08 }, 1);
    }

    // Project board: progress fills row by row.
    var board = $(".board");
    if (board) {
      gsap.fromTo($$(".bar i", board), { scaleX: 0 }, {
        scaleX: 1, ease: "power1.out", stagger: 0.12,
        scrollTrigger: { trigger: board, start: "top 82%", end: "bottom 52%", scrub: SCRUB },
      });
    }

    // Roadmap: bars draw across the quarter while "Now" advances.
    var roadmap = $(".roadmap");
    if (roadmap) {
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: roadmap, start: "top 80%", end: "bottom 50%", scrub: SCRUB } })
        .fromTo($$(".rm-bar", roadmap), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.1, ease: "power1.out" }, 0)
        .fromTo("[data-rm-today]", { "--t": 0 }, { "--t": 0.62, duration: 0.9 }, 0);
    }
  });

  // Pipeline cards travel between columns (desktop/tablet grid only).
  mm.add("(min-width: 901px) and " + MOTION, function () {
    var pipe = $("[data-pipe]");
    if (!pipe) return;
    var lanes = $$(".pipe-lane", pipe);
    var step = function () { return lanes[1].offsetLeft - lanes[0].offsetLeft; };
    var lumen = $(".is-mover[data-move='3']", pipe);
    var lumenText = $("[data-stage-text]", lumen);
    var stages = ["Health & wellness", "Fit confirmed", "Intro email sent", "Reply received · call next"];
    var original = lumenText.textContent;
    var tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: pipe, start: "top 80%", end: "bottom 40%", scrub: SCRUB, invalidateOnRefresh: true,
        onUpdate: function (self) {
          var i = Math.min(3, Math.floor(self.progress * 3.6));
          lumenText.textContent = stages[i];
          lumen.classList.toggle("is-hot", i === 3);
        },
      },
    });
    $$(".is-mover", pipe).forEach(function (card, i) {
      var n = +card.getAttribute("data-move");
      tl.to(card, { x: function () { return step() * n; }, duration: n * 0.3 }, i * 0.18);
    });
    return function () { lumenText.textContent = original; lumen.classList.remove("is-hot"); };
  });

  /* ---------------------------------------------------------------
   * 4. PROCESS STORY (pinned on desktop, step-by-step on mobile)
   * ------------------------------------------------------------- */
  mm.add("(min-width: 901px) and " + MOTION, function () {
    var grid = $("[data-process]");
    if (!grid) return;
    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: grid,
        // Centre the scene when it fits; otherwise align it under the header.
        start: function () { return grid.offsetHeight + 140 > window.innerHeight ? "top top+=88" : "center center"; },
        end: "+=190%",
        pin: true,
        scrub: SCRUB,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) { if (UI.setStep) UI.setStep(Math.min(3, Math.floor(self.progress * 4))); },
      },
    });
    tl.fromTo("[data-rail-fill]", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
      .fromTo("[data-stage-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
    return function () { if (UI.setStep) UI.setStep(0); };
  });

  mm.add("(max-width: 900px) and " + MOTION, function () {
    var steps = $$("[data-step]");
    gsap.fromTo("[data-rail-fill]", { scaleY: 0 }, {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: "[data-timeline]", start: "top 65%", end: "bottom 60%", scrub: SCRUB },
    });
    steps.forEach(function (s, i) {
      ScrollTrigger.create({
        trigger: s, start: "top 62%", end: "bottom 62%",
        onToggle: function (self) { if (self.isActive && UI.setStep) UI.setStep(i); },
      });
    });
  });

  /* ---------------------------------------------------------------
   * 5. LAYERED PARALLAX (tablet and up; lighter on phones)
   * ------------------------------------------------------------- */
  mm.add("(min-width: 641px) and " + MOTION, function () {
    var drift = function (target, trigger, from, to, extra) {
      if (!$(target)) return;
      gsap.fromTo(target, Object.assign({ yPercent: from }, extra || {}), Object.assign({
        yPercent: to, ease: "none",
        scrollTrigger: { trigger: trigger, start: "top bottom", end: "bottom top", scrub: true },
      }, extra || {}));
    };
    drift(".portrait-founder img", ".founder-media", -7, 7, { scale: 1.14 });
    drift(".folio-p3", ".folio-visual", 10, -10);
    drift(".folio-p2", ".folio-visual", 16, -16);
    drift(".folio-p1", ".folio-visual", 4, -4);
    drift(".final-ribbon", ".final", 18, -10);
    drift(".hero-glow-1", ".hero", 0, 30);

    var members = $$(".member");
    if (members.length) {
      gsap.fromTo(members, { y: function (i) { return i % 2 ? 70 : 24; } }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: ".team-grid", start: "top bottom", end: "top 35%", scrub: SCRUB },
      });
    }
    var featured = $(".price-card.is-featured");
    if (featured) {
      gsap.fromTo(featured, { scale: 0.94 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: ".price-grid", start: "top 90%", end: "top 40%", scrub: SCRUB },
      });
    }
  });

  /* ---------------------------------------------------------------
   * 6. SECTION COLOUR TRANSITIONS (dark ↔ night ↔ plum)
   * Created last so their positions account for every pin above.
   * ------------------------------------------------------------- */
  mm.add(MOTION, function () {
    var sections = $$("[data-bg]");
    if (!sections.length) return;
    var set = function (key) { root.style.setProperty("--page-bg", BG[key] || BG.dark); };
    root.classList.add("bg-scenes");
    set(sections[0].getAttribute("data-bg"));
    sections.forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec, start: "top 55%", end: "bottom 55%",
        onToggle: function (self) { if (self.isActive) set(sec.getAttribute("data-bg")); },
      });
    });
    return function () { root.classList.remove("bg-scenes"); root.style.removeProperty("--page-bg"); };
  });

  /* Recalculate once fonts and images have settled, so pins line up. */
  var refresh = function () { ScrollTrigger.refresh(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh);
})();

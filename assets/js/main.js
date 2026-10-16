/* Avenza Business Growth — interactions and content rendering. */
(function () {
  "use strict";

  var C = window.AVENZA || {};
  var links = C.links || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function icon(id, cls) {
    return '<svg class="i' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }
  /* Run `fn` once when `el` scrolls into view. */
  function onceVisible(el, fn, threshold) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); fn(); }
    }, { threshold: threshold || 0.25 });
    io.observe(el);
  }
  /* Track whether `el` is on screen so looping animations can pause. */
  function watchVisibility(el, cb) {
    if (!el || !("IntersectionObserver" in window)) { cb(true); return; }
    new IntersectionObserver(function (entries) { cb(entries[0].isIntersecting); }, { threshold: 0.15 }).observe(el);
  }

  /* ---------- Links from content.js ---------- */
  $$("[data-link]").forEach(function (a) {
    var key = a.getAttribute("data-link");
    if (key === "email" && C.brand && C.brand.email) a.href = "mailto:" + C.brand.email;
    else if (links[key]) a.href = links[key];
  });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Header ---------- */
  var header = $("[data-header]");
  var toggle = $("[data-nav-toggle]");
  var menu = $("[data-nav-menu]");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-solid", y > 24);
    var menuOpen = document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > 640 && y > lastY + 4);
    if (y < lastY - 4 || y < 640) header.classList.remove("is-hidden");
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    if (open) {
      header.classList.remove("is-hidden");
      var first = menu.querySelector("a");
      if (first) setTimeout(function () { first.focus(); }, 50);
    }
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (!document.body.classList.contains("menu-open")) return;
    if (e.key === "Escape") { setMenu(false); toggle.focus(); return; }
    if (e.key === "Tab") { // keep focus inside the open menu
      var items = [toggle].concat($$("a", menu));
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  window.matchMedia("(min-width: 1081px)").addEventListener("change", function (mq) { if (mq.matches) setMenu(false); });

  /* Highlight the current section in the nav */
  var navMap = {};
  $$(".nav-links a").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var link = navMap[en.target.id];
        $$(".nav-links a").forEach(function (a) { a.classList.toggle("is-current", a === link); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navMap).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Rendering from content.js ---------- */
  function placeholderHTML(initials, tag) {
    return '<span class="portrait-placeholder" aria-hidden="true"><span class="portrait-initials">' + esc(initials) + "</span>" +
      (tag ? '<span class="portrait-tag">' + esc(tag) + "</span>" : "") + "</span>";
  }
  /* If a portrait image is missing or fails to load, swap in the initials placeholder. */
  function guardPortrait(box) {
    var img = box.querySelector("img");
    var fallback = function () {
      if (img) img.remove();
      if (!box.querySelector(".portrait-placeholder")) {
        box.insertAdjacentHTML("beforeend", placeholderHTML(box.getAttribute("data-initials") || "", box.getAttribute("data-tag")));
        box.setAttribute("role", "img");
        box.setAttribute("aria-label", box.getAttribute("data-label") || "Portrait placeholder");
      }
    };
    if (!img) { fallback(); return; }
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener("error", fallback);
  }

  var pricingEl = $("[data-pricing]");
  if (pricingEl && C.pricing) {
    pricingEl.innerHTML = C.pricing.map(function (p, i) {
      return '<article class="price-card' + (p.featured ? " is-featured" : "") + '" data-reveal style="--d:' + (i * 0.12) + 's">' +
        '<span class="price-kicker">' + esc(p.kicker) + "</span>" +
        "<h3>" + esc(p.name) + "</h3>" +
        '<p class="price-summary">' + esc(p.summary) + "</p>" +
        '<p class="price-amount"><span class="price-from">Starting at</span><span class="price-value">$' +
          Number(p.price).toLocaleString("en-US") + '</span><span class="price-unit">' + esc(p.unit) + "</span></p>" +
        '<p class="price-includes">' + esc(p.includesLabel) + "</p>" +
        '<ul class="price-features">' + p.features.map(function (f) { return "<li>" + icon("i-check") + "<span>" + esc(f) + "</span></li>"; }).join("") + "</ul>" +
        '<a class="btn ' + (p.featured ? "btn-pink" : "btn-plum") + '" href="' + esc(links.booking) + '" target="_blank" rel="noopener">' + esc(p.cta) + " " + icon("i-arrow") + "</a>" +
        "</article>";
    }).join("");
  }

  var teamEl = $("[data-team]");
  if (teamEl && C.team) {
    teamEl.innerHTML = C.team.map(function (m, i) {
      var label = "Portrait placeholder for " + m.name;
      var media = m.image
        ? '<img src="' + esc(m.image) + '" alt="Portrait of ' + esc(m.name) + '" loading="lazy" decoding="async">'
        : "";
      var focus = (m.focus && m.focus.length)
        ? '<ul class="member-focus" aria-label="Focus areas">' + m.focus.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>"
        : (m.note ? '<p class="member-note">' + esc(m.note) + "</p>" : "");
      return '<article class="member" data-reveal style="--d:' + (i * 0.1) + 's">' +
        '<div class="portrait" data-portrait data-initials="' + esc(m.initials) + '" data-tag="Photo coming soon" data-label="' + esc(label) + '">' + media + "</div>" +
        '<div class="member-body"><h3>' + esc(m.name) + '</h3><p class="member-role">' + esc(m.role) + "</p>" + focus + "</div>" +
        "</article>";
    }).join("");
  }
  $$("[data-portrait]").forEach(guardPortrait);

  var testiTrack = $("[data-testi-track]");
  if (testiTrack && C.testimonials) {
    testiTrack.innerHTML = C.testimonials.map(function (t) {
      var r = Number(t.rating);
      return '<figure class="testi-card">' +
        '<span class="testi-mark" aria-hidden="true">“</span>' +
        "<blockquote><p>" + esc(t.quote) + "</p></blockquote>" +
        '<figcaption><span class="testi-who"><b>Fiverr client</b><span>' + esc(t.date) + "</span></span>" +
        '<span class="stars" role="img" aria-label="Rated ' + r + ' out of 5"><svg aria-hidden="true"><use href="#i-sparkle"/></svg> ' + r.toFixed(1) + "</span></figcaption>" +
        "</figure>";
    }).join("");
    var prev = $("[data-testi-prev]"), next = $("[data-testi-next]");
    var step = function () { var c = testiTrack.querySelector(".testi-card"); return c ? c.getBoundingClientRect().width + 22 : 320; };
    var sync = function () {
      prev.disabled = testiTrack.scrollLeft < 8;
      next.disabled = testiTrack.scrollLeft + testiTrack.clientWidth > testiTrack.scrollWidth - 8;
    };
    prev.addEventListener("click", function () { testiTrack.scrollBy({ left: -step(), behavior: reduceMotion.matches ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { testiTrack.scrollBy({ left: step(), behavior: reduceMotion.matches ? "auto" : "smooth" }); });
    testiTrack.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  /* ---------- Headline split ---------- */
  $$("[data-split]").forEach(function (el) {
    var i = 0;
    var split = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "split-word";
            var inner = document.createElement("span"); inner.style.setProperty("--i", i++); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) { split(child); }
      });
    };
    split(el);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("is-split-in"); }); });
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = $$("[data-reveal]");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); rio.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { rio.observe(el); });
    // Fallback for fast scrolling: anything already scrolled into or past view is shown.
    var pending = false;
    window.addEventListener("scroll", function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        revealEls.forEach(function (el) {
          if (!el.classList.contains("is-in") && el.getBoundingClientRect().top < window.innerHeight * 0.94) {
            el.classList.add("is-in"); rio.unobserve(el);
          }
        });
      });
    }, { passive: true });
  }

  /* ---------- Hero mockups ---------- */
  var hero = $(".hero");
  var heroOn = true;
  watchVisibility(hero, function (v) { heroOn = v; });
  var mockTabs = $$("[data-mock-tab]");
  var mockViews = $$("[data-mock-view]");
  var mockIndex = 0;
  function showMock(i) {
    mockIndex = i % mockTabs.length;
    var key = mockTabs[mockIndex].getAttribute("data-mock-tab");
    mockTabs.forEach(function (t) { t.classList.toggle("is-active", t.getAttribute("data-mock-tab") === key); });
    mockViews.forEach(function (v) { v.classList.toggle("is-active", v.getAttribute("data-mock-view") === key); });
  }
  var checklist = $$("[data-checklist] li");
  var checkStep = 0;
  function tickChecklist() {
    if (checkStep > checklist.length) { checklist.forEach(function (li) { li.classList.remove("is-done"); }); checkStep = 0; return; }
    if (checklist[checkStep]) checklist[checkStep].classList.add("is-done");
    checkStep++;
  }
  if (reduceMotion.matches) {
    checklist.slice(0, 3).forEach(function (li) { li.classList.add("is-done"); });
  } else {
    setInterval(function () { if (heroOn && !document.hidden) showMock(mockIndex + 1); }, 4200);
    setInterval(function () { if (heroOn && !document.hidden) tickChecklist(); }, 1300);
  }

  /* Subtle pointer parallax */
  var visual = $("[data-parallax]");
  if (visual && finePointer.matches && !reduceMotion.matches) {
    var win = $(".mock-window", visual);
    var floats = $$("[data-depth]", visual);
    var raf = 0;
    hero.addEventListener("pointermove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        win.style.transform = "rotateY(" + (-7 + x * 6).toFixed(2) + "deg) rotateX(" + (3 - y * 5).toFixed(2) + "deg)";
        floats.forEach(function (f) {
          var d = parseFloat(f.getAttribute("data-depth"));
          f.style.setProperty("--px", (x * d * 14).toFixed(1) + "px");
          f.style.setProperty("--py", (y * d * 12).toFixed(1) + "px");
        });
      });
    });
    hero.addEventListener("pointerleave", function () {
      win.style.transform = "";
      floats.forEach(function (f) { f.style.removeProperty("--px"); f.style.removeProperty("--py"); });
    });
  }

  /* ---------- Scattered → organized ---------- */
  var sorter = $("[data-sorter]");
  var sorterBtn = $("[data-sorter-toggle]");
  function setSorted(on) {
    sorter.classList.toggle("is-organized", on);
    sorterBtn.setAttribute("aria-pressed", String(on));
    sorterBtn.textContent = on ? "Show the scattered version" : "Organize the work";
  }
  if (sorter) {
    sorterBtn.addEventListener("click", function () { setSorted(!sorter.classList.contains("is-organized")); });
    onceVisible(sorter, function () { setTimeout(function () { setSorted(true); }, reduceMotion.matches ? 0 : 700); }, 0.45);
  }

  /* ---------- Accessible tabs ---------- */
  $$("[data-tabs]").forEach(function (group) {
    var tabs = $$('[role="tab"]', group);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      if (tab.scrollIntoView && group.querySelector(".svc-list") && window.innerWidth <= 900) {
        tab.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
      group.dispatchEvent(new CustomEvent("tabchange", { detail: tab }));
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") n = tabs[0];
        else if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  });
  $$(".svc-items").forEach(function (ul) { $$("li", ul).forEach(function (li, i) { li.style.setProperty("--i", i); }); });
  $$(".board-row, .rm-row").forEach(function (row) {
    row.style.setProperty("--row", Array.prototype.indexOf.call(row.parentNode.children, row));
  });

  /* ---------- Workflow visualizations ---------- */
  var wf = $("[data-wf]");
  var wfOn = false;
  watchVisibility(wf, function (v) { wfOn = v; });

  var pipe = $("[data-pipe]");
  function countPipe() {
    $$(".pipe-col", pipe).forEach(function (col) {
      col.querySelector("h4").setAttribute("data-count", col.querySelectorAll(".pipe-card").length);
    });
  }
  if (pipe) {
    countPipe();
    var stage = 0;
    var cols = $$(".pipe-col", pipe);
    setInterval(function () {
      if (!wfOn || document.hidden || reduceMotion.matches || $("#wf-p1").hidden) return;
      var from = cols[stage], to = cols[stage + 1];
      var card = from.querySelector(".pipe-card");
      if (card) {
        card.classList.remove("is-arriving", "is-hot");
        to.appendChild(card);
        void card.offsetWidth;
        card.classList.add("is-arriving");
        if (stage === 2) card.classList.add("is-hot");
      }
      var last = cols[3].querySelectorAll(".pipe-card");
      if (last.length > 2) { last[0].classList.remove("is-hot", "is-arriving"); cols[0].appendChild(last[0]); }
      stage = (stage + 1) % 3;
      countPipe();
    }, 2400);
  }

  var crm = $("[data-crm]");
  if (crm) {
    if (reduceMotion.matches) crm.classList.add("is-clean");
    setInterval(function () {
      if (!wfOn || document.hidden || reduceMotion.matches || $("#wf-p2").hidden) return;
      crm.classList.toggle("is-clean");
    }, 3200);
    if (wf) wf.addEventListener("tabchange", function (e) {
      if (e.detail.id === "wf-t2" && !reduceMotion.matches) {
        crm.classList.remove("is-clean");
        setTimeout(function () { crm.classList.add("is-clean"); }, 1100);
      }
    });
  }

  /* ---------- Process timeline ---------- */
  var timeline = $("[data-timeline]");
  onceVisible(timeline, function () { timeline.classList.add("is-in"); }, 0.3);

  /* ---------- Business Growth Review form ---------- */
  var form = $("[data-review-form]");
  if (form) {
    var statusEl = $("[data-form-status]");
    var successEl = $("[data-form-success]");
    var submitBtn = $("[data-submit]");
    var endpoint = (C.reviewForm && C.reviewForm.endpoint || "").trim();
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var fieldError = function (input, msg) {
      var field = input.closest(".field");
      var err = field.querySelector(".field-error");
      field.classList.toggle("has-error", !!msg);
      if (err) err.textContent = msg || "";
      if (input.setAttribute && input.tagName !== "FIELDSET") input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    var normalizeUrl = function (v) {
      if (!v) return "";
      if (!/^https?:\/\//i.test(v)) v = "https://" + v;
      try { var u = new URL(v); return /\./.test(u.hostname) ? u.href : null; } catch (_) { return null; }
    };
    var collect = function () {
      var f = form.elements;
      return {
        fullName: f.fullName.value.trim(),
        email: f.email.value.trim(),
        businessName: f.businessName.value.trim(),
        website: f.website.value.trim(),
        industry: f.industry.value.trim(),
        areas: $$('input[name="areas"]:checked', form).map(function (c) { return c.value; }),
        challenge: f.challenge.value.trim(),
        goal: f.goal.value.trim(),
        context: f.context.value.trim(),
      };
    };
    var validate = function (d) {
      var f = form.elements, firstBad = null;
      var check = function (input, msg) { fieldError(input, msg); if (msg && !firstBad) firstBad = input; };
      check(f.fullName, d.fullName ? "" : "Please enter your full name.");
      check(f.email, !d.email ? "Please enter your business email." : EMAIL_RE.test(d.email) ? "" : "Please enter a valid email address, like name@company.com.");
      check(f.businessName, d.businessName ? "" : "Please enter your business name.");
      check(f.website, d.website && normalizeUrl(d.website) === null ? "Please enter a valid website address, like yourbusiness.com." : "");
      check(f.industry, d.industry ? "" : "Please tell us your industry or business type.");
      var areasField = form.querySelector("fieldset");
      fieldError(areasField, d.areas.length ? "" : "Please choose at least one area.");
      if (!d.areas.length && !firstBad) firstBad = form.querySelector('input[name="areas"]');
      check(f.challenge, d.challenge ? "" : "Please describe your biggest current challenge.");
      check(f.goal, d.goal ? "" : "Please share your main goal for the next three to six months.");
      return firstBad;
    };
    var summaryText = function (d) {
      return [
        "Free Business Growth Review request", "",
        "Full name: " + d.fullName,
        "Business email: " + d.email,
        "Business name: " + d.businessName,
        "Website: " + (d.website || "—"),
        "Industry / business type: " + d.industry,
        "Support needed: " + d.areas.join(", "),
        "", "Biggest current challenge:", d.challenge,
        "", "Main goal (next 3–6 months):", d.goal,
        "", "Additional context:", d.context || "—",
      ].join("\n");
    };
    var showStatus = function (title, body, d) {
      var mail = "mailto:" + encodeURIComponent((C.brand && C.brand.email) || "") +
        "?subject=" + encodeURIComponent("Free Business Growth Review — " + d.businessName) +
        "&body=" + encodeURIComponent(summaryText(d));
      statusEl.innerHTML = "<h3>" + esc(title) + "</h3><p>" + esc(body) + "</p>" +
        '<div class="status-actions"><a class="btn btn-plum" href="' + esc(mail) + '">' + icon("i-mail") + " Email my answers</a>" +
        '<a class="btn btn-ghost" href="' + esc(links.booking) + '" target="_blank" rel="noopener">' + icon("i-calendar") + " Book a Free Call</a></div>";
    };

    form.addEventListener("input", function (e) {
      var field = e.target.closest(".field");
      if (field && field.classList.contains("has-error")) fieldError(e.target.type === "checkbox" ? field : e.target, "");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.innerHTML = "";
      var d = collect();
      var bad = validate(d);
      if (bad) { bad.focus(); return; }
      if (form.elements.company_url.value) return; // honeypot: ignore bots silently
      if (d.website) d.website = normalizeUrl(d.website);

      if (!endpoint) {
        showStatus(
          "Online submission isn’t connected yet",
          "Your answers have not been sent. You can email them to us in one click (your email app opens with everything filled in), or book a free call instead.",
          d
        );
        return;
      }

      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ _subject: "Free Business Growth Review — " + d.businessName }, d, { areas: d.areas.join(", ") })),
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.hidden = true;
        successEl.hidden = false;
        successEl.focus();
      }).catch(function () {
        showStatus(
          "We couldn’t send your request",
          "Something went wrong and your answers were not delivered. Please try again, email them to us, or book a free call.",
          d
        );
      }).then(function () {
        submitBtn.removeAttribute("aria-busy");
        submitBtn.disabled = false;
        submitBtn.textContent = "Request My Free Review";
      });
    });
  }
})();

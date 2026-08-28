/* Titus Lee — shared behaviour: theme, nav, tabs, scroll reveal */
(function () {
  "use strict";

  var root = document.documentElement;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------- theme ---- */
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var saved = read("theme");
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    var sync = function () {
      var dark = root.getAttribute("data-theme") === "dark";
      themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      themeBtn.setAttribute("aria-pressed", String(dark));
    };
    sync();
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store("theme", next);
      sync();
    });
  }

  /* ------------------------------------------------------------ nav ---- */
  var nav = document.querySelector(".nav");
  var links = document.getElementById("nav-links");
  var burger = document.querySelector("[data-nav-open]");
  var closeBtn = document.querySelector("[data-nav-close]");
  var scrim = document.querySelector(".nav__scrim");

  function setMenu(open) {
    if (!links) return;
    links.classList.toggle("is-open", open);
    if (scrim) scrim.classList.toggle("is-open", open);
    if (burger) burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = links.querySelector("a");
      if (first) first.focus();
    } else if (burger) {
      burger.focus();
    }
  }

  if (burger) burger.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
  if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
  if (links) links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links && links.classList.contains("is-open")) setMenu(false);
  });

  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-stuck", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------- tabs ---- */
  var tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));

    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { select(tab, false); });
    });

    /* arrow keys move between tabs, as expected of a tablist */
    tablist.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  }


  /* ---------------------------------------------------------- typing ---- */
  /* Types the headline over a hidden ghost copy, so nothing reflows. */
  var typeEl = document.querySelector("[data-type]");
  if (typeEl) {
    var ghost = typeEl.querySelector(".type__ghost");
    var live = typeEl.querySelector(".type__live");

    if (!ghost || !live || reducedMotion) {
      typeEl.classList.add("no-type");
    } else {
      /* rebuild the ghost's structure in the live layer, then fill it in */
      var parts = [];
      Array.prototype.forEach.call(ghost.childNodes, function (node) {
        if (node.nodeType === 3) {
          parts.push({ text: node.nodeValue, cls: null });
        } else if (node.nodeType === 1) {
          parts.push({ text: node.textContent, cls: node.className });
        }
      });

      var caret = document.createElement("span");
      caret.className = "caret";

      var pi = 0, ci = 0, target = null;

      var tick = function () {
        if (pi >= parts.length) {
          caret.classList.add("is-done");
          return;
        }
        var part = parts[pi];

        if (ci === 0) {
          target = document.createElement("span");
          if (part.cls) target.className = part.cls;
          live.appendChild(target);
        }

        if (ci < part.text.length) {
          target.textContent += part.text.charAt(ci);
          ci++;
          /* keep the caret trailing the newest character */
          target.appendChild(caret);
          setTimeout(tick, part.text.charAt(ci - 1) === " " ? 34 : 46);
        } else {
          pi++; ci = 0;
          setTimeout(tick, pi < parts.length ? 340 : 0);
        }
      };

      setTimeout(tick, 700);
    }
  }

  /* --------------------------------------------------------- reveal ---- */
  var reduced = reducedMotion;
  var items = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);        /* reveal once, then leave it alone */
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  requestAnimationFrame(function () { document.body.classList.add("js-ready"); });

  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();

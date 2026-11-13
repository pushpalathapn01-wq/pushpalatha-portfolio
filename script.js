(function () {
  'use strict';

  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  // Footer year
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Project navigation (tabs + arrows + arrow keys) ----------
  var tabs = $$('.proj-tab');
  var panels = $$('.project');
  var current = 0;

  function show(i, focusTab) {
    current = (i + panels.length) % panels.length;
    tabs.forEach(function (t, n) {
      var on = n === current;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p, n) {
      var on = n === current;
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
    if (focusTab) tabs[current].focus();
  }

  tabs.forEach(function (t, n) {
    t.addEventListener('click', function () { show(n); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1, true); }
    });
  });
  var prev = $('#prev'), next = $('#next');
  if (prev) prev.addEventListener('click', function () { show(current - 1); });
  if (next) next.addEventListener('click', function () { show(current + 1); });

  // Before printing, make every project visible so the PDF contains both
  var hiddenBeforePrint = [];
  window.addEventListener('beforeprint', function () {
    hiddenBeforePrint = panels.filter(function (p) { return p.hidden; });
    hiddenBeforePrint.forEach(function (p) { p.hidden = false; });
    $$('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  });
  window.addEventListener('afterprint', function () {
    hiddenBeforePrint.forEach(function (p) { p.hidden = true; });
    hiddenBeforePrint = [];
  });

  // ---------- Scroll reveal ----------
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- Active nav link ----------
  var links = $$('.nav-links a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove('is-current'); a.removeAttribute('aria-current'); });
          map[en.target.id].classList.add('is-current');
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = doc.getElementById(id); if (s) spy.observe(s); });
  }
})();

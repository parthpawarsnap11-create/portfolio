/**
 * main.js — Parth Pawar Portfolio
 * Pure Vanilla JS. No external libraries.
 *
 * Features:
 *  1. Nav scroll shadow
 *  2. Hamburger menu toggle
 *  3. Portrait floating class (applied after entrance)
 *  4. SVG orbital ellipse draw-on animation (stroke-dashoffset)
 *  5. Mouse parallax on hero right column (desktop only)
 *  6. prefers-reduced-motion guard
 */

(function () {
  'use strict';

  /* --------------------------------------------------------
     Helpers
  -------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  /* --------------------------------------------------------
     1. NAV — scroll shadow
  -------------------------------------------------------- */
  const nav = $('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  /* --------------------------------------------------------
     2. HAMBURGER MENU
  -------------------------------------------------------- */
  const hamburger = $('.nav__hamburger');
  const mobileMenu = $('#mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.setAttribute('aria-hidden', String(isOpen));
    mobileMenu.classList.toggle('is-open', !isOpen);
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('is-open');
    });
  });

  /* --------------------------------------------------------
     3. PORTRAIT FLOATING — add class after entrance ends
  -------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const portraitWrap = $('#portrait-wrap');
    if (portraitWrap) {
      // Entrance duration = 0.8s, delay = 0.3s → total 1.1s
      setTimeout(() => {
        portraitWrap.classList.add('floating');
      }, 1200);
    }
  }

  /* --------------------------------------------------------
     4. SVG ORBITAL DRAW-ON
     Fires 0.5s after page load. We animate stroke-dashoffset
     from its full value (1500) to 0 via CSS animation triggered
     by adding a class.
  -------------------------------------------------------- */
  if (!prefersReducedMotion) {
    const orbitPath = $('#orbit-path');
    if (orbitPath) {
      setTimeout(() => {
        orbitPath.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1)';
        orbitPath.style.strokeDashoffset = '0';
      }, 500);
    }
  } else {
    // Reduced-motion: show orbit fully drawn immediately
    const orbitPath = $('#orbit-path');
    if (orbitPath) orbitPath.style.strokeDashoffset = '0';
  }

  /* --------------------------------------------------------
     5. MOUSE PARALLAX
     Portrait moves ±12px, blobs move ±6px.
     Disabled on touch devices and when prefers-reduced-motion.
  -------------------------------------------------------- */
  if (!prefersReducedMotion && !isTouchDevice()) {
    const heroSection = $('.hero');
    const portraitWrap = $('#portrait-wrap');
    const blobsEl = $('#blobs');

    if (heroSection && portraitWrap && blobsEl) {
      let raf = null;
      let targetPortraitX = 0, targetPortraitY = 0;
      let targetBlobX = 0, targetBlobY = 0;
      let currentPortraitX = 0, currentPortraitY = 0;
      let currentBlobX = 0, currentBlobY = 0;

      // Track mouse relative to hero centre
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        // Normalise: -0.5 to +0.5
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        targetPortraitX = nx * 24;   // ±12px
        targetPortraitY = ny * 24;
        targetBlobX = nx * 12;       // ±6px
        targetBlobY = ny * 12;

        if (!raf) raf = requestAnimationFrame(tick);
      });

      heroSection.addEventListener('mouseleave', () => {
        targetPortraitX = 0; targetPortraitY = 0;
        targetBlobX = 0; targetBlobY = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });

      // Lerp smoothing
      function lerp(a, b, t) { return a + (b - a) * t; }

      function tick() {
        currentPortraitX = lerp(currentPortraitX, targetPortraitX, 0.07);
        currentPortraitY = lerp(currentPortraitY, targetPortraitY, 0.07);
        currentBlobX = lerp(currentBlobX, targetBlobX, 0.05);
        currentBlobY = lerp(currentBlobY, targetBlobY, 0.05);

        // Apply transforms — combine with any CSS animation via will-change
        // We set a CSS variable so it doesn't fight the floating animation
        portraitWrap.style.setProperty('--parallax-x', `${currentPortraitX}px`);
        portraitWrap.style.setProperty('--parallax-y', `${currentPortraitY}px`);
        blobsEl.style.transform = `translate(${currentBlobX}px, ${currentBlobY}px)`;

        const stillMoving =
          Math.abs(currentPortraitX - targetPortraitX) > 0.1 ||
          Math.abs(currentPortraitY - targetPortraitY) > 0.1 ||
          Math.abs(currentBlobX - targetBlobX) > 0.1 ||
          Math.abs(currentBlobY - targetBlobY) > 0.1;

        raf = stillMoving ? requestAnimationFrame(tick) : null;
      }

      // Apply parallax via CSS custom property in a translate() on top of float
      // We update the portrait wrapper's translate using CSS transform
      // We need to intercept the floating animation; use a wrapper approach.
      // Apply the parallax offset to the OUTER wrapper's style.transform
      // so the CSS animation on the inner element floats independently.
      // We'll add a data-parallax div around portrait-wrap in JS:
      const heroRight = $('#hero-right');
      if (heroRight) {
        const parallaxLayer = document.createElement('div');
        parallaxLayer.id = 'parallax-layer';
        parallaxLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;';
        // Move portrait into it
        heroRight.style.position = 'relative';

        // Override tick to transform the right column offset only
        // simpler: just use CSS variables on the portrait-wrap style
        // The floating animation uses transform so we need translate3d addition
        // Solution: wrap portrait-wrap in a sibling that we translate
        // Actually simplest: use margin-left trick — but that shifts layout.
        // Best approach: set transform on a containing div that wraps portrait-wrap.
        // We already have hero__right; apply the parallax offset there via
        // a separate absolutely positioned overlay doesn't help.
        // Let's just apply it to the portrait image itself (not the wrapper
        // which is running the float animation):
        const portrait = $('#portrait');
        if (portrait) {
          // Replace tick to apply directly to portrait img
          const _tick = tick;
          function tick2() {
            currentPortraitX = lerp(currentPortraitX, targetPortraitX, 0.07);
            currentPortraitY = lerp(currentPortraitY, targetPortraitY, 0.07);
            currentBlobX = lerp(currentBlobX, targetBlobX, 0.05);
            currentBlobY = lerp(currentBlobY, targetBlobY, 0.05);

            portrait.style.transform = `translate(${currentPortraitX}px, ${currentPortraitY}px)`;
            blobsEl.style.transform = `translate(${currentBlobX}px, ${currentBlobY}px)`;

            const stillMoving =
              Math.abs(currentPortraitX - targetPortraitX) > 0.1 ||
              Math.abs(currentPortraitY - targetPortraitY) > 0.1 ||
              Math.abs(currentBlobX - targetBlobX) > 0.1 ||
              Math.abs(currentBlobY - targetBlobY) > 0.1;

            raf = stillMoving ? requestAnimationFrame(tick2) : null;
          }

          // Reattach mousemove with new tick
          heroSection.removeEventListener('mousemove', heroSection._mm);
          heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;
            targetPortraitX = nx * 24;
            targetPortraitY = ny * 24;
            targetBlobX = nx * 12;
            targetBlobY = ny * 12;
            if (!raf) raf = requestAnimationFrame(tick2);
          });
          heroSection.addEventListener('mouseleave', () => {
            targetPortraitX = 0; targetPortraitY = 0;
            targetBlobX = 0; targetBlobY = 0;
            if (!raf) raf = requestAnimationFrame(tick2);
          });
        }
      }
    }
  }

  /* --------------------------------------------------------
     6. ACTIVE NAV LINK (IntersectionObserver)
  -------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim()} 0px -60% 0px` });

    sections.forEach(sec => observer.observe(sec));
  }

})();


  /* --------------------------------------------------------
     7. SCROLL REVEAL — IntersectionObserver for .reveal elements
  -------------------------------------------------------- */
  (function () {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));
  }());


/* ============================================================
   SCROLL REVEAL — IntersectionObserver for .reveal elements
   Covers the Projects and Experience sections.
   ============================================================ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Immediately show everything — no animation
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all if no observer support
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

})();

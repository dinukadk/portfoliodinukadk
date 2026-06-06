/* =============================================================
   DINUKA D. KIRINDAGE — Shared JavaScript Utilities
   Import via: <script src="js/main.js"></script>
   All functions are also inlined per-page for reliability.
   ============================================================= */

/** Custom gold cursor with smooth ring follow */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function tick() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/** Glassmorphism nav darkens on scroll */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/** Mobile hamburger toggle */
function toggleMenu() {
  document.getElementById('nav-links')?.classList.toggle('active');
  document.getElementById('hamburger')?.classList.toggle('active');
}

/** Back-to-top floating button */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.pageYOffset > 300));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/** Intersection-observer scroll reveals */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.project-card, .person-card, .pillar-card, .fade-in, ' +
    '.reveal, .reveal-left, .reveal-right, .social-link, .info-card'
  ).forEach((el, i) => {
    el.style.transitionDelay = `${(i % 7) * 0.07}s`;
    obs.observe(el);
  });
}

/* Auto-init on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavScroll();
  initBackToTop();
  initScrollReveal();
});

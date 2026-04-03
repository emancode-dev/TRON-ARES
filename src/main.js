/**
 * TRON: ARES — main.js
 * Handles: nav, section tracking, scroll reveal, gallery, form
 */

import './style.css';

/* ═══════════════════════════════════════════
   BACKGROUND VIDEO SWITCHER
═══════════════════════════════════════════ */
const bgVideos = document.querySelectorAll('.bg-video');
let activeBg = document.querySelector('.bg-video.is-active');

function switchBg(sectionId) {
  const target = document.querySelector(`.bg-video[data-bg="${sectionId}"]`);
  if (!target || target === activeBg) return;
  activeBg?.classList.remove('is-active');
  target.play().catch(() => {});
  target.classList.add('is-active');
  activeBg = target;
}

bgVideos.forEach(v => { v.play().catch(() => {}); });

/* Ensure card art still loads if the page is opened directly from disk. */
const cardArtImages = document.querySelectorAll('.tcg-art-window img');

cardArtImages.forEach((img) => {
  const originalSrc = img.getAttribute('src');
  if (!originalSrc) return;

  const fileName = originalSrc.split('/').pop();
  if (!fileName) return;

  const candidates = [
    originalSrc,
    `./public/assets/images/${fileName}`,
    '/assets/images/bot.jpg',
    './public/assets/images/bot.jpg',
  ];

  let attempt = 0;

  img.addEventListener('error', () => {
    attempt += 1;
    const nextSrc = candidates[attempt];

    if (!nextSrc || img.dataset.fallbackDone === 'true') {
      img.dataset.fallbackDone = 'true';
      return;
    }

    img.src = nextSrc;
  });
});


/* ═══════════════════════════════════════════
   SECTION + NAV ACTIVE STATE OBSERVER
═══════════════════════════════════════════ */
const sections   = document.querySelectorAll('[data-section]');
const navAnchors = document.querySelectorAll('[data-nav]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.dataset.section;
      switchBg(id);
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.35 }
);
sections.forEach(s => sectionObserver.observe(s));


/* ═══════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════════
   MOBILE NAV TOGGLE
═══════════════════════════════════════════ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (e) => {
  if (
    navLinks?.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !navToggle?.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});


/* ═══════════════════════════════════════════
   SMOOTH SCROLL — data-scroll buttons
═══════════════════════════════════════════ */
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ═══════════════════════════════════════════
   GALLERY CAROUSEL
   Builds from local /assets/videos/1.mp4 … 11.mp4
═══════════════════════════════════════════ */
const TOTAL_VIDEOS = 11;
const videoSrcs = Array.from(
  { length: TOTAL_VIDEOS },
  (_, i) => `/assets/videos/${i + 1}.mp4`
);

let currentSlide = 0;

const carMain   = document.getElementById('carMain');
const thumbsEl  = document.getElementById('thumbs');
const counterEl = document.getElementById('counter');
const totalEl   = document.getElementById('totalSlides');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');

if (carMain && thumbsEl && counterEl && totalEl) {
  totalEl.textContent = TOTAL_VIDEOS;

  const mainVid = document.createElement('video');
  mainVid.muted       = true;
  mainVid.loop        = true;
  mainVid.playsInline = true;
  mainVid.preload     = 'metadata';
  mainVid.setAttribute('playsinline', '');
  carMain.appendChild(mainVid);

  videoSrcs.forEach((src, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
    thumb.setAttribute('role', 'button');
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('aria-label', `Go to clip ${i + 1}`);

    const tv = document.createElement('video');
    tv.src         = src;
    tv.muted       = true;
    tv.playsInline = true;
    tv.preload     = 'metadata';
    tv.setAttribute('playsinline', '');
    thumb.appendChild(tv);

    thumb.addEventListener('click', () => goTo(i));
    thumb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); }
    });
    thumbsEl.appendChild(thumb);
  });

  function goTo(index) {
    currentSlide = ((index % TOTAL_VIDEOS) + TOTAL_VIDEOS) % TOTAL_VIDEOS;

    mainVid.src = videoSrcs[currentSlide];
    mainVid.load();
    mainVid.play().catch(() => {});

    counterEl.textContent = currentSlide + 1;

    thumbsEl.querySelectorAll('.gallery-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === currentSlide);
    });

    const activeThumb = thumbsEl.querySelectorAll('.gallery-thumb')[currentSlide];
    activeThumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  goTo(0);

  prevBtn?.addEventListener('click', () => goTo(currentSlide - 1));
  nextBtn?.addEventListener('click', () => goTo(currentSlide + 1));

  document.addEventListener('keydown', (e) => {
    const galleryEl = document.getElementById('gallery');
    if (!galleryEl) return;
    const rect = galleryEl.getBoundingClientRect();
    if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentSlide - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentSlide + 1); }
  });

  let touchStartX = 0;
  carMain.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  carMain.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 40) goTo(currentSlide + (dx < 0 ? 1 : -1));
  }, { passive: true });
}


/* ═══════════════════════════════════════════
   BETA FORM
═══════════════════════════════════════════ */
const betaForm = document.getElementById('betaForm');
const formMsg  = document.getElementById('formMessage');

betaForm?.addEventListener('submit', e => {
  e.preventDefault();
  const emailInput = betaForm.querySelector('[type="email"]');
  const email = emailInput?.value?.trim();
  if (!email) return;

  const submitBtn = betaForm.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.textContent = 'Sending…'; submitBtn.disabled = true; }

  setTimeout(() => {
    if (formMsg) formMsg.textContent = '// Access request queued. Stand by.';
    betaForm.reset();
    if (submitBtn) { submitBtn.textContent = 'Send'; submitBtn.disabled = false; }
    setTimeout(() => { if (formMsg) formMsg.textContent = ''; }, 6000);
  }, 900);
});


/* ═══════════════════════════════════════════
   TCG CARD PARALLAX (mousemove on hero)
   Base rotations match CSS: lg=3deg, md=-4deg, sm=1.5deg
═══════════════════════════════════════════ */
const heroVisual    = document.querySelector('.hero-visual');
const floatingCards = document.querySelectorAll('.floating-card');

if (heroVisual && floatingCards.length) {
  const baseRotations = [4, -14, 12];
  let raf = null;

  document.addEventListener('mousemove', e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const rect = heroVisual.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      floatingCards.forEach((card, i) => {
        const depth       = [10, 7, 4][i] ?? 5;
        const baseRot     = baseRotations[i] ?? 0;
        card.style.transform =
          `rotate(${baseRot + dx * 2}deg) translate(${dx * depth}px, ${dy * depth}px)`;
      });
    });
  });

  heroVisual.addEventListener('mouseleave', () => {
    floatingCards.forEach((card, i) => {
      card.style.transform = `rotate(${baseRotations[i] ?? 0}deg)`;
    });
  });
}



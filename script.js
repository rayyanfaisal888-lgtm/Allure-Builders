/* ================================================================
   ALLURE BUILDERS — script.js
================================================================ */

// ── NAV SCROLL BEHAVIOUR ────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──────────────────────────────────────────────────
const toggle   = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay  = document.querySelector('.mobile-overlay');

function openMenu() {
  toggle.classList.add('open');
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  toggle.classList.remove('open');
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (toggle) toggle.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
if (overlay) overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

// ── SCROLL REVEAL ────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObserver.observe(el));

// ── LIGHTBOX ─────────────────────────────────────────────────────
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const galleryItems = document.querySelectorAll('.gallery-item');

let lightboxImages = [];
let currentIndex   = 0;

galleryItems.forEach((item, i) => {
  const img = item.querySelector('img');
  if (img) lightboxImages.push(img.src);
  item.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = lightboxImages[index];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
function prevImage() {
  currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentIndex];
}
function nextImage() {
  currentIndex = (currentIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[currentIndex];
}

if (lightbox) {
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev')?.addEventListener('click', prevImage);
  document.getElementById('lightboxNext')?.addEventListener('click', nextImage);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    prevImage();
    if (e.key === 'ArrowRight')   nextImage();
  });
}

// ── CONTACT FORM ─────────────────────────────────────────────────
// Replace the WEBHOOK_URL below with your Zapier webhook URL
const WEBHOOK_URL = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';

document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = form.querySelector('.btn-submit');
    const success = form.querySelector('.form-success');
    const data    = Object.fromEntries(new FormData(form));

    btn.textContent = 'Sending…';
    btn.disabled    = true;

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      form.reset();
      if (success) success.style.display = 'block';
      btn.textContent = 'Message Sent ✓';
    } catch {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      alert('There was an issue sending your message. Please call us directly at 403 607 5220.');
    }
  });
});

// ── ACTIVE NAV LINK ───────────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

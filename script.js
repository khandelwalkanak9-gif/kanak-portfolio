/* ============================================
   KANAK ANUPAM KHANDELWAL — PORTFOLIO JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- DARK MODE ---- */
  const body = document.body;
  const toggleBtn = document.getElementById('darkToggle');
  const toggleIcon = document.getElementById('toggleIcon');

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') enableDark();

  toggleBtn.addEventListener('click', () => {
    body.classList.contains('dark-mode') ? disableDark() : enableDark();
  });

  function enableDark() {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    toggleIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
  }

  function disableDark() {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
  }

  /* ---- NAVBAR SCROLL SHADOW ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50
      ? '0 4px 24px rgba(0,0,0,0.1)'
      : 'none';
  });

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active-nav'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active-nav');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObserver.observe(s));

  /* ---- SCROLL REVEAL ANIMATIONS ---- */
  const revealEls = document.querySelectorAll(
    '.about-card, .achievement-card, .project-card, .contact-card, .skill-pill'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
    revealObserver.observe(el);
  });

  /* ---- GALLERY TABS ---- */
  const tabs         = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.tab;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- LIGHTBOX ---- */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---- TYPING EFFECT ON TAGLINE ---- */
  const tagline = document.querySelector('.home-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    let i = 0;
    function type() {
      if (i < text.length) {
        tagline.textContent += text[i];
        i++;
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 900);
  }

});

/* ---- CONTACT FORM ---- */
window.handleContact = function () {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const status  = document.getElementById('formStatus');

  if (!name || !email || !subject || !message) {
    status.style.color = '#e05555';
    status.textContent = '⚠ Please fill in all fields before sending.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.style.color = '#e05555';
    status.textContent = '⚠ Please enter a valid email address.';
    return;
  }

  const mailtoLink =
    `mailto:khandelwalkanak9@gmail.com` +
    `?subject=${encodeURIComponent(subject + ' — Message from ' + name)}` +
    `&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

  window.location.href = mailtoLink;

  status.style.color = '#4caf50';
  status.textContent = '✓ Opening your email client...';

  setTimeout(() => {
    document.getElementById('contactName').value    = '';
    document.getElementById('contactEmail').value   = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
    status.textContent = '';
  }, 3000);
};

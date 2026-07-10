(function () {
  'use strict';

  var FORM_SUCCESS_HTML =
    '<div class="form--success">' +
    '<h3>Request Received!</h3>' +
    '<p>Thank you for contacting Morton Roofing. We\'ll be in touch within one business day.</p>' +
    '<p style="margin-top:1rem">Need immediate help? Call <a href="tel:3314813708">331-481-3708</a></p>' +
    '</div>';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(15, 39, 68, 0.08)'
        : 'none';
    }, { passive: true });
  }

  // Form submission (native POST via FormSubmit) + rate limiting
  var form = document.getElementById('inspectionForm');
  var FORM_RATE_KEY = 'morton_form_timestamps';
  var FORM_RATE_LIMIT = 5;
  var FORM_RATE_WINDOW_MS = 60000;

  function getRecentFormSubmissions() {
    try {
      var stored = JSON.parse(localStorage.getItem(FORM_RATE_KEY) || '[]');
      var cutoff = Date.now() - FORM_RATE_WINDOW_MS;
      return stored.filter(function (ts) { return ts > cutoff; });
    } catch (err) {
      return [];
    }
  }

  function recordFormSubmission() {
    var recent = getRecentFormSubmissions();
    recent.push(Date.now());
    localStorage.setItem(FORM_RATE_KEY, JSON.stringify(recent));
  }

  function showFormError(message) {
    var errorEl = document.getElementById('formError');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
  }

  function clearFormError() {
    var errorEl = document.getElementById('formError');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.hidden = true;
    }
  }

  function showFormSuccess() {
    if (form) {
      form.innerHTML = FORM_SUCCESS_HTML;
    }
  }

  if (form) {
    var params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      showFormSuccess();
      if (window.history.replaceState) {
        window.history.replaceState({}, '', window.location.pathname + '#contact');
      }
    }

    form.addEventListener('submit', function (e) {
      clearFormError();

      var honeypot = form.querySelector('[name="_honey"]');
      if (honeypot && honeypot.value) {
        e.preventDefault();
        return;
      }

      var recentSubmissions = getRecentFormSubmissions();
      if (recentSubmissions.length >= FORM_RATE_LIMIT) {
        e.preventDefault();
        showFormError('Too many requests. Please wait a minute before submitting again, or call 331-481-3708.');
        return;
      }

      recordFormSubmission();

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
    });
  }

  // Animate elements on scroll
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .benefit-card, .process-step, .stat-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
})();

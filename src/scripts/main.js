import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import '../styles/main.scss';

// =============================================================================
// DOM Ready
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initBurger();
  initSmoothScroll();
  initDropdowns();
  initSlider();
  initReviewMore();
  initForm();
  initDatePickers();
  initHeaderScroll();
});

// =============================================================================
// Burger menu
// =============================================================================
function initBurger() {
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  if (!burger || !nav) return;

  const closeMenu = () => {
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    nav.classList.remove('is-open');
    nav.classList.remove('is-contacts-open');
    document.body.style.overflow = '';

    // Also close any open dropdowns
    document.querySelectorAll('[data-dropdown]').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.nav__dropdown, .currency__list').forEach((d) => {
      d.hidden = true;
    });
  };

  const openMenu = () => {
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    nav.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  burger.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking nav links
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeMenu();
      }
    });
  });

  // Close menu on resize to desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    }, 100);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// =============================================================================
// Smooth scroll
// =============================================================================
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('[data-scroll]');
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-scroll');
      const target = document.getElementById(targetId);
      if (target) {
        const headerHeight = 60;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
}

// =============================================================================
// Dropdowns (currency, contacts)
// =============================================================================
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('[data-dropdown]');
  const mainNav = document.getElementById('mainNav');
  let activeDropdown = null;

  const closeAll = () => {
    dropdownToggles.forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.nav__dropdown, .currency__list').forEach((d) => {
      d.hidden = true;
    });
    if (mainNav) {
      mainNav.classList.remove('is-contacts-open');
    }
    activeDropdown = null;
  };

  dropdownToggles.forEach((toggle) => {
    const controlsId = toggle.getAttribute('aria-controls');
    const dropdown = controlsId ? document.getElementById(controlsId) : null;
    if (!dropdown) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const isContactsToggle = toggle.getAttribute('data-dropdown') === 'contacts';

      // Close all first
      dropdownToggles.forEach((t) => t.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.nav__dropdown, .currency__list').forEach((d) => {
        d.hidden = true;
      });
      if (mainNav) {
        mainNav.classList.remove('is-contacts-open');
      }

      if (!isExpanded) {
        toggle.setAttribute('aria-expanded', 'true');
        dropdown.hidden = false;
        activeDropdown = dropdown;

        if (isContactsToggle && mainNav && window.innerWidth < 1024) {
          mainNav.classList.add('is-contacts-open');
        }
      } else {
        activeDropdown = null;
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (activeDropdown && !activeDropdown.contains(e.target)) {
      const toggle = e.target.closest('[data-dropdown]');
      if (!toggle) {
        closeAll();
      }
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAll();
    }
  });

  // Currency options
  const currencyOptions = document.querySelectorAll('.currency__option');
  currencyOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value');
      const toggle = option.closest('.currency').querySelector('.currency__toggle .currency__current');
      if (toggle) {
        toggle.textContent = value;
      }
      closeAll();
    });
  });
}

// =============================================================================
// Slider
// =============================================================================
function initSlider() {
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (!track || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll('.slider__slide');
  const totalSlides = slides.length;
  let currentIndex = 0;

  const getSlidesPerView = () => {
    if (window.innerWidth >= 1280) return 2;
    return 1;
  };

  const updateSlider = () => {
    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const slideWidth = 100 / slidesPerView;
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, totalSlides - slidesPerView);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSlider();
    }, 100);
  });

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;
  const slider = document.getElementById('reviewsSlider');
  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) < swipeThreshold) return;

    const slidesPerView = getSlidesPerView();
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    if (diff > 0 && currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  };

  updateSlider();
}

// =============================================================================
// Review "read more" toggle
// =============================================================================
function initReviewMore() {
  const moreLinks = document.querySelectorAll('[data-more]');
  moreLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const review = link.closest('.review');
      if (!review) return;
      const text = review.querySelector('.review__text');
      if (!text) return;

      const isExpanded = text.classList.toggle('is-expanded');
      link.textContent = isExpanded ? 'свернуть' : 'далее...';
    });
  });
}

// =============================================================================
// Date pickers
// =============================================================================
let fpFrom = null;
let fpTo = null;

function initDatePickers() {
  const dateFromInput = document.getElementById('dateFrom');
  const dateToInput = document.getElementById('dateTo');
  if (!dateFromInput || !dateToInput) return;

  const commonOptions = {
    locale: Russian,
    dateFormat: 'd.m.Y',
    allowInput: false,
    disableMobile: false,
  };

  fpFrom = flatpickr(dateFromInput, {
    ...commonOptions,
    minDate: 'today',
    onChange: (selectedDates) => {
      if (selectedDates[0]) {
        fpTo.set('minDate', selectedDates[0]);
      }
    },
  });

  fpTo = flatpickr(dateToInput, {
    ...commonOptions,
    minDate: 'today',
  });
}

// =============================================================================
// Form handling — actual filtering
// =============================================================================
function initForm() {
  const form = document.getElementById('searchForm');
  if (!form) return;

  const cards = document.querySelectorAll('.schedule__card');
  const emptyState = document.getElementById('scheduleEmpty');
  const resetBtn = document.getElementById('resetBtn');

  // Helper: parse dd.mm.yyyy → Date (local time)
  const parseDate = (str) => {
    if (!str) return null;
    const [d, m, y] = str.split('.').map((n) => parseInt(n, 10));
    if (!d || !m || !y) return null;
    return new Date(y, m - 1, d);
  };

  // Helper: parse yyyy-mm-dd (data-date) → Date (local time)
  const parseIsoDate = (str) => {
    if (!str) return null;
    const [y, m, d] = str.split('-').map((n) => parseInt(n, 10));
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  };

  // Helper: format Date → yyyy-mm-dd (matches data-date format)
  const toIsoDate = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Update reset button enabled state
  const updateResetState = () => {
    if (!resetBtn) return;
    const dateFrom = document.getElementById('dateFrom').value;
    const dateTo = document.getElementById('dateTo').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const isFiltered = !!(dateFrom || dateTo || adults !== '1' || children !== '0');
    resetBtn.disabled = !isFiltered;
  };

  // Apply filter to cards
  const applyFilter = () => {
    const dateFromStr = document.getElementById('dateFrom').value;
    const dateToStr = document.getElementById('dateTo').value;
    const adultsVal = parseInt(document.getElementById('adults').value, 10) || 0;
    const childrenVal = parseInt(document.getElementById('children').value, 10) || 0;
    const totalGuests = adultsVal + childrenVal;

    const dateFrom = parseDate(dateFromStr);
    const dateTo = parseDate(dateToStr);

    let visibleCount = 0;

    cards.forEach((card) => {
      const cardDateStr = card.getAttribute('data-date');
      const cardSeats = parseInt(card.getAttribute('data-seats'), 10);

      let show = true;

      // Date range filter
      if (dateFrom || dateTo) {
        const cardDate = parseIsoDate(cardDateStr);
        if (dateFrom && cardDate < dateFrom) {
          show = false;
        }
        if (dateTo && show && cardDate > dateTo) {
          show = false;
        }
      }

      // Capacity filter — only show if there are enough seats for the requested guests
      if (show && totalGuests > 0) {
        if (cardSeats === 0) {
          show = false;
        }
        if (cardSeats < totalGuests) {
          show = false;
        }
      }

      // Animate
      if (show) {
        card.classList.remove('is-hidden', 'is-fading');
        visibleCount++;
      } else {
        card.classList.add('is-fading');
        setTimeout(() => {
          card.classList.add('is-hidden');
        }, 200);
      }
    });

    // Toggle empty state
    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilter();
    updateResetState();
    showSearchFeedback();
  });

  // Reset handler
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (fpFrom) fpFrom.clear();
      if (fpTo) fpTo.clear();
      document.getElementById('adults').value = '1';
      document.getElementById('children').value = '0';

      // Show all cards
      cards.forEach((card) => {
        card.classList.remove('is-hidden', 'is-fading');
      });
      if (emptyState) {
        emptyState.hidden = true;
      }
      updateResetState();
      showSearchFeedback('Фильтры сброшены');
    });
  }

  // Real-time updates for selects
  document.getElementById('adults').addEventListener('change', () => {
    updateResetState();
    if (form.querySelector('input[value]:not([readonly])')) {
      applyFilter();
    }
  });
  document.getElementById('children').addEventListener('change', () => {
    updateResetState();
  });

  // Update reset state on date changes
  if (fpFrom) {
    fpFrom.config.onChange.push(() => updateResetState());
  }
  if (fpTo) {
    fpTo.config.onChange.push(() => updateResetState());
  }

  updateResetState();
}

function showSearchFeedback(message = 'Поиск выполнен') {
  const existing = document.querySelector('.form-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'form-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background-color: #233849;
    color: #fff;
    padding: 14px 22px;
    border-radius: 4px;
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// =============================================================================
// Header scroll effect
// =============================================================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  const updateHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

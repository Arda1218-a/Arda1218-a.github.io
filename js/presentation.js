/**
 * INTERACTIVE SLIDE DECK CONTROLLER
 * Full keyboard navigation, swipe gestures, slide indicators, and fullscreen support
 */

const Presentation = {
  currentSlide: 0,
  totalSlides: 0,
  slides: [],

  init() {
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.renderDots();
    this.updateSlideView();
    this.bindEvents();
  },

  bindEvents() {
    // Next / Prev buttons
    const nextBtn = document.getElementById('pres-next-btn');
    const prevBtn = document.getElementById('pres-prev-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        this.prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      }
    });

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    const deck = document.querySelector('.deck-container');
    if (deck) {
      deck.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      deck.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          this.nextSlide();
        } else if (touchEndX - touchStartX > 50) {
          this.prevSlide();
        }
      }, { passive: true });
    }
  },

  renderDots() {
    const dotsContainer = document.getElementById('slide-dots-container');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === this.currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  },

  updateSlideView() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'exit-left');
      if (index === this.currentSlide) {
        slide.classList.add('active');
      } else if (index < this.currentSlide) {
        slide.classList.add('exit-left');
      }
    });

    // Update Counter
    const counter = document.getElementById('slide-counter-display');
    if (counter) {
      counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }

    // Update Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentSlide);
    });

    // Prev / Next button state
    const prevBtn = document.getElementById('pres-prev-btn');
    if (prevBtn) {
      prevBtn.disabled = this.currentSlide === 0;
      prevBtn.style.opacity = this.currentSlide === 0 ? '0.4' : '1';
    }
  },

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlideView();
    }
  },

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlideView();
    }
  },

  goToSlide(index) {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlide = index;
      this.updateSlideView();
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Presentation.init());

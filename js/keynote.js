/**
 * KEYNOTE MULTI-PROJECT CONTROLLER
 * Supports switching between Macro Vision and Individual Project Solo Deep-Dives
 */

const Keynote = {
  currentDeckKey: 'macro',
  currentSlide: 0,
  decks: {},

  init(decksData) {
    this.decks = decksData;
    this.bindEvents();
    this.loadDeck('macro');
  },

  bindEvents() {
    const nextBtn = document.getElementById('k-next-btn');
    const prevBtn = document.getElementById('k-prev-btn');
    const selector = document.getElementById('k-deck-selector');

    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());

    if (selector) {
      selector.addEventListener('change', (e) => {
        this.loadDeck(e.target.value);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        this.next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        this.prev();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      }
    });
  },

  loadDeck(deckKey) {
    if (!this.decks[deckKey]) return;
    this.currentDeckKey = deckKey;
    this.currentSlide = 0;
    const selector = document.getElementById('k-deck-selector');
    if (selector) selector.value = deckKey;
    this.renderDots();
    this.renderSlide(0);
  },

  getCurrentDeck() {
    return this.decks[this.currentDeckKey] || [];
  },

  renderDots() {
    const container = document.getElementById('k-dots-container');
    if (!container) return;

    const deck = this.getCurrentDeck();
    container.innerHTML = '';
    deck.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `k-dot ${idx === this.currentSlide ? 'active' : ''}`;
      dot.addEventListener('click', () => this.goTo(idx));
      container.appendChild(dot);
    });
  },

  renderSlide(idx) {
    const deck = this.getCurrentDeck();
    if (idx < 0 || idx >= deck.length) return;
    this.currentSlide = idx;
    const slide = deck[idx];

    // Left Stage
    const stageEl = document.getElementById('k-stage-content');
    if (stageEl) {
      stageEl.innerHTML = `
        <div>
          <div class="k-act-tag">${slide.actTag}</div>
          <h1 class="k-stage-title">${slide.stageTitle}</h1>
          <p class="k-stage-lead">${slide.stageLead}</p>
        </div>

        <div class="k-quote-box">
          <p class="k-quote-text">"${slide.hypnoticQuote}"</p>
          <span class="k-quote-author">— ${slide.quoteContext}</span>
        </div>

        <div class="k-metrics-matrix">
          ${slide.metrics.map(m => `
            <div class="k-metric-cell">
              <div class="k-metric-val">${m.val}</div>
              <div class="k-metric-sub">${m.label}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Right Script
    const scriptEl = document.getElementById('k-script-content');
    if (scriptEl) {
      scriptEl.innerHTML = `
        <div class="k-script-header">
          <span class="k-script-title">🎭 Konuşma Metni & Psikolojik Kılavuz (Patrick Jane Metodu)</span>
          <span class="k-act-tag" style="margin-bottom:0;">Perde ${idx + 1} / ${deck.length}</span>
        </div>
        <div class="k-script-body">
          ${slide.speechScript}
        </div>
      `;
      const scriptPanel = document.querySelector('.k-script-panel');
      if (scriptPanel) scriptPanel.scrollTop = 0;
    }

    // Update Counter
    const counterEl = document.getElementById('k-slide-counter');
    if (counterEl) {
      counterEl.textContent = `${this.currentSlide + 1} / ${deck.length}`;
    }

    // Update Dots
    document.querySelectorAll('.k-dot').forEach((dot, dIdx) => {
      dot.classList.toggle('active', dIdx === this.currentSlide);
    });

    // Update Prev Button state
    const prevBtn = document.getElementById('k-prev-btn');
    if (prevBtn) {
      prevBtn.style.opacity = this.currentSlide === 0 ? '0.4' : '1';
      prevBtn.disabled = this.currentSlide === 0;
    }
  },

  next() {
    const deck = this.getCurrentDeck();
    if (this.currentSlide < deck.length - 1) {
      this.renderSlide(this.currentSlide + 1);
    }
  },

  prev() {
    if (this.currentSlide > 0) {
      this.renderSlide(this.currentSlide - 1);
    }
  },

  goTo(idx) {
    this.renderSlide(idx);
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }
};

window.Keynote = Keynote;

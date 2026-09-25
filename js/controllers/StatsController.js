// ===== Controller: estatísticas =====
// Também é a entrada pela topbar (botão global do app).

import { sfx } from '../audio.js';

const $ = (sel) => document.querySelector(sel);

export class StatsController {
  constructor({ view, screenManager, statsService, onBack }) {
    this.view = view;
    this.screenManager = screenManager;
    this.statsService = statsService;
    this.onBack = onBack;
  }

  wire() {
    document.querySelector('#btn-stats').addEventListener('click', () => {
      sfx.click();
      this.show();
    });

    document.querySelector('#btn-stats-back').addEventListener('click', () => {
      sfx.click();
      this.onBack();
    });

    document.querySelector('#btn-reset-stats').addEventListener('click', () => {
      if (!confirm('Apagar todas as estatísticas?')) return;
      this.statsService.reset();
      this.view.render(this.statsService.data);
    });
  }

  show() {
    this.view.render(this.statsService.data);
    this.screenManager.show('stats');
  }
}
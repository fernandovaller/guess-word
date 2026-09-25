// ===== Controller: estatísticas =====
// Também é a entrada pela topbar (botão global do app).

import { sfx } from '../audio.js';
import { confirmDialog } from '../views/ConfirmDialog.js';

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

    document.querySelector('#btn-reset-stats').addEventListener('click', async () => {
      sfx.click();
      const ok = await confirmDialog({
        title: 'Apagar estatísticas?',
        message: 'Todos os jogos, recordes e sequências serão perdidos. Não dá para desfazer.',
        confirmLabel: 'Apagar tudo',
        danger: true,
      });
      if (!ok) return;
      this.statsService.reset();
      this.view.render(this.statsService.data);
    });
  }

  show() {
    this.view.render(this.statsService.data);
    this.screenManager.show('stats');
  }
}
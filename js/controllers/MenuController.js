// ===== Controller: menu (escolha de tema) =====

import { THEMES } from '../data.js';
import { sfx } from '../audio.js';

export class MenuController {
  constructor({ view, screenManager, statsService, onStart, onHowTo }) {
    this.view = view;
    this.screenManager = screenManager;
    this.statsService = statsService;
    this.onStart = onStart;
    this.onHowTo = onHowTo;
  }

  wire() {
    // Delegação no container: os cards são recriados a cada render
    this.view.grid.addEventListener('click', (e) => {
      const card = e.target.closest('.theme-card');
      if (!card) return;
      sfx.click();
      const theme = THEMES.find((t) => t.id === card.dataset.theme);
      if (theme) this.onStart(theme);
    });

    document.querySelector('#btn-howto').addEventListener('click', () => {
      sfx.click();
      this.onHowTo();
    });
  }

  show() {
    this.view.render(this.statsService.data);
    this.screenManager.show('menu');
  }
}
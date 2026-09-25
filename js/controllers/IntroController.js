// ===== Controller: tela de abertura =====

import { sfx } from '../audio.js';

const $ = (sel) => document.querySelector(sel);

export class IntroController {
  constructor({ screenManager, onPlay }) {
    this.screenManager = screenManager;
    this.onPlay = onPlay;
  }

  wire() {
    $('#btn-play').addEventListener('click', () => {
      sfx.click();
      this.onPlay();
    });

    // Enter também joga a partir da abertura
    document.addEventListener('keydown', (e) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (this.screenManager.active() === 'intro' && e.key === 'Enter') {
        sfx.click();
        this.onPlay();
      }
    });
  }

  show() {
    this.screenManager.show('intro');
  }
}
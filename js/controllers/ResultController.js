// ===== Controller: resultado da rodada =====

import { sfx } from '../audio.js';

const $ = (sel) => document.querySelector(sel);

export class ResultController {
  constructor({ view, screenManager, onAgain, onMenu }) {
    this.view = view;
    this.screenManager = screenManager;
    this.onAgain = onAgain;
    this.onMenu = onMenu;
    this.lastGame = null;
  }

  wire() {
    $('#btn-again').addEventListener('click', () => {
      sfx.click();
      this.repeat();
    });

    $('#btn-menu').addEventListener('click', () => {
      sfx.click();
      this.onMenu();
    });

    // Enter repete a rodada
    document.addEventListener('keydown', (e) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (this.screenManager.active() === 'result' && e.key === 'Enter') {
        sfx.click();
        this.repeat();
      }
    });
  }

  show({ won, game, stats }) {
    this.lastGame = game;
    this.view.show({ won, game, stats });
    this.screenManager.show('result');
  }

  repeat() {
    if (this.lastGame) this.onAgain(this.lastGame.theme);
  }
}
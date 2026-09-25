// ===== Controller: rodada do jogo =====
// Orquestra chutes, dica e fim de rodada; as regras vivem no service (game.js).

import { canUseHint, createGame, guessLetter, useHint } from '../game.js';
import { sfx } from '../audio.js';

const $ = (sel) => document.querySelector(sel);

export class GameController {
  constructor({ view, screenManager, statsService, onRoundEnd, onBack }) {
    this.view = view;
    this.screenManager = screenManager;
    this.statsService = statsService;
    this.onRoundEnd = onRoundEnd;
    this.onBack = onBack;
    this.current = null;
  }

  wire() {
    // Teclado virtual (delegação no container)
    $('#keyboard').addEventListener('click', (e) => {
      const key = e.target.closest('.key');
      if (!key || key.disabled) return;
      sfx.click();
      this.guess(key.dataset.letter);
    });

    $('#btn-hint').addEventListener('click', () => {
      sfx.click();
      this.hint();
    });

    $('#btn-back').addEventListener('click', () => {
      sfx.click();
      this.onBack();
    });

    // Teclado físico (aceita acentos; a normalização interna ignora não-letras)
    document.addEventListener('keydown', (e) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (this.screenManager.active() !== 'game' || !this.isActive()) return;
      if (e.key.length === 1) this.guess(e.key);
    });
  }

  isActive() {
    return this.current?.status === 'playing';
  }

  show() {
    this.screenManager.show('game');
  }

  start(theme) {
    this.current = createGame(theme);
    this.view.startRound(this.current);
    this.show();
  }

  guess(char) {
    if (!this.current || this.current.status !== 'playing') return;

    const res = guessLetter(this.current, char);
    if (res.type === 'repeat' || res.type === 'invalid') return;

    if (res.type === 'hit') {
      this.view.revealTiles(res.idxs, 'revealed');
      this.view.refreshKeyboard(this.current);
      this.view.updateScore(this.current);
      this.view.setHintEnabled(canUseHint(this.current));
      sfx.correct();
    } else {
      this.view.loseHeart(this.current);
      this.view.shakeWord();
      sfx.wrong();
    }

    if (res.won || res.lost) this.finish();
  }

  hint() {
    if (!this.current || this.current.status !== 'playing') return;
    const res = useHint(this.current);
    if (!res) return;

    this.view.revealTiles(res.idxs, 'hinted');
    this.view.loseHeart(this.current);
    this.view.refreshKeyboard(this.current);
    this.view.setHintEnabled(canUseHint(this.current));
    sfx.hint();
    if (res.won) this.finish();
  }

  finish() {
    const won = this.current.status === 'won';
    this.view.setHintEnabled(false);
    if (!won) this.view.revealAllMissed(this.current);

    const stats = this.statsService.record(this.current);
    if (won) sfx.win(); else sfx.lose();

    this.onRoundEnd({ won, game: this.current, stats });
  }
}
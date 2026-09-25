// ===== View da tela de jogo: tiles, corações, teclado e pontos =====

import { RULES } from '../game.js';
import { icon } from '../icons.js';
import { themeImage } from './images.js';

const $ = (sel) => document.querySelector(sel);
const KEY_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export class GameView {
  constructor() {
    this.heartsEl = $('#hearts');
    this.wordEl = $('#word');
    this.keyboardEl = $('#keyboard');
    this.buildKeyboard();
  }

  /* ---------- Teclado virtual (montado uma única vez) ---------- */

  buildKeyboard() {
    this.keyboardEl.innerHTML = '';

    for (const row of KEY_ROWS) {
      const rowEl = document.createElement('div');
      rowEl.className = 'kb-row';

      for (const letter of row) {
        const key = document.createElement('button');
        key.type = 'button';
        key.className = 'key';
        key.dataset.letter = letter;
        key.textContent = letter;
        key.setAttribute('aria-label', `Letra ${letter}`);
        rowEl.appendChild(key);
      }
      this.keyboardEl.appendChild(rowEl);
    }
  }

  // Recolore as teclas a partir do estado do jogo (fonte única de verdade).
  refreshKeyboard(game) {
    this.keyboardEl.querySelectorAll('.key').forEach((key) => {
      const norm = key.dataset.letter;
      const used = game.used.has(norm);
      const hit = used && game.letters.some((l) => l.norm === norm);
      key.disabled = used;
      key.classList.toggle('hit', hit);
      key.classList.toggle('miss', used && !hit);
    });
  }

  /* ---------- Rodada ---------- */

  startRound(game) {
    $('#game-theme').innerHTML = `${themeImage(game.theme)}<span>${game.theme.name}</span>`;
    this.setHintEnabled(true);
    this.renderHearts(game);
    this.renderTiles(game);
    this.refreshKeyboard(game);
    this.updateScore(game);
  }

  renderHearts(game) {
    this.heartsEl.innerHTML = '';
    for (let i = 0; i < RULES.START_LIVES; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart';
      heart.innerHTML = icon('heart');
      this.heartsEl.appendChild(heart);
    }
  }

  loseHeart(game) {
    const hearts = this.heartsEl.children;
    if (hearts[game.lives]) hearts[game.lives].classList.add('lost');
  }

  renderTiles(game) {
    this.wordEl.innerHTML = '';
    for (const letter of game.letters) {
      const tile = document.createElement('span');
      tile.className = 'tile';
      tile.dataset.char = letter.char;
      this.wordEl.appendChild(tile);
    }
  }

  // Revela posições com animação em cascata. cls: 'revealed' | 'hinted' | 'miss'
  revealTiles(idxs, cls) {
    const tiles = this.wordEl.children;
    idxs.forEach((i, k) => {
      const tile = tiles[i];
      tile.textContent = tile.dataset.char;
      tile.classList.add(cls);
      tile.style.animationDelay = `${k * 80}ms`;
    });
  }

  // No fim de rodada perdida, revela em vermelho as letras não descobertas.
  revealAllMissed(game) {
    const idxs = game.letters.map((l, i) => (l.revealed ? -1 : i)).filter((i) => i >= 0);
    this.revealTiles(idxs, 'miss');
  }

  updateScore(game) {
    const el = $('#game-score');
    el.textContent = `${game.score} pts`;
    el.classList.remove('pulse');
    void el.offsetWidth; // reinicia a animação
    el.classList.add('pulse');
  }

  shakeWord() {
    this.wordEl.classList.remove('shake');
    void this.wordEl.offsetWidth;
    this.wordEl.classList.add('shake');
  }

  setHintEnabled(enabled) {
    $('#btn-hint').disabled = !enabled;
  }
}
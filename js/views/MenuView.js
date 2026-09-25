// ===== View do menu: cards de tema =====

import { THEMES } from '../data.js';
import { themeImage } from './images.js';

export class MenuView {
  constructor() {
    this.grid = document.querySelector('#theme-grid');
  }

  render(stats) {
    this.grid.innerHTML = '';

    for (const theme of THEMES) {
      const s = stats.byTheme[theme.id];
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'theme-card';
      card.dataset.theme = theme.id;
      card.innerHTML = `
        ${themeImage(theme)}
        <span class="theme-name">${theme.name}</span>
        <span class="theme-meta">${s ? `${s.wins}/${s.plays} vitórias` : `${theme.words.length} palavras`}</span>`;
      this.grid.appendChild(card);
    }
  }
}
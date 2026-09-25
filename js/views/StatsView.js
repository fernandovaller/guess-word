// ===== View das estatísticas =====

import { THEMES } from '../data.js';
import { icon } from '../icons.js';
import { themeImage } from './images.js';

const $ = (sel) => document.querySelector(sel);

export class StatsView {
  render(stats) {
    const acc = stats.games ? Math.round((stats.wins / stats.games) * 100) : 0;
    const card = (name, label, value) => `
      <div class="stat-card">
        <span class="stat-icon">${icon(name)}</span>
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>`;

    $('#stats-totals').innerHTML = [
      card('dice', 'Jogos', stats.games),
      card('trophy', 'Vitórias', stats.wins),
      card('target', 'Aproveitamento', `${acc}%`),
      card('flame', 'Sequência', stats.streak),
      card('crown', 'Melhor sequência', stats.bestStreak),
      card('star', 'Recorde', `${stats.bestScore} pts`),
    ].join('');

    $('#stats-themes').innerHTML = THEMES.map((theme) => {
      const s = stats.byTheme[theme.id];
      const plays = s?.plays ?? 0;
      const wins = s?.wins ?? 0;
      const pct = plays ? Math.round((wins / plays) * 100) : 0;
      return `
        <div class="stats-row">
          <span class="stats-theme">${themeImage(theme)}${theme.name}</span>
          <span class="stats-value">${wins}/${plays} · ${pct}%</span>
        </div>`;
    }).join('');
  }
}
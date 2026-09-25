// ===== View do resultado (+ confete) =====

import { icon } from '../icons.js';

const $ = (sel) => document.querySelector(sel);

export class ResultView {
  show({ won, game, stats }) {
    $('#result-title').innerHTML =
      `${icon(won ? 'trophy' : 'heart-crack')}<span>${won ? 'Você acertou!' : 'Não foi dessa vez'}</span>`;
    $('#result-word').textContent = game.word.toUpperCase();
    $('#result-score').textContent = won
      ? `${game.score} pontos nesta rodada`
      : `Você fez ${game.score} pts — só vencendo para pontuar de verdade`;
    $('#result-streak').innerHTML =
      `${icon('flame')} Sequência: ${stats.streak} · ${icon('crown')} Recorde: ${stats.bestStreak} · ${icon('star')} Melhor rodada: ${stats.bestScore} pts`;

    if (won) celebrate();
  }
}

// Confete: gerado só na vitória, respeitando prefers-reduced-motion.
function celebrate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const box = $('#confetti');
  const colors = ['#7c6cff', '#38d17c', '#ffc24b', '#ff5470', '#4bc6ff'];
  box.innerHTML = '';

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.width = `${6 + Math.random() * 6}px`;
    piece.style.height = `${10 + Math.random() * 8}px`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    box.appendChild(piece);
  }
  setTimeout(() => { box.innerHTML = ''; }, 4500);
}
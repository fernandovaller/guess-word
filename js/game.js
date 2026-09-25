// ===== Regras e estado do jogo =====

import { normalize, randomItem } from './utils.js';

// Ajuste os valores aqui para mudar a dificuldade/pontuação.
export const RULES = {
  START_LIVES: 6,        // corações por rodada
  POINTS_PER_TILE: 10,   // pontos por letra revelada (por posição)
  BONUS_PER_LIFE: 15,    // bônus por coração restante na vitória
  BONUS_PER_LETTER: 5,   // bônus por letra da palavra na vitória
};

// Evita repetir a mesma palavra em sequência, por tema.
const lastWordByTheme = new Map();

export function createGame(theme) {
  const word = randomItem(theme.words, lastWordByTheme.get(theme.id));
  lastWordByTheme.set(theme.id, word);

  return {
    theme,
    word,
    // Cada posição: { char (original), norm (sem acento), revealed }
    letters: [...word].map((char) => ({ char, norm: normalize(char), revealed: false })),
    used: new Set(),     // letras já testadas/dicas (normalizadas)
    lives: RULES.START_LIVES,
    score: 0,
    hintsUsed: 0,
    status: 'playing',   // 'playing' | 'won' | 'lost'
  };
}

// Chuta uma letra. Retorna { type: 'hit'|'miss'|'repeat'|'invalid', ... }
export function guessLetter(game, char) {
  if (game.status !== 'playing') return { type: 'invalid' };

  const norm = normalize(char);
  if (!/^[A-Z]$/.test(norm) || game.used.has(norm)) return { type: 'repeat' };
  game.used.add(norm);

  const idxs = [];
  game.letters.forEach((letter, i) => {
    if (letter.norm === norm && !letter.revealed) {
      letter.revealed = true;
      idxs.push(i);
    }
  });

  if (idxs.length > 0) {
    game.score += idxs.length * RULES.POINTS_PER_TILE;
    if (game.letters.every((l) => l.revealed)) game.status = 'won';
    return { type: 'hit', idxs, won: game.status === 'won' };
  }

  game.lives -= 1;
  if (game.lives === 0) game.status = 'lost';
  return { type: 'miss', livesLeft: game.lives, lost: game.status === 'lost' };
}

// A dica custa 1 coração e nunca pode zerar as vidas.
export function canUseHint(game) {
  return game.status === 'playing' && game.lives > 1 && game.letters.some((l) => !l.revealed);
}

// Revela todas as posições de uma letra ainda oculta. Retorna null se não puder usar.
export function useHint(game) {
  if (!canUseHint(game)) return null;

  const hiddenNorms = [...new Set(game.letters.filter((l) => !l.revealed).map((l) => l.norm))];
  const norm = hiddenNorms[Math.floor(Math.random() * hiddenNorms.length)];

  const idxs = [];
  game.letters.forEach((letter, i) => {
    if (letter.norm === norm) {
      letter.revealed = true;
      idxs.push(i);
    }
  });

  game.used.add(norm);
  game.lives -= 1;
  game.hintsUsed += 1;
  if (game.letters.every((l) => l.revealed)) game.status = 'won';
  return { norm, idxs, won: game.status === 'won' };
}
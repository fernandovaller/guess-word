// ===== Persistência (localStorage): estatísticas e preferência de som =====

const STATS_KEY = 'gtw-stats-v1';
const SOUND_KEY = 'gtw-sound';

export function defaultStats() {
  return { games: 0, wins: 0, losses: 0, streak: 0, bestStreak: 0, bestScore: 0, byTheme: {} };
}

export function loadStats() {
  try {
    const raw = JSON.parse(localStorage.getItem(STATS_KEY)) ?? {};
    const stats = { ...defaultStats(), ...raw };
    stats.byTheme ??= {};
    return stats;
  } catch {
    return defaultStats();
  }
}

export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    /* localStorage indisponível (modo privado etc.) — segue sem salvar */
  }
}

// Registra o fim de uma rodada. Pontos só entram no recorde com vitória.
export function recordResult(stats, game) {
  const themeStats = stats.byTheme[game.theme.id] ?? (stats.byTheme[game.theme.id] = { plays: 0, wins: 0 });

  stats.games += 1;
  themeStats.plays += 1;

  if (game.status === 'won') {
    stats.wins += 1;
    themeStats.wins += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
    stats.bestScore = Math.max(stats.bestScore, game.score);
  } else {
    stats.losses += 1;
    stats.streak = 0;
  }

  saveStats(stats);
  return stats;
}

export function resetStats() {
  const fresh = defaultStats();
  saveStats(fresh);
  return fresh;
}

// Som: 'on' por padrão; guarda 'off' quando silenciado.
export function isMuted() {
  try {
    return localStorage.getItem(SOUND_KEY) === 'off';
  } catch {
    return false;
  }
}

// Alterna e retorna o novo estado: true = mudo.
export function toggleSound() {
  try {
    localStorage.setItem(SOUND_KEY, isMuted() ? 'on' : 'off');
  } catch {
    /* segue sem persistir */
  }
  return isMuted();
}
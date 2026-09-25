// ===== Service: estatísticas do jogador =====
// Fonte única do estado de estatísticas + persistência (localStorage).

import { loadStats, recordResult, resetStats } from './storage.js';

export class StatsService {
  constructor() {
    this.stats = loadStats();
  }

  get data() {
    return this.stats;
  }

  // Registra o fim de uma rodada e persiste.
  record(game) {
    return recordResult(this.stats, game);
  }

  reset() {
    this.stats = resetStats();
    return this.stats;
  }
}
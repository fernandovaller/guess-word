// ===== Sons: sintetizados com WebAudio, sem arquivos externos =====

import { isMuted } from './storage.js';

let ctx = null;

function context() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Uma nota com envelope simples (attack instantâneo, decay exponencial).
function tone(freq, { at = 0, dur = 0.15, type = 'sine', vol = 0.12, slideTo = null } = {}) {
  const ac = context();
  if (!ac) return;

  const t0 = ac.currentTime + at;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);

  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

const rawSfx = {
  click() {
    tone(700, { dur: 0.06, vol: 0.05, type: 'triangle' });
  },
  correct() {
    tone(660, { dur: 0.1 });
    tone(880, { at: 0.08, dur: 0.14 });
  },
  wrong() {
    tone(180, { dur: 0.25, type: 'sawtooth', vol: 0.09, slideTo: 110 });
  },
  hint() {
    tone(1200, { dur: 0.12, type: 'triangle' });
    tone(1600, { at: 0.09, dur: 0.12, type: 'triangle' });
  },
  // Ação destrutiva confirmada: dois tons descendo ("algo foi removido")
  confirm() {
    tone(320, { dur: 0.12, type: 'triangle', vol: 0.1 });
    tone(180, { at: 0.09, dur: 0.2, type: 'sawtooth', vol: 0.07 });
  },
  win() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, { at: i * 0.12, dur: 0.18 }));
  },
  lose() {
    [330, 262, 196].forEach((f, i) => tone(f, { at: i * 0.15, dur: 0.22, type: 'sawtooth', vol: 0.08 }));
  },
};

// Todas as funções respeitam o mudo.
export const sfx = Object.fromEntries(
  Object.entries(rawSfx).map(([name, fn]) => [name, (...args) => {
    if (!isMuted()) fn(...args);
  }]),
);
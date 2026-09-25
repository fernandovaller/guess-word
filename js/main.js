// ===== Bootstrap: composição da aplicação =====
// O main não contém regras nem render: monta as dependências e liga os
// controllers (um por tela). As regras vivem nos services (game.js, storage.js).
// Referências cruzadas entre controllers ficam em setas — resolvidas na hora
// do evento, então a ordem de declaração não importa.

import { icon, initIconOverrides, renderIcons } from './icons.js';
import { isMuted, toggleSound } from './storage.js';
import { sfx } from './audio.js';
import { StatsService } from './stats-service.js';

import { ScreenManager } from './views/ScreenManager.js';
import { initImageFallbacks } from './views/images.js';
import { MenuView } from './views/MenuView.js';
import { GameView } from './views/GameView.js';
import { ResultView } from './views/ResultView.js';
import { StatsView } from './views/StatsView.js';

import { IntroController } from './controllers/IntroController.js';
import { MenuController } from './controllers/MenuController.js';
import { GameController } from './controllers/GameController.js';
import { ResultController } from './controllers/ResultController.js';
import { StatsController } from './controllers/StatsController.js';

// --- DOM: ícones e fallbacks (uma única vez) ---
initImageFallbacks();
renderIcons();
initIconOverrides();

// --- Infra e services ---
const screenManager = new ScreenManager();
const statsService = new StatsService();

// --- Views ---
const menuView = new MenuView();
const gameView = new GameView();
const resultView = new ResultView();
const statsView = new StatsView();

// --- Controllers (um por tela) ---
const introCtrl = new IntroController({
  screenManager,
  onPlay: () => menuCtrl.show(),
});

const menuCtrl = new MenuController({
  view: menuView,
  screenManager,
  statsService,
  onStart: (theme) => gameCtrl.start(theme),
  onHowTo: () => introCtrl.show(),
});

const gameCtrl = new GameController({
  view: gameView,
  screenManager,
  statsService,
  onRoundEnd: (resultado) => resultCtrl.show(resultado),
  onBack: () => menuCtrl.show(),
});

const resultCtrl = new ResultController({
  view: resultView,
  screenManager,
  onAgain: (theme) => gameCtrl.start(theme),
  onMenu: () => menuCtrl.show(),
});

const statsCtrl = new StatsController({
  view: statsView,
  screenManager,
  statsService,
  onBack: () => (gameCtrl.isActive() ? gameCtrl.show() : menuCtrl.show()),
});

// --- Eventos ---
introCtrl.wire();
menuCtrl.wire();
gameCtrl.wire();
resultCtrl.wire();
statsCtrl.wire();

// Chrome global: botão de som (fora de qualquer tela)
const btnSound = document.querySelector('#btn-sound');
const paintSound = () => {
  btnSound.innerHTML = icon(isMuted() ? 'volume-off' : 'volume-on');
};
paintSound();
btnSound.addEventListener('click', () => {
  toggleSound();
  paintSound();
  if (!isMuted()) sfx.click();
});

// --- Partida ---
// A abertura com as instruções aparece sempre, em toda visita ao jogo.
screenManager.show('intro');

// --- PWA: service worker (cache offline) ---
// Precisa de http://localhost ou HTTPS; em file:// o navegador ignora.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* sem SW o jogo funciona igual — só perde o offline */
    });
  });
}
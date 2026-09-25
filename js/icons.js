// ===== Ícones SVG inline (com override por imagem) =====
// Padrão: SVG desenhado à mão em viewBox 24×24, estilo traço (stroke),
// herdando a cor do texto via currentColor. Preenchidos (♥, ★) usam fill.
// Override: se existir assets/icons/<nome>.png, o ícone vira imagem
// (mesmo comportamento das imagens dos temas, com o SVG como reserva).
// Para usar: icon('lightbulb') em templates, ou data-icon no HTML
// + renderIcons() no bootstrap (slots estáticos do index.html).

const ICONS = {
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',

  'volume-on': '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',

  'volume-off': '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 9l6 6"/><path d="M22 9l-6 6"/>',

  chart: '<path d="M3 20h18"/><path d="M7 20v-5"/><path d="M12 20V9"/><path d="M17 20V4"/>',

  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',

  play: '<path fill="currentColor" stroke="none" d="M8 5.5v13l11-6.5z"/>',

  keyboard: '<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><circle cx="6.5" cy="9" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="0.9" fill="currentColor" stroke="none"/><circle cx="17.5" cy="9" r="0.9" fill="currentColor" stroke="none"/><circle cx="8" cy="12.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="12.5" r="0.9" fill="currentColor" stroke="none"/><circle cx="16" cy="12.5" r="0.9" fill="currentColor" stroke="none"/><path d="M9 15.5h6"/>',

  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H7"/>',

  home: '<path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',

  lightbulb: '<path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 1 0 18 8a6 6 0 0 0-12 0 4.65 4.65 0 0 0 1.5 5.5c.76.76 1.23 1.52 1.41 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',

  heart: '<path fill="currentColor" stroke="none" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35z"/>',

  'heart-crack': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/><path d="M12 6.5l-2 3.5 3 2-2 3.5"/>',

  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 5H5.5a2.5 2.5 0 0 0 2.7 3.2"/><path d="M16 5h2.5a2.5 2.5 0 0 1-2.7 3.2"/><path d="M12 12v4"/><path d="M8.5 19.5h7"/><path d="M7 22h10"/>',

  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',

  dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" stroke="none"/>',

  crown: '<path d="M3 6l4.5 3.5L12 4l4.5 5.5L21 6l-2.2 11H5.2L3 6z"/><path d="M6 20.5h12"/>',

  star: '<path fill="currentColor" stroke="none" d="M12 2.5l2.95 5.98 6.6.96-4.78 4.65 1.13 6.58L12 17.58l-5.9 3.09 1.13-6.58L2.45 9.44l6.6-.96L12 2.5z"/>',
};

// ===== Override por imagem =====

const OVERRIDES_DIR = 'assets/icons';
const imageOverrides = new Set(); // nomes que têm <nome>.png no servidor

// Monta o ícone: imagem se existir, senão o SVG. O tamanho (24) é
// ajustado por contexto no CSS — vale para os dois formatos.
export function icon(name) {
  if (imageOverrides.has(name)) {
    return `<img class="icon icon-img" src="${OVERRIDES_DIR}/${name}.png" alt="">`;
  }

  const body = ICONS[name];
  if (!body) return '';
  return `<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// Sonda assets/icons/<nome>.png uma única vez por ícone: se a imagem
// carregar, ativa o override e já troca os slots estáticos [data-icon].
// Conteúdo dinâmico (corações, estatísticas) usa o cache na próxima renderização.
export function initIconOverrides() {
  for (const name of ICON_NAMES) {
    const probe = new Image();
    probe.onload = () => {
      imageOverrides.add(name);
      document.querySelectorAll(`[data-icon="${name}"]`).forEach((el) => {
        el.innerHTML = icon(name);
      });
    };
    probe.src = `${OVERRIDES_DIR}/${name}.png`;
  }
}

// Substitui os slots [data-icon] do HTML estático pelos ícones (no bootstrap).
export function renderIcons() {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });
}

export const ICON_NAMES = Object.keys(ICONS);
// ===== Navegação entre telas =====
// Única fonte de verdade sobre qual tela está ativa (id sem o prefixo "screen-").

export class ScreenManager {
  show(name) {
    document.querySelectorAll('.screen').forEach((s) => {
      s.classList.toggle('active', s.id === `screen-${name}`);
    });
  }

  active() {
    const el = document.querySelector('.screen.active');
    return el ? el.id.replace('screen-', '') : null;
  }
}
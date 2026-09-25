// ===== Modal de confirmação (substitui o confirm() nativo) =====
// Uso: const ok = await confirmDialog({ title, message, confirmLabel, danger });
// Resolve true (confirmar) ou false (cancelar / Escape / clique no fundo).
// Em diálogos destrutivos, o foco começa em "Cancelar" — Enter não apaga sem querer.

import { icon } from '../icons.js';
import { sfx } from '../audio.js';

const $ = (sel) => document.querySelector(sel);

let overlay = null;   // criado na primeira chamada
let resolveOpen = null; // promise em aberto, se houver
let dangerOpen = false; // diálogo em aberto é destrutivo?

function build() {
  overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-message">
      <span class="modal-icon"></span>
      <h3 id="modal-title" class="modal-title"></h3>
      <p id="modal-message" class="modal-message"></p>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" data-action="cancel"></button>
        <button type="button" class="btn" data-action="confirm"></button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  // Botões confirmam/cancelam; clique no fundo escuro cancela
  overlay.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (btn) settle(btn.dataset.action === 'confirm');
    else if (e.target === overlay) settle(false);
  });

  // Escape cancela; Tab fica preso entre os dois botões
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      settle(false);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const [cancel, confirm] = overlay.querySelectorAll('[data-action]');
      (document.activeElement === cancel ? confirm : cancel).focus();
    }
  });
}

function settle(ok) {
  if (!resolveOpen) return;
  (ok ? (dangerOpen ? sfx.confirm : sfx.click) : sfx.click)();
  overlay.classList.remove('open');
  const resolve = resolveOpen;
  resolveOpen = null;
  resolve(ok);
}

export function confirmDialog({
  icon: iconName = 'trash',
  title,
  message = '',
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
} = {}) {
  if (resolveOpen) return Promise.resolve(false); // já aberto: trata como cancelamento

  if (!overlay) build();

  overlay.querySelector('.modal-icon').innerHTML = icon(iconName);
  $('#modal-title').textContent = title;
  $('#modal-message').textContent = message;

  const [cancelBtn, confirmBtn] = overlay.querySelectorAll('[data-action]');
  cancelBtn.textContent = cancelLabel;
  confirmBtn.textContent = confirmLabel;
  confirmBtn.className = danger ? 'btn btn-danger-solid' : 'btn btn-primary';

  const lastFocus = document.activeElement;
  dangerOpen = danger;
  overlay.classList.add('open');
  cancelBtn.focus(); // destrutivo: Enter cai no botão seguro

  return new Promise((resolve) => {
    resolveOpen = (ok) => {
      lastFocus?.focus?.();
      resolve(ok);
    };
  });
}
// ===== Imagens com fallback =====

// <img> do tema; se o arquivo faltar, o fallback global troca pelo emoji.
export function themeImage(theme) {
  return `<img class="theme-img" src="${theme.image}" alt="" loading="lazy" data-fallback="${theme.icon}">`;
}

// Uma única vez: troca automaticamente por emoji qualquer imagem que não carregar.
export function initImageFallbacks() {
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.dataset.fallback) {
      const span = document.createElement('span');
      span.className = `${img.className} img-fallback`;
      span.textContent = img.dataset.fallback;
      img.replaceWith(span);
    }
  }, true);
}
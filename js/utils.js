// ===== Utilidades gerais =====

// Normaliza uma letra/palavra: remove acentos e devolve em MAIÚSCULAS.
// Ex.: 'ç' -> 'C', 'á' -> 'A' — assim chutar "A" acerta "á".
export function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
}

// Sorteia um item de uma lista, evitando repetir o último (quando possível).
export function randomItem(items, avoid = null) {
  if (items.length === 0) throw new Error('Lista vazia');
  const pool = avoid != null && items.length > 1 ? items.filter((i) => i !== avoid) : items;
  return pool[Math.floor(Math.random() * pool.length)];
}
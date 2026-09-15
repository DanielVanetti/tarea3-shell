// Portada: pone las direcciones reales de cada mini-sitio en sus tarjetas.
// Dentro del shell, "Abrir" le pide al shell que cambie de sitio (así se marca el botón);
// abierta sola, el enlace funciona como un enlace normal.

const urls = window.APP_URLS;
const insideShell = window.parent !== window;

for (const el of document.querySelectorAll('[data-url]')) {
  el.textContent = urls[el.dataset.url];
}

for (const link of document.querySelectorAll('[data-site]')) {
  const site = link.dataset.site;
  link.href = urls[site];
  link.addEventListener('click', event => {
    if (!insideShell) return;
    event.preventDefault();
    window.parent.postMessage({ site }, location.origin);
  });
}

// Shell: cada botón carga un mini-sitio dentro del iframe.
// El mini-sitio activo queda en el hash (#libros) para poder enlazarlo directo.

const urls = window.APP_URLS;

const SITES = {
  home: 'home.html',
  libros: urls.libros,
  autores: urls.autores,
  editoriales: urls.editoriales,
  premios: urls.premios
};

const frame = document.getElementById('frame');
const openTab = document.getElementById('open-tab');
const buttons = document.querySelectorAll('.shell-nav [data-site]');

function show(site) {
  if (!(site in SITES)) site = 'home';

  if (frame.getAttribute('src') !== SITES[site]) frame.setAttribute('src', SITES[site]);
  openTab.href = SITES[site];

  for (const button of buttons) {
    const active = button.dataset.site === site;
    button.classList.toggle('button-primary', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  }

  const hash = site === 'home' ? '' : `#${site}`;
  if (location.hash !== hash) history.replaceState(null, '', location.pathname + hash);
}

for (const button of buttons) {
  button.addEventListener('click', () => show(button.dataset.site));
}

// home.html (mismo origen) pide abrir un mini-sitio desde sus tarjetas.
window.addEventListener('message', event => {
  if (event.origin === location.origin && event.data?.site) show(event.data.site);
});

window.addEventListener('hashchange', () => show(location.hash.slice(1)));

show(location.hash.slice(1));

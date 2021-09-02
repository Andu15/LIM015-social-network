import { changeViews } from './routes/router.js';
// Este es el punto de entrada de tu aplicacion
const init = () => {
  // window.location.hash = '#/';
  changeViews(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeViews(window.location.hash);
  });
};

window.addEventListener('load', init);

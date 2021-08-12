/* eslint-disable spaced-comment */
// Este es el punto de entrada de tu aplicacion
import { changePages } from './routes/router.js';
import { logueo, clickOnSignIn } from "./pages/login.js";
import { register } from './pages/signIn.js';

const init = () => {
  changePages(window.location.hash);
  clickOnSignIn();
  logueo();
  register();
  window.addEventListener('hashchange', () => {
    clickOnSignIn();
    logueo();
    register();
    changePages(window.location.hash);
  });
};

window.addEventListener('load', init);

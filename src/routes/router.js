import { components } from '../lib/index.js';

export const changePages = (hash) => {
  // Etiquetas globales traidas del body html
  const contentPrincipal = document.getElementById('content');
  // para que no se agregue de uno en uno y no se sume
  contentPrincipal.innerHTML = '';
  // casuisticas
  switch (hash) {
    case '#/':
    case '':
    case '#': {
      return contentPrincipal.appendChild(components.Login());
    }
    case '#/SignIn': {
      return contentPrincipal.appendChild(components.SignIn());
    }
    case '#/Timeline': {
      return contentPrincipal.appendChild(components.Timeline());
    }
    case '#/Profile': {
      return contentPrincipal.appendChild(components.Profile());
    }
    default:
      return contentPrincipal.appendChild(components.NotFound());
  }
};

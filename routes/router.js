import { COMPONENTS } from '../lib/dictionary.js';

export const changeViews = (hash) => {
  const contentElement = document.querySelector('#content');
  contentElement.innerHTML = '';
  switch (hash) {
    case '':
    case '#':
    case '#/':
    case '#/home':
    case '#/logOut':
      return contentElement.appendChild(COMPONENTS.inicio());
    case '#/login':
      return contentElement.appendChild(COMPONENTS.inicioSesion());
    case '#/signUp':
      return contentElement.appendChild(COMPONENTS.registro());
    case '#/profile':
      return contentElement.appendChild(COMPONENTS.perfil());
    case '#/timeLine':
      return contentElement.appendChild(COMPONENTS.muro());
    default:
      return contentElement.appendChild(COMPONENTS.diferente());
  }
};

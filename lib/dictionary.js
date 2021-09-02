// aqui exportaras las funciones que necesites
import { HOME } from '../views/home.js';
import { LOGIN } from '../views/login.js';
import { SIGNUP } from '../views/signUp.js';
import { PROFILE } from '../views/profile.js';
import { TIMELINE } from '../views/timeline.js';
import { NOTFOUND } from '../views/error404.js';

export const COMPONENTS = {
  inicio: HOME,
  inicioSesion: LOGIN,
  registro: SIGNUP,
  perfil: PROFILE,
  muro: TIMELINE,
  diferente: NOTFOUND,
};

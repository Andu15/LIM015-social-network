// aqui exportaras las funciones que necesites
import { login } from '../pages/login.js';
import { signIn } from '../pages/signIn.js';
import { timeline } from '../pages/timeline.js';
import { notFound } from '../pages/error404.js';
import { profile } from '../pages/profile.js';

export const components = {
  Login: login,
  SignIn: signIn,
  Timeline: timeline,
  NotFound: notFound,
  Profile: profile,
};

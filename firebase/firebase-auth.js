// --------------------------------- VIEW REGISTRARSE ---------------------------------
// CREAR NUEVO USUARIO CON FIREBASE
export const registerWithFirebase = (email, password) => {
  const register = firebase.auth().createUserWithEmailAndPassword(email, password);
  return register;
};

// --------------------------------- VIEW INICIO DE SESION ---------------------------------
// LOGUEARSE CON USUARIO EXISTENTE EN FIREBASE
export const login = (email, password) => {
  const loginWithFirebase = firebase.auth().signInWithEmailAndPassword(email, password);
  return loginWithFirebase;
};

// LOGUEARSE CON FACEBOOK
export const loginWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const authFb = firebase.auth().signInWithPopup(provider);
  return authFb;
};

// LOGUEARSE CON GOOGLE
export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const authGg = firebase.auth().signInWithPopup(provider);
  return authGg;
};

// ------------- OTROS METODOS -------------
// METODO PARA CERRAR SESION
export const logOutUser = () => {
  const logoutAction = firebase.auth().signOut();
  return logoutAction;
};

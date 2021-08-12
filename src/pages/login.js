/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable padded-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// import firebase from '../lib/firebase.js';

export const login = () => {
  const view = `
  <section class='contenedorFormulario'>
    <form >
      <img src='images/laRuta-02.png' alt='La ruta logo' class='logo'/>
      <p class='welcome'>Welcome Traveler!</p>
      <span id='errorMessage'></span>
      <input type='email' id='email' placeholder='✉ Email' class='input' />
      <input type='password' id='password1' placeholder='🔑 Password' class='input' minlength='6'/>
      <div class='buttons'>
        <button id='logeo' type='submit' class='btnStart'>LOG IN</button>
      </div>
      <div  class='buttons'>
        <button id='signin' type='submit'class='btnStart'>SIGN IN</button>
      </div>
      <h3>Or sign in with ...</h3>
      <div class='imgFacebookGoogle'>
        <img id='facebook' src='images/facebook.png' alt='Facebook' class='iconSocial'>
        <img id='google' src='images/google.png' alt='Google' class='iconSocial'>
      </div>
    </form>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  return divElement;
};

export const clickOnSignIn = () => {
  const btnSign = document.getElementById('signin');
  btnSign.addEventListener('click', () => {
    /*SOLO REDIRIGE*/
    window.location.hash = '#/SignIn';
  });
};

export const logueo = () => {
  const btnLogin = document.getElementById('logeo');
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const alertErrorMessage = document.getElementById('errorMessage');
    const emailUser = document.getElementById('email').value;
    const password = document.getElementById('password1').value;
    //criterios de aceptacion el else es que todo esta OK
    if (emailUser === '' && password === '')
    { alertErrorMessage.textContent =
         'Oops 🙈, you must enter email and password!';}
    else if (emailUser !== '' && password === '')
    { alertErrorMessage.textContent =
        'Oops 🙉, you should enter a correct password';}
    else if (emailUser === '' && password !== '')
    { alertErrorMessage.textContent =
        'Oops 🙉, you should enter a correct email -> e.g. a@example.com';}
    else
    {
      /*OJO-CASO PASA EXITOSAMENTE*/
      alertErrorMessage.textContent = '';
      /*OJO-AQUI DEBE CAMBIARSE EL HASH SOLO SI EL CORREO Y CONTRASENA SON CORRECTOS CON FIREBASE*/
      window.location.hash = '#/Timeline';
    }
  });
};

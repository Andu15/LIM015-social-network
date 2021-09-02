import { registerWithFirebase } from '../firebase/firebase-auth.js';
// Constante a exportar
export const SIGNUP = () => {
  const view = `
  <section class='contenedorRegister'>
    <form id='form'>
    <img src='images/laRuta-02.png' alt='La ruta logo' class='logo'/>
    <p class='welcome'>Bienvenid@ viajer@!</p>
    <span id='errorMessage' class='errorMessage'></span>
    <input type='text' id='userName' placeholder='  Nombre' class='input' required />
    <input type='email' id='email' pattern: [a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5} placeholder='  Correo Electrónico' class='input' required />
    <input type='password' id='password1' placeholder='  Constraseña' class='input' minlength='6' required />
    <input type='password' id='password2' placeholder='  Confirmar Constraseña' class='input' minlength='6' required />
    <div class='buttons'>
      <button type='submit' class='btnStart' id='signUp'>Registrarse</button>
    </div>
    </form>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  // CONSTANTES GLOBALES
  const btnSignUp = divElement.querySelector('#signUp');
  const formElement = divElement.querySelector('#form');
  const errorMessageElement = divElement.querySelector('#errorMessage');
  const userNameInput = divElement.querySelector('#userName');
  const emailUser = divElement.querySelector('#email');
  const password = divElement.querySelector('#password1');
  const confirmPass = divElement.querySelector('#password2');
  // ------------------------- ESCONDER RESTO DE LINKS -------------------------
  document.querySelector('.home a').style.display = 'block';
  document.querySelector('.login a').style.display = 'block';
  document.querySelector('.signUp a').style.display = 'block';
  document.querySelector('.profile a').style.display = 'none';
  document.querySelector('.timeline a').style.display = 'none';
  document.querySelector('.logOut a').style.display = 'none';
  // ------------------------- Boton Registrarse -------------------------
  btnSignUp.addEventListener('click', () => {
    if (password.value !== confirmPass.value) {
      errorMessageElement.textContent = 'Por favor, confirma tu contraseña 🙊';
    } else if (
      userNameInput.value === '' && emailUser.value === '' && password.value === '' && confirmPass.value === ''
    ) {
      errorMessageElement.textContent = '⚡ Por favor complete todos los campos ⚡';
    } else {
      errorMessageElement.textContent = '';
      /* AQUI TODO PASA OK */
      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        registerWithFirebase(emailUser.value, password.value)
          .then((userCredential) => {
            if (userCredential.user.displayName === null) {
              localStorage.setItem('userName', userNameInput.value);
            } else {
              localStorage.setItem('userName', userCredential.user.displayName);
            }
            errorMessageElement.textContent = '';
            window.location.hash = '#/login';
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            switch (errorCode) {
              case 'auth/email-already-in-use':
                errorMessageElement.textContent = '⚡ El correo electrónico ingresado ya existe ⚡';
                break;
              case 'auth/invalid-email':
                errorMessageElement.textContent = '⚡ Lo lamentamos, el correo que ingresaste no es valido ⚡';
                break;
              default:
                errorMessageElement.textContent = errorMessage;
            }
          });
      });
    }
  });
  // AQUI TERMINA DE INSERTARSE EL TEMPLATE STRING
  return divElement;
};

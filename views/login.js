import { login, loginWithFacebook, loginWithGoogle } from '../firebase/firebase-auth.js';
// Constante a exportar
export const LOGIN = () => {
  const view = `
  <section class='contenedorFormulario'>
    <form >
      <img src='images/laRuta-02.png' alt='La ruta logo' class='logo'/>
      <p class='welcome'>Bienvenid@ viajer@!</p>
      <span id='errorMessage' class='errorMessage'></span>
      <input type='email' id='email' placeholder='  Correo electrónico' class='input' />
      <input type='password' id='password1' placeholder='  Contraseña' class='input' minlength='6'/>
      <div class='contentButtons'>
        <div class='buttons'>
          <button id='login' type='submit' class='btnStart'>Iniciar Sesión</button>
        </div>
        <div  class='buttons'>
          <button id='signUp' type='button'class='btnStart'>Registrarse</button>
        </div>
      </div>
      <p>O ingresa con...</p>
      <div class='contentbtn'>
        <button id='btnFacebook' class='btnFacebookGoogle' type='button'><img id='facebook' src='images/facebook.png' alt='Facebook' class='iconSocial'></button>
        <button id='btnGoogle' class='btnFacebookGoogle' type='button'><img id='google' src='images/google.png' alt='Google' class='iconSocial'></button>
      </div>
    </form>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  // Constantes Globales
  const btnLogin = divElement.querySelector('#login');
  const btnSignUp = divElement.querySelector('#signUp');
  const btnFacebook = divElement.querySelector('#btnFacebook');
  const btnGoogle = divElement.querySelector('#btnGoogle');
  // INPUTS GENERALES
  const errorMessageElement = divElement.querySelector('#errorMessage');
  const emailUser = divElement.querySelector('#email');
  const password = divElement.querySelector('#password1');
  // ------------------------- ESCONDER RESTO DE LINKS -------------------------
  document.querySelector('.home a').style.display = 'block';
  document.querySelector('.login a').style.display = 'block';
  document.querySelector('.signUp a').style.display = 'block';
  document.querySelector('.profile a').style.display = 'none';
  document.querySelector('.timeline a').style.display = 'none';
  document.querySelector('.logOut a').style.display = 'none';
  // ------------------------- Boton Inicio sesion -------------------------
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (emailUser.value === '' && password.value === '') {
      errorMessageElement.textContent = 'Ups 🙈, ingresa un correo y una contraseña!';
    } else if (emailUser.value !== '' && password.value === '') {
      errorMessageElement.textContent = 'Ups 🙉, ingresa una contraseña';
    } else if (emailUser.value === '' && password.value !== '') {
      errorMessageElement.textContent = 'Ups 🙉, ingresa un correo correcto -> e.g. a@gmail.com';
    } else {
      errorMessageElement.textContent = '';
      // código de firebase
      login(emailUser.value, password.value)
        .then((userCredential) => {
          if (userCredential.user.displayName === null) {
            localStorage.getItem('userName');
          } else {
            localStorage.setItem('userName', userCredential.user.displayName);
          }
          localStorage.setItem('userEmail', userCredential.user.email);
          localStorage.setItem('userPhoto', userCredential.user.photoURL);
          localStorage.setItem('userId', userCredential.user.uid);
          window.location.hash = '#/timeLine';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          switch (errorCode) {
            case 'auth/wrong-password':
              errorMessageElement.textContent = '⚡ La contraseña es incorrecta ⚡';
              break;
            case 'auth/invalid-email':
              errorMessageElement.textContent = '⚡ El correo ingresado no es válido ⚡';
              break;
            case 'auth/user-not-found':
              errorMessageElement.textContent = '⚡ Usuario y/o contraseña incorrecta ⚡';
              break;
            case 'auth/too-many-requests':
              errorMessageElement.textContent = '⚡ Superó su numero de intentos permitidos, vuelva a intentarlo luego ⚡';
              break;
            default:
              errorMessageElement.textContent = errorMessage;
          }
        });
    }
  });

  // ------------------------- Boton Registrarse -------------------------
  btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/signUp';
  });

  // ------------------------- Boton Facebook - inicio de sesion -------------------------
  btnFacebook.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithFacebook()
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // const credential = result.credential;
        // console.log(credential);
        // The signed-in user info.
        // const user = result.user;
        // console.log(credential);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const accessToken = credential.accessToken;
        // console.log(accessToken);
        // AQUI DEBE ESTAR LA OBTENCION DEL PEDIDO
        if (result.user.displayName === null) {
          localStorage.setItem('userName', 'nuevo usuario');
        } else {
          localStorage.setItem('userName', result.user.displayName);
        }
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userPhoto', result.user.photoURL);
        localStorage.setItem('userId', result.user.uid);
        // cambio de hash
        window.location.hash = '#/timeLine';
      });
  });

  // ------------------------- Boton Google - inicio de sesion -------------------------
  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle()
      .then((result) => {
        if (result.user.displayName === null) {
          localStorage.setItem('userName', 'nuevo usuario');
        } else {
          localStorage.setItem('userName', result.user.displayName);
        }
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userPhoto', result.user.photoURL);
        localStorage.setItem('userId', result.user.uid);
        // cambio del hash
        window.location.hash = '#/timeLine';
      });
  });
  // AQUI TERMINA DE INSERTARSE EL TEMPLATE STRING
  return divElement;
};

// import firebase from '../lib/firebase.js';

export const signIn = () => {
  const view = `
  <section class='contenedorRegister'>
    <form>
    <img src='images/laRuta-02.png' alt='La ruta logo' class='logo'/>
    <p class='welcome'>Welcome Traveler!</p>
    <span id='errorMessage'></span>
    <input type='text' id='userName' placeholder='👤 Name' class='input' required />
    <input type='email' id='email' placeholder='✉ Email' class='input' required />
    <input type='password' id='password1' placeholder='🔑 Password' class='input' minlength='6' required />
    <input type='password' id='password2' placeholder='🔑 Confirm Password' class='input' minlength='6' required />
    <div class='buttons'>
      <button type='submit' class='btnStart' id='registrar'>SIGN IN</button>
    </div>
    </form>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  return divElement;
};

export const register = () => {
  const btnSign2 = document.getElementById('registrar');
  btnSign2.addEventListener('click', (e) => {
    e.preventDefault();
    const alertErrorMessage = document.getElementById('errorMessage');
    const userNameInput = document.getElementById('userName');
    const emailUser = document.getElementById('email').value;
    const password = document.getElementById('password1').value;
    const confirmPass = document.getElementById('password2').value;
    // Condicionales
    if (password !== confirmPass) {
      alertErrorMessage.textContent = 'Please, confirm your password 🙊';
    } else if (
      userNameInput === "" || emailUser === "" ||
      password === "" ||
      confirmPass === ""
    ) {
      alertErrorMessage.textContent =
        "⚡ Please complete all required fields ⚡";
    } else {
      /* AQUI TODO PASA OK */
      console.log("PASO TODO OK");
      console.log(password, confirmPass);
      alertErrorMessage.textContent = "";
      window.location.hash = "#/Timeline";
      /* AQUI TODO PASA OK */
    }
  });
};

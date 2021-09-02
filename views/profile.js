import { uploadImg } from '../firebase/firebase-storage.js';

export const PROFILE = () => {
  const view = `
  <section class='profileContent'>
    <figure>
      <img id='imgUser' class='imgProfile' src="../images/imgDefault3.png" alt="photoProfile" />
    </figure>
    <input type='file' id='addImage' class='addImage' accept='image/png, image/jpeg' name='mas'>
    <button type='button' ></button>
    <section class='nameStatus'>
    <p id='nameProfile' class='nameProfile'>Ariana</p>
    <p id='status' class='statusProfile'>Estado: Viajer@ Empedernid@</p>
    </section>
    </section>
  <section class='aboutUser'>
    <h2>Sobre mí:</h2>
    <p class='myInfo'>Me encanta viajar</p>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.className = 'divContentProfile';
  divElement.innerHTML = view;
  // CONSTANTES GLOBALES
  const imgElement = divElement.querySelector('#imgUser');
  const userNameProfile = divElement.querySelector('#nameProfile');
  const btnUpload = divElement.querySelector('#addImage');
  // FUNCIONALIDAD
  document.querySelector('.home a').style.display = 'none';
  document.querySelector('.login a').style.display = 'none';
  document.querySelector('.signUp a').style.display = 'none';
  document.querySelector('.profile a').style.display = 'block';
  document.querySelector('.timeline a').style.display = 'block';
  document.querySelector('.logOut a').style.display = 'block';
  // ------------------------- Foto de perfil -------------------------
  if (localStorage.getItem('userPhoto') === 'null') {
    imgElement.src = '../images/imgDefault3.png';
  } else {
    imgElement.src = localStorage.getItem('userPhoto');
  }
  // -------------------------  Mostrar nombre de perfil -------------------------
  if (localStorage.getItem('userName') === null) {
    userNameProfile.textContent = localStorage.getItem('userEmail');
  } else {
    userNameProfile.textContent = localStorage.getItem('userName');
  }
  // -------------------------  Cambiar foto de perfil -------------------------
  btnUpload.addEventListener('change', (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadImg(file);
    // console.log(downloadImg());
    // console.log(downloadImg().fullPath);
  });
  // AQUI TERMINA LA VISTA
  return divElement;
};

// import firebase from '../firebase/firebase.js';
import { logOutUser } from '../firebase/firebase-auth.js';
import {
  addPostCollection, getPosts, onGetPosts,
  deletePost, updatePost
} from '../firebase/firebase-firestore.js';

// Constante a exportar
export const TIMELINE = () => {
  const view = `
  <section class='profileContainer'>
    <figure>
      <img id='imgUser' class='imgProfile' src="../images/imgDefault3.png" alt="photoProfile" />
    </figure>
    <p id='nameProfile' class='nameProfile'></p>
    <p id='status' class='status'>Estado: Viajer@ Empedernid@</p>
  </section>
  <section class='publication'>
    <textarea name='publication' id='textAreaPublication' class='textAreaPublication' placeholder='¿Qué deseas compartir con la comunidad de viajeros?' rows='3'></textarea>
    <div class='buttonsPost'>
      <button id='buttonImg' type='button' class='buttonImg'>&#127889;</button>
      <button id='buttonShare' type='submit' class='buttonShare'>Compartir</button>
    </div>
  </section>
  <section id='posts' class='postSection'>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  // Constantes Globales
  const btnShare = divElement.querySelector('#buttonShare');
  const btnImg = divElement.querySelector('#buttonImg');
  const linkAboutLogOut = document.querySelector('.logOut a');
  const textPost = divElement.querySelector('#textAreaPublication');
  const userNameProfile = divElement.querySelector('#nameProfile');
  const postContent = divElement.querySelector('#posts');
  const imgElement = divElement.querySelector('#imgUser');
  // FUNCIONALIDAD
  // ------------------------- Foto de perfil -------------------------
  if (localStorage.getItem('userPhoto')) {
    imgElement.src = localStorage.getItem('userPhoto');
  } else {
    imgElement.src = '../images/imgDefault3.png';
  }
  // -------------------------  Mostrar nombre de perfil -------------------------
  if (localStorage.getItem('userName') === null) {
    userNameProfile.textContent = localStorage.getItem('userEmail');
  } else {
    userNameProfile.textContent = localStorage.getItem('userName');
  }
  // ------------------------- Boton compartir -------------------------
  btnShare.addEventListener('click', () => {
    if (textPost.value === '') {
      console.log('publicacion vacia');
    } else {
      // aqui va lo de firestore
      addPostCollection(localStorage.getItem('userName'), localStorage.getItem('userEmail'), textPost.value, localStorage.getItem('userId'))
        .then((promise) => {
          const idCollection = promise.id;
          const pathCollection = promise.path;
          console.log(idCollection, pathCollection);
          textPost.value = '';
        });
    }
  });
  // ------------------------- Ejecutarse cuando se actualice la pagina -------------------------
  onGetPosts(() => {
    postContent.innerHTML = '';
    // SNAPSHOT
    getPosts().then((docRef) => {
      docRef.forEach((docAboutCollection) => {
        const idPost = docAboutCollection.ref.id;
        const existPost = docAboutCollection.exists;
        const pathPost = docAboutCollection.ref.path;
        const postInfo = docAboutCollection.data();
        console.log(docAboutCollection);
        console.log(idPost, existPost, pathPost);
        console.log(docAboutCollection);
        console.log(postInfo);
        console.log(postInfo.post);
        postContent.innerHTML += `<section class='postMessage'>
          <div class='authorPost'>
            <p>Publicado por <span id='userNamePost'>${postInfo.mail}</span></p>
            <button id='${idPost}' class='btnDelete'>&#10062;</button>
          </div>
          <div class='sectionAboutPost'>
            <input name='${idPost}' disabled class='postContent' value='${postInfo.post}'>
            <div>
              <button id='${idPost}' class='btnEdit'>&#9997;</button>
              <button id='${idPost}' class='btnSave'>&#9989;</button>
            </div>
          </div>
          <div id='reactionPost' class='reactionPost'>
            <button id='${idPost}' class='btnLove'>&#10084;</button>
            <button id='${idPost}' class='btnComments'>&#128172;</button>
          </div>
        </section>`;
      });
    })
      .catch((error) => {
        console.log(error);
      });

    // ------------------------- Boton Edit -------------------------
    divElement.addEventListener('click', async (e) => {
      if (e.target.className === 'btnEdit') {
        document.querySelector(`input[name='${e.target.id}']`).disabled = false;
      }
    });
    // ------------------------- Boton Save  -------------------------
    divElement.addEventListener('click', async (e) => {
      if (e.target.className === 'btnSave') {
        const postSave = document.querySelector(`input[name='${e.target.id}']`);
        await updatePost(e.target.id, postSave.value);
        postSave.disabled = true;
      }
    });
  });
  // ------------------------- Boton Delete -------------------------
  divElement.addEventListener('click', async (e) => {
    if (e.target.className === 'btnDelete') {
      await deletePost(e.target.id);
    }
  });
  // ------------------------- Ancla salir -------------------------
  linkAboutLogOut.addEventListener('click', (e) => {
    e.preventDefault();
    logOutUser().then(() => {
      console.log('cierre de sesion exitoso');
      window.location.hash = '#/';
      localStorage.clear();
    });
  });
  return divElement;
};

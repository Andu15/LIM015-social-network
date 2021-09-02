// import firebase from '../firebase/firebase.js';
import { logOutUser } from '../firebase/firebase-auth.js';
import {
  addPostCollection, getPosts, onGetPosts,
  deletePost, updatePost, updateLoves, getPostsUserId,
} from '../firebase/firebase-firestore.js';

// Constante a exportar
export const TIMELINE = () => {
  const view = `
  <section class='timeLineContainer'>
    <section class='profileContainer'>
      <figure>
        <img id='imgUser' class='imgProfile' src="../images/imgDefault3.png" alt="photoProfile" />
      </figure>
      <p id='nameProfile' class='nameProfile'></p>
      <p id='status' class='status'>Estado: Viajer@ Empedernid@</p>
    </section>
    <section class='publicationContainer'>
    <section class='publication'>
      <textarea name='publication' id='textAreaPublication' class='textAreaPublication' placeholder='¿Qué deseas compartir con la comunidad de viajeros?' rows='3'></textarea>
      <div class='buttonsPost'>
        <button id='buttonImg' type='button' class='buttonImg'>&#127889;</button>
        <button id='buttonShare' type='submit' class='buttonShare'>Compartir</button>
      </div>
      </section>
    <section id='posts' class='postSection'>
    </section>
    </section>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.className = 'divContent';
  divElement.innerHTML = view;
  // Constantes Globales
  const btnShare = divElement.querySelector('#buttonShare');
  // const btnImg = divElement.querySelector('#buttonImg');
  const linkAboutLogOut = document.querySelector('.logOut a');
  const textPost = divElement.querySelector('#textAreaPublication');
  const userNameProfile = divElement.querySelector('#nameProfile');
  const postContent = divElement.querySelector('#posts');
  const imgElement = divElement.querySelector('#imgUser');
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
  // ------------------------- Boton compartir -------------------------
  btnShare.addEventListener('click', () => {
    if (textPost.value === '') {
      textPost.placeholder = 'Escribe algo por favor';
    } else {
      // aqui va lo de firestore
      addPostCollection(localStorage.getItem('userName'), localStorage.getItem('userEmail'), textPost.value, localStorage.getItem('userId'));
      textPost.value = '';
    }
  });
  // ------------------------- Ejecutarse cuando se actualice la pagina -------------------------
  onGetPosts(() => {
    postContent.innerHTML = '';
    // SNAPSHOT
    getPosts().then((docRef) => {
      docRef.forEach((docAboutCollection) => {
        const idPost = docAboutCollection.ref.id;
        // const existPost = docAboutCollection.exists;
        // const pathPost = docAboutCollection.ref.path;
        const postInfo = docAboutCollection.data();
        // console.log(docAboutCollection);
        // console.log(docAboutCollection);
        // console.log(idPost, existPost, pathPost);
        // console.log(docAboutCollection);
        // console.log(postInfo);
        // console.log(postInfo.post);
        postContent.innerHTML += `<section class='postMessage'>
          <div class='authorPost' name='${postInfo.id}'>
            <p>Publicado por <span id='userNamePost' class='userNamePost' >${postInfo.mail}</span></p>
            <button id='${idPost}' class='btnDelete'>&#10062;</button>
          </div>
          <div class='sectionAboutPost'>
            <textarea name='${idPost}' disabled class='postContent'>${postInfo.post}</textarea>
            <div>
              <button id='${idPost}' class='btnEdit'>&#9997;</button>
              <button id='${idPost}' class='btnSave'>&#9989;</button>
          </div>
          </div>
          <div id='reactionPost' class='reactionPost'>
            <button id='${idPost}' class='btnLove'>&#x2764;&#xfe0f;</button>
            <span name='${idPost}'>${postInfo.likes.length}</span>
            <button id='${idPost}' class='btnComments'>&#128172;</button>
            <span>0</span>
          </div>
        </section>
        <!-- MODAL -->
        <div id="id01" class="modal">
          <div class='contentModal'>
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
            <form class="modal-content">
              <div class="container">
                <h1>Eliminar publicación</h1>
                <p>¿Estás seguro que deseas eliminar la publicación?</p>
                <div class="clearfix">
                  <button  type="button" class="cancelbtn confirm">Cancel</button>
                  <button id="deletebtn"  type="button" class="deletebtn confirm">Eliminar post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- fin de modal -->
        `;
      });
    });
    // .catch((error) => {
    //   console.log(error);
    // });
    // ------------------------- Boton love -------------------------
    divElement.addEventListener('click', async (e) => {
      if (e.target.className === 'btnLove') {
        const userId = localStorage.getItem('userId');
        const newLike = {
          userEmail: localStorage.getItem('userEmail'),
          userID: userId,
        };
        getPostsUserId(e.target.id)
          .then((postInfo) => {
            const postData = postInfo.data();
            const userLikes = postData.likes;
            const filterLikeByIdUser = userLikes.filter((like) => like.userID === userId);
            const filterLikeByIdOtherUser = userLikes.filter((like) => like.userID !== userId);
            if (filterLikeByIdUser.length !== 0) {
              updateLoves(postInfo.id, filterLikeByIdOtherUser);
            } else {
              userLikes.push(newLike);
              updateLoves(postInfo.id, userLikes);
            }
          });
      }
    });
    // ------------------------- Boton Edit -------------------------
    divElement.addEventListener('click', async (e) => {
      if (e.target.className === 'btnEdit') {
        getPostsUserId(e.target.id)
          .then((postInfo) => {
            if (postInfo.data().id === localStorage.getItem('userId')) {
              document.querySelector(`textarea[name='${e.target.id}']`).disabled = false;
            } else {
              document.querySelector(`textarea[name='${e.target.id}']`).disabled = true;
            }
          });
      }
    });
    // ------------------------- Boton Save  -------------------------
    divElement.addEventListener('click', async (e) => {
      if (e.target.className === 'btnSave') {
        const postSave = document.querySelector(`textarea[name='${e.target.id}']`);
        getPostsUserId(e.target.id)
          .then((postInfo) => {
            if (postInfo.data().id === localStorage.getItem('userId')) {
              updatePost(e.target.id, postSave.value);
            } else {
              document.querySelector(`textarea[name='${e.target.id}']`).disabled = true;
            }
          });
      }
    });
  });
  // ------------------------- Boton Delete -------------------------
  divElement.addEventListener('click', async (e) => {
    if (e.target.className === 'btnDelete') {
      getPostsUserId(e.target.id)
        .then((postInfo) => {
          if (postInfo.data().id === localStorage.getItem('userId')) {
            // mostrar modal
            document.querySelector('#deletebtn').setAttribute('name', e.target.id);
            document.querySelector('#id01').style.display = 'block';
          }
        });
    }
  });

  // ------------------------- FUNCIONES DEL MODAL -------------------------
  divElement.addEventListener('click', async (e) => {
    if (e.target.className === 'deletebtn confirm') {
      const postId = e.target.getAttribute('name');
      getPostsUserId(postId)
        .then((postInfo) => {
          if (postInfo.data().id === localStorage.getItem('userId')) {
            deletePost(postId);
          }
        });
    }
  });

  divElement.addEventListener('click', async (e) => {
    if (e.target.className === 'cancelbtn confirm') {
      document.querySelector('#id01').style.display = 'none';
    }
  });

  /* fin de funciones modal */

  // ------------------------- Ancla salir -------------------------
  linkAboutLogOut.addEventListener('click', (e) => {
    e.preventDefault();
    logOutUser().then(() => {
      // console.log('cierre de sesion exitoso');
      window.location.hash = '#/';
      localStorage.clear();
    });
  });
  return divElement;
};

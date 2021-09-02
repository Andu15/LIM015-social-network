// METODO PARA AGREGAR UNA COLECCION DE POSTS EN FIRESTORE
export const addPostCollection = (nameUser, mailCurrentUser, postMessage, idUser) => {
  const postCollection = firebase.firestore().collection('posts').add({
    author: nameUser,
    mail: mailCurrentUser,
    post: postMessage,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    privacyUserPost: false,
    likes: [],
    id: idUser,
  });
  return postCollection;
};

// METODO PARA OBTENER TODOS LOS POSTS EN ORDEN DESCENDENTE (consulta en firestore)
export const getPosts = () => {
  const postOnFirestore = firebase.firestore().collection('posts').orderBy('time', 'desc').get();
  return postOnFirestore;
};

// METODO PARA OBTENER TODOS LOS POSTS ACTUALIZADOS (snapshot)
export const onGetPosts = (callback) => {
  const getPostOnFirestore = firebase.firestore().collection('posts').onSnapshot(callback);
  return getPostOnFirestore;
};

// METODO PARA BORRAR UNA PUBLICACION EN FIRESTORE
export const deletePost = (id) => {
  const deletePostOnFirestore = firebase.firestore().collection('posts').doc(id).delete();
  return deletePostOnFirestore;
};

// METODO PARA ACTUALIZAR UNA PUBLICACION EN FIRESTORE
export const updatePost = (id, change) => {
  const updatePostById = firebase.firestore().collection('posts').doc(id)
    .set(
      { post: change },
      { merge: true },
    );
  return updatePostById;
};

// METODO PARA ACTUALIZAR LOS CORAZONES DE LOS POSTS
export const updateLoves = (id, likes) => {
  const updatePostById = firebase.firestore().collection('posts').doc(id)
    .update(
      { likes },
    );
  return updatePostById;
};

// METODO PARA OBTENER UN POST SEGUN SU ID
export const getPostsUserId = (id) => {
  const postOnFirestore = firebase.firestore().collection('posts').doc(id).get();
  return postOnFirestore;
};

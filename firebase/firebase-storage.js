// METODO PARA SUBIR UNA FOTO DE PERFIL
export const uploadImg = async (file) => {
  // 1. Referencia al espacio en el bucket donde estara el archivo
  const storageRef = firebase.storage().ref().child(`images/${file.name}`);
  // 2. subir el archivo
  await storageRef.put(file);
  // 3. retornar la referencia
  return storageRef;
};

// METODO PARA DESCARGAR LA FOTO EN STORAGE
export const downloadImg = (file) => {
  const pathReference = firebase.storage().ref(`images/${file.name}`);
  // Get the download URL
  const storageRefDownload = pathReference.getDownloadURL();
  return storageRefDownload;
};

// METODO PARA DESCARGAR LA FOTO EN STORAGE
// export const downloadImg = () => {
// const storageRef = firebase.storage().ref().child(`images/${file.name}`);
// const storageRef = firebase.storage().refFromURL(localStorage.getItem('newPhoto'));
// Get the download URL
// const storageRefDownload = storageRef.getDownloadURL();
// return storageRef;
// };

// export const publishImg = (file) => uploadImg(file)
//   .then(storageRef => );

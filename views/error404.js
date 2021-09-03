export const NOTFOUND = () => {
  const view = `
  <section class='errorSection'>
  <p class='error404'>Ups! Página no encontrada!</p>
  <img class='errorImg' src='images/errorBg.png' />
  <p>Selecciona alguna de las opciones disponibles &#9757;</p>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  // ------------------------- ESCONDER RESTO DE LINKS -------------------------
  document.querySelector('.home a').style.display = 'block';
  document.querySelector('.login a').style.display = 'block';
  document.querySelector('.signUp a').style.display = 'block';
  document.querySelector('.profile a').style.display = 'none';
  document.querySelector('.timeline a').style.display = 'none';
  document.querySelector('.logOut a').style.display = 'none';
  return divElement;
};

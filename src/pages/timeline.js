/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable padded-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import firebase from '../lib/firebase.js';

export const timeline = () => {
  const view = `
  <header id='header'>
    <nav class='menu'>
      <ul>
        <li class='items'>
          <a href='#/Profile'>Profile</a>
        </li>
        <li class='items'>
          <a href='#/Timeline'>TimeLine</a>
        </li>
        <li class='items'>
          <a href='#/SignOut'>Sign Out</a>
        </li>
      </ul>
    </nav>
  </header>
  <section>
    <figure>
      <img src="../images//photoProfile2.jpeg" alt="photoProfile" />
    </figure>
    <p id='nameProfile'>Luana Cevallos</p>
    <p id='status'>Status: Inveterate traveler</p>
  </section>
  <div class='publication'>
    <textarea name='publication' id='textAreaPublication' class='textAreaPublication' placeholder='What do you want to share with the traveler community?' cols='30' rows='10'></textarea>
    <div class='buttons'>
      <button id='buttonImg' type='button' class='buttonImg'>&#xf009</button>
    </div>
    <div class='buttons'>
      <button id='buttonShare' type='submit' class='buttonShare'>Share</button>
    </div>
  </div>
  <section>
    <div class='postMessage'>
      <div>
        <p>Post by<span id='userNamePost'></span></p>
        <span id='closeItem'><i class="fas fa-times-circle"></i></span>
      </div>
      <div id='postContent'></div>
      <div id='reactionPost'>
        <span><i class="fas fa-heart"></i></span>
        <span><i class="fas fa-share-square"></i></span>
      </div>
    </div>
  </section>
  `;
  const divElement = document.createElement('div');
  divElement.innerHTML = view;
  return divElement;
};

import Handlebars from 'handlebars/dist/handlebars.runtime';
import home from './pages/home.hbs';

import profileNavigate from './components/dialog-components/profileNavigate/profileNavigate.hbs';
import dialogItem from './components/dialog-components/dialogItem.hbs';
import authPage from './pages/authPage.hbs';
import signUp from './pages/signUp.hbs';
import profile from './pages/profile.hbs';
import info from './components/profile-components/info.hbs';
import changeInfo from './components/profile-components/changeInfo.hbs';
import changePassword from './components/profile-components/changePassword.hbs';
import changeData from './components/profile-components/changeData.hbs';
import authInfoBlock from './components/auth-components/authInfoBlock.hbs';

import serveError from './pages/serveError.hbs';
import serveBadRequest from './pages/serveBadRequest.hbs';

function renderPage(name) {
  const root = document.querySelector('#root');

  switch (name) {
    case 'homePage':
      root.innerHTML = home();
      break;
    case 'authPage':
      root.innerHTML = authPage();
      break;
    case 'signUpPage':
      root.innerHTML = signUp();
      break;
    case 'profile':
      root.innerHTML = profile();
      break;
    case 'changeData':
      root.innerHTML = changeData();
      break;
    case 'changePassword':
      root.innerHTML = changePassword();
      break;

    default:
      break;
  }
}

window.renderPage = renderPage;

document.addEventListener('DOMContentLoaded', () => {
  // auth-components
  Handlebars.registerPartial('authInfoBlock', authInfoBlock);

  // dialog-components
  Handlebars.registerPartial('dialogItem', dialogItem);

  // profile-components
  Handlebars.registerPartial('info', info);
  Handlebars.registerPartial('profileNavigate', profileNavigate);
  Handlebars.registerPartial('changeInfo', changeInfo);

  const root = document.querySelector('#root');
  root.innerHTML = home();

  const node = document.getElementById('message');

  for (const child of node.children) {
    if (child.children[0].textContent.length >= 160) {
      child.children[0].children[0].style = 'position: absolute';
    }
    if (child.children[0].textContent.length >= 156) {
      child.children[0].children[0].classList.add('time-margin');
    }
  }
});

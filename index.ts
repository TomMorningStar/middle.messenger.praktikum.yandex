import HomePage from './src/pages/home';
import Profile from './src/pages/profile';

import { renderDOM } from './src/utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
  switch (window.location.pathname) {
    case '/profile':
      renderDOM('#root', new Profile());
      break;

    default:
      renderDOM('#root', new HomePage());
      break;
  }
});

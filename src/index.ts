import { registerComponent, PathRouter, CoreRouter, Store } from 'core';
import { initApp } from './services/initApp';
import { defaultState } from './store';
import { initRouter } from './router';

import * as components from './components';

import './index.scss'

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  window.router = router;
  window.store = store;

  initRouter(router, store);

  store.dispatch(initApp);

  store.on('changed', (_prevState, nextState) => {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
  });
});

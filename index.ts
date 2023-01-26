import { renderDOM, registerComponent, PathRouter, CoreRouter, Store } from 'core';
import { initApp } from './src/services/initApp';
import { defaultState } from './src/store';
import { initRouter } from './src/router';

import * as components from './src/components';

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
});


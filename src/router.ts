import { Store, renderDOM } from 'core';
import { CoreRouter } from 'core/Router/CoreRouter';
import { getScreenComponent, Screens } from 'utils/screenList';


const routes = [
  {
    path: '/settings',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/',
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: '/sign-up',
    block: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: '/messenger',
    block: Screens.Home,
    shouldAuthorized: true,
  },
];


export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      } else {
        window.router.go('/')
        store.dispatch({ screen: Screens.SignIn });
      }
    });
  });

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    
    if (prevState.screen !== nextState.screen) {

      console.log();
      

      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}

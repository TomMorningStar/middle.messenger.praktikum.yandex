import { Store, renderDOM } from 'core';
import { CoreRouter } from 'core/Router/CoreRouter';
import { getScreenComponent, Screens } from 'utils/screenList';


const routes = [
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: false,
  },
  {
    path: '/signIn',
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: '/signUp',
    block: Screens.SignUp,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Home,
    shouldAuthorized: false,
  },
];




export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      store.dispatch({ screen: route.block })
      // console.log(store.dispatch({ screen: route.block }));
      
      
      // if (isAuthorized || !route.shouldAuthorized) {
      //   store.dispatch({ screen: route.block });
      //   return;
      // }

      // if (!currentScreen) {
      //   store.dispatch({ screen: Screens.Home });
      // }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    
    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}

import { Block, PathRouter, Store } from 'core';
import { Screens, withRouter, withStore, withUser } from 'utils';

type HomePageProps = {
  router: PathRouter;
  store: Store<AppState>;
  user: User | null;
};

export class HomePage extends Block {
  static componentName = 'HomePage';
  constructor(props: HomePageProps) {
    super(props)
  }

  componentDidUpdate() {
    return window.store.getState().screen === Screens.Home
  }

  render() {
    return `
        <main class='main' id='main'>
          {{{RootDialogues text="Профиль"}}}
          {{{ChatSection}}}
        </main>`;
  }
}

export default withRouter(withStore(withUser(HomePage)));

import { Block } from 'core';
import { Screens } from 'utils';

export class HomePage extends Block {
  static componentName = 'HomePage';

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
export default HomePage;





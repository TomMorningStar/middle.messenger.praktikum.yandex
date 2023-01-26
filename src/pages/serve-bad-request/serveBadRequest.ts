import { Block } from 'core';
import { withIsLoading, withRouter, withStore } from 'utils';


export class ServerBadRequest extends Block {
  static componentName = 'ServerBadRequest';

  render() {
    return `
    <main>
      <div class='error-page-wrapper'>
          <div class='error-block'>
              <h1 class='error-title'>400</h1>
              <p>Не туда попали</p>
              <button onclick="window.renderPage('homePage')" class='cursor-pointer'>Назад
              к чатам</button>
          </div>
      </div>
    </main>
    `;
  }
}

export default withRouter(withStore(withIsLoading(ServerBadRequest)));

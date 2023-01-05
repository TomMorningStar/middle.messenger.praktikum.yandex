import { Block } from 'utils';

export class ServerError extends Block {
  static componentName = 'ServerError';

  render() {
    return `
    <main>
      <div class='error-page-wrapper'>
          <div class='error-block'>
              <h1 class='error-title'>500</h1>
          <p>Мы уже фиксим</p>
          <button onclick="window.renderPage('homePage')" class='cursor-pointer'>Назад
              к чатам</button>
          </div>
      </div>
    </main>
    `;
  }
}

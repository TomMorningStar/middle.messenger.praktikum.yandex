import { Block } from 'utils';

export class BurgerWindow extends Block {
  static componentName = 'BurgerWindow';

//   constructor({openBurgerWindow}: {openBurgerWindow: () => void}) {
//     super({events: {click: openBurgerWindow}})
//   }

  render() {
    return `
    <div class="burger-window"> 
        <div class="info-burger"> 
            <div class="icon">
            +
            </div>
            <div class="info-text">Добавить пользователя</div>
        </div>
        <div class="info-burger"> 
            <div class="icon">
            ×
            </div>
            <div class="info-text">Удалить пользователя</div>
        </div>
    </div>`;
  }
}

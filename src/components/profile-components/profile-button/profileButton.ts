import { Block } from 'utils';

export class ProfileButton extends Block {
  static componentName = 'ProfileButton';

  constructor({onClick, onChangePassword}: {onClick: () => void, onChangePassword: () => void;}) {

    const click = onChangePassword ?? onClick;
   
    

    super({events: {click: click}})


  }

  render() {
    return `<button class='save-data-button no-styles cursor-pointer'>Сохранить</button>`;
  }
}

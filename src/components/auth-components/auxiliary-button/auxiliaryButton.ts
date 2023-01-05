import { Block } from 'utils';

export class AuxiliaryButton extends Block {
  static componentName = 'AuxiliaryButton';

  constructor({ text }: string) {
    super({
        text,
        events: {
            click: () => {
              if(text === "Войти") {
                window.location.href = './signIn'
              } else {
                window.location.href = "./signUp"
              }
            }
        }
    });
  }

  render() {
    return `
    <div class='sing-up-in-button-block'>
      <button class='cursor-pointer'>{{text}}</button>
    </div>`;
  }
}

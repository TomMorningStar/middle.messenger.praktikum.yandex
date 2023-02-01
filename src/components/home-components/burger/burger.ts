import { Block } from 'core';

interface BurgerProps {
  getChatUsers?: () => void;
  openBurgerWindow?: () => void;
  text: () => void;
}

export class Burger extends Block {
  static componentName = 'Burger';

  constructor({ openBurgerWindow, getChatUsers, text }: BurgerProps) {
    super({text, events: { click: openBurgerWindow || getChatUsers } })
  }

  render() {
    return `
    <div class='cursor-pointer chat-dialog-options'>
      {{text}}
    </div>
    `;
  }
}

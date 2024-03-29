import { Block } from 'core';

export class Burger extends Block {
  static componentName = 'Burger';

  constructor({openBurgerWindow}: {openBurgerWindow: () => void}) {
    super({events: {click: openBurgerWindow}})
  }

  render() {
    return `
    <div class='cursor-pointer chat-dialog-options'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='3'
        height='16'
        viewBox='0 0 3 16'
        fill='none'
      >
        <circle cx='1.5' cy='2' r='1.5' fill='#1E1E1E'></circle>
        <circle cx='1.5' cy='8' r='1.5' fill='#1E1E1E'></circle>
        <circle cx='1.5' cy='14' r='1.5' fill='#1E1E1E'></circle>
      </svg>
    </div>
    `;
  }
}

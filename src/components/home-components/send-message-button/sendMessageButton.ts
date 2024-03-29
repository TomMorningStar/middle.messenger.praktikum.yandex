import { Block } from 'core';

export class SendMessageButton extends Block {
  static componentName = 'SendMessageButton';

  constructor({send}: {send: () => void}) {
    super({events: {click: send}})
  }
  
  render() {
    return `
    <button class='send-message-button cursor-pointer'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        viewBox='0 0 28 28'
        fill='none'
      >
        <circle cx='14' cy='14' r='14' fill='#3f99ff'></circle>
        <rect x='8' y='13.2' width='11' height='1.6' fill='white'></rect>
        <path
          d='M15 9L19 14L15 19'
          stroke='white'
          stroke-width='1.6'
        ></path>
      </svg>
    </button>
    `;
  }
}

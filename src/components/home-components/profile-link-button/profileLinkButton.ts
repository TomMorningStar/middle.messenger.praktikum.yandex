import { Block } from 'utils';

interface ProfileLinkButtonProps {
  onClick: () => void;
}

export class ProfileLinkButton extends Block {
  static componentName = 'ProfileLinkButton';

  constructor({onClick}: ProfileLinkButtonProps) {
    super({ events: {click: onClick}})

    

  }

  render() {
    return `
    <div class='navigate'>
        <span>Профиль</span>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='8'
            height='10'
            viewBox='0 0 6 10'
            fill='none'
        >
            <path d='M1 9L5 5L1 1' stroke='#999999'></path>
        </svg>
    </div>`;
  }
}

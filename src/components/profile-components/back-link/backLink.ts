import Block from 'core/Block';

interface BackLinkProps {
  onBackPage: () => void;
}

export class BackLink extends Block {

    static componentName = 'BackLink';

  constructor({ onBackPage }: BackLinkProps) {
    super({ events: { click: onBackPage } });
  }

  render() {
    return `
        <div class='back-button-wrapper cursor-pointer'>
            <div class='back-button'>
                <svg width='30' height='30' viewBox='0 0 28 28' fill='none'>
                <circle
                    cx='14'
                    cy='14'
                    r='14'
                    transform='rotate(-180 14 14)'
                    fill='#3f99ff'
                ></circle>
                <rect
                    x='20'
                    y='14.8'
                    width='11'
                    height='1.6'
                    transform='rotate(-180 20 14.8)'
                    fill='white'
                ></rect>
                <path d='M13 19L9 14L13 9' stroke='white' stroke-width='1.6'></path>
                </svg>
            </div>
        </div>
        `;
  }
}

import { Block } from 'utils';

export class NavWrapper extends Block {
  static componentName = 'NavWrapper';

  constructor() {
    super();

    this.setProps({
      onClick() {
        window.location.href = './profile'
      },
    });
  }

  render() {
    return `
    <nav>
        {{{ProfileLinkButton onClick=onClick}}}
        {{{SearchDialogComponent}}}
    </nav>
    `;
  }
}

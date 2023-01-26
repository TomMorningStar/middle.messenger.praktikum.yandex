import { Block } from 'core';

export class NavWrapper extends Block {
  static componentName = 'NavWrapper';

  render() {
    return `
    <nav>
        {{{ProfileLinkButton}}}
        {{{SearchDialogComponent}}}
    </nav>
    `;
  }
}

import Block from '../../../utils/Block';
import template from './navigate.hbs';

import SearchDialog from './../seach-dialog';
import ProfileLink from './../profile-link';
import { router } from '../../../utils/router';

export class Navigate extends Block {
  protected initChildren(): void {
    this.children.profileLink = new ProfileLink({
      events: {
        click: () => router('profile'),
      },
    });

    this.children.searchDialog = new SearchDialog({
      events: {
        click: () => console.log('search dialogues'),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

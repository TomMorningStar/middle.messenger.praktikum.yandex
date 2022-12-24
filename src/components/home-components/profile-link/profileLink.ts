import Block from '../../../utils/Block';
import template from './profileLink.hbs';

interface ProfileLinkProps {
  events: {
    click: () => void;
  }
}

export class ProfileLink extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

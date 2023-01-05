import { Block } from 'utils';

interface ProfileButtonChangePasswordProps {
  styles?: string,
  text?: string,
  onChangePassword?: () => void
}

export class ProfileButtonPasswordData extends Block {
  static componentName = 'ProfileButtonPasswordData';

  constructor({styles, text, onChangePassword}: ProfileButtonChangePasswordProps) {
    super({styles, text, events: {click: onChangePassword}});
  }

  render() {
    return `<button class="{{styles}}">{{text}}</button>`;
  }
}

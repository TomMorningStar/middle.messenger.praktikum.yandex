import { Block } from 'core';

interface ProfileButtonSignOutProps {
  styles?: string,
  text?: string,
  signOut?: () => void
}

export class ProfileButtonSignOut extends Block {
  static componentName = 'ProfileButtonSignOut';

  constructor({styles, text, signOut}: ProfileButtonSignOutProps) {
    super({styles, text, events: {click: signOut}});
  }

  render() {
    return `<button class="{{styles}}">{{text}}</button>`;
  }
}

import { Block } from 'core';

interface ProfileButtonChangeDataProps {
  styles?: string,
  text?: string,
  onChangeData?: () => void
}

export class ProfileButtonChangeData extends Block {
  static componentName = 'ProfileButtonChangeData';

  constructor({styles, text, onChangeData}: ProfileButtonChangeDataProps) {
    super({styles, text, events: {click: onChangeData}});
  }

  render() {
    return `<button class="{{styles}}">{{text}}</button>`;
  }
}

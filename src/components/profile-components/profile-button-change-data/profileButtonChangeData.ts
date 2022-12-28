import { Block } from 'utils';

interface ProfileButtonChangeDataProps {
  styles?: string,
  text?: string,
  onChangeDatas?: () => void
}

export class ProfileButtonChangeData extends Block {
  static componentName = 'ProfileButtonChangeData';

  constructor({styles, text, onChangeDatas}: ProfileButtonChangeDataProps) {
    super({styles, text, events: {click: onChangeDatas}});
  }

  render() {
    return `<button class="{{styles}}">{{text}}</button>`;
  }
}

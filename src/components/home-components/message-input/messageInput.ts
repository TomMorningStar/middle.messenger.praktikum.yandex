import { Block } from 'utils';

import './styles.scss';

export class MessageInput extends Block {
  static componentName = 'MessageInput';

  constructor({error}: Record<string, string>) {
    super({ error })
  }

  render() {
    return `<input type='text'placeholder='Сообщение'  class={{error}} />`;
  }
}

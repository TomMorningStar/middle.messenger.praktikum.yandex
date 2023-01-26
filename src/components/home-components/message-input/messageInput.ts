import { Block } from 'core';

import './styles.scss';

export class MessageInput extends Block {
  static componentName = 'MessageInput';

  constructor({error}: Record<string, string>) {
    super({ error })
  }

  render() {
    return `<input type='text'placeholder='Сообщение' name="message"  class={{error}} />`;
  }
}

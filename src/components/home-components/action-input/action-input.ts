import { Block } from 'core';

export class ActionInput extends Block {
  static componentName = 'ActionInput';

  render() {
    return `<input placeholder="Логин" type="text" />`;
  }
}

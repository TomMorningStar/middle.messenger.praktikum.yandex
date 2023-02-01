import { Block } from 'core';

interface ActionButtonProps {
  text?: string;
  action?: () => void;
  styles?: string;
  deleteChat?: () => void;
  cheateChat?: () => void;

}

export class ActionButton extends Block {
  static componentName = 'ActionButton';

  constructor({ text, styles, action, deleteChat, cheateChat }: ActionButtonProps) {
    super({ text, styles, events: { click: action || deleteChat || cheateChat} });
  }

  render() {
    return `<button class={{styles}}>{{text}}</button>`;
  }
}

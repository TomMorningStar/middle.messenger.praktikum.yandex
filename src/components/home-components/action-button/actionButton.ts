import { Block } from 'core';

interface ActionButtonProps {
  text?: string;
  action?: () => void;
}

export class ActionButton extends Block {
  static componentName = 'ActionButton';

  constructor({ text, action }: ActionButtonProps) {
    super({ text, events: { click: action } });
  }

  render() {
    return `<button class='action-button cursor-pointer'>{{text}}</button>`;
  }
}

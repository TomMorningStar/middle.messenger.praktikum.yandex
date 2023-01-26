import { Block } from 'core';

interface SignButtonProps {
  text?: string;
  onSubmit?: () => void;
}

export class SignButton extends Block {
  static componentName = 'SignButton';

  constructor({ text, onSubmit }: SignButtonProps) {
    super({
      text,
      events: {
        click: onSubmit,
      },
    });
  }

  render() {
    return `
    <div class='auth-reg-button-block'>
        <button class='cursor-pointer'>{{text}}</button>
    </div>`;
  }
}

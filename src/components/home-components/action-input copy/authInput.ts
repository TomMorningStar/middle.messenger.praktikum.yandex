import { Block } from 'core';

interface InputProps {
    onBlur?: () => void;
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string;
  }

export class AuthInput extends Block {
  static componentName = 'AuthInput';

  constructor({onBlur, ...props}: InputProps) {
    super({ ...props, events: { blur: onBlur}});
  }

  render() {
    return `<input type={{type}} placeholder={{placeholder}} value={{value}}>`;
  }
}

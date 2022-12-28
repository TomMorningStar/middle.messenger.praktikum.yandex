import { Block } from 'utils';

interface InputProps {
  onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
}

export class AuthInput extends Block {
  static componentName = 'AuthInput';

  constructor({ onBlur, ...props }: InputProps) {
    super({ ...props, events: { blur: onBlur } });
  }

  render() {
    return `<input type={{type}} placeholder={{placeholder}}>`;
  }
}

import { Block } from 'utils';

import './authError.scss';

interface ErrorProps {
  text?: string;
  errorClass?:string;
}

export class AuthError extends Block<ErrorProps> {
  constructor({errorClass}: ErrorProps) {
    super({errorClass})
  }

  static componentName = 'AuthError';

  protected render(): string {
    return `<div class="error {{errorClass}}">{{text}}</div>`;
  }
}

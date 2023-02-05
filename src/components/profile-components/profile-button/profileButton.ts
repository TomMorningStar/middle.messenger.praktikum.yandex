import { Block } from 'core';

interface ProfileButtonProps {
  styles?: string;
  text?: string;
  signOut?: () => void;
  goChangeDataPage?: () => void;
  goChangePasswordPage?: () => void;
  onChangePassword?: () => void;
  onChangeUserData?: () => void;
  id?: string;
}

export class ProfileButton extends Block {
  static componentName = 'ProfileButton';

  constructor({ text, id, styles, signOut, goChangeDataPage, goChangePasswordPage, onChangePassword, onChangeUserData }: ProfileButtonProps) {
    super({ text, id, styles, events: { click: signOut || goChangeDataPage || goChangePasswordPage || onChangePassword || onChangeUserData } })
  }

  render() {
    return `<button {{#if id}}data-testid="{{id}}"{{/if}}  type="submit" class="{{styles}}">{{text}}</button>`;
  }
}

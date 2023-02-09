import { Block } from 'core';

interface ProfileButtonProps {
  styles?: string;
  text?: string;
  signOut?: () => void;
  goChangeDataPage?: () => void;
  goChangePasswordPage?: () => void;
  onChangePassword?: () => void;
  onChangeUserData?: () => void;
}


export class ProfileButton extends Block {
  static componentName = 'ProfileButton';

  constructor({ text, styles, signOut, goChangeDataPage, goChangePasswordPage, onChangePassword, onChangeUserData }: ProfileButtonProps) {
    super({ text, styles, events: { click: signOut || goChangeDataPage || goChangePasswordPage || onChangePassword || onChangeUserData } })
  }

  render() {
    return `<button type="submit" class="{{styles}}">{{text}}</button>`;
  }
}




// return `<button class='save-data-button no-styles cursor-pointer'>Сохранить</button>`;

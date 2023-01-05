import { registerComponent, renderDOM } from 'utils';

import HomePage from './src/pages/home';
import ProfilePage from './src/pages/profile';
import SignIn from './src/pages/sign-in';
import SignUp from './src/pages/sign-up';

//  home components
import RootDialogues from './src/components/home-components/root-dialogues';
registerComponent(RootDialogues);

import ChatSection from 'components/home-components/chat-section';
registerComponent(ChatSection);

import NavWrapper from 'components/home-components/nav-wrapper';
registerComponent(NavWrapper);

import Dialogues from 'components/home-components/dialogues';
registerComponent(Dialogues);

import DialogItem from 'components/home-components/dialog-item';
registerComponent(DialogItem);

import ProfileLinkButton from 'components/home-components/profile-link-button';
registerComponent(ProfileLinkButton);

import SearchDialogComponent from 'components/home-components/search-dialog';
registerComponent(SearchDialogComponent);

import MessageInputField from 'components/home-components/message-input-field';
registerComponent(MessageInputField);

import SelectSendFile from 'components/home-components/select-send-file';
registerComponent(SelectSendFile);

import MessageInput from 'components/home-components/message-input';
registerComponent(MessageInput);

import SendMessageButton from 'components/home-components/send-message-button';
registerComponent(SendMessageButton);

import BurgerWindow from 'components/home-components/burger-window';
registerComponent(BurgerWindow);

import WindowSelectFile from 'components/home-components/window-select-file';
registerComponent(WindowSelectFile);

import Burger from 'components/home-components/burger';
registerComponent(Burger);

import SearchInput from 'components/home-components/search-input';
registerComponent(SearchInput);

//  profile components
import BackLink from 'components/profile-components/back-link';
registerComponent(BackLink);

import ProfileData from 'components/profile-components/profile-data';
registerComponent(ProfileData);

import ProfileButtonChangeData from 'components/profile-components/profile-button-change-data';
registerComponent(ProfileButtonChangeData);

import ProfileButtonPasswordData from 'components/profile-components/profile-button-change-password';
registerComponent(ProfileButtonPasswordData);

import ProfileButtonSignOut from 'components/profile-components/profile-button-sign-out';
registerComponent(ProfileButtonSignOut);

import ControlledData from 'components/profile-components/controlled-data';
registerComponent(ControlledData);

import profileButton from 'components/profile-components/profile-button';
registerComponent(profileButton);

import ChangeData from 'components/profile-components/change-data';
registerComponent(ChangeData);

import ChangePassword from 'components/profile-components/change-password';
registerComponent(ChangePassword);

//  auth components
import SignButton from 'components/auth-components/sign-button';
registerComponent(SignButton);

import AuthInput from 'components/auth-components/auth-input';
registerComponent(AuthInput);

import AuxiliaryButton from 'components/auth-components/auxiliary-button';
registerComponent(AuxiliaryButton);

import ControlledInput from 'components/auth-components/controlledInput';
registerComponent(ControlledInput);

import AuthError from 'components/auth-components/auth-error';
registerComponent(AuthError);

document.addEventListener('DOMContentLoaded', () => {

  if (window.location.pathname === '/profile') {
    renderDOM(new ProfilePage());
  } else if (window.location.pathname === '/signIn') {
    renderDOM(new SignIn());
  } else if (window.location.pathname === '/signUp') {
    renderDOM(new SignUp());
  } else {
    renderDOM(new HomePage());
  }
});

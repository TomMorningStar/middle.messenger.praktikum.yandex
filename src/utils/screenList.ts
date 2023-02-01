import HomePage from 'pages/home';
import SignInPage from 'pages/sign-in';
import ProfilePage from 'pages/profile';
import SignUpPage from 'pages/sign-up';
import { BlockClass } from 'core';

export enum Screens {
  Profile = 'profile',
  SignIn = 'signIn',
  Home = 'home',
  SignUp = 'signUp',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.SignIn]: SignInPage,
  [Screens.Profile]: ProfilePage,
  [Screens.SignUp]: SignUpPage,
  [Screens.Home]: HomePage,

};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};

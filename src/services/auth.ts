import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export const signUp: DispatchStateHandler<SignupPayload> = async (dispatch, _state, action) => {
  try {
    await authAPI.signUp(action);

    const responseUser = await authAPI.me();

    if (apiHasError(responseUser)) {
      dispatch(logout);
      return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO) });

    window.router.go('/settings');
  } catch (error) {
    console.error(error);
  }
}

export const login: DispatchStateHandler<LoginPayload> = async (dispatch, _state, action) => {
  try {
    const response = await authAPI.login(action);

    if (apiHasError(response)) {
      dispatch({ loginFormError: response.reason });
      return;
    }

    const responseUser = await authAPI.me();

    dispatch({ loginFormError: null });

    if (apiHasError(response)) {
      dispatch(logout);
      return;
    }

    const chats = await chatAPI.meChats();

    dispatch({ user: transformUser(responseUser as UserDTO), chats });

    window.router.go('/settings');
  } catch (error) {
    console.error(error);

  }
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  try {
    await authAPI.logout();

    dispatch({ user: null });
  } catch (error) {
    console.error(error);
  }
};

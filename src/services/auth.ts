import { authAPI } from 'api/auth';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload= {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}



export const signUp = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SignupPayload,
) => {
  dispatch({ isLoading: true });

  await authAPI.auth(action);

  const response = await authAPI.login({
    login: action.login,
    password: action.password
  });

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/profile');
  
}

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });



  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();
  console.log(responseUser);
  
  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/profile');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/signIn');
};

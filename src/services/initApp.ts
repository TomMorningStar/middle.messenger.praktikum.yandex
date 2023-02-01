import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await authAPI.me();
    const chats = await chatAPI.meChats();
    
    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO), chats: chats });
  } catch (err) {

    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

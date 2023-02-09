import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {

  await new Promise(r => setTimeout(r, 700));

  try {
    const response = await authAPI.me();
    const chats = await chatAPI.meChats();

    if (apiHasError(response)) {
      return;
    }

    if (chats.length) {
      const updateChatKeys = chats.map(async chat => {
        const chatUsers: any = await chatAPI.getChatUsers(chat.id);

        const findUser = chatUsers.find((user: any) => user.login !== response.login)

        return {
          ...chat, user: transformUser(findUser as UserDTO), title: findUser.login
        }
      })

      await Promise.all(updateChatKeys).then((chats) => {
        dispatch({ user: transformUser(response as UserDTO), chats });
      });
    } else {
      dispatch({ user: transformUser(response as UserDTO) })
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

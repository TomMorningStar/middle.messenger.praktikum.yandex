import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

export async function initApp(dispatch: Dispatch<AppState>) {

  try {


    if(location.pathname === '/' || location.pathname === '/sign-up') {
      
    } else {
      const response = await authAPI.me();
      const chats = await chatAPI.meChats();
  
      console.log(location.pathname);
  
  
      
  
      if (apiHasError(response)) {
        return;
      }
  
      dispatch({ user: transformUser(response as UserDTO) })
  
        const updateChatKeys = chats.map(async chat => {
          const chatUsers: any = await chatAPI.getChatUsers(chat.id);
  
          const findUser = await chatUsers.find((user: any) => user.login !== response.login);
  
          return {
            ...chat, user: transformUser(findUser as UserDTO), title: findUser.login
          }
        })
  
        await Promise.all(updateChatKeys).then((chats) => {
          dispatch({ chats });
        });
    }



  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

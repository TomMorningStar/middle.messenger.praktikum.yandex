import { authAPI } from 'api/auth';
import { chatAPI, ChatInfo } from 'api/chat';
import { userData } from 'api/userData';
import type { Dispatch } from 'core';

export const createChat = async (dispatch: Dispatch<AppState>, state: AppState, action: string,) => {
    const getUser = await userData.searchUser(action);
    const findUser = getUser.find(el => el.login === action);

    if (!findUser) {
        dispatch({ loginFormError: "такого человека не найдено" })
        return
    }

    const chat = await chatAPI.create(action);
    const me = await authAPI.me();


    await chatAPI.addUserToChat([me.id, findUser.id], chat.id)

    const chats = await chatAPI.meChats();

    dispatch({ chats });
}

export const deleteChat = async (dispatch: Dispatch<AppState>, state: AppState, action: string,) => {
    const getUser = await userData.searchUser(action);
    const findUser = getUser.find(el => el.login === action);

    if (!findUser) {
        dispatch({ loginFormError: "такого чата не найдено" })
        return
    }

    const chats = await chatAPI.meChats();
    const chat: ChatInfo = chats.find(el => el.title === action);

    await chatAPI.delete(chat.id)

    const newChants = await chatAPI.meChats();

    dispatch({ chats: newChants });
}

export const getToken = async (dispatch: Dispatch<AppState>, state: AppState, action: string,) => {

   const {token} = await chatAPI.getToken(action);

   dispatch({ token: token })

    console.log(state);
    


}





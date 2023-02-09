import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { UserDTO } from 'api/types';
import { userData } from 'api/userData';
import type { Dispatch } from 'core';
import { transformUser } from 'utils';
import { hasError } from 'utils/apiHasError';

type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state: AppState, action: TAction) => Promise<void>

export const createChat: DispatchStateHandler<string> = async (dispatch, _state, action) => {
    try {
        const getUser = await userData.searchUser(action);

        // Поиск зарегистрированного человека
        const findUser = getUser.find(el => el.login === action);

        if (!findUser) {
            dispatch({ loginFormError: "такого человека не найдено" })
            return
        }

        // Создание чата
        const chat = await chatAPI.create(action);
        const me = await authAPI.me();

        // Добавление юзеров в чат
        await chatAPI.addUserToChat([me.id, findUser.id], chat.id)

        const chats = await chatAPI.meChats();
        const updateChatKeys = chats.map(async chat => {
            const chatUsers: any = await chatAPI.getChatUsers(chat.id);

            const findUser = chatUsers.find((user: any) => user.login !== me.login)

            return {
                ...chat, user: transformUser(findUser as UserDTO), title: findUser.login
            }
        })

        await Promise.all(updateChatKeys).then((chats) => {
            dispatch({ user: transformUser(me as UserDTO), chats });
        });

    } catch (error) {
        console.error(error);
    }
}

export const deleteChat: DispatchStateHandler<string> = async (dispatch, state, action) => {
    try {
        const chat = state.chats.find(el => el.title === action);

        const me = await authAPI.me();

        const getUser: UserDTO[] = await userData.searchUser(action);

        if (hasError(getUser)) {
            dispatch({ loginFormError: getUser.reason })
            return;
        }

        const findUser = await getUser.find(el => el.login === action);

        await chatAPI.deleteUsersInChat([findUser!.id, me.id], chat!.id)

        const chats = await chatAPI.meChats();

        const updateChatKeys = chats.map(async chat => {
            const chatUsers: any = await chatAPI.getChatUsers(chat.id);

            const findUser = chatUsers.find((user: any) => user.login !== me.login)

            return {
                ...chat, user: transformUser(findUser as UserDTO), title: findUser.login
            }
        })

        await Promise.all(updateChatKeys).then((chats) => {
            dispatch({ user: transformUser(me as UserDTO), chats });
        });

    } catch (error) {
        console.error(error);
    }
}






import { authAPI } from 'api/auth';
import { chatAPI, ChatInfo } from 'api/chat';
import { userData } from 'api/userData';
import type { Dispatch } from 'core';

/**
 *  1) должна быть возможность добавить новый чат
 *  2) должна быть возможность удалить чат
 * 
 * @see  Геннадий, Здравствуйте! Да, знаю. Я реализовал добавление чата вместе с добавлением другого пользователя и себя в этот чат
 *  тем самым создав привычный приватный чат вместо группового чата . 
 * 
 * Другими словами исключил возможность создать пустой чат, а только чат с реальным зарегистрированным человеком. 
 * Таким же способом реализовал удаление чата. Если человека с таким логином нет, то чат не создается. 
 * Это же правильный подход ?
 * 
 * Другой конечно вопрос в том, что аватарка чата и title чата не будут соответствовать человека с которым ведем диалог
 * этот момент тоже надо будет доработать, но сейчас времени критично не хватает.
 * 
 * У меня остается меньше двух недель для закрытия следующего спринта после принятия этой.
 * А я мечтаю не ударить в грязь и поработать на реакте в этом курсе в следующем модуле)
 */

type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state: AppState, action: TAction) => Promise<void>

export const createChat: DispatchStateHandler<string> = async (dispatch, state, action) => {
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

        dispatch({ chats, loginFormError: null });
    } catch (error) {
        console.error(error);
    }
}

export const deleteChat: DispatchStateHandler<string> = async (dispatch, state, action) => {
    try {
        const getUser = await userData.searchUser(action);

        // Поиск зарегистрированного человека
        const findUser = getUser.find(el => el.login === action);

        if (!findUser) {
            dispatch({ loginFormError: "такого чата не найдено" })
            return;
        }

        const chats = await chatAPI.meChats();
        const chat: ChatInfo = chats.find(el => el.title === action);

        await chatAPI.delete(chat.id)

        // Удаление чата
        const newChants = await chatAPI.meChats();

        dispatch({ chats: newChants, loginFormError: null });
    } catch (error) {
        console.error(error);
    }
}






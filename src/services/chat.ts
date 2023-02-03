import { authAPI } from 'api/auth';
import { chatAPI } from 'api/chat';
import { hasError } from 'utils/apiHasError';

export const addUserToChat: DispatchStateHandler<string> = async (dispatch, state, action) => {
    try {
        const response = await authAPI.findUserById(action);

        if (hasError(response)) {
            dispatch({ loginFormError: response.reason });
            return
        }

        await chatAPI.addUserToChat(response.id, Number(state.selectChat))

        const chatUsers = await chatAPI.getChatUsers(state.selectChat);

        if (hasError(chatUsers)) {
            dispatch({ loginFormError: chatUsers.reason });
            return
        }

        dispatch({ chatUsers });
    } catch (error) {
        console.error(error);
    }
}

export const deleteUserInChat: DispatchStateHandler<string> = async (dispatch, state, action) => {
    try {
        const response = await chatAPI.deleteUsersInChat(Number(action), Number(state.selectChat));

        if (hasError(response)) {
            dispatch({ loginFormError: response.reason });
            return;
        }

        if(state.chatUsers.length === 1) {
     
            dispatch({ chatUsers: [], selectChat: '', chats: [] });
            return
        }
        
        const chatUsers = await chatAPI.getChatUsers(state.selectChat);

        if (hasError(chatUsers)) {
            dispatch({ loginFormError: chatUsers.reason });
            return;
        }

        dispatch({ chatUsers });
    } catch (error) {
        console.error(error);
    }
}

export const deleteChatById: DispatchStateHandler<number> = async (dispatch, state, action) => {
    try {

        await chatAPI.delete(action)

        const chats = await chatAPI.meChats();

        dispatch({ chats, selectChat: "" });
    } catch (error) {
        console.error(error);
    }
}


export const createChatByTitle: DispatchStateHandler<string> = async (dispatch, state, action) => {
    try {

        await chatAPI.create(action);

        const chats = await chatAPI.meChats();

        dispatch({ chats });
    } catch (error) {
        console.error(error);
    }
}

export const getChatUsers: DispatchStateHandler<string> = async (dispatch, state, action) => {
    try {
        const chatUsers = await chatAPI.getChatUsers(action);

        dispatch({ chatUsers });
    } catch (error) {
        console.error(error);
    }
}






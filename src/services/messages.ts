import { chatAPI } from 'api/chat';
import type { Dispatch } from 'core';

export const createChatRoom = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    chatId: any,
) => {
    try {
        dispatch({ messages: [] })

        const { token } = await chatAPI.getToken(chatId);
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${state.user.id}/${chatId}/${token}`);


        dispatch({ socket, selectChat: true })

        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: 0,
                type: 'get old'
            }));
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            const messages = JSON.parse(event.data)

            if (Array.isArray(messages) && messages.length) {
                const id = messages[messages.length - 1].id

                dispatch({ messages: [...messages.reverse(), ...window.store.getState().messages] })

                socket.send(JSON.stringify({
                    content: id,
                    type: 'get old'
                }))

            } else {
                if (messages.type === 'message') {
                    state.messages.push(messages)
                    dispatch({ messages: [...window.store.getState().messages, messages] })
                }
            }
            console.log('Получены данные', event.data);
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    } catch (e) {
        console.log(e)
    }
}



export const sendMessage = async (dispatch: Dispatch<AppState>, state: AppState, action: string,) => {
    state.socket.send(JSON.stringify({
        content: action,
        type: 'message'
    }))
}

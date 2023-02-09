import { HTTPTransport } from 'core/HTTPTransport';

export interface ChatInfo {
  id: number;
  user: User;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

export const chatAPI = {
  create: (title: string) => new HTTPTransport('/chats').post<{ id: number }>("/", { title }),

  meChats: () => new HTTPTransport('/chats').get<ChatInfo[]>('/'),

  addUserToChat: (users: number[], chatId: number) => new HTTPTransport('/chats').put('/users', {
    users,
    chatId: chatId
  }),

  getToken: (id: string) => new HTTPTransport('/chats').post<{ token: string }>('/token/' + id),

  deleteUsersInChat: (users: number[], chatId: number) => new HTTPTransport('/chats').delete('/users', {
    users,
    chatId: chatId
  }),

  delete: (chatId: number) => new HTTPTransport('/chats').delete<ChatInfo[]>("/", { chatId }),

  logout: () => new HTTPTransport('/auth/').post('logout'),

  getChatUsers: (id: number) => new HTTPTransport('/chats/').get(`${id}/users`),
};




import { HTTPTransport } from 'core/HTTPTransport';

export interface ChatInfo {
  user: User;
  id: number;
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

  getChatUsers: (chatId: string) => new HTTPTransport('/chats').get<ChatInfo[]>(`/${chatId}/users`),

  addUserToChat: (userId: number, chatId: number) => new HTTPTransport('/chats').put('/users', {
    users: [userId],
    chatId
  }),

  getToken: (id: string) => new HTTPTransport('/chats').post<{ token: string }>('/token/' + id),

  deleteUsersInChat: (userId: number, chatId: number) => new HTTPTransport('/chats').delete('/users', {
    users: [userId],
    chatId
  }),

  delete: (chatId: number) => new HTTPTransport('/chats').delete<ChatInfo[]>("/", { chatId }),

  logout: () => new HTTPTransport('/auth/').post('logout'),
};




import { ChatInfo } from "api/chat";
import { UserDTO } from "api/types";

declare global {
  export type Nullable<T> = T | null;

  export type Message = {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
    file?: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
    }
  };

  export type DispatchStateHandler<TAction> = (dispatch: Dispatch<AppState>, state: AppState, action: TAction) => Promise<void>

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    loginFormError: string | null;
    user: User | null;
    chats: ChatInfo[];
    socket: any;
    messages: Message[];
    selectChat: boolean;
    chatUsers: UserDTO[];
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;

  };
}

export {};

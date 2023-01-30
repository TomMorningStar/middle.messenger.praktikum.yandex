import { HTTPTransport } from 'core/HTTPTransport';
import { UserDTO } from './types';

type userRequestData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export const userData = {
  changeUserProfile: (data: userRequestData) => new HTTPTransport('/user/').put<UserDTO>('profile', data),

  searchUser: (title: string) => new HTTPTransport('/user/').post<UserDTO[]>('search', { login: title }),

  changeUserAvatar: (data: File) => new HTTPTransport('/user/').put<UserDTO>('profile/avatar', data),

  password: (data) => new HTTPTransport('/user/').put('password', data)
};




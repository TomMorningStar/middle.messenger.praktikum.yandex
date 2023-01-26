import { HTTPTransport } from 'core/HTTPTransport';
import { APIError, UserDTO } from './types';

type LoginRequestData = {
  login: string;
  password: string;
};

type SignupRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

type LoginResponseData = {} | APIError;

export const authAPI = {
  login: (data: LoginRequestData) =>
    new HTTPTransport('/auth/').post<LoginResponseData>("signin", data),

  me: () => new HTTPTransport('/auth/').get<UserDTO | APIError>('user'),

  auth: (data: SignupRequestData) => new HTTPTransport('/auth/').post('signup', data),

  logout: () => new HTTPTransport('/auth/').post('logout'),
};




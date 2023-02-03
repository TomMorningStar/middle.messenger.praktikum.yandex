import { queryString } from "helpers/queryString";

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type PlainObject<T = unknown> = {
  [k in string]: T;
};

type Options = {
  method: METHODS;
  data?: any;
};

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }
  public get<Response>(path = '/', data: PlainObject = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + path + queryString(data));
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.POST,
      data,
    });
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PUT,
      data,
    });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PATCH,
      data,
    });
  }

  public delete<Response>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.DELETE,
      data
    });
  }

  private request<Response>(url: string, options: Options = {method: METHODS.GET}): Promise<Response> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            resolve(xhr.response);
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      data instanceof FormData ? "" :xhr.setRequestHeader('Content-Type', 'application/json')

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if(data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}













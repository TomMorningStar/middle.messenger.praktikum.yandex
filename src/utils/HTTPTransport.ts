enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.GET})
  )
  put: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.PUT})
  )
  post: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.POST})
  )
  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHODS.DELETE})
  )

  request(
    url: string,
    options: Options = { method: METHODS.GET }
  ): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      if (xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

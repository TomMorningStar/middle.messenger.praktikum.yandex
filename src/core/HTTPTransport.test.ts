import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { HTTPTransport, METHODS } from './HTTPTransport';

describe('HTTPTransport', () => {
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        sinon.useFakeXMLHttpRequest().onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });
    });

    afterEach(() => {
        requests.length = 0;
    })

    it('should send GET request', () => {
        new HTTPTransport('/').get<unknown>('/');

        const [request] = requests;

        expect(request.method).toEqual(METHODS.GET);
    });

    it('should send POST request', () => {
        new HTTPTransport('/').post<unknown>('/', {});

        const [request] = requests;

        expect(request.method).toEqual(METHODS.POST);
    });

    it('should send DELETE request', () => {
        new HTTPTransport('/').delete<unknown>('/');

        const [request] = requests;

        expect(request.method).toEqual(METHODS.DELETE);
    });

    it('should send PUT request', () => {
        new HTTPTransport('/').put<unknown>('/', {});

        const [request] = requests;

        expect(request.method).toEqual(METHODS.PUT);
    });

    it('should send PATCH request', () => {
        new HTTPTransport('/').patch<unknown>('/', {});

        const [request] = requests;

        expect(request.method).toEqual(METHODS.PATCH);
    });
});

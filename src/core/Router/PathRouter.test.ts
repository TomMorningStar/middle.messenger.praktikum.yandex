import { CoreRouter } from 'core/Router/CoreRouter';
import { PathRouter } from './PathRouter';

describe('core/Router/PathRouter', () => {
    it('should have a "go" method that changes the route', () => {
        const router: CoreRouter = new PathRouter();

        const mock = jest.fn();
        router.use('/route', mock);

        router.go('/route');

        expect(mock).toHaveBeenCalled();

        expect(window.location.pathname).toEqual('/route');
    });

    it('should show the route if the route is not found', () => {
        const router: CoreRouter = new PathRouter();

        const mock = jest.fn();
        router.use('*', mock);

        router.go('/');

        expect(mock).toHaveBeenCalled();
    });

    it('should back in history', () => {
        const router: CoreRouter = new PathRouter();

        window.history.pushState({}, '', '/route1');
        window.history.pushState({}, '', '/route2');

        router.back(); 

        window.onpopstate = (_event: PopStateEvent) => {
            expect(window.location.pathname).toBe('/route1');
        };
    });

    it('should forward in history', () => {
        const router: CoreRouter = new PathRouter();

        window.history.pushState({}, '', '/route1');
        window.history.pushState({}, '', '/route2');

        router.back();
        router.forward();

        window.onpopstate = (_event: PopStateEvent) => {
            expect(window.location.pathname).toBe('/route2');
        };
    });
});



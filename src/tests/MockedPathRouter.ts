import { PathRouter } from 'core';

export class MockedPathRouter extends PathRouter {
  go(hash: string) {
    window.location.hash = hash;
    this.onRouteChange();
  }
}

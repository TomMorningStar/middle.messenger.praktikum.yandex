import { BlockClass, renderDOM, registerComponent, Store } from 'core';
import { defaultState } from 'store';
import * as components from 'components';
import { initRouter } from '../router';
import { MockedPathRouter } from 'tests/MockedPathRouter';
import { sleep } from 'utils/sleep';

type RenderBlockParams<T> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
}

export async function renderBlock<T extends Object>({ Block, props, state = defaultState }: RenderBlockParams<T>) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  const router = new MockedPathRouter();

  window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="root"></div>';

  renderDOM(new Block(props as T));

  initRouter(router, store);

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();
}

export async function step(name: string, callback: () => void) {
  await callback();
}

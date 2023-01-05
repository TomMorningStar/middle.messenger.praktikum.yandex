import { Block } from 'utils';
import template from 'bundle-text:./home.hbs';

export class HomePage extends Block {
  static componentName = 'HomePage';

  render() {
    return template;
  }
}

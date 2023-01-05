import { Block } from 'utils';

export class SearchInput extends Block {
  static componentName = 'SearchInput';

  render() {
    return `<input type='text' placeholder='Поиск' />`;
  }
}

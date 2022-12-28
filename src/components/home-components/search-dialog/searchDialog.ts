import { Block } from 'utils';

export class SearchDialogComponent extends Block {
  static componentName = 'SearchDialogComponent';

  render() {
    return `
    <div class='search-dialog-wrapper'>
        <div class='search-dialog'>
        <svg width='13' height='14' viewBox='0 0 13 14' fill='none'>
            <path
            fill-rule='evenodd'
            d='M7.59239 8.41382C6.16047 9.84574 3.83886 9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645 6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277 9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491 4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279 4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277 9.79678Z'
            fill='#999999'
            ></path>
        </svg>
        <input type='text' name="message" placeholder='Поиск' />
        </div>
    </div>
    `;
  }
}

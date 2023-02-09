import { Block, CoreRouter } from 'core';
import { withRouter } from 'utils';

interface ProfileLinkButtonProps {
  router: CoreRouter;
  events: {
    click: () => void
  }
}

 class ProfileLinkButton extends Block {
  static componentName = 'ProfileLinkButton';

  constructor(props: ProfileLinkButtonProps) {
    super({...props, events: {click: () => this.props.router.go('/settings')}})
  }

  render() {
    return `
    <div class='navigate'>
        <span>Профиль</span>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='8'
            height='10'
            viewBox='0 0 6 10'
            fill='none'
        >
            <path d='M1 9L5 5L1 1' stroke='#999999'></path>
        </svg>
    </div>`;
  }
}

const Button = withRouter(ProfileLinkButton);

export { Button as ProfileLinkButton };

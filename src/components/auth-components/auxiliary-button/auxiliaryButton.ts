import { Block, CoreRouter } from 'core';
import { withRouter } from 'utils';

interface AuxiliaryButtonProps {
  router: CoreRouter;
  text: string;
  events: {
    click: () => void;
  }
}

class AuxiliaryButton extends Block {
  static componentName = 'AuxiliaryButton';

  constructor({...props}: AuxiliaryButtonProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (this.props.text === "Войти") {
            this.props.router.go('/signIn')
          } else {
            this.props.router.go('/signUp')
          }
        }
      }
    });
  }

  render() {
    return `
    <div class='sing-up-in-button-block'>
      <button class='cursor-pointer'>{{text}}</button>
    </div>`;
  }
}

const Button = withRouter(AuxiliaryButton);

export { Button as AuxiliaryButton };

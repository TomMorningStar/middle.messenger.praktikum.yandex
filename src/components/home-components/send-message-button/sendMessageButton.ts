import Block from '../../../utils/Block';
import tempate from './sendMessageButton.hbs';

interface ButtonProps {
  events: {
    click: () => void;
  };
}

export class SendMessageButton extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(tempate, { ...this.props });
  }
}

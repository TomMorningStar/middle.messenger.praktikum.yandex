import Block from '../../../utils/Block';
import template from './searchDialog.hbs';

interface SearchDialogProps {
//   events: {
//     click: () => void;
//   };
}

export class SearchDialog extends Block {
  constructor(props: SearchDialogProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

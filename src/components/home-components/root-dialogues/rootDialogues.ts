import { Block } from 'utils';
import { dialogues} from '../../../datas/data'

export class RootDialogues extends Block {
  static componentName = 'RootDialogues';

  constructor() {
    super()

    this.setProps({
      dialogues,
    })
  }

  render() {
    return `
    <div class='root-dialogues'>
            {{{NavWrapper}}}
            {{{Dialogues dialogues=dialogues}}}
    </div>
    `;
  }
}

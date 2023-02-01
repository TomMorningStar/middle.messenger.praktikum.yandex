import { Block } from 'core';


export class RootDialogues extends Block {
  static componentName = 'RootDialogues';

  render() {
    return `
    <div class='root-dialogues'>
            {{{NavWrapper}}}
            {{{Dialogues}}}
    </div>
    `;
  }
}

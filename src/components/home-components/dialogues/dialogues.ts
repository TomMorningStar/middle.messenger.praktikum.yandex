import Block from '../../../utils/Block';
import DialogItem from '../dialog-item';
import { DialogItemProps } from '../dialog-item/dialogItem';
import template from './dialogues.hbs';


interface DialoguesProps {
  dialogues: DialogItemProps[];
}

export class Dialogues extends Block {
  constructor(props: DialoguesProps) {
    super(props);
  }

  protected initChildren() {
    this.children.dialogues = this.createChats(this.props);
  }

  private createChats(props: DialoguesProps) {
    return props.dialogues.map((dialogItem) => {
      return new DialogItem({
        ...dialogItem,
        events: { click: () => console.log(dialogItem.nickName) },
      });
    });
  }



  render() {

    return this.compile(template, { ...this.props });
  }
}

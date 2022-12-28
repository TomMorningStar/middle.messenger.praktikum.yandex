import { Block } from 'utils';

type DailoguesPropsArray = {
  dialogues: DailoguesProps;
};

interface DailoguesProps {
  nickName: string;
  time: string;
  messageText: string;
  messageNotification: number;
  avatar: string;
}

export class Dialogues extends Block {
  static componentName = 'Dialogues';

  constructor({ dialogues }: DailoguesPropsArray) {
    super({ dialogues });
  }

  render() {
    return `
    <div class='dialogues'>
      ${
        this.props.dialogues
          ? this.props.dialogues
              .map((item) => {
                return `{{{DialogItem 
                  nickName="${item.nickName}"
                  time="${item.time}" 
                  messageText="${item.messageText}"
                  messageNotification="${
                    item.messageNotification ? item.messageNotification : ''
                  }"
                  avatar="${item.avatar}"
                }}}`;
              })
              .join('')
          : ''
      } 
    </div>`;
  }
}

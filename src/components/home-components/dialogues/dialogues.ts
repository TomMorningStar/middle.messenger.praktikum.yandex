import { ChatInfo } from 'api/chat';
import { Block, Store } from 'core';
import { withStore } from 'utils';

interface DailoguesProps {
  dialogues: ChatInfo[];
  store: Store<AppState>;
}
class Dialogues extends Block {
  static componentName = 'Dialogues';

  constructor(props: DailoguesProps) {
    super(props);
  }



  render() {
    return `
    <div class='dialogues'>
      ${window.store.getState().chats
        .map((item: ChatInfo) => {
          return `{{{DialogItem 
              id="${item.id}"
              store=store
              lastMessageContent="${item.last_message?.content}"
              lastMessageUserLogin="${item.last_message?.user?.login}"
              avatar="${item.user?.avatar}"
              nickName="${item.user?.login}"
              messageNotification="${item.unread_count === 0 ? "" : item.unread_count}"
            }}}`;
        })
        .join('')} 
    </div>`;
  }
}

const UpdateDialogues = withStore(Dialogues);

export { UpdateDialogues as Dialogues };

import { Block, Store } from 'core';
import { deleteChatById, getChatUsers } from 'services/chat';
import { createChatRoom } from 'services/messages';

interface DialogItemProps {
  id: string;
  messageNotification: number;
  nickName: string;
  store: Store<AppState>;
  avatar: string;
  events?: {
    click?: () => void
  };
}

export class DialogItem extends Block {
  static componentName = 'DialogItem';

  constructor({ store, avatar, id, nickName, messageNotification }: DialogItemProps) {
    super({
      store, avatar, id, nickName, messageNotification, events: {
        click: () => {
          this.props.store.dispatch(createChatRoom, this.props.id)
          this.props.store.dispatch(getChatUsers, this.props.id)
        },
      }
    });

    this.setProps({
      deleteChat: (e: MouseEvent) => {
        e.stopPropagation();

        this.props.store.dispatch(deleteChatById, id);
      }
      
    })
  }

  render() {
    return `
        <div class='${this.props.id === window.store.getState().selectChat ? "dialog-item select-chat" : "dialog-item"}'>
            <div>
              ${this.props.avatar !== "null" ? `<img class='item-img' src='https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}'  alt='avatar' />`
        : `<img class='item-img' src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='avatar' />`}
            </div>

            <div class='item-nickName'>{{nickName}}</div>

            {{{DeleteButton deleteChat=deleteChat}}}

          {{#if messageNotification}}
            <div class='item-amount-messages'>
              {{messageNotification}}
            </div>
          {{/if}}       
        </div>`;
  }
}

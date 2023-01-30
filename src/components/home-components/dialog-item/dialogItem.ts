import { Block, Store } from 'core';
import { createChatRoom } from 'services/messages';

interface DialogItemProps {
  id: string;
  messageNotification: number;
  nickName: string;
  store: Store<AppState>;
  events?: {
    click?: () => void
  };
}

export class DialogItem extends Block {
  static componentName = 'DialogItem';

  constructor({ store, id, nickName, messageNotification }: DialogItemProps) {
    super({
      store, id, nickName, messageNotification, events: {
        click: () => {
          this.props.store.dispatch(createChatRoom, this.props.id);

        }
      }
    });
  }

  render() {
    return `
        <div class='dialog-item'>
            <div>
              <img
                  class='item-img'
                  src='https://cdn-icons-png.flaticon.com/512/924/924915.png'
                  alt='avatar'
              />
            </div>

            <div class='item-nickName'>{{nickName}}</div>

          {{#if messageNotification}}
            <div class='item-amount-messages'>
              {{messageNotification}}
            </div>
          {{/if}}

       
        </div>`;
  }
}

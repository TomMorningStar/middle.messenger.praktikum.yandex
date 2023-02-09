import { Block, Store } from 'core';
import { createChatRoom } from 'services/messages';

interface DialogItemProps {
  id: string;
  messageNotification: number;
  nickName: string;
  store: Store<AppState>;
  avatar: string;
  lastMessageContent?: string;
  lastMessageUserLogin?: string;
  events?: {
    click?: () => void
  };
}

export class DialogItem extends Block {
  static componentName = 'DialogItem';

  constructor({ store, lastMessageContent, lastMessageUserLogin, avatar, id, nickName, messageNotification }: DialogItemProps) {
    super({
      store, lastMessageContent, lastMessageUserLogin, avatar, id, nickName, messageNotification, events: {
        click: () => {
          this.props.store.dispatch(createChatRoom, this.props.id);
        }
      }
    });
  }

  render() {
    function truncateString(inputString: string): string {
      if (inputString.length > 37) {
        return inputString.slice(0, 35) + "...";
      }
      return inputString;
    }

    return `
      <div class='dialog-item'>
        <div>
          ${this.props.avatar !== "null" ? `<img class='item-img' src='https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}'  alt='avatar' />`
        : `<img class='item-img' src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='avatar' />`}
              </div>
        <div class='item-info-wrappper'>
          <div class='item-info'>
              <div class='item-nickName'>{{nickName}}</div>
          </div>
        <div class='item-info'>
            <div class='item-text'>
              ${this.props?.lastMessageUserLogin === this.props.store.getState().user.login ? '<strong style="color: black">Вы: </strong>' : ''}
              
              ${this.props.lastMessageContent !== "undefined" ? truncateString(this.props.lastMessageContent) : "Пусто"}
            </div>
            {{#if messageNotification}}
                <div class='item-amount-messages'>
                {{messageNotification}}
              </div>
            {{/if}}
        </div>
        </div>
      </div>`;
  }
}



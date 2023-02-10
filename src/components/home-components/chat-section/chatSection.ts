import { Block, Store } from 'core';
import { withStore } from 'utils';

import "./chatSection.scss";

interface ChatSectionProps {
  store: Store<AppState>;
  burgerWindow: boolean;
}

class ChatSection extends Block {

  static componentName = 'ChatSection';

  constructor(props: ChatSectionProps) {
    super(props)

    this.setProps({
      selectChat: () => this.props.store.getState().selectChat,
      openBurgerWindow: () => {
        this.setProps({
          burgerWindow: !this.props.burgerWindow
        })
      }
    })
  }

  render() {
    const user = this.props.store.getState().user;

    return `
      <div class='chat-section'>
        <div class='chat-dialog-info'>
          <div class='flex'>
              ${user.avatar !== null ? `<img class='chat-dialog-info-img' src="https://ya-praktikum.tech/api/v2/resources/${user.avatar}" alt="авaтар" />`
        : `<img class='chat-dialog-info-img' src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='avatar' />`}
           <div class='chat-dialog-info-nickname'>${user.login}</div>
         </div>
      {{{Burger openBurgerWindow=openBurgerWindow}}}

      {{#if burgerWindow}}
        {{{BurgerWindow}}}
      {{/if}}
      </div>

      {{#if selectChat}}
        <div class='chat-section-messages-wrapper'>
          {{{MessageInputField}}}

            <div class="message-container">
                  ${window.store.getState().messages.map(message => {
          return `
                      <div class='${message.user_id === user.id ? "message sent" : "message received"}'>
                        <p class="message-text">
                        ${message.content}
                        </p>
                      </div>`}).join("")}
            </div>
          </div>
          {{else}}
        <div class="chat-select-please">
          Выберите чат чтобы отправить сообщение
        </div>
      {{/if}}
    </div>
  </div>`;
  }
}



const UpdateChatSection = withStore(ChatSection);

export { UpdateChatSection as ChatSection };

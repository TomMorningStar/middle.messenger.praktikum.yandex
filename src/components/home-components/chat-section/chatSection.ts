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
    const userId = this.props.store.getState().user.id;

    return `
      <div class='chat-section'>
        <div class='chat-dialog-info'>
          <div class='flex'>
              <img class='chat-dialog-info-img' src="https://cdn-icons-png.flaticon.com/512/924/924915.png" alt="автар" />
           <div class='chat-dialog-info-nickname'>Андрей</div>
         </div>
      {{{Burger openBurgerWindow=openBurgerWindow}}}

      {{#if burgerWindow}}
        {{{BurgerWindow}}}
      {{/if}}
      </div>

      {{#if selectChat}}
        <div class='chat-section-messages-wrapper'>
          {{{MessageInputField}}}
                ${window.store.getState().messages.map(message => {
                   return  `
                   <div class='${message.user_id === userId ? "message-right__text-wrapper" : "message-left__text-wrapper"}'>
                     <span class='message-left__text'>
                       ${message.content}
                     </span>
                   </div>
                   `
                }).join("")}
          </div>
          {{else}}
        Выберите чат
      {{/if}}
    </div>
  </div>
    `;
  }
}



const UpdateChatSection = withStore(ChatSection);

export { UpdateChatSection as ChatSection };

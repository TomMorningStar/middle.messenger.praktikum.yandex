import { Block, Store } from 'core';
import { withStore } from 'utils';

import "./chatSection.scss";

interface ChatSectionProps {
  store: Store<AppState>;
  burgerWindow: boolean;
  chatUsers: boolean;
}

class ChatSection extends Block {

  static componentName = 'ChatSection';

  constructor(props: ChatSectionProps) {
    super(props)

    this.setProps({
      burgerWindow: false,
      chatUsers: false,
      selectChat: () => this.props.store.getState().selectChat,
      openBurgerWindow: () => {
        this.setProps({
          burgerWindow: !this.props.burgerWindow
        })
      },
      getChatUsers: () => {
        this.setProps({
          chatUsers: !this.props.chatUsers
        })
      },
    })
  }

  render() {
    const user = this.props.store.getState().user;

    return `
      <div class='chat-section'>
        <div class='chat-dialog-info'>
          <div class='flex'>
              ${user.avatar ? `<img class='chat-dialog-info-img' src="https://ya-praktikum.tech/api/v2/resources/${user.avatar}" alt="авaтар" />`
        : `<img class='chat-dialog-info-img' src='https://cdn-icons-png.flaticon.com/512/924/924915.png' alt='avatar' />`}
           <div class='chat-dialog-info-nickname'>${user.login}
           </div>

           <div class="chat-users-wrapper">
           {{#if chatUsers}}
               ${window.store.getState().chatUsers.map(user => {
          return `
                     <div class="chat-users-block">
                       <div class="info-burger"> 

                         <div class="info-text">${user.login}</div>
                         {{{Button ref="deleteButtonRef" id="${user.id}"}}}
                       </div>
                     </div>`
        }).join('')}
           {{/if}}
         </div>

         </div>

        {{#if selectChat}}
          {{{Burger text="Участники чата" getChatUsers=getChatUsers}}}
          {{{Burger text="Добавить пользователя в чат" openBurgerWindow=openBurgerWindow}}}
        {{/if}}

        {{#if burgerWindow}}
          {{{BurgerWindow}}}
        {{/if}}


      </div>
      {{#if selectChat}}
        <div class='chat-section-messages-wrapper'>
          {{{MessageInputField}}}
                ${window.store.getState().messages.map(message => {
          return `
                   <div class='${message.user_id === user.id ? "message-right__text-wrapper" : "message-left__text-wrapper"}'>
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
  </div>`;
  }
}



const UpdateChatSection = withStore(ChatSection);

export { UpdateChatSection as ChatSection };

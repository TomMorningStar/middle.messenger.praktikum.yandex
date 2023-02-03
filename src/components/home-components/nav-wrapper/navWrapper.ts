import { Block, Store } from 'core';
import { createChatByTitle } from 'services/chat';
import { withStore } from 'utils';

interface NavWrapperProps {
  chatActiveWindow: boolean;
  chatDeleteWindow: boolean;
  closeWindow?: () => void;
  cheateChat?: () => void;
  store: Store<AppState>;
}

class NavWrapper extends Block {
  static componentName = 'NavWrapper';

  constructor(props: NavWrapperProps) {
    super(props)

    this.setProps({
      chatActiveWindow: false,
      chatDeleteWindow: false,
      closeWindow: (e: { target: HTMLInputElement; }) => {
        if (e.target.className === 'user-action-window') {          
          this.setProps({
            chatActiveWindow: false,
          })
        }
      },
      cheateChat: () => {
        this.setProps({
          chatActiveWindow: true,
        })
      },

      createChat: () => this.props.store.dispatch(createChatByTitle, this.refs.createChatRef.refs.actionInput.element.value),
    })
  }

  render() {
    return `
    <nav>
    
        {{{ProfileLinkButton}}}

        {{{ActionButton cheateChat=cheateChat styles="action-chat-button" text="Создать чат"}}}

     
          {{#if chatActiveWindow}}
          <div class="burger-window">
            {{{UserActionWindow placeholder="Название" ref="createChatRef" action=createChat closeWindow=closeWindow label="Создать чат" buttonText="Создать"}}}
            </div>
          {{/if}}

    
        {{{SearchDialogComponent}}}
    </nav>
    `;
  }
}

const UpdateNavWrapper = withStore(NavWrapper);

export { UpdateNavWrapper as NavWrapper };

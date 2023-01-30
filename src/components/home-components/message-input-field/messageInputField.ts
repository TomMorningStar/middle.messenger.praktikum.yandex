import { Block } from 'core';
import { sendMessage } from 'services/messages';
import { withStore } from 'utils';

import './styles.scss';

class MessageInputField extends Block {
  static componentName = 'MessageInputField';

  constructor({ emptyText, store }: Record<string, string>) {
    super({ emptyText, store });

    this.setProps({
      send: () => {
        this.setProps({
          emptyText: this.refs.messageInput.element.value,
        });

        if (!this.props.emptyText) {
          this.setProps({
            error: 'error-message-field',
          });
        } else {
          this.props.store.dispatch(sendMessage, this.props.emptyText);

          this.setProps({
            error: '',
          });
        }
      },

      open: () => {
        this.setProps({
          openWindow: !this.props.openWindow,
        });
      },
    });
  }

  render() {
    return `
    <div> 
        <div class='message-input-field'>
        {{{SelectSendFile open=open}}}
            <div class='inp-value-message'>
        {{{MessageInput ref="messageInput" error=error}}}
            </div>
        {{{SendMessageButton send=send}}}
        </div>

        {{#if openWindow}}
          {{{WindowSelectFile}}}
        {{/if}}
    </div>`;
  }
}


const UpdateMessageInputField = withStore(MessageInputField);

export { UpdateMessageInputField as MessageInputField };

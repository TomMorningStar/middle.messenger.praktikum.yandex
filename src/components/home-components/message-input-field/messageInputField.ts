import { Block } from 'utils';

import './styles.scss';

export class MessageInputField extends Block {
  static componentName = 'MessageInputField';

  constructor({ emptyText }: Record<string, string>) {
    super({ emptyText });

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

import { Block } from 'core';

export class DialogItem extends Block {
  static componentName = 'DialogItem';

  render() {
    return `
        <div class='dialog-item'>
            <div>
              <img
                  class='item-img'
                  src='{{avatar}}'
                  alt='avatar'
              />
            </div>
            <div class='item-info-wrappper'>
              <div class='item-info'>
                  <div class='item-nickName'>{{nickName}}</div>
                  <div class='time'>{{time}}</div>
              </div>
            <div class='item-info'>
                <div class='item-text'>
                  {{messageText}}
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

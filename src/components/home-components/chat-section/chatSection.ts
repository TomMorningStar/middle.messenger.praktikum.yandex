import { Block } from 'core';

import "./chatSection.scss";

export class ChatSection extends Block {

  static componentName = 'ChatSection';

  constructor() {
    super()

    this.setProps({
      openBurgerWindow: () => {
        this.setProps({
          burgerWindow: !this.props.burgerWindow
        })
      }
    })
  }

  render() {
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

    <div class='chat-section-messages-wrapper'>
      {{{MessageInputField}}}

      <h4 class='message-time-data'>19 июня</h4>

      <div id='message' class='message-left'>
        <div class='message-left__text-wrapper'>
          <div class='message-left__text'>Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Dolore dolor deserunt cum facilis
            ipsum dignissimos iure explicabo repellat rem vero?

            <span id='time-margin' class='message-left__time'>
              11:56
            </span></div>
        </div>
        <div class='message-left__text-wrapper'>
          <div class='message-left__text'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
            eveniet quam eaque harum maiores delectus molestias culpa recusandae
            neque, sunt ea atque porro voluptas vel officia, officiis nostrum
            quas! Sapiente.
            <span id='time-margin' class='message-left__time'>
              11:56
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

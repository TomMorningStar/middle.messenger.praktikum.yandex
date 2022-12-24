
import Block from '../../utils/Block';
import template from './home.hbs';
import { dialogues } from '../../datas/data';

import Dialogues from './../../components/home-components/dialogues';
import SendMessageButton from './../../components/home-components/send-message-button';
import Navigate  from './../../components/home-components/root-navigate';


export class HomePage extends Block {
  protected initChildren() {
    this.children.sendMessageButton = new SendMessageButton({
      events: {
        click: () => console.log('Отправил сообщение'),
      },
    });

    this.children.dialogues = new Dialogues({
      dialogues
    });

    this.children.navigate = new Navigate({})
  }

  render() {   
    return this.compile(template, this.props);
  }
}

import Block from '../../../utils/Block';
import template from './dialogItem.hbs';

export interface DialogItemProps {
  nickName: string;
  time: string;
  messageText: string;
  messageNotification: number;
  avatar: string;
  events?: {
    click?: () => void;
}
}

export class DialogItem extends Block {

  nosad: string = '1231221323'

  constructor(props: DialogItemProps) {
    super(props);





  }


  foo() {
    setTimeout(() => {
      this.setProps({
        ...this.props,
        nickName: this.nosad
      })
    }, 1000);
  }

  render() {
  console.log(this.props);
  
    
    return this.compile(template, this.props);
  }
}

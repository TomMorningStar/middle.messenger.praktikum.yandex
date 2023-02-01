import { Block } from 'core';

interface UserActionButtonProps {
    value: string;
    icon: string;
    addUser?: () => void;
    deleteUser?: () => void;
}

export class UserActionButton extends Block {
  static componentName = 'UserActionButton';

  constructor({value, icon, addUser, deleteUser}: UserActionButtonProps) {
    super({value, icon, events: {click: addUser || deleteUser}})
  }

  render() {
    return `
        <div class="info-burger"> 
            <div class="icon">
                ${this.props.icon}
            </div>
            <div class="info-text">${this.props.value}</div>
        </div>`;
  }
}

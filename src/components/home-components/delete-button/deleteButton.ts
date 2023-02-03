import { Block } from 'core';

interface DeleteButtonButtonProps {
  deleteChat?: () => void;
  id: string;

}

export class DeleteButton extends Block {
  static componentName = 'DeleteButton';

  constructor({deleteChat, }: DeleteButtonButtonProps) {
    super({ events: {
      click: deleteChat 
    }});
  }

  render() {
    return `<button class="delete-button">x</button>`;
  }
}

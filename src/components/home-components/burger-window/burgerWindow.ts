import { Block, Store } from 'core';
import { createChat, deleteChat } from 'services/chat';
import { withStore } from 'utils';

interface BurgerWindowProps {
  store: Store<AppState>;
  userActiveWindow: boolean;
  userDeleteWindow: boolean;
  addUser: () => void;
  closeWindow: () => void;
  formError?: () => string | null;
}

class BurgerWindow extends Block {
  static componentName = 'BurgerWindow';

  constructor(props: BurgerWindowProps) {
    super(props);

    this.setProps({
      userActiveWindow: false,
      userDeleteWindow: false,
      deleteUserWindowError: '',
      actionAddUserButton: () => this.actionAddUser(),
      deleteAddUserButton: () => this.actionDeleteUser(),
      formError: () => this.props.store.getState().loginFormError,
      addUser: () => {
        this.setProps({
          userActiveWindow: true,
        })
      },
      deleteUser: () => {
        this.setProps({
          userDeleteWindow: true,
        })
      },

      closeWindow: (e: { target: HTMLInputElement; }) => {
        if (e.target.className === 'user-action-window') {
          this.props.store.dispatch({ loginFormError: ""})
          
          this.setProps({
            userActiveWindow: false,
            userDeleteWindow: false,
          })
        }
      }
    })
  }

  actionDeleteUser() {
    const title = this.refs.deleteUserRef.refs.actionInput.element.value;

    if(title) {
      this.props.store.dispatch(deleteChat, title);
    }
  }


  actionAddUser() {
    const title = this.refs.addUserRef.refs.actionInput.element.value;
    
    if (title) {
      this.props.store.dispatch(createChat, title)
    }
  }

  componentDidUpdate() {
    return true
  }

  render() {
    const formError = window.store.getState().loginFormError;

    if(formError === "такого чата не найдено") {
      return `
      <div class="burger-window">
        {{{UserActionWindow ref="deleteUserRef" action=deleteAddUserButton closeWindow=closeWindow label="Удалить пользователя" buttonText="Удалить пользователя"}}}
      <div>
      `
    }

    if(formError === "такого человека не найдено") {
      return `
      <div class="burger-window">
        {{{UserActionWindow ref="addUserRef" action=actionAddUserButton closeWindow=closeWindow label="Добавить пользователя" buttonText="Добавить пользователя"}}}
      <div>
      `
    }
    

    return `
    <div class="burger-window"> 
        {{{UserActionButton addUser=addUser icon="+" value="Добавить пользователя"}}}
        {{{UserActionButton deleteUser=deleteUser icon="×" value="Удалить пользователя"}}}

        {{#if userActiveWindow}}
          {{{UserActionWindow ref="addUserRef" action=actionAddUserButton closeWindow=closeWindow label="Добавить пользователя" buttonText="Добавить пользователя"}}}
        {{/if}}




          {{#if userDeleteWindow}}
            {{{UserActionWindow ref="deleteUserRef" action=deleteAddUserButton closeWindow=closeWindow label="Удалить пользователя" buttonText="Удалить пользователя"}}}
          {{/if}}


    </div>`;
  }
}


const UpdateBurgerWindow = withStore(BurgerWindow);

export { UpdateBurgerWindow as BurgerWindow };

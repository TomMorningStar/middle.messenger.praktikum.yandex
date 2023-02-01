import { Block, Store } from 'core';
import { addUserToChat, deleteChat } from 'services/chat';
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
          this.props.store.dispatch({ loginFormError: "" })

          this.setProps({
            userActiveWindow: false,
            userDeleteWindow: false,
          })
        }
      }
    })
  }


  actionAddUser() {
    const userId = this.refs.addUserRef.refs.actionInput.element.value;

    if (userId) {
      this.props.store.dispatch(addUserToChat, userId);
    }
  }

  componentDidUpdate() {
    return true
  }

  render() {
    const formError = window.store.getState().loginFormError;

    if (formError === "такого человека не найдено") {
      return `
      <div class="burger-window">
        {{{UserActionWindow placeholder="id" ref="addUserRef" action=actionAddUserButton closeWindow=closeWindow label="Добавить пользователя" buttonText="Добавить пользователя"}}}
      <div>
      `
    }

    return `
    <div class="burger-window"> 
        {{{UserActionButton addUser=addUser icon="+" value="Добавить пользователя"}}}
        
        {{#if userActiveWindow}}
          {{{UserActionWindow placeholder="id" ref="addUserRef" action=actionAddUserButton closeWindow=closeWindow label="Добавить пользователя" buttonText="Добавить пользователя"}}}
        {{/if}}
    </div>`;
  }
}


const UpdateBurgerWindow = withStore(BurgerWindow);

export { UpdateBurgerWindow as BurgerWindow };

import { Block, Store } from 'core';
import { withStore } from 'utils';

interface UserActionWindowProps {
    buttonText: string;
    store: Store<AppState>;
    closeWindow?: () => void;
    label: string;
    action?: () => void;
    formError?: () => string | null;
}

class UserActionWindow extends Block {
  static componentName = 'UserActionWindow';

  constructor({buttonText, label, store, formError, closeWindow, action}: UserActionWindowProps) {
    super({buttonText, label, store, formError, action, events: {click: closeWindow }})

    this.setProps({
      formError: () => this.props.store.getState().loginFormError,
    })

  }

  componentDidUpdate() {
    return true
  }

  render() {
    return `
    <div class="user-action-window"> 
        <div class="user-action-window-content"> 

        <h5 class="title">${this.props.label}</h5>

        <label>Логин</label>
        <div>
            {{{ActionInput ref="actionInput"}}}
            <div class="error">{{#if formError}}{{formError}}{{/if}}</div>
        </div>

        <div> 
            {{{ActionButton action=action text="${this.props.buttonText}"}}}
        </div>
        </div>
    </div>`;
  }
}



const UpdateUserActionWindow = withStore(UserActionWindow);

export { UpdateUserActionWindow as UserActionWindow };

import { Block, CoreRouter, Store } from 'core';
import { validateForm, ValifateRuleType } from 'helpers/validateForm';
import { login } from 'services/auth';
import { withStore, withRouter, Screens } from 'utils';

type SignInPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  labelClass: string;
  onSubmit?: () => void;
  onToggleAppLoading?: () => void;
};


export class SignIn extends Block<SignInPageProps> {
  static componentName = 'SignIn';

  constructor(props: SignInPageProps) {
    super(props);

    this.setProps({
      labelClass: "info",
      onSubmit: () => {
        const errorMessage = validateForm([
          { type: ValifateRuleType.AuthLogin, value: this.refs.loginInputRef.refs.input.element.value },
          { type: ValifateRuleType.AuthPassword, value: this.refs.passwordInputRef.refs.input.element.value },
        ]);

        const loginValue = {
          login: this.refs.loginInputRef.refs.input.element.value,
          password: this.refs.passwordInputRef.refs.input.element.value
        }

        this.refs.passwordInputRef.refs.errorRef.setProps({
          text: 'Неверный логин или пароль'
        })

        if (!errorMessage.authLogin && !errorMessage.authPassword) {
          this.props.router.go('/')
          this.props.store.dispatch(login, loginValue)

          console.log('в будущем тут будет реализовата форма отрпавки')
        }
      },
    });
  }

  componentDidUpdate() {
    return window.store.getState().screen === Screens.SignIn
  }

  render() {
    return `
      <main>
        <div class='authPage'>
          <div class='authCart'>
            <h3>Вход</h3>

            {{{ControlledInput 
              ref="loginInputRef"
              onInput=onInput
              onFocus=onFocus
              name="login"
              placeholder="..."
              type="text"
              label="Логин"
              labelClass=labelClass
              signIn=${true}
            }}}

            {{{ControlledInput 
              ref="passwordInputRef"
              onInput=onInput
              onFocus=onFocus
              name="password"
              placeholder="..."
              type="password"
              label="Пароль"
              labelClass=labelClass
                signIn=${true}
            }}}
        
            <div class='navigate-page-block'>
              {{{SignButton ref="signButtonEl" onSubmit=onSubmit text="Авторизоваться"}}}
              {{{AuxiliaryButton text="Нет аккаунта?"}}}
            </div>
          </div>
        </div>
      </main>`;
  }
}


export default withRouter(withStore(SignIn));

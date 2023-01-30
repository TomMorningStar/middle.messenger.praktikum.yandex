import { Block, CoreRouter, Store } from 'core';
import { validateForm, ValifateRuleType } from 'helpers/validateForm';
import { Screens, withRouter, withStore } from 'utils';
import { signUp } from 'services/auth';

type SignUpPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  labelClass: string;
  onSubmit?: () => void;
};

export class SignUp extends Block {
  static componentName = 'SignUp';

  constructor(props: SignUpPageProps) {
    super(props);

    this.setProps({
      labelClass: 'info',
      onSubmit: () => {

        const errorMessage = validateForm([
          {
            type: ValifateRuleType.Mail,
            value: this.refs.mailRef.refs.input.element.value,
          },
          {
            type: ValifateRuleType.Login,
            value: this.refs.loginInputRef.refs.input.element.value,
          },
          {
            type: ValifateRuleType.FirstName,
            value: this.refs.firstNameRef.refs.input.element.value,
          },
          {
            type: ValifateRuleType.LastName,
            value: this.refs.lastNameRef.refs.input.element.value,
          },
          {
            type: ValifateRuleType.Phone,
            value: this.refs.phoneRef.refs.input.element.value,
          },
          {
            type: ValifateRuleType.Password,
            value: this.refs.firstPasswordRef.refs.input.element.value,
          },
          {
            type: ValifateRuleType.Password,
            value: this.refs.lastPasswordRef.refs.input.element.value,
          },
        ]);

        this.refs.mailRef.refs.errorRef.setProps({
          text: errorMessage.mail,
        });

        this.refs.loginInputRef.refs.errorRef.setProps({
          text: errorMessage.login,
        });

        this.refs.firstNameRef.refs.errorRef.setProps({
          text: errorMessage.firstName,
        });

        this.refs.lastNameRef.refs.errorRef.setProps({
          text: errorMessage.lastName,
        });

        this.refs.phoneRef.refs.errorRef.setProps({
          text: errorMessage.phone,
        });

        this.refs.firstPasswordRef.refs.errorRef.setProps({
          text: errorMessage.password,
        });

        this.refs.lastPasswordRef.refs.errorRef.setProps({
          text: errorMessage.password,
        });

        const authData = {
          first_name: this.refs.firstNameRef.refs.input.element.value,
          second_name: this.refs.lastNameRef.refs.input.element.value,
          login: this.refs.loginInputRef.refs.input.element.value,
          email: this.refs.mailRef.refs.input.element.value,
          password: this.refs.firstPasswordRef.refs.input.element.value,
          phone: this.refs.phoneRef.refs.input.element.value,
        }



        if (
          !errorMessage.mail &&
          !errorMessage.login &&
          !errorMessage.firstName &&
          !errorMessage.lastName &&
          !errorMessage.phone &&
          !errorMessage.password
        ) {

          if (
            this.refs.firstPasswordRef.refs.input.element.value !==
            this.refs.lastPasswordRef.refs.input.element.value
          ) {
            this.refs.lastPasswordRef.refs.errorRef.setProps({
              text: 'Пароли не совпадают',
            });
          } else {
            this.props.store.dispatch(signUp, authData)
          }

        }
      },
    });
  }

  componentDidUpdate() {
    return window.store.getState().screen === Screens.SignUp
  }

  render() {
    return `
    <main>
      <div class='authPage'>
        <div class='authCart'>
          <h3>Регистрация</h3>

            <form action=''>

            {{{ControlledInput
              labelClass=labelClass 
              ref="mailRef"
              name="email"
              placeholder="..."
              type="text"
              label="Почта"
            }}}

            {{{ControlledInput
              labelClass=labelClass 
              ref="loginInputRef"
              name="login"
              placeholder="..."
              type="login"
              label="Логин"
            }}}

            {{{ControlledInput
              labelClass=labelClass 
              ref="firstNameRef"
              name="first_name"
              placeholder="..."
              type="first_name"
              label="Имя"
            }}}

            {{{ControlledInput
              labelClass=labelClass 
              ref="lastNameRef"
              name="second_name"
              placeholder="..."
              type="last_name"
              label="Фамилия"
            }}}

            {{{ControlledInput
              labelClass=labelClass 
              ref="phoneRef"
              name="phone"
              placeholder="..."
              type="phone"
              label="Номер"
            }}}

            {{{ControlledInput
              labelClass=labelClass 
              ref="firstPasswordRef"
              name="password"
              placeholder="..."
              type="password"
              label="Пароль"
            }}}

            {{{ControlledInput
              labelClass=labelClass 
              ref="lastPasswordRef"
              name="password"
              placeholder="..."
              type="password"
              label="Пароль (еще раз)"
            }}}
          </form>

          <div class='navigate-page-block-sign-up'>
              {{{SignButton onSubmit=onSubmit text="Зарегистрироваться"}}}
              {{{AuxiliaryButton text="Войти"}}}
          </div>
        </div>
      </div>
    </main>`;
  }
}
export default withRouter(withStore(SignUp));

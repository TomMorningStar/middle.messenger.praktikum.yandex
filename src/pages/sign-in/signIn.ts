import { Block } from 'utils';
import { validateForm, ValifateRuleType } from 'helpers/validateForm';

export class SignIn extends Block {
  static componentName = 'SignIn';

  constructor() {
    super();

    this.setProps({
      labelClass: "info",
      onSubmit:() => {

        const errorMessage = validateForm([
          { type: ValifateRuleType.AuthLogin, value: this.refs.loginInputRef.refs.input.element.value },
          { type: ValifateRuleType.AuthPassword, value: this.refs.passwordInputRef.refs.input.element.value },
        ]);

        this.refs.passwordInputRef.refs.errorRef.setProps({
          text: 'Неверный логин или пароль'
        })
        
        console.log({
          login: this.refs.loginInputRef.refs.input.element.value,
          password:  this.refs.passwordInputRef.refs.input.element.value,
    
        });
        if(!errorMessage.authLogin && !errorMessage.authPassword) {
          window.location.href = './'
          console.log('в будущем тут будет реализовата форма отрпавки')
        }
      },
    });
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
          }}}
      
          <div class='navigate-page-block'>
            {{{SignButton ref="signButtonEl" onSubmit=onSubmit text="Авторизоваться"}}}
            {{{AuxiliaryButton text="Нет аккаунта?"}}}
          </div>
        </div>
      </div>
    </main>  
    `;
  }
}

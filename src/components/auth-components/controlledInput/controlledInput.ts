import { validateForm, ValifateRuleType } from 'helpers/validateForm';
import { Block } from 'utils';

interface ControlledInputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  label?: string;
  name?: string;
  errorClass?: string;
  labelClass?: string;
  ControlledInputClass?: string;
}

export class ControlledInput extends Block {
  static componentName = 'ControlledInput';
  constructor(props: ControlledInputProps) {
    super({...props});

    // Вынес onBlur, если передать в events, то слушатель распространяется на весь компонент
    // а объявить в authInput ее не могу, поскольку надо обновлять пропсы в AuthError(во внешнем компоненте)
    this.setProps({
      onBlur: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;

        const error = validateForm([
          { type: ValifateRuleType.AuthLogin, value: inputEl.value },
          { type: ValifateRuleType.AuthPassword, value: inputEl.value },
          { type: ValifateRuleType.Mail, value: inputEl.value },
          { type: ValifateRuleType.Login, value: inputEl.value },
          { type: ValifateRuleType.FirstName, value: inputEl.value },
          { type: ValifateRuleType.LastName, value: inputEl.value },
          { type: ValifateRuleType.Phone, value: inputEl.value },
          { type: ValifateRuleType.Password, value: inputEl.value },
        ]);

        if (
          !error.authPassword ||
          !error.authLogin ||
          !error.mail ||
          !error.login ||
          !error.firstName ||
          !error.lastName ||
          !error.phone ||
          !error.password
        ) {
          this.refs.errorRef.setProps({ text: '' });
        }

        if (error.authPassword && this.props.name === 'auth-password') {
          this.refs.errorRef.setProps({ text: error.authPassword });
        }

        if (error.authLogin && this.props.name === 'auth-login') {
          this.refs.errorRef.setProps({ text: error.authLogin });
        }

        if (error.mail && this.props.name === 'email') {
          this.refs.errorRef.setProps({ text: error.mail });
        }

        if (error.login && this.props.name === 'login') {
          this.refs.errorRef.setProps({ text: error.login });
        }

        if (error.firstName && this.props.name === 'first_name') {
          this.refs.errorRef.setProps({ text: error.firstName });
        }

        if (error.lastName && this.props.name === 'second_name') {
          this.refs.errorRef.setProps({ text: error.lastName });
        }

        if (error.phone && this.props.name === 'phone') {
          this.refs.errorRef.setProps({ text: error.phone });
        }

        if (error.password && this.props.name === 'password') {
          this.refs.errorRef.setProps({ text: error.password });
        }
      }
    })

  }

  protected render(): string {
    return `
      <div class={{ControlledInputClass}}>
        <label class={{labelClass}}>{{label}}</label>
          {{{AuthInput 
            ref="input"
            name="{{name}}"
            placeholder="{{placeholder}}"
            type="{{type}}"
            onBlur=onBlur
          }}}
          {{{AuthError ref="errorRef" text=error errorClass=errorClass}}}
      </div>`;
  }
}

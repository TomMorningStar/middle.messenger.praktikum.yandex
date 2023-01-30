import { validateForm, ValifateRuleType } from 'helpers/validateForm';
import { Block } from 'core';

interface ControlledInputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  label?: string;
  name?: string;
  errorClass?: string;
  labelClass?: string;
  ControlledInputClass?: string;
  signIn?: Boolean;
  noBlur?: Boolean;
}

export class ControlledInput extends Block {
  static componentName = 'ControlledInput';
  constructor(props: ControlledInputProps) {
    super({...props});

    this.setProps({
      onBlur: (e: FocusEvent) => {
        if(!this.props.noBlur) {
          const inputEl = e.target as HTMLInputElement;

          if(!this.props.signIn) {
            const error = validateForm([
              { type: ValifateRuleType.AuthLogin, value: inputEl.value },
              { type: ValifateRuleType.AuthPassword, value: inputEl.value },
              { type: ValifateRuleType.Mail, value: inputEl.value },
              { type: ValifateRuleType.Login, value: inputEl.value },
              { type: ValifateRuleType.FirstName, value: inputEl.value },
              { type: ValifateRuleType.LastName, value: inputEl.value },
              { type: ValifateRuleType.Phone, value: inputEl.value },
              { type: ValifateRuleType.Password, value: inputEl.value },
              { type: ValifateRuleType.DisplayName, value: inputEl.value },
            ]);
    
            if (
              !error.authPassword ||
              !error.authLogin ||
              !error.mail ||
              !error.login ||
              !error.firstName ||
              !error.lastName ||
              !error.phone ||
              !error.password ||
              !error.displayName
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
    
            if (error.displayName && this.props.name === 'display_name') {
              this.refs.errorRef.setProps({ text: error.displayName });
            }
          }
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
            value=value
          }}}
          {{{AuthError ref="errorRef" text=error errorClass=errorClass}}}
      </div>`;
  }
}

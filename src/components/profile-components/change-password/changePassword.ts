import { Block, Store } from 'core';
import { validateForm, ValifateRuleType } from 'utils/validateForm';
import { changePassword } from 'services/userData';
import { withStore } from 'utils';

interface ChangePasswordProps {
  oldPasswordValue: string;
  newPasswordValue: string;
  newPasswordRepeatValue: string;
  error: string;
  noBlur: boolean,
  onChangePassword: () => void,
  store: Store<AppState>;
  formError?: () => string | null;
}

class ChangePassword extends Block {
  static componentName = 'ChangePassword';

  constructor(props: ChangePasswordProps) {
    super(props)

    this.setProps({
      oldPasswordValue: '',
      newPasswordValue: '',
      newPasswordRepeatValue: '',
      error: "",
      noBlur: true,
      compite: "",
      onChangePassword: () => this.onChangePassword(),
      formError: () => this.props.store.getState().loginFormError,
    })
  }

  onChangePassword() {

    this.setProps({
      oldPasswordValue: this.refs.oldPasswordInput.refs.input.element.value,
      newPasswordValue: this.refs.newPasswordRef.refs.input.element.value,
      newPasswordRepeatValue: this.refs.newPasswordRepeatRef.refs.input.element.value,
    });

    const errorMessage = validateForm([
      {
        type: ValifateRuleType.Password,
        value: this.refs.newPasswordRef.refs.input.element.value,
      },
    ]);

    if (this.props.oldPasswordValue === '' || this.props.newPasswordValue === '' || this.props.newPasswordRepeatValue === '') {
      this.setProps({
        error: 'Нужно заполнить все поля',
      });
    } else if (this.props.newPasswordValue && this.props.newPasswordRepeatValue && this.props.newPasswordValue !== this.props.newPasswordRepeatValue) {
      this.setProps({
        error: 'Пароли не совпадают',
      });
    } else {

      if (!errorMessage.password) {
        this.props.store.dispatch(changePassword, { oldPassword: this.props.oldPasswordValue, newPassword: this.props.newPasswordValue })
        this.setProps({
          compite: "успешно"
        })
      }

      this.setProps({
        error: '',
      });


    }

    this.refs.newPasswordRef.refs.errorRef.setProps({
      text: errorMessage.password,
    });
  }



  render() {

    const user = this.props.user

    return `
      <div class='profle-page-wrapper'>
        <div class='info-profile-wrapper-block'>
          <div class='profile-avatar' style="background-image: url(https://ya-praktikum.tech/api/v2/resources/${user.avatar})" ></div>

          <div class='profile-info-block'>
            {{{ControlledInput
              ref="oldPasswordInput"
              ControlledInputClass="profile-info-flex-block"
              labelClass="profile-key"
              errorClass="profile-error"
              name="password"
              placeholder="•••••••••••••"
              type="password"
              label="Старый пароль"
              value=oldPasswordValue
              noBlur=noBlur
            }}}

            {{{ControlledInput
              ref="newPasswordRef"
              ControlledInputClass="profile-info-flex-block"
              labelClass="profile-key"
              errorClass="profile-error"
              name="password"
              placeholder="•••••••••••••"
              type="password"
              label="Новый пароль"
              value=newPasswordValue
            }}}

            {{{ControlledInput
              ref="newPasswordRepeatRef"
              ControlledInputClass="profile-info-flex-block"
              labelClass="profile-key"
              errorClass="none"
              name="password"
              placeholder="•••••••••••••"
              type="password"
              label="Повторите новый пароль"
              value=newPasswordRepeatValue
              noBlur=noBlur
            }}}

            {{#if formError}}
              <div style="color: red; text-align: center; margin: 5px;">{{formError}}</div>
            {{/if}}

            {{#if compite}}
              <div style="color: green; text-align: center; margin: 5px;">{{compite}}</div>
            {{/if}}

            

            <div style="color: red; text-align: center; margin: 5px;">
              {{error}}
            </div>
          </div>

          {{{ProfileButton onChangePassword=onChangePassword text="Сохранить" styles="save-data-button no-styles cursor-pointer"}}}
        </div>
      </div>`;
  }
}


const UpdateChangePassword = withStore(ChangePassword);

export { UpdateChangePassword as ChangePassword };

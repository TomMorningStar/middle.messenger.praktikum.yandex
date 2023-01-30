import { Block, Store } from 'core';
import { validateForm, ValifateRuleType } from 'helpers/validateForm';
import { changeUserAvatar, changeUserProfile } from 'services/userData';

interface ChangeDataProps {
  user: User;
  store: Store<AppState>;
  onBackPage?: () => void;
  onChangeUserData?: () => void;
  file: File
}

export class ChangeData extends Block {
  static componentName = 'ChangeData';

  constructor(props: ChangeDataProps) {
    super(props);

    this.setProps({
      onChangeUserData: (e: MouseEvent) => this.onChangeUserData(e),
      avatar: null,
    })
  }

  onChangeUserData(e: MouseEvent) {
    e.preventDefault()

    const emailValue = this.refs.mailRef.refs.input.element.value;
    const loginValue = this.refs.loginInputRef.refs.input.element.value;
    const displayNameValue = this.refs.displayNameRef.refs.input.element.value;
    const firstNameValue = this.refs.firstNameRef.refs.input.element.value;
    const secondNameValue = this.refs.secondNameRef.refs.input.element.value;
    const phoneValue = this.refs.phoneRef.refs.input.element.value;

    const user: User = this.props.store.getState().user;

    const errorMessage = validateForm([
      {
        type: ValifateRuleType.Mail,
        value: emailValue,
      },
      {
        type: ValifateRuleType.Login,
        value: loginValue,
      },
      {
        type: ValifateRuleType.DisplayName,
        value: displayNameValue,
      },
      {
        type: ValifateRuleType.FirstName,
        value: firstNameValue,
      },
      {
        type: ValifateRuleType.LastName,
        value: secondNameValue,
      },
      {
        type: ValifateRuleType.Phone,
        value: phoneValue,
      },
    ]);

    const error = !errorMessage.mail &&
      !errorMessage.login &&
      !errorMessage.firstName &&
      !errorMessage.lastName &&
      !errorMessage.phone &&
      !errorMessage.displayName

    const userData = {
      first_name: firstNameValue ? firstNameValue.trim() : user.firstName,
      second_name: secondNameValue ? secondNameValue.trim() : user.secondName,
      display_name: displayNameValue ? displayNameValue.trim() : user.displayName,
      login: loginValue ? loginValue.trim() : user.login,
      email: emailValue ? emailValue.trim() : user.email,
      phone: phoneValue ? phoneValue.trim() : user.phone,
    }

    const hasValue = !!firstNameValue || !!secondNameValue || !!displayNameValue || !!loginValue || !!emailValue || !!phoneValue;

    const inputFile = this.refs.inputFile.element.files[0]
    const myRenamedFile = new File([inputFile], inputFile?.name.replace(/[^+\d]/g, 'file'));

    const avatar = new FormData();
    avatar.append('avatar', myRenamedFile);

    this.setProps({
      file: avatar
    })

    if (inputFile) {
      this.props.store.dispatch(changeUserAvatar, this.props.file)
    }

    if (hasValue && !error) {
      this.props.onBackPage()
      this.props.store.dispatch(changeUserProfile, userData)
    }
  }

  render() {
    const user: User = this.props.user;

    return `
      <div class='profle-page-wrapper'>
        <div class='info-profile-wrapper-block'>

          <form method="put" enctype="multipart/form-data">
            <div class='profile-avatar-change-data'>
            {{#if user.avatar}}
              <div class='profile-avatar' style="background-image: url(https://ya-praktikum.tech/api/v2/resources/${user.avatar})">
                {{{InputFile ref="inputFile"}}}
              </div>
            {{else}}
                <div class='profile-avatar'></div>
                {{{InputFile ref="inputFile"}}}
            {{/if}} 
            </div>

            <div class='profile-info-block'>
              {{{ControlledInput 
                ref="mailRef"
                type="text"
                name="email"
                placeholder="${user.email}"
                errorClass="profile-error"
                labelClass="profile-key"
                label="Почта"
                ControlledInputClass="profile-info-flex-block"
              }}}

              {{{ControlledInput 
                ref="loginInputRef"
                type="text"
                name="login"
                placeholder="${user.login}"
                errorClass="profile-error"
                labelClass="profile-key"
                label="Логин"
                ControlledInputClass="profile-info-flex-block"
              }}}

              {{{ControlledInput 
                ref="firstNameRef"
                type="text"
                name="first_name"
                placeholder="${user.firstName}"
                errorClass="profile-error"
                labelClass="profile-key"
                label="Имя"
                ControlledInputClass="profile-info-flex-block"
              }}}

              {{{ControlledInput 
                ref="secondNameRef"
                type="text"
                name="second_name"
                placeholder="${user.secondName}"
                errorClass="profile-error"
                labelClass="profile-key"
                label="Фамилия"
                ControlledInputClass="profile-info-flex-block"
              }}}

              {{{ControlledInput 
                ref="displayNameRef"
                type="text"
                name="display_name"
                placeholder="${user.displayName ? `${user.displayName}` : "...."}"
                errorClass="profile-error"
                labelClass="profile-key"
                label="Имя в чате"
                ControlledInputClass="profile-info-flex-block"
              }}}

              {{{ControlledInput 
                ref="phoneRef"
                type="text"
                name="phone"
                placeholder="${user.phone}"
                errorClass="profile-error"
                labelClass="profile-key"
                label="Телефон"
                ControlledInputClass="profile-info-flex-block"
              }}}
            </div>

            {{{ProfileButton onChangeUserData=onChangeUserData text="Сохранить" styles="save-data-button no-styles cursor-pointer"}}}
          </form>
      </div>`;
  }
}

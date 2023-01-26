import { Block } from 'core';
import { validateForm, ValifateRuleType } from 'helpers/validateForm';
import { withUser, withStore, withRouter, Screens } from 'utils';
import { logout } from 'services/auth';


class Profile extends Block {
  static componentName = 'ProfilePage';

  constructor(props) {
    super(props);

    this.setProps({
      profileData: true,
      changeData: false,
      changePassword: false,

      onChangeData: () => this.openOnChangeDataPage(),

      onBackPage: () => {
        if (this.props.changeData || this.props.changePassword) {
          this.setProps({
            profileData: true,
            changeData: false,
            changePassword: false,
          });
        } else {
          this.props.router.go('/')
        }
      },

      onClick: () => {
        const errorMessage = validateForm([
          // этот костыль позволит мне в изменении своих менять только те поля которые я хочу и не агрить валидатор
          // если ничего не меняю в полях, то туда записываются значения их пропсов
          // P.S стили перенести не успел, буду проводить рефакторинг кода, править типизацию, времени катастрофически не хватило
          // но всю остальную логику закончил
          {
            type: ValifateRuleType.Mail,
            value: this.refs.changeData.refs.mailRef.refs.input.element.value
              ? this.refs.changeData.refs.mailRef.refs.input.element.value
              : this.props.data[0].value,
          },
          {
            type: ValifateRuleType.Login,
            value: this.refs.changeData.refs.loginInputRef.refs.input.element
              .value
              ? this.refs.changeData.refs.loginInputRef.refs.input.element.value
              : this.props.data[1].value,
          },
          {
            type: ValifateRuleType.FirstName,
            value: this.refs.changeData.refs.firstNameRef.refs.input.element
              .value
              ? this.refs.changeData.refs.firstNameRef.refs.input.element.value
              : this.props.data[2].value,
          },
          {
            type: ValifateRuleType.LastName,
            value: this.refs.changeData.refs.lastNameRef.refs.input.element
              .value
              ? this.refs.changeData.refs.lastNameRef.refs.input.element.value
              : this.props.data[3].value,
          },
          {
            type: ValifateRuleType.Phone,
            value: this.refs.changeData.refs.phoneRef.refs.input.element.value
              ? this.refs.changeData.refs.phoneRef.refs.input.element.value
              : this.props.data[5].value,
          },
        ]);

        if (
          !errorMessage.mail &&
          !errorMessage.login &&
          !errorMessage.firstName &&
          !errorMessage.lastName &&
          !errorMessage.phone
        ) {
          if (this.props.changeData || this.props.changePassword) {
            this.setProps({
              profileData: true,
              changeData: false,
              changePassword: false,
            });
          }
        }
      },

      signOut: () => {
        this.props.store.dispatch(logout)
        this.props.router.go('/signIn');
      },

      onChangePasswordPage: () => {
        this.setProps({
          profileData: false,
          changeData: false,
          changePassword: true,
        });
      },

      onChangePassword: () => {
        const errorMessage = validateForm([
          {
            type: ValifateRuleType.Password,
            value:
              this.refs.changePassword.refs.newPasswordRef.refs.input.element
                .value,
          },
        ]);

        if (!this.refs.changePassword.refs.oldPasswordInput.refs.input.element
          .value) {
          this.refs.changePassword.refs.oldPasswordInput.refs.errorRef.setProps({
            text: "Поле не может быть пустым"
          })
        }

        if (this.refs.changePassword.refs.newPasswordRef.refs.input.element
          .value && this.refs.changePassword.refs.newPasswordRepeatRef.refs.input
            .element.value &&
          this.refs.changePassword.refs.newPasswordRef.refs.input.element
            .value !==
          this.refs.changePassword.refs.newPasswordRepeatRef.refs.input
            .element.value
        ) {
          this.setProps({
            error: 'Пароли не совпадают',
          });

        }
      },
    });




  }


  openOnChangeDataPage() {
    this.setProps({
      profileData: false,
      changeData: true,
      changePassword: false,
    });
  }



  componentDidUpdate() {
    return window.store.getState().screen === Screens.Profile
  }


  render() {
    const user: User = this.props.store.getState().user;

    console.log(this.props);
    
    
    return `
    <main class='profle-page-wrapper'>
          {{{BackLink onBackPage=onBackPage}}}
          <div class='info-profile-wrapper-block'>
              <div class='profile-avatar'>
              <svg width='40' height='40' viewBox='0 0 40 40' fill='none'>
                  <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z'
                  fill='#CDCDCD'
                  ></path>
              </svg>
          </div>
  
          {{#if profileData}}
              {{{ProfileData 
                user=user
                ref="profileData"
              }}}
                {{{ProfileButtonChangeData onChangeData=onChangeData text="Изменить данные" styles="change-data cursor-pointer no-styles"}}}
                {{{ProfileButtonPasswordData onChangePassword=onChangePasswordPage text="Изменить пароль" styles="change-data cursor-pointer no-styles"}}}
                {{{ProfileButtonSignOut signOut=signOut text="Выйти" styles="exit-in-profile-button cursor-pointer no-styles"}}}
          {{/if}}
    
          {{#if changeData}}
                <div class='profle-page-wrapper'>
                  <div class='info-profile-wrapper-block'>
                    {{{ChangeData ref="changeData" user=user}}}
                    {{{ProfileButton ref="onSaveData" onClick=onClick}}}
                  </div>
                </div>
          {{/if}}

          {{#if changePassword}}
            <div class='profle-page-wrapper'>
              <div class='info-profile-wrapper-block'>
                {{{ChangePassword ref="changePassword" error=error}}}
                {{{ProfileButton ref="onSaveData" onChangePassword=onChangePassword}}}
              </div>
            </div>
          {{/if}}
          
          </div>
    </main>`;
  }
}


export default withRouter(withStore(withUser(Profile)));


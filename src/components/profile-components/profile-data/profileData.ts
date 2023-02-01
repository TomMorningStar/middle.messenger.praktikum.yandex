import Block from 'core/Block';
import { logout } from 'services/auth';
import { withRouter, withStore } from 'utils';

interface ProfileDataProps {
  user: User;
  signOut: () => void;
  goChangeDataPage: () => void;
  goChangePasswordPage: () => void;
}

class ProfileData extends Block {
  static componentName = 'ProfileData';

  constructor(props: ProfileDataProps) {
    super(props);

    this.setProps({
      signOut: () => this.signOut(),
    })
  }

  signOut() {
    this.props.store.dispatch(logout)
    this.props.router.go('/signIn');
  }

  render() {
    const user: User = this.props.user;

    return `
    <div>
        <div>
            ${user.displayName ? `<h3>${user.displayName}</h3>` : ""}
        </div>
        <div class='profile-info-block'>
          {{{ControlledData key="Почта" value="${user.email}"}}}
          {{{ControlledData key="Логин" value="${user.login}"}}}
          {{{ControlledData key="Имя" value="${user.firstName}"}}}
          {{{ControlledData key="Фамилия" value="${user.secondName}"}}}
          {{{ControlledData key="Имя в чате" value="${user.displayName ? `${user.displayName}` : "Имя в чате не выбрано"}"}}}
          {{{ControlledData key="Телефон в чате" value="${user.phone}"}}}
        </div>

        {{{ProfileButton goChangeDataPage=goChangeDataPage text="Изменить данные" styles="change-data cursor-pointer no-styles"}}}
        {{{ProfileButton goChangePasswordPage=goChangePasswordPage text="Изменить пароль" styles="change-data cursor-pointer no-styles"}}}
        {{{ProfileButton signOut=signOut text="Выйти" styles="exit-in-profile-button cursor-pointer no-styles"}}}
    </div>
    
    `;
  }
}

const ProfileDataPage = withRouter(withStore(ProfileData));

export { ProfileDataPage as ProfileData };

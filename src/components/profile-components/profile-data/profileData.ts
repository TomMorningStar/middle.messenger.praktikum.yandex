import Block from 'core/Block';

interface ProProfileDataProps {
  user: User;
}

export class ProfileData extends Block {
  static componentName = 'ProfileData';

  constructor(props: ProProfileDataProps) {
    super(props);
  }

  render() {
    const user: User = this.props.user;

    return `
    <div>
        <div>
            ${ user.displayName ? `<h3>${user.displayName}</h3>` : "" }
        </div>
        <div class='profile-info-block'>
          {{{ControlledData key="Почта" value="${user.email}"}}}
          {{{ControlledData key="Логин" value="${user.login}"}}}
          {{{ControlledData key="Имя" value="${user.firstName}"}}}
          {{{ControlledData key="Фамилия" value="${user.secondName}"}}}
          {{{ControlledData key="Имя в чате" value="${user.displayName ? `${user.displayName}` : "Имя в чате не выбрано" }"}}}
          {{{ControlledData key="Телефон в чате" value="${user.phone}"}}}
        </div>
    </div>
    
    `;
  }
}

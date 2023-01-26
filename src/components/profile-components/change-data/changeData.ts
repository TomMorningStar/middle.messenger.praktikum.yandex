import { Block } from 'core';

interface ChangeDataProps {
  user: User
}

export class ChangeData extends Block {
  static componentName = 'ChangeData';
  
  constructor(props: ChangeDataProps) {
    super(props);
  }

  render() {
    const user: User = this.props.user;

    return `
    <div>
        <div class='profile-avatar name="avatar" cursor-pointer profile-avatar-change'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                viewBox='0 0 40 40'
                fill='none'
            >
                <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z'
                fill='#CDCDCD'
                ></path>
            </svg>
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
            ref="mailRef"
            type="text"
            name="login"
            placeholder="${user.login}"
            errorClass="profile-error"
            labelClass="profile-key"
            label="Логин"
            ControlledInputClass="profile-info-flex-block"
          }}}

          {{{ControlledInput 
            ref="mailRef"
            type="text"
            name="first_name"
            placeholder="${user.firstName}"
            errorClass="profile-error"
            labelClass="profile-key"
            label="Имя"
            ControlledInputClass="profile-info-flex-block"
          }}}

          {{{ControlledInput 
            ref="mailRef"
            type="text"
            name="second_name"
            placeholder="${user.secondName}"
            errorClass="profile-error"
            labelClass="profile-key"
            label="Фамилия"
            ControlledInputClass="profile-info-flex-block"
          }}}

          {{{ControlledInput 
            ref="mailRef"
            type="text"
            name="display_name"
            placeholder="${user.displayName ? `${user.displayName}` : "...." }"
            errorClass="profile-error"
            labelClass="profile-key"
            label="Имя в чате"
            ControlledInputClass="profile-info-flex-block"
          }}}

          {{{ControlledInput 
            ref="mailRef"
            type="text"
            name="phone"
            placeholder="${user.phone}"
            errorClass="profile-error"
            labelClass="profile-key"
            label="Телефон"
            ControlledInputClass="profile-info-flex-block"
          }}}
        </div>`;
  }
}

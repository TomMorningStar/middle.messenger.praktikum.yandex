export enum ValifateRuleType {
  AuthLogin = 'auth-login',
  AuthPassword = 'auth-password',
  Mail = 'mail',
  Login = 'login',
  FirstName = 'first-name',
  LastName = 'last-name',
  Phone = 'phone',
  Password = 'password',
  NameInChat = 'first-name'
  DisplayName = 'display-name'
}

type ValidateRule = {
  value: string;
  type: ValidateRule;
};

export function validateForm(rules: ValidateRule[]) {
  let authPassword = '';
  let authLogin = '';
  let mail = '';
  let login = '';
  let firstName = '';
  let lastName = '';
  let phone = '';
  let password = '';
  let displayName = '';

  for (let i = 0; i < rules.length; i++) {
    const { type, value } = rules[i];

    if (type === ValifateRuleType.AuthLogin) {
      if (value.length === 0) {
        authLogin = 'Поле не может быть пустым';
      } else if (value.length < 4) {
        authLogin = 'Поле не может быть меньше 4 символов';
      }
    }

    if (type === ValifateRuleType.AuthPassword) {
      if (value.length === 0) {
        authPassword = 'Поле не может быть пустым';
      } else if (value.length < 4) {
        authPassword = 'Пароль не может быть меньше 4 символов';
      }
    }

    if (type === ValifateRuleType.Mail) {
      const reg =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (value.length === 0) {
        mail = 'Поле не может быть пустым';
      } else if (!reg.test(value)) {
        mail = 'некорректный емайл';
      }
    }

    if (type === ValifateRuleType.Login) {
      if (value.length === 0) {
        login = 'Поле не может быть пустым';
      } else if (value.length < 4 || value.length > 20) {
        login = 'Должно быть от 4 до 20 символов';
      } else if (/^[-a-zA-Z1-9_]+$/.test(value) === false) {
        login =
          'Только латиница и допустимые символы -_';
      }

      if (value.includes(' ')) {
        login = 'Поле не может содержать пробел';
      }

      if (/^[1-9]+$/.test(value) && !/^[a-zA-Z1]+$/.test(value)) {
        login = 'Поле не может состоять только из цифр';
      }
    }

    if (type === ValifateRuleType.DisplayName) {
      if (value.length === 0) {
        displayName = 'Поле не может быть пустым';
      } else if (value.length < 4 || value.length > 20) {
        displayName = 'Должно быть от 4 до 20 символов';
      } else if (/^[-a-zA-Z1-9_]+$/.test(value) === false) {
        displayName =
          'Только латиница и допустимые символы -_';
      }

      if (value.includes(' ')) {
        displayName = 'Поле не может содержать пробел';
      }

      if (/^[1-9]+$/.test(value) && !/^[a-zA-Z1]+$/.test(value)) {
        displayName = 'Поле не может состоять только из цифр';
      }
    }

    if (type === ValifateRuleType.FirstName) {
      if (!/[A-zА-яЁё]/.test(value)) {
        firstName = 'Латиница или кириллица';
      }

      if (/[1-9]/.test(value)) {
        firstName = 'Поле не может содержать цифры';
      }

      if (!!/[!@#$%^&*()_]/.test(value)) {
        firstName = 'Допустимый символ -';
      }

      if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
        firstName = 'Имя должно начинаться с заглавной буквы';
      }

      if (value.length === 0) {
        firstName = 'Поле не может быть пустым';
      }
    }

    if (type === ValifateRuleType.LastName) {
      if (!/[A-zА-яЁё]/.test(value)) {
        lastName = 'Латиница или кириллица';
      }

      if (/[1-9]/.test(value)) {
        lastName = 'Поле не может содержать цифры';
      }

      if (!!/[!@#$%^&*()_]/.test(value)) {
        lastName = 'Допустимый символ -';
      }

      if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
        lastName = 'Фамилия должна начинаться с заглавной буквы';
      }

      if (value.length === 0) {
        lastName = 'Поле не может быть пустым';
      }
    }

    if (type === ValifateRuleType.Phone) {
      if (!/^(\+7|7|8)/.test(value) || value.length < 10 || value.length > 15) {
        phone = 'Не валидный номер';
      }
    }

    if (type === ValifateRuleType.Password) {
        const reg = /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      if (!reg.test(value)) {
        password = 'Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
      }

      if(value.length === 0) {
        password = 'Поле не может быть пустым';
      }
    }
  }


  

  return { authPassword, authLogin, mail, login, firstName, lastName, phone, password, displayName };
}

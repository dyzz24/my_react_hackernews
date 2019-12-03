export const example = String.raw`Пример конфигурации: 
formName: 'Настраиваемая форма',
formArray:
[
  {
    name: 'email',
    formType: 'email',
    title: 'Введите email адрес',
    placeholder: 'email',
    validator: {
      pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
    },
    validatorMessage: 'Поле формата lalala@mail.ru'
  },
  {
    name: 'login',
    formType: 'text',
    title: 'Введите логин',
    placeholder: 'Логин',
    validator: { pattern: /^[A-Za-z\d]+$/, maxLength: 10 },
    validatorMessage: 'Англ. буквы, цифры, максимум 10 символов',
    setStyle: {'border': '1px dashed gray'},
    initialValue: 'login123'
  },
  {
    name: 'password',
    formType: 'text',
    title: 'Пароль',
    placeholder: 'Пароль',
    validator: { minLength: 8, required: true },
    validatorMessage: 'Обязательное поле'
  },
  {
    name: 'number',
    formType: 'number',
    title: 'Номер',
    placeholder: 'Номер',
    validator: { pattern: /^[\d]+$/, maxLength: 15 },
    validatorMessage: 'Только числа, максимум 15 знаков',
    setStyle: {'height': '40px', 'width': '240px', 'fontSize': '18px', 'borderColor': '#f3ecec'},
    initialValue: 144
  }
]`
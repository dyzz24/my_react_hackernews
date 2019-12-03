
export function Validator(props) {


  const validation = (validator, value) => {
    let errorString = '';
    if (!validator) {
      return errorString;
    }
    if (validator && validator.maxLength && validator.maxLength > 0) {
      const maxLength = validator.maxLength;
      const stringLength = value.length;
      if (stringLength > maxLength) {
        errorString =
          'Превышение максимальной длинны ввода ' + validator.maxLength;
      }
    }

    if (validator && validator.required) {
      const stringLength = value.trim().length;
      if (stringLength === 0) {
        errorString = 'Поле не должно быть пустым';
      }
    }

    if (validator && validator.pattern) {
      const regExp = new RegExp(validator.pattern, 'ig');
      const result = value.match(regExp);
      if (result === null && value.length > 0) {
        errorString = 'Не соответствие паттерну ' + validator.pattern;
      }
    }

    if (validator && validator.minLength) {
      const minLength = validator.minLength;
      const stringLength = value.length;
      if (stringLength < minLength) {
        errorString = `Минимум ${validator.minLength} символов`;
      }
    }
    return errorString;
  }

  return validation;


}


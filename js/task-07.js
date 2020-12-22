const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const isLoginValid = function (login) {
  // твой код
  return login.length >= 4 && login.length <= 16 ? true : false;
};

const isLoginUnique = function (allLogins, login) {
  // твой код
  return !allLogins.includes(login);
};

const addLogin = function (allLogins, login) {
  // твой код
  if (isLoginValid(login)) {
    if (isLoginUnique(allLogins, login)) {
      allLogins.push(login);
      return 'Логин успешно добавлен!';
    } else {
      return 'Такой логин уже используется!';
    }
  }
  return 'Ошибка! Логин должен быть от 4 до 16 символов';
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(addLogin(logins, 'Ajax')); // 'Логин успешно добавлен!'
console.log(addLogin(logins, 'robotGoogles')); // 'Такой логин уже используется!'
console.log(addLogin(logins, 'Zod')); // 'Ошибка! Логин должен быть от 4 до 16 символов'
console.log(addLogin(logins, 'jqueryisextremelyfast')); // 'Ошибка! Логин должен быть от 4 до 16 символов'

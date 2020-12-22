const checkForSpam = function (message) {
  // твой код
  // spam  sale
  if (
    message.toLowerCase().indexOf('spam') !== -1 ||
    message.toLowerCase().indexOf('sale') !== -1
  ) {
    return true;
  }
  return false;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(checkForSpam('Latest technology news')); // false

console.log(checkForSpam('JavaScript weekly newsletter')); // false

console.log(checkForSpam('Get best sale offers now!')); // true

console.log(checkForSpam('[SPAM] How to earn fast money?')); // true

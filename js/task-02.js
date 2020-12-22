const countProps = function (obj) {
  // твой код
  let count = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      count += 1;
    }
  }
  return count;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(countProps({})); // 0

console.log(countProps({ name: 'Mango', age: 2 })); // 2

console.log(countProps({ mail: 'poly@mail.com', isOnline: true, score: 500 })); // 3

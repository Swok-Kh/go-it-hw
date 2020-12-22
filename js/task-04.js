const countTotalSalary = function (employees) {
  // твой код
  let totalSalary = 0;
  for (const key in employees) {
    if (employees.hasOwnProperty(key)) {
      totalSalary += employees[key];
    }
  }
  return totalSalary;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(countTotalSalary({})); // 0

console.log(
  countTotalSalary({
    mango: 100,
    poly: 150,
    alfred: 80,
  }),
); // 330

console.log(
  countTotalSalary({
    kiwi: 200,
    lux: 50,
    chelsy: 150,
  }),
); // 400

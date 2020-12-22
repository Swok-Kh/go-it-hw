let input;
const numbers = [];
let total = 0;

do {
  input = prompt('Введите число');
  if (Number.isInteger(Number(input))) {
    numbers.push(Number(input));
  } else if (input !== null) {
    alert('Было введено не число, попробуйте еще раз');
  }
} while (input !== null);

for (const number of numbers) {
  total += number;
}
console.log(`Общая сумма чисел равна [${total}]`);

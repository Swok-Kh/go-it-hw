let input;
let total = 0;
do {
  input = prompt('Введи число');
  if (Number.isInteger(Number(input))) {
    total += Number(input);
  } else if (input !== null) {
    alert('Было введено не число, попробуйте еще раз');
  }
} while (input !== null);

alert(`Общая сумма чисел равна[${total}]`);

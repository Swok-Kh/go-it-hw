const invoice = 100;
const stock = 100;
let message = '';
if (stock == invoice || stock > invoice) {
  message = 'Заказ оформлен, с вами свяжется менеджер';
} else {
  message = 'На складе недостаточно товаров!';
}

console.log(message);

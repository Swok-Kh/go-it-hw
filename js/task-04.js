(() => {
	const selector = "counter";
	const counterEl = document.querySelector(`#${selector}`);
	if (!counterEl) {
		console.log(`Selector "#${selector}" not find`);
		return;
	}
	const buttonIncrementEl = counterEl.querySelector('button[data-action="increment"]');
	const buttonDecrementEl = counterEl.querySelector('button[data-action="decrement"]');
	const valueEl = counterEl.querySelector("#value");
	valueEl.classList.add(`${selector}__value`);
	let counterValue = Number.parseInt(valueEl.textContent);
	counterEl.classList.add(`${selector}`);
	buttonIncrementEl.classList.add(`${selector}__button`, `${selector}__button--increment`);
	buttonDecrementEl.classList.add(`${selector}__button`, `${selector}__button--decrement`);

	const increment = () => {
		counterValue += 1;
		valueEl.textContent = counterValue;
	};
	const decrement = () => {
		counterValue -= 1;
		valueEl.textContent = counterValue;
	};
	buttonIncrementEl.addEventListener("click", increment);
	buttonDecrementEl.addEventListener("click", decrement);
})();

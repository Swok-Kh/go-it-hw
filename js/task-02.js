(() => {
	const selector = "ingredients";
	const ingredientsEl = document.querySelector(`#${selector}`);
	if (!ingredientsEl) {
		console.log(`Selector "#${selector}" not find`);
		return;
	}
	const ingredients = ["Картошка", "Грибы", "Чеснок", "Помидоры", "Зелень", "Приправы"];
	ingredientsEl.append(
		...ingredients.map(el => {
			const liRef = document.createElement("li");
			liRef.textContent = el;

			return liRef;
		}),
	);
})();

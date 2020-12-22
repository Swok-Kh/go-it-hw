(() => {
	const selector = "categories";
	const categoriesEl = document.querySelector(`#${selector}`);
	if (!categoriesEl) {
		console.log(`Selector "#${selector}" not find`);
		return;
	}
	const countCategories = function (cat) {
		const endings1 = [11, 12, 12, 14];
		const endings2 = [2, 3, 4];
		let result = "";
		if (endings1.includes(Number.parseInt(cat.childElementCount.toString().slice(-2)))) {
			result = `В списке ${cat.childElementCount} категорий.`;

			return result;
		} else if (endings2.includes(Number.parseInt(cat.childElementCount.toString().slice(-1)))) {
			result = `В списке ${cat.childElementCount} категории.`;

			return result;
		} else if (Number.parseInt(cat.childElementCount.toString().slice(-1)) === 1) {
			result = `В списке ${cat.childElementCount} категория.`;

			return result;
		} else {
			result = `В списке ${cat.childElementCount} категорий.`;

			return result;
		}
	};
	console.log(countCategories(categoriesEl));
	for (let i = 0; i < categoriesEl.childElementCount; i += 1) {
		for (let j = 0; j < categoriesEl.children[i].childElementCount; j += 1) {
			if (categoriesEl.children[i].children[j].nodeName === "H2") {
				console.log("Категория: ", categoriesEl.children[i].children[j].textContent);
				continue;
			}
			if (categoriesEl.children[i].children[j].nodeName === "UL") {
				console.log("Количество элементов: ", categoriesEl.children[i].children[j].childElementCount);
			}
		}
	}
})();

(() => {
	const selectorControls = "controls";
	const selectorBoxes = "boxes";
	const controlsEl = document.querySelector(`#${selectorControls}`);
	let boxesEl = document.querySelector(`#${selectorBoxes}`);
	const buttonRenderEl = controlsEl.querySelector("button[data-action='render']");
	const buttonDestroyEl = controlsEl.querySelector("button[data-action='destroy']");
	const inputEl = controlsEl.querySelector("input");
	const maxValue = Number.parseInt(inputEl.getAttribute("max"));
	const createBoxes = function (amount) {
		if (boxesEl.children.length > 0) {
			destroyBoxes();
		}
		const tempMainDiv = [];
		for (let i = 0; i < amount; i += 1) {
			const tempDiv = document.createElement("div");
			tempDiv.style.width = tempDiv.style.height = `${30 + 10 * i}px`;
			tempDiv.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
				Math.random() * 255,
			)},${Math.floor(Math.random() * 255)})`;
			const tempP = document.createElement("p");
			tempP.textContent = i + 1;
			tempDiv.append(tempP);
			tempMainDiv.push(tempDiv);
		}
		boxesEl.append(...tempMainDiv);
	};
	const destroyBoxes = function () {
		const tempMainDiv = document.createElement("div");
		tempMainDiv.id = selectorBoxes;
		boxesEl.replaceWith(tempMainDiv);
		boxesEl = document.querySelector(`#${selectorBoxes}`);
	};

	buttonRenderEl.addEventListener("click", () => {
		if (Number.parseInt(inputEl.value) > maxValue || Number.parseInt(inputEl.value) < -maxValue) {
			inputEl.value = maxValue;
			createBoxes(maxValue);

			return;
		}
		inputEl.value = Math.abs(inputEl.value);
		createBoxes(Math.abs(Number.parseInt(inputEl.value)));
	});
	buttonDestroyEl.addEventListener("click", destroyBoxes);
})();

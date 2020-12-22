(() => {
	const selector = "validation-input";
	const validationInputEl = document.querySelector(`#${selector}`);
	if (!validationInputEl) {
		console.log(`Selector "#${selector}" not find`);
		return;
	}
	validationInputEl.addEventListener("input", () => {
		if (validationInputEl.value.length === Number.parseInt(validationInputEl.dataset.length)) {
			validationInputEl.classList.add("valid");
			validationInputEl.classList.remove("invalid");
		} else {
			validationInputEl.classList.add("invalid");
			validationInputEl.classList.remove("valid");
		}
	});
})();

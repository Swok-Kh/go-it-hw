(() => {
	const selectorInput = "name-input";
	const selectorOutput = "name-output";
	const nameInputEl = document.querySelector(`#${selectorInput}`);
	const nameOutputEl = document.querySelector(`#${selectorOutput}`);
	if (!nameInputEl || !nameOutputEl) {
		console.log(`Selector "#${selectorInput}" or "#${selectorOutput}" not find`);
		return;
	}

	nameInputEl.addEventListener("input", () => {
		nameOutputEl.textContent = nameInputEl.value === "" ? "незнакомец" : nameInputEl.value;
	});
})();

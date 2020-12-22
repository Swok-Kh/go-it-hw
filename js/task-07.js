(() => {
	const selectorFont = "font-size-control";
	const selectorText = "text";
	const textEl = document.querySelector(`#${selectorText}`);
	const fontSizeControlEl = document.querySelector(`#${selectorFont}`);
	if (!fontSizeControlEl || !textEl) {
		console.log(`Selector "#${fontSizeControlEl}" or "#${textEl}" not find`);
	}
	textEl.style.fontSize = `${fontSizeControlEl.value}px`;
	fontSizeControlEl.addEventListener("input", () => {
		textEl.style.fontSize = `${fontSizeControlEl.value}px`;
	});
})();

(() => {
	const selector = "gallery";
	const galleryEl = document.querySelector(`#${selector}`);
	if (!galleryEl) {
		console.log(`Selector "#${selector}" not find`);
		return;
	}
	const images = [
		{
			url:
				"https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			alt: "White and Black Long Fur Cat",
		},
		{
			url:
				"https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			alt: "Orange and White Koi Fish Near Yellow Koi Fish",
		},
		{
			url:
				"https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
			alt: "Group of Horses Running",
		},
	];
	galleryEl.classList.add(`${selector}`);
	galleryEl.insertAdjacentHTML(
		"afterbegin",
		images.reduce((acc, { url, alt }) => {
			acc += `<li class="${selector}__item"><img class="${selector}__image" src="${url}" alt="${alt}"/></li>`;

			return acc;
		}, ""),
	);
})();

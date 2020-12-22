import { default as imageRef } from "./gallery-items.js";
import { Gallery } from "./Gallery.js";

(() => {
	const galleryObject = new Gallery(
		imageRef,
		".js-gallery",
		"gallery__item",
		"gallery__link",
		"gallery__image",
		".js-lightbox",
		".js-lightbox .lightbox__image",
		".js-lightbox button[data-action='close-lightbox']",
	);
	galleryObject.galleryEl.addEventListener(
		"click",
		galleryObject.openLightBoxHandler.bind(galleryObject),
	);
})();

import './scss/main.scss';

import { Gallery } from './js/Gallery';
import { ScrollUp } from './js/ScrollUp';

const gallery = new Gallery({
  formSelector: '.search-form',
  gallerySelector: '.gallery',
  gallerySantinelSelector: '.gallery-santinel',
  lightboxControlsSelector: '.lightbox-controls',
  fullSizePreloader: '.full-size-preloader',
});
gallery.init();

const scroll = new ScrollUp({
  selector: '.scroll-up',
  topOffset: 0,
  offsetForHideScrollUp: 300,
});
scroll.init();

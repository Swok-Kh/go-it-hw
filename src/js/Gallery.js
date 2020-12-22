import photoCardList from '../templates/photo-card-list.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import { displayNotifycation, fetchPixabayImages } from './Helpers';

export class Gallery {
  constructor({
    formSelector,
    gallerySelector,
    gallerySantinelSelector,
    lightboxControlsSelector,
    fullSizePreloader,
  }) {
    this._refs = {
      form: document.querySelector(formSelector),
      input: document.querySelector(`${formSelector} [name="query"]`),
      gallery: document.querySelector(gallerySelector),
      gallerySantinel: document.querySelector(gallerySantinelSelector),
      lightboxControls: document.querySelector(lightboxControlsSelector),
      lightboxLink: document.querySelector(`${lightboxControlsSelector}__link`),
      lightboxCloseButton: document.querySelector(
        `${lightboxControlsSelector} button`,
      ),
      fullSizePreloader: document.querySelector(fullSizePreloader),
    };
    this._lightboxControlsSelector = `${lightboxControlsSelector.slice(
      1,
    )}--hidden`;
    this._fullSizePreloaderSelector = `${fullSizePreloader.slice(1)}--hidden`;
    this._loadedImagesCount = 0;
  }
  init() {
    this._inputHandler = this._inputHandler.bind(this);
    this._photoCardClickHandler = this._photoCardClickHandler.bind(this);

    this._refs.form.addEventListener('submit', e => e.preventDefault());

    this._refs.input.addEventListener('input', this._inputHandler);
    this._refs.gallery.addEventListener('click', this._photoCardClickHandler);

    this._autoScrollObserver = new IntersectionObserver(
      this._autoScrollHandler.bind(this),
      {
        rootMargin: '200px',
      },
    );
    this._autoScrollObserver.observe(this._refs.gallerySantinel);
  }
  _inputHandler(e) {
    clearTimeout(this._inputTimer);
    this._inputTimer = setTimeout(() => {
      if (e.target.value === '') return;
      if (this._query === e.target.value.trim()) {
        return;
      }
      this._query = e.target.value.trim();
      this._requestHandler(true);
    }, 750);
  }
  async _requestHandler(isNewRequest) {
    if (this._query === undefined) {
      return;
    }
    if (isNewRequest) {
      const data = await fetchPixabayImages({ searchWord: this._query });
      this._responseHandler(data, true);
      this._page = 1;
    } else {
      this._page += 1;
      const data = await fetchPixabayImages({
        searchWord: this._query,
        page: this._page,
      });
      this._responseHandler(data);
    }
  }
  _responseHandler(data, isNewQuery = false) {
    if (data.hits.length === 0 && !isNewQuery) {
      displayNotifycation({
        text: `Total images ${data.total}`,
        type: 'error',
        title: 'You have scrolled through all the images!',
      });
      return;
    }
    if (data.hits.length === 0) {
      displayNotifycation({
        text: `Images not found`,
        type: 'error',
        title: 'Try to enter something else',
      });
      return;
    }
    this._renderImages(data, isNewQuery);
  }
  _autoScrollHandler(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this._requestHandler(false);
      }
    });
  }
  _renderImages(data, isNewQuery) {
    if (isNewQuery) {
      this._refs.gallery.innerHTML = '';
      this._loadedImagesCount = 0;
      displayNotifycation({
        text: 'You can scroll to see them all',
        type: 'notice',
        title: `Found ${data.total} images`,
      });
    }
    this._refs.gallery.insertAdjacentHTML(
      'beforeend',
      photoCardList(this._normalizeReceivedData(data)),
    );
    this._addPreviewImagesPreloader();
  }
  _normalizeReceivedData(data) {
    return data.hits.map(el => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        pageURL,
        likes,
        views,
        comments,
        downloads,
      } = el;
      return {
        largeImageURL,
        webformatURL,
        tags: tags.split(','),
        pageURL,
        likes,
        views,
        comments,
        downloads,
      };
    });
  }
  _addPreviewImagesPreloader() {
    this._imagesRefs = document.querySelectorAll('.preloader');
    for (let i = this._loadedImagesCount; i < this._imagesRefs.length; i += 1) {
      this._imagesRefs[i].children[0].onload = this._previewImageOnload.bind(
        this,
        this._imagesRefs[i],
      );
    }
    this._loadedImagesCount = this._imagesRefs.length - 1;
  }
  _previewImageOnload(el) {
    el.classList.add('preloader--hidden');
  }
  _photoCardClickHandler(e) {
    if (e.target.nodeName === 'A' || e.target === this._refs.gallery) {
      return;
    }
    if (e.target.dataset.hasOwnProperty('tag')) {
      this._findImagesFromTag(e.target);
      return;
    }
    this._findParrentOfImgEl(e.target);
  }
  _findImagesFromTag(el) {
    this._refs.input.value = this._query = el.textContent.trim();
    this._requestHandler(true);
    scrollTo({ top: 0, behavior: 'smooth' });
  }
  _findParrentOfImgEl(cur) {
    if (cur.dataset.hasOwnProperty('fullSizeImage')) {
      this._openLightbox(cur.dataset.fullSizeImage, cur.dataset.pageUrl);
      return;
    }
    this._findParrentOfImgEl(cur.parentNode);
  }
  _openLightbox(src, url) {
    this._fullSizePreloaderHandler(src);
    this._refs.lightboxLink.href = url;
    this._lightbox = basicLightbox.create(
      `<img class="big-image" src="${src}" alt="${this._refs.input.value}" />`,
      {
        onShow: this._lightboxOnShowHandler.bind(this),
        closable: false,
      },
    );
    this._lightbox.show();
  }
  _lightboxOnShowHandler(el) {
    this._refs.lightboxControls.classList.remove(
      this._lightboxControlsSelector,
    );
    this._refs.lightboxCloseButton.onclick = () => {
      this._refs.lightboxControls.classList.add(this._lightboxControlsSelector);
      this._refs.fullSizePreloader.classList.add(
        this._fullSizePreloaderSelector,
      );
      el.close();
    };
  }
  _fullSizePreloaderHandler(src) {
    this._refs.fullSizePreloader.classList.remove(
      this._fullSizePreloaderSelector,
    );
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this._refs.fullSizePreloader.classList.add(
        this._fullSizePreloaderSelector,
      );
    };
    img.onerror = () => {
      this._refs.fullSizePreloader.classList.add(
        this._fullSizePreloaderSelector,
      );
      this._lightbox.close();
      displayNotifycation({
        text: `An error occurred while loading`,
        type: 'error',
        title: 'Try again',
      });
    };
  }
}

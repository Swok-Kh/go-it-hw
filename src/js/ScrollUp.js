export class ScrollUp {
  constructor({ selector, topOffset = 0, offsetForHideScrollUp }) {
    this._scrollButtonRef = document.querySelector(selector);
    this._scrollSelector = selector;
    this._topOffset = topOffset;
    this._offsetForHideScrollUp = offsetForHideScrollUp;
  }
  init() {
    this._scrollButtonRef.addEventListener(
      'click',
      this._clickHandler.bind(this),
    );
    if (this._offsetForHideScrollUp !== undefined) {
      window.addEventListener('scroll', this._autoHideButton.bind(this));
      this._hide();
    }
  }
  _clickHandler() {
    scrollTo({ top: 0 + this._topOffset, behavior: 'smooth' });
  }
  _show() {
    this._scrollButtonRef.classList.remove(
      `${this._scrollSelector.slice(1)}--hidden`,
    );
  }
  _hide() {
    this._scrollButtonRef.classList.add(
      `${this._scrollSelector.slice(1)}--hidden`,
    );
  }
  _autoHideButton() {
    clearTimeout(this._timeoutId);
    this._timeoutId = setTimeout(() => {
      if (pageYOffset < this._offsetForHideScrollUp) {
        this._hide();
      } else {
        this._show();
      }
    }, 100);
  }
  to(target) {
    scrollTo({ top: target, behavior: 'smooth' });
  }
}

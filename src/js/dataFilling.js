import menuTemplate from '../templates/menuTemplate.hbs';
import menuData from '../menu.json';
(() => {
  const menuRef = document.querySelector('.js-menu');

  menuRef.insertAdjacentHTML(
    'afterbegin',
    menuData.reduce((resultHtmlstring, item) => {
      return resultHtmlstring + menuTemplate(item);
    }, ''),
  );
})();

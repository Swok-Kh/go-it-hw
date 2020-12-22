(() => {
  const refsEl = {
    switch: document.querySelector('#theme-switch-toggle'),
    body: document.querySelector('body'),
  };
  const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  const toggleLight = () => {
    localStorage.setItem('theme', Theme.LIGHT);
    refsEl.body.classList.add(Theme.LIGHT);
    refsEl.body.classList.remove(Theme.DARK);
  };
  const toggleDark = () => {
    localStorage.setItem('theme', Theme.DARK);
    refsEl.body.classList.add(Theme.DARK);
    refsEl.body.classList.remove(Theme.LIGHT);
  };
  refsEl.switch.addEventListener('change', event => {
    if (event.target.checked) {
      toggleDark();
    } else {
      toggleLight();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    if (
      localStorage.getItem('theme') === Theme.LIGHT ||
      localStorage.getItem('theme') === null
    ) {
      toggleLight();
    } else {
      toggleDark();
      refsEl.switch.checked = true;
    }
  });
})();

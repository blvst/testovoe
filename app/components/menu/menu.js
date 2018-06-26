export default () => {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.menu__burger');

  if (!menu || !hamburger) {
    return false;
  }

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('menu--opened');
  });

  return true;
};

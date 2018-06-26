export default () => {
  const phoneLink = document.querySelector('a[data-href]');

  if (!phoneLink) {
    return false;
  }

  const isMobile = ('ontouchstart' in document.documentElement)
    && window.innerWidth < 1024;

  function setPhoneLink() {
    const href = isMobile ? phoneLink.dataset.href : '#';
    phoneLink.setAttribute('href', href);
  }

  window.addEventListener('resize', setPhoneLink);
  setPhoneLink();

  return true;
};

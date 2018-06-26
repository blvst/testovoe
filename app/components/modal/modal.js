export default () => {
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal__content');
  const modalClose = document.querySelector('.modal__close');
  const modalActiveClass = 'modal--showed';

  function show() {
    if (!modal) {
      alert('Modal doesn\'t exists!');
      return false;
    }

    return modal.classList.add(modalActiveClass);
  }

  function hide() {
    if (!modal) {
      alert('Modal doesn\'t exists!');
      return false;
    }

    return modal.classList.remove(modalActiveClass);
  }

  modalClose.addEventListener('click', hide);
  modal.addEventListener('click', hide);
  modalContent.addEventListener('click', event => event.stopPropagation());

  return {
    show, hide,
  };
};

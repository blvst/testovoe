import modal from '../modal/modal';

export default () => {
  const modalCtrl = modal();

  const form = document.querySelector('.form');

  if (!form) {
    return false;
  }

  function setCheckbox(val = true) {
    const captchaCheckbox = document.querySelector('.form__captcha-checkbox');
    captchaCheckbox.checked = val;
  }

  function enableSubmit() {
    setCheckbox();
  }

  function renderCaptcha() {
    const { grecaptcha } = window;
    const captchaBlock = document.querySelector('.form__captcha-src');

    if (!grecaptcha || !captchaBlock) {
      return false;
    }

    return grecaptcha.render(captchaBlock, {
      sitekey: '6Lf_mGAUAAAAAJfe0Rhu28AON2S8Zd4Axe7Xw3_2',
      callback: enableSubmit,
    });
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  function submitListener(event) {
    const { grecaptcha } = window;

    event.preventDefault();

    if (!(grecaptcha && grecaptcha.getResponse().length)) {
      setCheckbox(false);

      return false;
    }

    const method = form.getAttribute('method') || 'post';
    const body = new URLSearchParams(new FormData(form));

    fetch('/mail.php', {
      method,
      body,
    }).then(checkStatus)
      .then(
        () => {
          grecaptcha.reset();
          form.reset();
          modalCtrl.show();

          setTimeout(() => {
            modalCtrl.hide();
          }, 3000);
        },
      ).catch(
        () => {
          console.log(body.toString());
        },
      );

    return true;
  }

  form.addEventListener('submit', submitListener);

  return {
    renderCaptcha,
  };
};

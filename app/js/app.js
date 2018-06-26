import menu from '../components/menu/menu';
import form from '../components/form/form';
import footer from '../components/footer/footer';

menu();
footer();

window.renderCaptcha = form().renderCaptcha;
document.write('<script async src="https://www.google.com/recaptcha/api.js?onload=renderCaptcha&render=explicit"></script>');

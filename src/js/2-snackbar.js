import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const inputMillis = form.elements.delay;

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const selectedState = form.elements.state.value;
  createPromise(Number(inputMillis.value), selectedState);
  form.reset();
});

function createPromise(delay, state) {
  if (delay > 0) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (state) {
          case 'fulfilled':
            resolve(`✅ Fulfilled promise in ${delay}ms`);
            break;
          case 'rejected':
            reject(`❌ Rejected promise in ${delay}ms`);
            break;
          default:
            reject(`[ERROR] Unknown state provided: ${state}`);
            break;
        }
      }, delay);
    });
    promise
      .then(value => {
        iziToast.show({
          message: value,
          backgroundColor: 'rgba(82, 223, 79, 0.3)',
          position: 'topRight',
        });
      })
      .catch(value => {
        iziToast.show({
          message: value,
          backgroundColor: 'rgba(223, 79, 79, 0.3)',
          position: 'topRight',
        });
      });
  } else {
    iziToast.show({
      message: 'Value must be more than 0',
      backgroundColor: 'yellow',
      position: 'topRight',
    });
  }
}

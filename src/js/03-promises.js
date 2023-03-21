// HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку
// в мілісекундах, крок збільшення затримки для кожного
// промісу після першого і кількість промісів, яку необхідно створити.

// Напиши скрипт, який на момент сабміту форми викликає функцію
// createPromise(position, delay) стільки разів, скільки ввели в поле amount.
// Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку,
// враховуючи першу затримку (delay), введену користувачем, і крок (step).

import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  if (delay.value > 0 || step.value > 0 || amount.value > 0) {
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

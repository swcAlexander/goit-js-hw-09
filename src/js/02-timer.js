// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Такий таймер може використовуватися у блогах та інтернет - магазинах, сторінках реєстрації подій,
// під час технічного обслуговування тощо.Подивися демо - відео роботи таймера.

// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві
// кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу.
// Для того щоб підключити CSS код бібліотеки в проект,
// необхідно додати ще один імпорт, крім того, що описаний в документації.

import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const PROMT_DELEY = 1000;
const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startEl: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  spansEl: document.querySelectorAll('.value'),
};

let timerId = null;

refs.startEl.setAttribute('disabled', true);
refs.startEl.addEventListener('click', calcOfTimeDifference);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.startEl.disabled = true;
    } else {
      refs.startEl.disabled = false;
    }
  },
};

// Ініціалізую flatpickr:

flatpickr(refs.inputEl, options);

// Мої функції:

function calcOfTimeDifference() {
  refs.spansEl.forEach(item => item.classList.toggle('end'));
  refs.startEl.setAttribute('disabled', true);
  refs.inputEl.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const chooseDate = new Date(refs.inputEl.value);
    const timeToFinish = chooseDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
      refs.spansEl.forEach(item => item.classList.toggle('end'));
      clearInterval(timerId);
      refs.inputEl.disabled = false;
      return;
    }
  }, PROMT_DELEY);
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

// Функціця обрахунку часу, яка переводить мілісекунди
// в формат 00: 00: 00: 00 дні / години / хвилини / секунди:

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює
// колір фону < body > на випадкове значення, використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.


// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

const PROMT_DELEY = 1000;
const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
    bodyEl: document.querySelector('body')
};
let timeoutId = null;

refs.startButton.addEventListener('click', startChangeColor);
refs.stopButton.addEventListener('click', stopChangeColor);

function startChangeColor() {
    refs.startButton.setAttribute('disabled', true);   
    timeoutId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();

    }, PROMT_DELEY);
}
function stopChangeColor() {
  clearInterval(timeoutId);

  refs.startButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

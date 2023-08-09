// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.getElementById("datetime-picker"),
  buttonStart: document.querySelector("button"),
  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]"),
};
let selectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDate.getTime() <= new Date()) {
        Notify.warning("Please choose a date in the future");
        refs.buttonStart.setAttribute("disabled", "true");
        return;
      }
      refs.buttonStart.removeAttribute("disabled");
  },
};

flatpickr("#datetime-picker", options);

refs.buttonStart.addEventListener("click", startTimer);
function startTimer() {
  const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const timeRemaining =  selectedDate - now;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeRemaining);

      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }
  }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
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
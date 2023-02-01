import { getTimeOfDay, translations } from './index.js';


const time = document.querySelector('.time'),
    date = document.querySelector('.date'),
    greeting = document.querySelector('.greeting');


const showDateTime = () => {
    const currentDateTime = new Date(),
        currentTime = currentDateTime.toLocaleTimeString(),
        currentDate = capitalize(currentDateTime.toLocaleDateString(translations.getLang.dateFormat, { weekday: 'long', month: 'long', day: 'numeric' })),
        currentHour = currentDateTime.getHours();

    // Setting time
    time.textContent = currentTime;
    // Setting date
    date.textContent = currentDate;
    // Setting greeting
    greeting.textContent = translations.getLang.greetingMsg[getTimeOfDay(currentHour)];

    setTimeout(showDateTime, 1000);
}

const capitalize = (str) => str.split(' ').map(el => el[0].toUpperCase() + el.slice(1)).join(' ');

showDateTime();
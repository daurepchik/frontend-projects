export const getTimeOfDay = (hour) => {
    if (hour < 6)
        return 0;   //'night'
    else if (hour < 12)
        return 1;   //'morning'
    else if (hour < 18)
        return 2;   //'afternoon'
    else
        return 3;   //'evening'
}

export const getRandomNum = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const settings = {
    // language settings
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    // background img slider settings
    imgSrc: localStorage.getItem('source') ? localStorage.getItem('source') : 'github',
    imgTags: localStorage.getItem('tags') ? localStorage.getItem('tags') : '',
    // blocks visibility settings
    blocks: localStorage.getItem('blocks') ? JSON.parse(localStorage.getItem('blocks')) : ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist'],
}

export const translations = {
    en: {
        dateFormat: 'en-US',

        greetingMsg: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],

        namePlaceholder: '[Enter your name]',

        defaultCity: 'Minsk',
        cityPlaceholder: '[Enter your city]',
        weatherError: 'Wrong City Name',
        wind: 'Wind Speed',
        humidity: 'Humidity',

        language: 'Language',
        source: 'Source',
        tags: 'Tags',
    },
    ru: {
        dateFormat: 'ru-RU',

        greetingMsg: ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'],

        namePlaceholder: '[Введите ваше имя]',

        defaultCity: 'Минск',
        cityPlaceholder: '[Введите ваш город]',
        weatherError: 'Неправильный город',
        wind: 'Скорость ветра',
        humidity: 'Влажность',

        language: 'Язык',
        source: 'Источник',
        tags: 'Тэги',
    },
    get getLang() {
        return settings.language === 'en' ? this.en : this.ru;
    }
}
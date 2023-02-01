import { translations, settings, getRandomNum } from "./index.js";
import { setBg } from "./img_slider.js";
import { getQuote } from "./quotes.js";
import { getWeather } from "./weather.js";

const settingsBtn = document.querySelector('.settings-btn'),
    settingsMenu = document.querySelector('.settings-menu'),
    languageLabel = document.querySelector('label[for="language"]'),
    languageSelect = document.querySelector('.language-select'),
    sourceLabel = document.querySelector('label[for="source"]'),
    sourceSelect = document.querySelector('.source-select'),
    tagsLabel = document.querySelector('label[for="tags"]'),
    tagsInput = document.querySelector('.tags-input'),
    blocksBtns = document.querySelectorAll('.blocks-btn');


const checkActive = () => {
    languageSelect.value = settings.language;
    languageLabel.textContent = translations.getLang.language;

    sourceSelect.value = settings.imgSrc;
    sourceLabel.textContent = translations.getLang.source;

    tagsInput.value = settings.imgTags;
    tagsLabel.textContent = translations.getLang.tags;

    blocksBtns.forEach(el => {
        const block = document.getElementById(el.textContent);
        if (settings.blocks.includes(el.textContent)) {
            el.classList.add('active')
            block.classList.remove('disappear');
        } else {
            el.classList.remove('active')
            block.classList.add('disappear');
        }
    })
}

const checkBlocks = (e) => {
    if (settings.blocks.indexOf(e.target.textContent) !== -1) {
        settings.blocks.splice(settings.blocks.indexOf(e.target.textContent), 1);
    } else {
        settings.blocks.push(e.target.textContent);
    }
    localStorage.setItem('blocks', JSON.stringify(settings.blocks));
    checkActive();
}

const showSettings = () => {
    settingsMenu.classList.toggle('show');
}

const changeLanguage = () => {
    settings.language = languageSelect.value;
    localStorage.setItem('language', settings.language);

    checkActive();
    getQuote();
    getWeather();
}

const changeSource = () => {
    settings.imgSrc = sourceSelect.value;
    localStorage.setItem('source', settings.imgSrc);

    let randomNum = getRandomNum(21, 1);
    setBg(randomNum);
}

const setImgTags = () => {
    settings.imgTags = tagsInput.value;
    localStorage.setItem('tags', settings.imgTags);

    let randomNum = getRandomNum(21, 1);
    setBg(randomNum);
}


languageSelect.addEventListener('change', changeLanguage);
sourceSelect.addEventListener('change', changeSource);
tagsInput.addEventListener('change', setImgTags);

settingsBtn.addEventListener('click', showSettings);

blocksBtns.forEach(el => {
    el.addEventListener('click', checkBlocks);
})

checkActive();
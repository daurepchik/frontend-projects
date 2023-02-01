import { getTimeOfDay, getRandomNum, settings } from './index.js';

const slidePrev = document.querySelector('.slide-prev'),
    slideNext = document.querySelector('.slide-next');
const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];
let randomNum = 0;

export const setBg = async (bgNum) => {
    const currentHour = new Date().getHours(),
        timeOfDay = getTimeOfDay(currentHour);

    bgNum = bgNum.toString().padStart(2, '0')

    const img = document.createElement('img');
    let imgSrc = '';
    switch (settings.imgSrc) {
        case 'github':
            imgSrc = `./assets/images/${timesOfDay[timeOfDay]}/${bgNum}.webp`;
            break;
        case 'unsplash':
            imgSrc = await getUnsplashImg(timeOfDay);
            break;
        case 'flickr':
            imgSrc = await getFlickrImg(timeOfDay, bgNum - 1);
            break;
    }
    img.src = imgSrc;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${imgSrc})`;
    };
}

const getSlidePrev = () => {
    randomNum > 1 ? randomNum -= 1 : randomNum = 20
    setBg(randomNum);
}

const getSlideNext = () => {
    randomNum < 20 ? randomNum += 1 : randomNum = 1;
    setBg(randomNum);
}

const getUnsplashImg = async (timeOfDay) => {
    let tags = settings.imgTags === '' ? timesOfDay[timeOfDay] : settings.imgTags;
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tags}&client_id=mIVq0kHtYqzcgWTrYKKPy4kmjXHEV2GANcTT33s2xC0`;
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.regular;
}

const getFlickrImg = async (timeOfDay, bgNum) => {
    let tags = settings.imgTags === '' ? timesOfDay[timeOfDay] : settings.imgTags;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7546f783d422ff648f1bfd8ebe0a33c3&tags=${tags}&extras=url_l&format=json&nojsoncallback=1&per_page=20`;
    const res = await fetch(url);
    const data = await res.json();
    return data.photos.photo[bgNum].url_l;
}


slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

randomNum = getRandomNum(21, 1)
setBg(randomNum)
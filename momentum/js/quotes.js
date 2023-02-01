import { getRandomNum, settings } from './index.js';


const changeQuote = document.querySelector('.change-quote'),
    quoteDom = document.querySelector('.quote'),
    author = document.querySelector('.author');

export const getQuote = async () => {
    const url = `js/quotes/quotes_${settings.language}.json`;
    const res = await fetch(url);
    const data = await res.json();
    const quote = data[getRandomNum(data.length)]
    quoteDom.textContent = `"${quote.body}"`
    author.textContent = '© ' + quote.author
}

changeQuote.addEventListener('click', getQuote)
document.addEventListener('DOMContentLoaded', getQuote)
import { translations } from "./index.js";

const name = document.querySelector('.name');
name.placeholder = translations.getLang.namePlaceholder;

const setName = (e) => {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            name.blur();
        }
    } else {
        localStorage.setItem('name', name.value);
    }
}

function getName() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

name.addEventListener('keypress', setName);
window.addEventListener('beforeunload', setName);
document.addEventListener('DOMContentLoaded', getName);
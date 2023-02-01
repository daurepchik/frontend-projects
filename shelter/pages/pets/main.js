const burger = document.querySelector(".burger");
const burgerBars = document.querySelectorAll(".bar");
const menu = document.querySelector(".menu-slide");
const logo = document.querySelector('.header-logo');
const overlay = document.querySelector('.overlay');

function myFunction() {
    burger.classList.toggle("change");
}

function openCloseNav() {
    if (menu.style.width === '') {
        menu.style.width = '320px';

        burgerBars.forEach(bar => {
            bar.style.backgroundColor = '#F1CDB3';
        });

        burger.style.position = 'fixed';
        document.querySelector('body').style.overflow = 'hidden';
        logo.style.position = 'fixed';
        document.querySelector('.header-logo-title').style.color = '#F1CDB3';
        document.querySelector('.header-logo-subtitle').style.color = '#FFFFFF';

        overlay.style.width = '100vw';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';

    } else if (menu.style.width === '320px') {
        menu.style.width = '';

        burgerBars.forEach(bar => {
            bar.style.backgroundColor = 'black';
        });

        burger.style.position = 'static';
        logo.style.position = 'static';
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('.header-logo-title').style.color = '#545454';
        document.querySelector('.header-logo-subtitle').style.color = '#292929';

        overlay.style.width = '0'
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
}

overlay.addEventListener("click", openCloseNav)
overlay.addEventListener("click", myFunction)

burger.addEventListener("click", openCloseNav)
burger.addEventListener("click", myFunction)

document.querySelector(".header-menu-mobile-list-item:nth-child(2)").addEventListener("click", openCloseNav)
document.querySelector(".header-menu-mobile-list-item:nth-child(2)").addEventListener("click", myFunction)

// Pets Page Slider
let pets = []; // 8
let petsPopup = [];
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
fetch('./pets.json').then(res => res.json()).then(list => {
    pets = list;

    fullPetsList = (() => {
        let tempArr = [];

        for (let i = 0; i < 6; i++) {
            const newPets = pets;

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randInd, 1)[0];
                newPets.push(randElem);
            }

            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    })();

    fullPetsList = sort863(fullPetsList);

    createPets(fullPetsList);
})

const createPets = (petsList) => {
    const elem = document.querySelector(".slider-cards");
    elem.innerHTML += createElements(petsList);
}

const createElements = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<div class="slider-card">
            <img src="${petsList[i].img}" alt="${petsList[i].name}">
            <h4>${petsList[i].name}</h4>
            <a>Learn more</a>
        </div>`;
    }
    return str;
}
request.send();

const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break;
            }
            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name;
            });
            if (isUnique) {
                uniqueStepList.push(list[j]);
                list.splice(j, 1);
                j--;
            }
        }
        unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;


    list = sort6recursively(list);

    return list;
}

const sort6recursively = (list) => {
    const length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                sort6recursively(list);
            }
        }
    }
    return list;
}

let currentPage = 0;
let maxPages;
document.querySelector(".slider-button.current").innerText = currentPage + 1;

const slide = (n) => {

    document.querySelector(".slider-button.left").addEventListener('click', (e) => {
        currentPage--;
        document.querySelectorAll(".slider-card").forEach(card => {
            card.style.top = `calc(0px - ${n * currentPage}px)`;
        })
        document.querySelector(".slider-button.current").innerText = currentPage + 1;
        if (currentPage === 0) {
            document.querySelectorAll('.left, .double-left').forEach(left => {
                left.disabled = true;
                left.classList.add('dis')
                left.classList.remove('active')
            })
        } else if (currentPage < maxPages) {

            document.querySelectorAll('.right, .double-right').forEach(right => {
                right.disabled = false;
                right.classList.remove('dis')
                right.classList.add('active')
            })
        }
    });

    document.querySelector(".slider-button.right").addEventListener('click', (e) => {
        currentPage++;
        document.querySelectorAll(".slider-card").forEach(card => {
            card.style.top = `calc(0px - ${n * currentPage}px)`;
        })
        document.querySelector(".slider-button.current").innerText = currentPage + 1;
        if (currentPage === maxPages) {
            document.querySelectorAll('.right, .double-right').forEach(right => {
                right.disabled = true;
                right.classList.add('dis')
                right.classList.remove('active')
            })
        } else if (currentPage > 0) {
            document.querySelectorAll('.left, .double-left').forEach(left => {
                left.disabled = false;
                left.classList.remove('dis')
                left.classList.add('active')
            })
        }
    });

    document.querySelector(".slider-button.double-right").addEventListener('click', (e) => {
        currentPage = maxPages - 1;
        let event = new Event("click");
        document.querySelector(".slider-button.right").dispatchEvent(event);
        document.querySelectorAll('.left, .double-left').forEach(left => {
            left.disabled = false;
            left.classList.remove('dis')
            left.classList.add('active')
        })
    });

    document.querySelector(".slider-button.double-left").addEventListener('click', (e) => {
        currentPage = 1;
        let event = new Event("click");
        document.querySelector(".slider-button.left").dispatchEvent(event);
        document.querySelectorAll('.right, .double-right').forEach(right => {
            right.disabled = false;
            right.classList.remove('dis')
            right.classList.add('active')
        })
    });

}

const mediaMatch = (large, medium, small) => {
    if (small.matches) {
        document.querySelectorAll(".slider-card").forEach(card => {
            card.style.top = '0px';
        })
        maxPages = 15;
        slide(1400);
    } else if (medium.matches) {
        document.querySelectorAll(".slider-card").forEach(card => {
            card.style.top = '0px';
        })
        maxPages = 7;
        slide(1400);
    } else if (large.matches) {
        document.querySelectorAll(".slider-card").forEach(card => {
            card.style.top = '0px';
        })
        maxPages = 5;
        slide(930);
    }
}

let large = window.matchMedia("(min-width: 1281px)");
let medium = window.matchMedia("(max-width: 1280px)");
let small = window.matchMedia("(max-width: 767px)");
mediaMatch(large, medium, small);
large.addListener(mediaMatch);
medium.addListener(mediaMatch);
small.addListener(mediaMatch);

// Popup
const overlay2 = document.querySelector('.overlay-two');
const popupPet = document.querySelector(".popup");

fetch('./pets.json').then(res => res.json()).then(list => {
    pets = list;

    const showHidePopup = () => {
        if (popupPet.style.display === 'none') {

            popupPet.style.display = 'flex';
            document.querySelector(".popup-x").style.display = 'flex';
            document.querySelector(".popup-img img").style.display = 'block';
            document.querySelector(".popup-text").style.display = 'flex';
            document.querySelector("body").style.overflow = 'hidden';

            openCloseOverlay2();

        } else {
            popupPet.style.display = 'none';
            document.querySelector(".popup-x").style.display = 'none';
            document.querySelector(".popup-img img").style.display = 'none';
            document.querySelector(".popup-text").style.display = 'none';
            document.querySelector("body").style.overflow = 'auto';

            openCloseOverlay2(false);
        }
    }

    const popup = (e) => {
        let str = '';
        for (let pet of pets) {
            if (pet.name === e.target.parentElement.children[1].innerText) {
                str += `<div class="popup-img">
                            <img src="${pet.img}" alt="${pet.name}">
                        </div>
                        <div class='popup-text'>
                            <div class="popup-text-title">
                                <h3>${pet.name}</h3>
                                <h4>${pet.type} - ${pet.breed}</h4>
                            </div>
                            <h5>${pet.description}</h5>
                            <ul>
                                <li><h5><span>Age</span>: ${pet.age}</h5></li>
                                <li><h5><span>Inoculations</span>: ${pet.inoculations.join(', ')}</h5></li>
                                <li><h5><span>Diseases</span>: ${pet.diseases.join(', ')}</h5></li>
                                <li><h5><span>Parasites</span>: ${pet.parasites.join(', ')}</h5></li>
                            </ul>
                        </div>`
                popupPet.innerHTML = str;
            }
        }
    }

    const openCloseOverlay2 = (boo = true) => {
        if (boo) {
            overlay2.style.width = '100vw';
            overlay2.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        } else {
            overlay2.style.width = ''
            overlay2.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }
    }

    document.querySelectorAll('.slider-card').forEach(card => {
        card.addEventListener('click', popup);
        card.addEventListener('click', showHidePopup);
    })

    document.querySelector('.popup-x').addEventListener('click', showHidePopup)
    overlay2.addEventListener('click', showHidePopup)
})
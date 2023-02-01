const gallery_item = document.querySelectorAll('.gallery__item');
const arr = []

AOS.init();
loadGallery();

function loadGallery() {
    for (let i = 1; i < 16; i++) {
        const img = document.createElement('img');
        img.classList.add('img', 'gallery-img')
        // img.setAttribute('data-src', `assets/img/galery/galery${i}.webp`);
        img.setAttribute('data-aos', 'fade-up');
        img.src = `assets/img/galery/galery${i}.webp`;
        img.alt = `galery${i}`;
        arr.push(img);
    }

    shuffle(arr);

    for (let i in gallery_item) {
        gallery_item[i].append(arr[i])
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
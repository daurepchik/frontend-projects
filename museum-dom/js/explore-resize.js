makeExploreResizable();

function makeExploreResizable() {
    const explore_img = document.querySelector('.explore-img');
    const img_after = document.querySelector('.explore-img-after');
    const resizer = document.querySelector('.explore-img-slider')
    resizer.addEventListener('mousedown', function (e) {
        e.preventDefault()
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {
        let percent = (e.pageX - img_after.getBoundingClientRect().left) / explore_img.getBoundingClientRect().width * 100
        img_after.style.width = percent <= 100 ? percent + '%' : '100%'
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize)
    }
}

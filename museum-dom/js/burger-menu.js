const burger = document.querySelector('.burger');
const welcome_text = document.querySelector('.welcome-text');
const welcome_burger = document.querySelector('.welcome-burger');
const welcome_burger_link = document.querySelectorAll('.welcome-burger-nav-list-item-link');

// open nav
burger.addEventListener('click', toggle);
welcome_burger_link.forEach(link => link.addEventListener('click', toggle))

document.addEventListener('click', (e) => {
    const isNavigation = e.target === welcome_burger || welcome_burger.contains(e.target)
    const isBurgerBtn = e.target === burger || burger.contains(e.target)

    if (!isNavigation && !isBurgerBtn && burger.classList.contains('open'))
        toggle()
})

function toggle() {
    burger.classList.toggle('open');
    welcome_burger.classList.toggle('open');
    welcome_text.classList.toggle('open');
}

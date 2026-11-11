
// MENU MOBILE

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');

    menuBtn.textContent =
        nav.classList.contains('active') ? '✕' : '☰';
});

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// ANIMAÇÃO AO ROLAR A PÁGINA

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
    '.about, .product, .statement, .contact'
).forEach(element => {

    element.classList.add('scroll-reveal');
    observer.observe(element);

});

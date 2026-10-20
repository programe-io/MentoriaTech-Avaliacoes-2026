const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});


// Fecha o menu quando clicar em um link

const links = document.querySelectorAll("#menu a");

links.forEach(link => {

    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });

});


// Efeito no cabeçalho ao rolar

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(25, 25, 20, 0.98)";
    } else {
        header.style.background = "rgba(25, 25, 20, 0.92)";
    }

});

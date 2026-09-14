// // ================================
// MENU MOBILE
// ================================

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {

    menu.classList.toggle("ativo");

});


// ================================
// FECHAR MENU AO CLICAR
// ================================

const links = document.querySelectorAll(".menu a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("ativo");

    });

});


// ================================
// ANO AUTOMÁTICO NO RODAPÉ
// ================================

const ano = document.getElementById("ano");

ano.textContent = new Date().getFullYear();


// ================================
// ANIMAÇÃO AO APARECER NA TELA
// ================================

const elementos = document.querySelectorAll(
    ".card, .sobre-texto, .info, .objetivo"
);

const observador = new IntersectionObserver(
    function (entradas) {

        entradas.forEach(function (entrada) {

            if (entrada.isIntersecting) {

                entrada.target.classList.add("aparecer");

            }

        });

    },
    {
        threshold: 0.15
    }
);


elementos.forEach(function (elemento) {

    observador.observe(elemento);

});

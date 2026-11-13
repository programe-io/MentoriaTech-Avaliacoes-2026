
// EFEITO NOS LINKS DO MENU

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("click", () => {

        links.forEach(item => {
            item.classList.remove("selecionado");
        });

        link.classList.add("selecionado");

    });

});


// EFEITO NAS FOTOS DA GALERIA

const fotos = document.querySelectorAll(".fotos img");

fotos.forEach(foto => {

    foto.addEventListener("click", () => {

        foto.classList.toggle("selecionada");

    });

});


// AVISAR SE UMA FOTO NÃO CARREGAR

fotos.forEach(foto => {

    foto.addEventListener("error", () => {

        foto.alt = "Imagem não disponível";

        foto.style.background = "#d9ddd7";

    });

});


// ANIMAÇÃO DAS SEÇÕES AO APARECER NA TELA

const secoes = document.querySelectorAll(".secao");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

        }

    });

}, {
    threshold: 0.15
});

secoes.forEach(secao => {

    observador.observe(secao);

});

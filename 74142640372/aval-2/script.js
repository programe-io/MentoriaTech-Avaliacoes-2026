// Adicione esta chamada dentro do seu document.addEventListener("DOMContentLoaded", ...)
// inicializarEfeitoAside();

function inicializarEfeitoAside() {
    const aside = document.querySelector(".info-lateral");
    if (!aside) return;

    // Dá um leve destaque ao passar o mouse
    aside.addEventListener("mouseenter", () => {
        aside.style.borderColor = "#b71c1c"; // Muda o detalhe de dourado para vermelho
        aside.style.transition = "all 0.3s ease";
    });

    aside.addEventListener("mouseleave", () => {
        aside.style.borderColor = "#ffca28"; // Volta para o dourado
    });
}// Chame essa função dentro do document.addEventListener("DOMContentLoaded", ...)
// inicializarScrollspy();

function inicializarScrollspy() {
    const secoes = document.querySelectorAll("section, aside");
    const linksNav = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let secaoAtualId = "";
        const topoJanela = window.scrollY + 100; // Margem para detectar antes de encostar no topo

        secoes.forEach(secao => {
            const topoSecao = secao.offsetTop;
            const alturaSecao = secao.offsetHeight;

            if (topoJanela >= topoSecao && topoJanela < topoSecao + alturaSecao) {
                secaoAtualId = secao.getAttribute("id");
            }
        });

        // Atualiza a classe ativa no menu
        linksNav.forEach(link => {
            link.style.color = "#e0e0e0";
            link.style.backgroundColor = "transparent";
            
            if (link.getAttribute("href") === `#${secaoAtualId}`) {
                link.style.color = "#ffca28"; // Destaque dourado para a seção ativa
                link.style.backgroundColor = "rgba(183, 28, 28, 0.3)";
            }
        });
    });
}
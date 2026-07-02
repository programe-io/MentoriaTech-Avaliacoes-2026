// Mensagem de boas-vindas
window.addEventListener("load", () => {
    alert("Bem-vindo ao Blog de Marketing Digital!");
});

// Rolagem suave ao clicar no menu
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Botão "Saiba Mais"
const botao = document.querySelector(".btn");

botao.addEventListener("click", function (e) {
    e.preventDefault();

    alert(
        "Continue estudando Marketing Digital para aprender mais sobre vendas online, tráfego pago e redes sociais!"
    );
});

// Destacar a seção visível durante a rolagem
const secoes = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let posicao = window.scrollY + 150;

    secoes.forEach(secao => {
        if (
            posicao >= secao.offsetTop &&
            posicao < secao.offsetTop + secao.offsetHeight
        ) {
            links.forEach(link => link.classList.remove("ativo"));

            const linkAtivo = document.querySelector(
                `nav a[href="#${secao.id}"]`
            );

            if (linkAtivo) {
                linkAtivo.classList.add("ativo");
            }
        }
    });
});

// Aguarda o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", () => {

    // MENU PARA CELULAR
    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".menu");

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }

    // FECHAR MENU AO CLICAR EM UM LINK
    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", () => {
            if (menu) {
                menu.classList.remove("active");
            }
        });
    });

    // ANIMAÇÃO DOS ELEMENTOS AO ROLAR A PÁGINA
    const elementos = document.querySelectorAll(
        ".card, .timeline-item, .gallery figure, section"
    );

    elementos.forEach(elemento => {
        elemento.classList.add("revelar");
    });

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elementos.forEach(elemento => {
        observador.observe(elemento);
    });

    // BOTÃO VOLTAR AO TOPO
    const botaoTopo = document.createElement("button");

    botaoTopo.textContent = "↑";
    botaoTopo.id = "voltarTopo";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");

    document.body.appendChild(botaoTopo);

    window.addEventListener("scroll", () => {
        botaoTopo.classList.toggle("mostrar", window.scrollY > 300);
    });

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // EFEITO DE AMPLIAÇÃO NAS IMAGENS
    document.querySelectorAll(".gallery img").forEach(imagem => {
        imagem.addEventListener("click", () => {
            imagem.classList.toggle("imagem-ampliada");
        });
    });

    // ANO AUTOMÁTICO NO RODAPÉ
    const ano = document.querySelector("#ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // DESTAQUE DO LINK DA SEÇÃO ATUAL
    const secoes = document.querySelectorAll("section[id]");
    const linksMenu = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {
        let secaoAtual = "";

        secoes.forEach(secao => {
            const topo = secao.offsetTop - 150;

            if (window.scrollY >= topo) {
                secaoAtual = secao.id;
            }
        });

        linksMenu.forEach(link => {
            link.classList.remove("ativo");

            if (link.getAttribute("href") === `#${secaoAtual}`) {
                link.classList.add("ativo");
            }
        });
    });

});

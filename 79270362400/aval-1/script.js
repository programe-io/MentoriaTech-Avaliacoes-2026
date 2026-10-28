
document.addEventListener("DOMContentLoaded", () => {

    // 1. Mensagem no console
    console.log("ARQUIVO GHOST // FORÇA-TAREFA 141");
    console.log("Sistema carregado com sucesso.");

    // 2. Botão para revelar curiosidades
    const botao = document.getElementById("botao-curiosidade");
    const curiosidade = document.getElementById("curiosidade-extra");

    if (botao && curiosidade) {
        botao.addEventListener("click", () => {
            const aberto = curiosidade.classList.toggle("visivel");

            botao.textContent = aberto
                ? "OCULTAR CURIOSIDADE"
                : "REVELAR CURIOSIDADE";
        });
    }

    // 3. Efeito de entrada das seções
    const elementos = document.querySelectorAll(
        "section, .info-card, .quote"
    );

    elementos.forEach(elemento => {
        elemento.classList.add("revelar");
    });

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("apareceu");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementos.forEach(elemento => observador.observe(elemento));
    } else {
        elementos.forEach(elemento => {
            elemento.classList.add("apareceu");
        });
    }

    // 4. Destacar o item do menu correspondente à seção
    const links = document.querySelectorAll('nav a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // 5. Ano atualizado automaticamente no rodapé
    const ano = document.getElementById("ano-atual");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

});

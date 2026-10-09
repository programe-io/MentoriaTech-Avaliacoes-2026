/* ===== BLOG TOP 10 ANIMES ===== */

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(
        ".postagem, .postagens"
    );

    // ===== 1. ANIMAÇÃO DOS CARDS AO ROLAR =====

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        cards.forEach((card) => {
            card.classList.add("reveal");
            observador.observe(card);
        });
    } else {
        // Alternativa para navegadores antigos
        cards.forEach((card) => {
            card.classList.add("visible");
        });
    }

    // ===== 2. BARRA DE PROGRESSO DA PÁGINA =====

    const barra = document.createElement("div");
    barra.id = "progresso-pagina";
    barra.setAttribute("aria-hidden", "true");
    document.body.appendChild(barra);

    function atualizarProgresso() {
        const alturaTotal =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progresso = alturaTotal > 0
            ? (window.scrollY / alturaTotal) * 100
            : 0;

        barra.style.width = `${progresso}%`;
    }

    // ===== 3. BOTÃO VOLTAR AO TOPO =====

    const botaoTopo = document.createElement("button");

    botaoTopo.id = "voltar-topo";
    botaoTopo.type = "button";
    botaoTopo.innerHTML = "&#8593;";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    botaoTopo.title = "Voltar ao topo";

    document.body.appendChild(botaoTopo);

    function atualizarBotaoTopo() {
        if (window.scrollY > 350) {
            botaoTopo.classList.add("visivel");
        } else {
            botaoTopo.classList.remove("visivel");
        }
    }

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });
    });

    // ===== 4. DESTAQUE AO CLICAR NOS PERSONAGENS =====

    cards.forEach((card) => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-pressed", "false");

        function alternarDestaque() {
            const selecionado =
                card.classList.toggle("selecionado");

            card.setAttribute(
                "aria-pressed",
                String(selecionado)
            );
        }

        card.addEventListener("click", (evento) => {
            // Evita ativar o card ao clicar em um link interno
            if (evento.target.closest("a")) return;

            alternarDestaque();
        });

        card.addEventListener("keydown", (evento) => {
            if (
                evento.target !== card ||
                (evento.key !== "Enter" &&
                 evento.key !== " ")
            ) {
                return;
            }

            evento.preventDefault();
            alternarDestaque();
        });
    });

    // ===== 5. ATUALIZAÇÃO AO ROLAR =====

    let aguardandoAtualizacao = false;

    function aoRolar() {
        if (aguardandoAtualizacao) return;

        aguardandoAtualizacao = true;

        window.requestAnimationFrame(() => {
            atualizarProgresso();
            atualizarBotaoTopo();
            aguardandoAtualizacao = false;
        });
    }

    window.addEventListener("scroll", aoRolar, {
        passive: true
    });

    // Estado inicial
    atualizarProgresso();
    atualizarBotaoTopo();

    // ===== 6. ANO AUTOMÁTICO NO RODAPÉ =====

    const rodape = document.querySelector("footer p");

    if (rodape) {
        rodape.textContent = rodape.textContent.replace(
            /\b20\d{2}\b/,
            new Date().getFullYear()
        );
    }

    console.log("Blog de animes carregado com sucesso!");
});

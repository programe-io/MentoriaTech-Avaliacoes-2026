document.addEventListener("DOMContentLoaded", () => {
    // Menu para celular
    const menuBotao = document.querySelector(".menu-botao");
    const menu = document.querySelector(".menu");

    if (menuBotao && menu) {
        menuBotao.addEventListener("click", () => {
            const aberto = menu.classList.toggle("aberto");

            menuBotao.setAttribute("aria-expanded", aberto);
            menuBotao.textContent = aberto ? "✕" : "☰";
        });

        menu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                menu.classList.remove("aberto");
                menuBotao.setAttribute("aria-expanded", "false");
                menuBotao.textContent = "☰";
            });
        });

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape") {
                menu.classList.remove("aberto");
                menuBotao.setAttribute("aria-expanded", "false");
                menuBotao.textContent = "☰";
            }
        });
    }

    // Frases inspiradoras
    const fraseTexto = document.querySelector("#fraseTexto");
    const fraseBotao = document.querySelector("#fraseBotao");

    const frases = [
        "Você merece viver uma história que tenha a sua essência. ♡",
        "Nunca deixe de acreditar nas possibilidades bonitas da vida. 🌷",
        "Cada novo dia é uma oportunidade para recomeçar. ✨",
        "Sua história é única, e isso já a torna especial. 💗",
        "Floresça no seu tempo, sem precisar se comparar. 🌸",
        "Pequenos passos também levam a grandes conquistas. 🦋",
        "Você pode mudar de planos e continuar seguindo em frente. 🎀",
        "Que nunca faltem motivos para sorrir e sonhos para realizar. 💕",
        "A sua melhor versão é aquela em que você se sente bem consigo mesma. 🌺",
        "Há muita beleza nas coisas simples que fazem o coração feliz. ♡"
    ];

    if (fraseTexto && fraseBotao) {
        let indiceAnterior = 0;

        fraseBotao.addEventListener("click", () => {
            let novoIndice;

            do {
                novoIndice = Math.floor(Math.random() * frases.length);
            } while (novoIndice === indiceAnterior && frases.length > 1);

            indiceAnterior = novoIndice;

            fraseTexto.style.opacity = "0";

            setTimeout(() => {
                fraseTexto.textContent = frases[novoIndice];
                fraseTexto.style.opacity = "1";
            }, 180);
        });
    }

    // Mensagem surpresa na seção de sonhos
    const sonhoBotao = document.querySelector("#sonhoBotao");
    const mensagemSonho = document.querySelector("#mensagemSonho");

    if (sonhoBotao && mensagemSonho) {
        sonhoBotao.addEventListener("click", () => {
            const escondida = mensagemSonho.hidden;

            mensagemSonho.hidden = !escondida;

            sonhoBotao.textContent = escondida
                ? "Esconder mensagem ♡"
                : "Descobrir uma mensagem ✨";

            if (escondida) {
                mensagemSonho.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        });
    }

    // Ano automático no rodapé
    const ano = document.querySelector("#ano");

    if (ano) {
        ano.textContent = `© ${new Date().getFullYear()}`;
    }

    // Animação suave ao aparecer na tela
    const elementos = document.querySelectorAll(
        ".cartao, .sobre-conteudo, .sonho-item, .frase-card"
    );

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("animar");
                    observer.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementos.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementos.forEach((elemento) => {
            elemento.classList.add("animar");
        });
    }
});
/* =====================================================
   🕷️ HOMEM-ARANHA — JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       🕸️ LANÇAR TEIA
       ================================================= */

    const botaoTeia = document.querySelector(".primary");

    if (botaoTeia) {
        botaoTeia.addEventListener("click", lancarTeia);
    }

    function lancarTeia() {

        const teia = document.createElement("div");

        teia.className = "web";

        // Posição inicial
        teia.style.left = "50%";
        teia.style.top = "40%";

        document.body.appendChild(teia);

        // Ativa a animação
        requestAnimationFrame(() => {
            teia.classList.add("active");
        });

        // Som visual de disparo
        criarParticulas(
            window.innerWidth / 2,
            window.innerHeight * 0.4,
            12
        );

        setTimeout(() => {
            teia.remove();
        }, 900);
    }


    /* =================================================
       🕷️ BOTÃO CONHECER O HERÓI
       ================================================= */

    const botaoHeroi = document.querySelector(".secondary");

    if (botaoHeroi) {
        botaoHeroi.addEventListener("click", () => {

            mostrarMensagem(
                "🕷️ EU SOU O SPIDER HERO!",
                "Grandes poderes trazem grandes responsabilidades. " +
                "Minha missão é proteger a cidade e ajudar quem precisa!"
            );

        });
    }


    /* =================================================
       ⚡ SENTIDO-ARANHA
       ================================================= */

    let sentidoAtivo = false;

    document.addEventListener("keydown", (event) => {

        if (
            event.key.toLowerCase() === "s" &&
            !sentidoAtivo
        ) {

            ativarSentidoAranha();

        }

    });


    function ativarSentidoAranha() {

        sentidoAtivo = true;

        document.body.classList.add("spider-sense");

        mostrarMensagem(
            "⚠️ SENTIDO-ARANHA!",
            "Perigo detectado! O sentido-aranha foi ativado."
        );

        criarAlertaVisual();

        setTimeout(() => {

            document.body.classList.remove("spider-sense");

            sentidoAtivo = false;

        }, 3000);
    }


    /* =================================================
       🕸️ PARTÍCULAS
       ================================================= */

    function criarParticulas(x, y, quantidade = 10) {

        for (let i = 0; i < quantidade; i++) {

            const particula =
                document.createElement("span");

            particula.className = "particle";

            particula.style.left = `${x}px`;
            particula.style.top = `${y}px`;

            const angulo =
                Math.random() * Math.PI * 2;

            const distancia =
                40 + Math.random() * 100;

            particula.style.setProperty(
                "--x",
                `${Math.cos(angulo) * distancia}px`
            );

            particula.style.setProperty(
                "--y",
                `${Math.sin(angulo) * distancia}px`
            );

            document.body.appendChild(particula);

            setTimeout(() => {
                particula.remove();
            }, 800);
        }
    }


    /* =================================================
       ⚠️ ALERTA VISUAL
       ================================================= */

    function criarAlertaVisual() {

        const alerta =
            document.createElement("div");

        alerta.className = "danger-alert";

        alerta.innerHTML = `
            <span>⚠️</span>
            <strong>PERIGO!</strong>
        `;

        document.body.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 2500);
    }


    /* =================================================
       💬 MENSAGEM PERSONALIZADA
       ================================================= */

    function mostrarMensagem(titulo, texto) {

        const caixa =
            document.createElement("div");

        caixa.className = "message-box";

        caixa.innerHTML = `
            <div class="message-content">

                <div class="message-icon">
                    🕷️
                </div>

                <h2>${titulo}</h2>

                <p>${texto}</p>

                <button class="close-message">
                    FECHAR
                </button>

            </div>
        `;

        document.body.appendChild(caixa);

        const fechar =
            caixa.querySelector(".close-message");

        fechar.addEventListener("click", () => {
            caixa.classList.add("closing");

            setTimeout(() => {
                caixa.remove();
            }, 300);
        });

        caixa.addEventListener("click", (event) => {

            if (event.target === caixa) {
                caixa.remove();
            }

        });
    }


    /* =================================================
       🕷️ EFEITO PARALLAX NA MÁSCARA
       ================================================= */

    const mascara =
        document.querySelector(".hero-art");

    if (mascara) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 20;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 20;

            mascara.style.transform =
                `translate(${x}px, ${y}px)`;
        });

        document.addEventListener("mouseleave", () => {

            mascara.style.transform =
                "translate(0, 0)";
        });
    }


    /* =================================================
       🕸️ ANIMAÇÃO AO ROLAR A PÁGINA
       ================================================= */

    const cards =
        document.querySelectorAll(".card");

    const observer =
        new IntersectionObserver(
            (elementos) => {

                elementos.forEach((elemento) => {

                    if (elemento.isIntersecting) {

                        elemento.target.classList.add(
                            "card-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.2
            }
        );

    cards.forEach((card) => {
        observer.observe(card);
    });


    /* =================================================
       🕷️ CLIQUE NOS CARDS
       ================================================= */

    cards.forEach((card) => {

        card.addEventListener("click", () => {

            const titulo =
                card.querySelector("h3")?.textContent ||
                "Habilidade";

            const texto =
                card.querySelector("p")?.textContent ||
                "Habilidade especial do herói.";

            mostrarMensagem(
                `🕷️ ${titulo}`,
                texto
            );

        });

    });


    /* =================================================
       🏙️ EFEITO DE DIGITAÇÃO NO TÍTULO
       ================================================= */

    const tag =
        document.querySelector(".tag");

    if (tag) {

        const textoOriginal =
            tag.textContent.trim();

        tag.textContent = "";

        let contador = 0;

        const escrever = () => {

            if (contador < textoOriginal.length) {

                tag.textContent +=
                    textoOriginal.charAt(contador);

                contador++;

                setTimeout(escrever, 80);
            }

        };

        escrever();
    }


    /* =================================================
       🕸️ CLIQUE EM QUALQUER LUGAR
       CRIA UMA PEQUENA TEIA
       ================================================= */

    document.addEventListener("click", (event) => {

        // Não cria partículas dentro de caixas
        if (
            event.target.closest(".message-box")
        ) {
            return;
        }

        criarParticulas(
            event.clientX,
            event.clientY,
            5
        );

    });

});


/* =====================================================
   🕷️ CSS DINÂMICO DO JAVASCRIPT
   ===================================================== */

const estiloJS = document.createElement("style");

estiloJS.textContent = `

/* Partículas */

.particle {
    position: fixed;

    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: white;

    pointer-events: none;

    z-index: 9999;

    box-shadow:
        0 0 10px white,
        0 0 20px #e50914;

    animation:
        particleMove .8s ease-out forwards;
}

@keyframes particleMove {

    from {
        transform:
            translate(-50%, -50%)
            scale(1);

        opacity: 1;
    }

    to {
        transform:
            translate(
                var(--x),
                var(--y)
            )
            scale(0);

        opacity: 0;
    }
}


/* Sentido-aranha */

.spider-sense {
    animation:
        dangerScreen .3s infinite alternate;
}

@keyframes dangerScreen {

    from {
        filter:
            saturate(1)
            brightness(1);
    }

    to {
        filter:
            saturate(1.5)
            brightness(1.2);
    }
}


/* Alerta */

.danger-alert {

    position: fixed;

    top: 30px;
    left: 50%;

    transform:
        translateX(-50%);

    z-index: 10000;

    display: flex;

    align-items: center;

    gap: 12px;

    padding:
        15px 30px;

    color: white;

    background:
        linear-gradient(
            135deg,
            #ff0000,
            #750000
        );

    border:
        2px solid white;

    border-radius: 8px;

    box-shadow:
        0 0 30px
        rgba(255,0,0,.8);

    animation:
        dangerAppear .3s ease,
        dangerPulse .5s infinite alternate;
}

.danger-alert span {
    font-size: 25px;
}

.danger-alert strong {
    font-size: 20px;
}

@keyframes dangerAppear {

    from {
        opacity: 0;
        transform:
            translate(-50%, -30px);
    }

    to {
        opacity: 1;
        transform:
            translate(-50%, 0);
    }
}

@keyframes dangerPulse {

    from {
        box-shadow:
            0 0 15px red;
    }

    to {
        box-shadow:
            0 0 45px red;
    }
}


/* Caixa de mensagem */

.message-box {

    position: fixed;

    inset: 0;

    z-index: 9998;

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 20px;

    background:
        rgba(0,0,0,.75);

    backdrop-filter:
        blur(8px);

    animation:
        fadeIn .25s ease;
}

.message-content {

    width: min(500px, 100%);

    padding: 40px;

    text-align: center;

    background:
        linear-gradient(
            145deg,
            #071a52,
            #050509
        );

    border:
        2px solid #e50914;

    border-radius: 15px;

    box-shadow:
        0 0 50px
        rgba(229,9,20,.5);

    animation:
        messageIn .35s ease;
}

.message-icon {

    font-size: 60px;

    margin-bottom: 15px;

    filter:
        drop-shadow(
            0 0 15px
            red
        );
}

.message-content h2 {

    color: #ff2933;

    margin-bottom: 15px;

    text-transform: uppercase;
}

.message-content p {

    color: #d4d9e8;

    line-height: 1.7;

    margin-bottom: 25px;
}

.close-message {

    color: white;

    background: #e50914;

    border: none;

    padding:
        12px 25px;

    border-radius: 5px;

    cursor: pointer;

    font-weight: bold;

    transition: .3s;
}

.close-message:hover {

    background: #ff3039;

    transform:
        translateY(-3px);

    box-shadow:
        0 0 20px
        rgba(255,0,0,.5);
}


/* Animação dos cards */

.card {

    opacity: 0;

    transform:
        translateY(40px);

    transition:
        opacity .7s ease,
        transform .7s ease,
        box-shadow .3s ease;
}

.card-visible {

    opacity: 1;

    transform:
        translateY(0);
}


/* Fechamento da caixa */

.message-box.closing {

    opacity: 0;

    transition:
        opacity .3s ease;
}


@keyframes fadeIn {

    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}


@keyframes messageIn {

    from {
        opacity: 0;

        transform:
            scale(.8)
            translateY(30px);
    }

    to {
        opacity: 1;

        transform:
            scale(1)
            translateY(0);
    }
}


/* Celular */

@media (max-width: 600px) {

    .message-content {
        padding: 30px 20px;
    }

    .danger-alert {
        width: 90%;

        justify-content: center;
    }
}

`;

document.head.appendChild(estiloJS);

// ==========================================
// HOMEM-ARANHA - JAVASCRIPT
// ==========================================

// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // BOTÕES "SEGUIR"
    // ======================================

    const botoesSeguir = document.querySelectorAll(".seguir");

    botoesSeguir.forEach((botao) => {

        botao.addEventListener("click", (evento) => {

            // Evita que o link seja aberto
            evento.preventDefault();

            if (botao.classList.contains("seguindo")) {

                botao.classList.remove("seguindo");

                botao.textContent = "Seguir";

                botao.style.background = "#e00000";

            } else {

                botao.classList.add("seguindo");

                botao.textContent = "✓ Seguindo";

                botao.style.background = "#174cff";

                criarTeia(botao);
            }

        });

    });


    // ======================================
    // EFEITO DE TEIA
    // ======================================

    function criarTeia(elemento) {

        const teia = document.createElement("div");

        teia.innerHTML = "🕸️";

        teia.style.position = "fixed";
        teia.style.left = "50%";
        teia.style.top = "50%";
        teia.style.fontSize = "45px";
        teia.style.zIndex = "9999";
        teia.style.pointerEvents = "none";

        document.body.appendChild(teia);

        teia.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },
                {
                    transform: "translate(-50%, -50%) scale(1.5)",
                    opacity: 1
                },
                {
                    transform: "translate(-50%, -50%) scale(3)",
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            teia.remove();
        }, 900);
    }


    // ======================================
    // FOTO DO HOMEM-ARANHA
    // ======================================

    const foto = document.querySelector(".foto");

    if (foto) {

        foto.addEventListener("click", () => {

            foto.classList.add("foto-animada");

            mostrarMensagem(
                "🕷️ O Homem-Aranha está pronto para a ação!"
            );

            setTimeout(() => {
                foto.classList.remove("foto-animada");
            }, 800);

        });

    }


    // ======================================
    // MENSAGEM NA TELA
    // ======================================

    function mostrarMensagem(texto) {

        const mensagem = document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.bottom = "30px";
        mensagem.style.left = "50%";
        mensagem.style.transform = "translateX(-50%)";

        mensagem.style.padding = "15px 25px";

        mensagem.style.background = "#e00000";
        mensagem.style.color = "#fff";

        mensagem.style.fontWeight = "bold";

        mensagem.style.borderRadius = "30px";

        mensagem.style.boxShadow =
            "0 0 25px rgba(255, 0, 0, .7)";

        mensagem.style.zIndex = "10000";

        document.body.appendChild(mensagem);

        mensagem.animate(
            [
                {
                    opacity: 0,
                    transform: "translate(-50%, 30px)"
                },
                {
                    opacity: 1,
                    transform: "translate(-50%, 0)"
                }
            ],
            {
                duration: 400,
                easing: "ease-out"
            }
        );

        setTimeout(() => {

            mensagem.animate(
                [
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    }
                ],
                {
                    duration: 400
                }
            );

            setTimeout(() => {
                mensagem.remove();
            }, 400);

        }, 2500);
    }


    // ======================================
    // EFEITO DE BALANÇO DA FOTO
    // ======================================

    if (foto) {

        foto.addEventListener("mouseenter", () => {

            foto.style.transform =
                "scale(1.05) rotate(2deg)";

        });

        foto.addEventListener("mouseleave", () => {

            foto.style.transform =
                "scale(1) rotate(0deg)";

        });

    }


    // ======================================
    // BOTÃO "VER MAIS"
    // ======================================

    const botaoVerMais = document.querySelector(
        'a[href="#sobre"]'
    );

    if (botaoVerMais) {

        botaoVerMais.addEventListener("click", () => {

            mostrarMensagem(
                "🕷️ Com grandes poderes vêm grandes responsabilidades!"
            );

        });

    }


    // ======================================
    // CONTADOR DE SEGUIDORES
    // ======================================

    let seguidores = 1250;

    const contador = document.querySelector(
        "#contador-seguidores"
    );

    if (contador) {

        contador.textContent =
            seguidores.toLocaleString("pt-BR");

    }


    botoesSeguir.forEach((botao) => {

        botao.addEventListener("click", () => {

            if (botao.classList.contains("seguindo")) {

                seguidores++;

            } else {

                seguidores--;

            }

            if (contador) {

                contador.textContent =
                    seguidores.toLocaleString("pt-BR");

            }

        });

    });


    // ======================================
    // TEIA AUTOMÁTICA NO FUNDO
    // ======================================

    function criarTeiaFundo() {

        const teia = document.createElement("div");

        teia.textContent = "🕸️";

        teia.style.position = "fixed";

        teia.style.left =
            Math.random() * 100 + "%";

        teia.style.top = "-50px";

        teia.style.fontSize =
            Math.random() * 25 + 20 + "px";

        teia.style.opacity = "0.4";

        teia.style.pointerEvents = "none";

        teia.style.zIndex = "0";

        document.body.appendChild(teia);

        teia.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 0
                },
                {
                    transform:
                        "translateY(50vh) rotate(180deg)",
                    opacity: 0.5
                },
                {
                    transform:
                        "translateY(110vh) rotate(360deg)",
                    opacity: 0
                }
            ],
            {
                duration:
                    Math.random() * 5000 + 5000,

                easing: "linear"
            }
        );

        setTimeout(() => {
            teia.remove();
        }, 10000);
    }


    // Cria uma nova teia periodicamente
    setInterval(criarTeiaFundo, 1800);


    // ======================================
    // MENSAGEM INICIAL
    // ======================================

    setTimeout(() => {

        mostrarMensagem(
            "🕷️ Bem-vindo ao mundo do Homem-Aranha!"
        );

    }, 1000);

});

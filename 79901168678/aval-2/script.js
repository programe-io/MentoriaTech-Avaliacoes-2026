// ==========================================
// MINECRAFT + BEN 10
// JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // BOTÃO "VER ALIENS"
    // ======================================

    const botao = document.querySelector(".botao");
    const aliens = document.querySelector("#aliens");

    if (botao && aliens) {

        botao.addEventListener("click", (event) => {

            event.preventDefault();

            aliens.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    // ======================================
    // CARDS DOS ALIENS
    // ======================================

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-12px) scale(1.03)";

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0) scale(1)";

        });


        // Clique no card

        card.addEventListener("click", () => {

            cards.forEach((outroCard) => {

                outroCard.classList.remove("ativo");

            });

            card.classList.add("ativo");

            card.style.borderColor = "#ffffff";

            setTimeout(() => {

                card.style.borderColor = "#39ff14";

            }, 1000);

        });

    });


    // ======================================
    // OMNITRIX
    // ======================================

    const omnitrix = document.querySelector(".relogio");
    const simbolo = document.querySelector(".simbolo");

    const aliensNomes = [
        "QUATRO BRAÇOS",
        "CHAMA",
        "XLR8",
        "DIAMANTE"
    ];

    let alienAtual = 0;


    if (omnitrix && simbolo) {

        omnitrix.addEventListener("click", () => {

            alienAtual++;

            if (alienAtual >= aliensNomes.length) {
                alienAtual = 0;
            }

            simbolo.textContent = alienAtual + 1;

            console.log(
                "🟢 Transformação:",
                aliensNomes[alienAtual]
            );

            mostrarMensagem(
                "🟢 Transformação: " +
                aliensNomes[alienAtual]
            );

        });

    }


    // ======================================
    // MENSAGEM NA TELA
    // ======================================

    function mostrarMensagem(texto) {

        const mensagem =
            document.createElement("div");

        mensagem.textContent = texto;

        mensagem.style.position = "fixed";
        mensagem.style.top = "30px";
        mensagem.style.left = "50%";
        mensagem.style.transform =
            "translateX(-50%)";

        mensagem.style.background = "#39ff14";
        mensagem.style.color = "#000";

        mensagem.style.padding =
            "15px 25px";

        mensagem.style.borderRadius = "8px";

        mensagem.style.fontWeight = "bold";

        mensagem.style.zIndex = "9999";

        mensagem.style.boxShadow =
            "0 0 25px #39ff14";

        document.body.appendChild(mensagem);


        setTimeout(() => {

            mensagem.style.opacity = "0";

            mensagem.style.transition =
                "opacity .5s";

            setTimeout(() => {
                mensagem.remove();
            }, 500);

        }, 2000);

    }


    // ======================================
    // EFEITO DE ENERGIA VERDE
    // ======================================

    document.addEventListener("click", (event) => {

        const energia =
            document.createElement("span");

        energia.textContent = "✦";

        energia.style.position = "fixed";

        energia.style.left =
            event.clientX + "px";

        energia.style.top =
            event.clientY + "px";

        energia.style.color =
            "#39ff14";

        energia.style.fontSize =
            "30px";

        energia.style.pointerEvents =
            "none";

        energia.style.zIndex =
            "9999";

        energia.style.textShadow =
            "0 0 15px #39ff14";

        energia.style.animation =
            "energiaClique 1s ease-out forwards";

        document.body.appendChild(energia);


        setTimeout(() => {
            energia.remove();
        }, 1000);

    });


    // ======================================
    // TROCA AUTOMÁTICA DAS IMAGENS
    // ======================================

    const imagens =
        document.querySelectorAll(".card img");

    const imagensMinecraft = [

        "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80"

    ];

    let imagemAtual = 0;


    if (imagens.length > 0) {

        setInterval(() => {

            imagemAtual++;

            if (
                imagemAtual >=
                imagensMinecraft.length
            ) {
                imagemAtual = 0;
            }


            imagens.forEach((imagem, index) => {

                imagem.style.opacity = "0";

                setTimeout(() => {

                    imagem.src =
                        imagensMinecraft[
                            (imagemAtual + index) %
                            imagensMinecraft.length
                        ];

                    imagem.style.opacity = "1";

                }, 300);

            });

        }, 5000);

    }


    // ======================================
    // EFEITO DE PARALLAX NO HEADER
    // ======================================

    const header =
        document.querySelector("header");

    if (header) {

        header.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 10;

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 10;

                header.style.backgroundPosition =
                    `${50 + x}% ${50 + y}%`;

            }
        );

    }


    // ======================================
    // CONSOLE
    // ======================================

    console.log(
        "🟢 BEN 10 + MINECRAFT"
    );

    console.log(
        "⛏️ Mundo carregado!"
    );

    console.log(
        "⌚ Omnitrix ativado!"
    );

});

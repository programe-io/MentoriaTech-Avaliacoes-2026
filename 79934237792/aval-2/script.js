// ==========================================
// HENRY DANGER - JAVASCRIPT
// ==========================================

// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // 1. BOTÃO "COMEÇAR AVENTURA"
    // ------------------------------------------

    const botao = document.querySelector(".botao");

    if (botao) {
        botao.addEventListener("click", () => {

            const personagens =
                document.querySelector("#personagens");

            if (personagens) {
                personagens.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }


    // ------------------------------------------
    // 2. MENSAGEM DE HENRY DANGER
    // ------------------------------------------

    const mensagens = [
        "⚡ Missão iniciada!",
        "🦸 Henry Danger está pronto!",
        "🚨 Alerta em Swellview!",
        "💥 Prepare-se para a aventura!",
        "⚡ Hora de salvar a cidade!"
    ];

    let numeroMensagem = 0;

    function mostrarMensagem() {

        console.log(
            "Henry Danger: " +
            mensagens[numeroMensagem]
        );

        numeroMensagem++;

        if (numeroMensagem >= mensagens.length) {
            numeroMensagem = 0;
        }
    }

    setInterval(mostrarMensagem, 5000);


    // ------------------------------------------
    // 3. EFEITO NAS IMAGENS
    // ------------------------------------------

    const imagens =
        document.querySelectorAll(".card img, .galeria img");

    imagens.forEach((imagem) => {

        imagem.addEventListener("click", () => {

            imagem.classList.toggle("imagem-destaque");

        });

    });


    // ------------------------------------------
    // 4. GALERIA DE HENRY DANGER
    // ------------------------------------------

    const imagensGaleria =
        document.querySelectorAll(".galeria img");

    imagensGaleria.forEach((imagem) => {

        imagem.addEventListener("click", () => {

            const fundo = document.createElement("div");

            fundo.className = "visualizador";

            const imagemGrande =
                document.createElement("img");

            imagemGrande.src = imagem.src;

            imagemGrande.alt = imagem.alt;

            fundo.appendChild(imagemGrande);

            document.body.appendChild(fundo);


            // Fechar ao clicar
            fundo.addEventListener("click", () => {
                fundo.remove();
            });

        });

    });


    // ------------------------------------------
    // 5. BOTÃO DE "PODERES"
    // ------------------------------------------

    const poderes =
        document.createElement("button");

    poderes.textContent =
        "⚡ ATIVAR MODO HENRY DANGER";

    poderes.className =
        "botao-poderes";

    document.body.appendChild(poderes);


    poderes.addEventListener("click", () => {

        document.body.classList.toggle(
            "modo-super-heroi"
        );

        if (
            document.body.classList.contains(
                "modo-super-heroi"
            )
        ) {

            poderes.textContent =
                "🔥 MODO SUPER-HERÓI ATIVADO!";

        } else {

            poderes.textContent =
                "⚡ ATIVAR MODO HENRY DANGER";

        }

    });


    // ------------------------------------------
    // 6. EFEITO DE FAÍSCAS
    // ------------------------------------------

    document.addEventListener("click", (evento) => {

        const faisca =
            document.createElement("span");

        faisca.className = "faisca";

        faisca.textContent = "⚡";

        faisca.style.left =
            evento.clientX + "px";

        faisca.style.top =
            evento.clientY + "px";

        document.body.appendChild(faisca);


        setTimeout(() => {
            faisca.remove();
        }, 800);

    });

});

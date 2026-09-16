// ======================================
// HOMEM-ARANHA - JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------
    // BOTÃO "EXPLORAR"
    // ----------------------------------

    const botao = document.querySelector(".botao");
    const personagens = document.querySelector("#personagens");

    if (botao && personagens) {
        botao.addEventListener("click", (event) => {
            event.preventDefault();

            personagens.scrollIntoView({
                behavior: "smooth"
            });
        });
    }


    // ----------------------------------
    // EFEITO NOS CARDS
    // ----------------------------------

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.style.transform =
                "translateY(-15px) scale(1.03)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "translateY(0) scale(1)";
        });

        // Clique no card
        card.addEventListener("click", () => {

            card.classList.toggle("selecionado");

            if (card.classList.contains("selecionado")) {
                card.style.borderColor = "#1769ff";
                card.style.boxShadow =
                    "0 0 25px #e50914, 0 0 40px #0645ff";
            } else {
                card.style.borderColor = "#e50914";
                card.style.boxShadow =
                    "0 0 15px rgba(229,9,20,.3)";
            }
        });
    });


    // ----------------------------------
    // EFEITO DE TEIA
    // ----------------------------------

    document.addEventListener("click", (event) => {

        const teia = document.createElement("div");

        teia.innerHTML = "🕸️";

        teia.style.position = "fixed";
        teia.style.left = event.clientX + "px";
        teia.style.top = event.clientY + "px";
        teia.style.fontSize = "30px";
        teia.style.pointerEvents = "none";
        teia.style.zIndex = "9999";

        teia.style.animation =
            "teiaExplodir 1s ease-out forwards";

        document.body.appendChild(teia);

        setTimeout(() => {
            teia.remove();
        }, 1000);
    });


    // ----------------------------------
    // TROCA AUTOMÁTICA DE IMAGENS
    // ----------------------------------

    const imagens = document.querySelectorAll(".card img");

    const imagensAranha = [
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80",

        "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80"
    ];

    let imagemAtual = 0;

    setInterval(() => {

        if (imagens.length === 0) return;

        imagemAtual++;

        if (imagemAtual >= imagensAranha.length) {
            imagemAtual = 0;
        }

        imagens.forEach((imagem, index) => {

            imagem.style.opacity = "0";

            setTimeout(() => {

                imagem.src =
                    imagensAranha[
                        (imagemAtual + index) %
                        imagensAranha.length
                    ];

                imagem.style.opacity = "1";

            }, 300);

        });

    }, 5000);


    // ----------------------------------
    // TÍTULO DINÂMICO
    // ----------------------------------

    const titulo = document.querySelector("header h1");

    if (titulo) {

        const textoOriginal = titulo.textContent;

        titulo.textContent = "";

        let letra = 0;

        function escreverTitulo() {

            if (letra < textoOriginal.length) {

                titulo.textContent +=
                    textoOriginal.charAt(letra);

                letra++;

                setTimeout(escreverTitulo, 100);
            }
        }

        escreverTitulo();
    }


    // ----------------------------------
    // EFEITO DE MOVIMENTO DO MOUSE
    // ----------------------------------

    const header = document.querySelector("header");

    if (header) {

        header.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 20;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 20;

            header.style.backgroundPosition =
                `${50 + x}% ${50 + y}%`;
        });
    }


    // ----------------------------------
    // MENSAGEM DO HERÓI
    // ----------------------------------

    setTimeout(() => {

        console.log(
            "🕷️ Com grandes poderes vêm grandes responsabilidades!"
        );

    }, 1000);

});

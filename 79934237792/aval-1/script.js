/* =====================================
   HOMEM-ARANHA - JAVASCRIPT
   ===================================== */

// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // EFEITO DE TEIA AO CLICAR
    // =====================================

    document.addEventListener("click", (event) => {

        const teia = document.createElement("div");

        teia.innerHTML = "🕸️";

        teia.style.position = "fixed";
        teia.style.left = event.clientX + "px";
        teia.style.top = event.clientY + "px";
        teia.style.fontSize = "35px";
        teia.style.pointerEvents = "none";
        teia.style.zIndex = "9999";
        teia.style.transform = "translate(-50%, -50%) scale(0)";
        teia.style.transition = "all 0.7s ease";

        document.body.appendChild(teia);

        setTimeout(() => {
            teia.style.transform =
                "translate(-50%, -50%) scale(1.5)";
            teia.style.opacity = "0";
        }, 50);

        setTimeout(() => {
            teia.remove();
        }, 800);
    });


    // =====================================
    // ANIMAÇÃO DOS CARDS
    // =====================================

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";

        setTimeout(() => {
            card.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 250);
    });


    // =====================================
    // EFEITO NAS IMAGENS
    // =====================================

    const imagens = document.querySelectorAll(".card img");

    imagens.forEach((imagem) => {

        imagem.addEventListener("click", () => {

            imagem.classList.toggle("imagem-grande");

        });

    });


    // =====================================
    // TROCA AUTOMÁTICA DE IMAGENS
    // =====================================

    const imagensAranha = [
        "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=1000&q=80",

        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",

        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
    ];

    let imagemAtual = 0;

    const imagemPrincipal =
        document.querySelector("header");

    if (imagemPrincipal) {

        setInterval(() => {

            imagemAtual++;

            if (imagemAtual >= imagensAranha.length) {
                imagemAtual = 0;
            }

            imagemPrincipal.style.backgroundImage =
                `linear-gradient(
                    rgba(0,0,0,.45),
                    rgba(0,0,0,.7)
                ),
                url("${imagensAranha[imagemAtual]}")`;

        }, 5000);
    }


    // =====================================
    // BOTÃO DO HERÓI
    // =====================================

    const botao = document.querySelector(".botao");

    if (botao) {

        botao.addEventListener("click", () => {

            const destino =
                document.querySelector("#personagens");

            if (destino) {

                destino.scrollIntoView({
                    behavior: "smooth"
                });

            }
        });
    }


    // =====================================
    // MENSAGEM DO HOMEM-ARANHA
    // =====================================

    const mensagem = document.createElement("div");

    mensagem.innerText =
        "🕷️ Com grandes poderes vêm grandes responsabilidades!";

    mensagem.style.position = "fixed";
    mensagem.style.bottom = "25px";
    mensagem.style.left = "50%";
    mensagem.style.transform =
        "translateX(-50%)";

    mensagem.style.background =
        "linear-gradient(90deg, #d90416, #071a70)";

    mensagem.style.color = "#fff";
    mensagem.style.padding = "14px 22px";
    mensagem.style.borderRadius = "10px";

    mensagem.style.fontWeight = "bold";
    mensagem.style.boxShadow =
        "0 0 20px rgba(255,0,0,.6)";

    mensagem.style.zIndex = "9998";

    document.body.appendChild(mensagem);


    // Esconde a mensagem depois de alguns segundos

    setTimeout(() => {

        mensagem.style.transition =
            "opacity .5s ease";

        mensagem.style.opacity = "0";

        setTimeout(() => {
            mensagem.remove();
        }, 500);

    }, 5000);

});

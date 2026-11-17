// ==========================================
// 1. INICIALIZAÇÃO DO JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript carregado com sucesso!");

    // ==========================================
    // 2. MENU DE NAVEGAÇÃO
    // ==========================================

    const menuLinks = document.querySelectorAll("nav a");

    const sobre = document.querySelector("aside");
    const galeria = document.querySelector("aside h3");
    const produto = document.querySelector("article");

    // Define os destinos dos links do menu
    const destinos = [sobre, galeria, produto];

    menuLinks.forEach(function (link, indice) {

        if (destinos[indice]) {

            const id = ["sobre", "galeria", "produto"][indice];

            destinos[indice].id = id;
            link.href = "#" + id;

        }

    });


    // ==========================================
    // 3. GALERIA DE IMAGENS INTERATIVA
    // ==========================================

    const imagens = document.querySelectorAll(".fakeimage img");

    // Cria a janela de visualização
    const modal = document.createElement("div");

    modal.id = "modal-imagem";

    modal.innerHTML = `
        <span id="fechar-modal">&times;</span>
        <img id="imagem-ampliada" src="" alt="">
        <p id="legenda-imagem"></p>
    `;

    document.body.appendChild(modal);


    // Estilização da janela de visualização
    const estilo = document.createElement("style");

    estilo.textContent = `
        #modal-imagem {
            display: none;
            position: fixed;
            z-index: 9999;
            inset: 0;
            background: rgba(0, 0, 0, 0.9);
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 20px;
        }

        #imagem-ampliada {
            max-width: 85%;
            max-height: 75vh;
            border-radius: 10px;
        }

        #fechar-modal {
            position: absolute;
            top: 20px;
            right: 35px;
            color: white;
            font-size: 45px;
            cursor: pointer;
        }

        #legenda-imagem {
            color: white;
            margin-top: 15px;
        }
    `;

    document.head.appendChild(estilo);


    // Adiciona o evento de clique em cada imagem
    imagens.forEach(function (imagem) {

        imagem.style.cursor = "pointer";

        imagem.addEventListener("click", function () {

            const imagemAmpliada =
                document.querySelector("#imagem-ampliada");

            const legenda =
                document.querySelector("#legenda-imagem");

            imagemAmpliada.src = imagem.src;
            imagemAmpliada.alt = imagem.alt;

            legenda.textContent = imagem.alt;

            modal.style.display = "flex";

        });

    });


    // ==========================================
    // 4. FECHAR A IMAGEM AMPLIADA
    // ==========================================

    const fechar = document.querySelector("#fechar-modal");

    fechar.addEventListener("click", function () {

        modal.style.display = "none";

    });


    // Fecha quando clicar fora da imagem
    modal.addEventListener("click", function (evento) {

        if (evento.target === modal) {

            modal.style.display = "none";

        }

    });


    // Fecha ao pressionar a tecla ESC
    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            modal.style.display = "none";

        }

    });


    // ==========================================
    // 5. ATUALIZAÇÃO AUTOMÁTICA DO RODAPÉ
    // ==========================================

    const rodape = document.querySelector("footer p");

    if (rodape) {

        rodape.textContent =
            rodape.textContent.replace(
                /\d{4}/,
                new Date().getFullYear()
            );

    }

});

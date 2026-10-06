/* ================= POST ALISSON E FABRÍCIA ================= */

.avatar.casal {
    background: linear-gradient(
        135deg,
        #ff4f81,
        #9c27b0
    );

    font-size: 20px;
}


.casal-post {
    border: 2px solid #ffd1df;
}


.foto-casal {
    height: 300px;

    background:
        radial-gradient(
            circle at 20% 20%,
            #ffffff55 0 5px,
            transparent 6px
        ),
        linear-gradient(
            135deg,
            #ff6f9c,
            #b94cff
        );

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    color: white;

    text-align: center;

    position: relative;

    overflow: hidden;
}


.foto-casal::before,
.foto-casal::after {
    content: "♥";

    position: absolute;

    color: #ffffff44;

    font-size: 100px;
}


.foto-casal::before {
    left: -15px;
    top: 20px;
}


.foto-casal::after {
    right: -15px;
    bottom: 10px;
}


.coracoes {
    font-size: 35px;

    margin-bottom: 18px;

    animation: coracao 1.5s infinite;
}


.nomes-casal {
    font-size: 32px;

    font-weight: bold;

    text-shadow:
        0 3px 10px #0003;

    z-index: 2;
}


.nomes-casal span {
    color: #ffdae7;

    margin: 0 8px;
}


.frase-casal {
    margin-top: 15px;

    font-size: 15px;

    font-style: italic;

    max-width: 400px;

    z-index: 2;
}


@keyframes coracao {

    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1);
    }

}


.casal-post .acoes-post button:hover {
    color: #e83e70;

    background: #fff0f5;

    /* ================= ALISSON E FABRÍCIA ================= */

function curtirCasal(botao) {

    const post =
        botao.closest(".casal-post");

    const numero =
        post.querySelector(".numero-curtidas");

    let curtidas =
        parseInt(numero.innerText);


    if (botao.dataset.curtido !== "true") {

        curtidas++;

        botao.dataset.curtido = "true";

        botao.innerHTML = "♥ Curtido";

        botao.style.color = "#ef476f";

        mostrarMensagem(
            "Você curtiu o post do Alisson e da Fabrícia! ❤️"
        );

    } else {

        curtidas--;

        botao.dataset.curtido = "false";

        botao.innerHTML = "♡ Curtir";

        botao.style.color = "";

    }


    numero.innerText = curtidas;

    post.dataset.curtidas = curtidas;
}


function compartilharCasal() {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard.writeText(
            "Alisson e Fabrícia — Pintado à venda 🐟"
        );

    }

    mostrarMensagem(
        "Publicação do pintado compartilhada! 🐟💙"
    );
}


function mostrarMensagem(texto) {

    const mensagem =
        document.createElement("div");

    mensagem.className =
        "mensagem-temporaria";

    mensagem.innerText =
        texto;

    document.body.appendChild(mensagem);

    setTimeout(function() {

        mensagem.classList.add("mostrar");

    }, 50);

    setTimeout(function() {

        mensagem.classList.remove("mostrar");

        setTimeout(function() {

            mensagem.remove();

        }, 300);

    }, 2500);
}

}

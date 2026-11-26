
/* Curtir e descurtir publicações */
const botoesCurtir = document.querySelectorAll(".like-button");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", () => {
        const postagem = botao.closest(".post-card");
        const contador = postagem.querySelector(".likes-count");

        let curtidas = Number(
            contador.textContent.replace(/\D/g, "")
        );

        if (botao.classList.contains("liked")) {
            botao.classList.remove("liked");
            curtidas--;
        } else {
            botao.classList.add("liked");
            curtidas++;
        }

        contador.textContent = curtidas.toLocaleString("pt-BR") + " curtidas";
    });
});

/* Seguir e deixar de seguir */
const botoesSeguir = document.querySelectorAll(".follow-button");

botoesSeguir.forEach((botao) => {
    botao.addEventListener("click", () => {
        if (botao.textContent.trim() === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#737373";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#3b82f6";
        }
    });
});

/* Pesquisa de publicações */
const campoBusca = document.getElementById("campoBusca");

campoBusca.addEventListener("input", () => {
    const termo = campoBusca.value.toLowerCase();
    const postagens = document.querySelectorAll(".post-card");

    postagens.forEach((postagem) => {
        const texto = postagem.textContent.toLowerCase();

        postagem.style.display = texto.includes(termo)
            ? "block"
            : "none";
    });
});

/* Abrir campo de comentário */
const botoesComentario = document.querySelectorAll(".comment-button");

botoesComentario.forEach((botao) => {
    botao.addEventListener("click", () => {
        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            alert("Comentário registrado: " + comentario);
        }
    });
});

/* Botão de nova publicação */
const botaoNovaPublicacao = document.querySelector(
    'button[aria-label="Nova publicação"]'
);

if (botaoNovaPublicacao) {
    botaoNovaPublicacao.addEventListener("click", () => {
        const texto = prompt("O que você deseja publicar?");

        if (texto && texto.trim() !== "") {
            alert("Sua publicação foi criada!");
        }
    });
}

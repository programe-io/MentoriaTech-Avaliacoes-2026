
/* =====================================
   FIEL FEED - GUSTAVO 🖤🤍
   Funcionalidades do Mini Feed
===================================== */

// Elementos principais
const feed = document.getElementById("feed");
const publicarButton = document.querySelector(".new-post button");
const campoPublicacao = document.querySelector(
    ".new-post .user span"
);

// Criar área de texto para nova publicação
const textarea = document.createElement("textarea");

textarea.placeholder = "O que você pensa do Timão, Gustavo?";
textarea.className = "publication-input";
textarea.setAttribute("aria-label", "Texto da publicação");

document.querySelector(".new-post .user").appendChild(textarea);

// Atualizar texto auxiliar
campoPublicacao.textContent = "Compartilhe sua paixão pelo Timão!";

// Publicar uma nova postagem
publicarButton.addEventListener("click", function () {
    const texto = textarea.value.trim();

    if (texto === "") {
        alert("Gustavo, escreva algo sobre o Corinthians primeiro! 🖤🤍");
        textarea.focus();
        return;
    }

    const artigo = document.createElement("article");
    artigo.className = "post";

    // Cabeçalho da publicação
    const cabecalho = document.createElement("div");
    cabecalho.className = "user";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "G";

    const informacoes = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Gustavo";

    const tempo = document.createElement("span");
    tempo.textContent = "Agora mesmo";

    informacoes.append(nome, tempo);
    cabecalho.append(avatar, informacoes);

    // Texto da publicação
    const paragrafo = document.createElement("p");
    paragrafo.className = "post-text";
    paragrafo.textContent = texto;

    // Hashtag do Corinthians
    const hashtag = document.createElement("strong");
    hashtag.className = "hashtag";
    hashtag.textContent = "#VaiCorinthians 🖤🤍";

    // Ações
    const acoes = document.createElement("div");
    acoes.className = "actions";

    const curtir = document.createElement("button");
    curtir.type = "button";
    curtir.className = "like-button";
    curtir.textContent = "🖤 Curtir (0)";
    curtir.dataset.likes = "0";

    const comentar = document.createElement("button");
    comentar.type = "button";
    comentar.textContent = "💬 Comentar";

    acoes.append(curtir, comentar);

    // Área de comentários
    const areaComentarios = document.createElement("div");
    areaComentarios.className = "comments";

    artigo.append(
        cabecalho,
        paragrafo,
        hashtag,
        acoes,
        areaComentarios
    );

    // Mostrar a nova publicação no início do feed
    feed.prepend(artigo);

    // Limpar o campo
    textarea.value = "";

    alert("Publicação criada, Gustavo! Vai, Corinthians! 🦅");
});

// Curtir e comentar publicações
feed.addEventListener("click", function (event) {
    const botao = event.target.closest("button");

    if (!botao) return;

    // Sistema de curtidas
    if (botao.classList.contains("like-button")) {
        const curtidas = Number(botao.dataset.likes || 0);
        const curtiu = botao.dataset.liked === "true";

        const novoTotal = curtiu ? curtidas - 1 : curtidas + 1;

        botao.dataset.likes = String(novoTotal);
        botao.dataset.liked = String(!curtiu);

        botao.textContent = curtiu
            ? `🖤 Curtir (${novoTotal})`
            : `❤️ Curtido (${novoTotal})`;

        return;
    }

    // Sistema de comentários
    if (botao.textContent.includes("Comentar")) {
        const postagem = botao.closest(".post");
        const comentarios = postagem.querySelector(".comments");

        // Criar os campos uma única vez
        if (!comentarios.querySelector("form")) {
            const formulario = document.createElement("form");
            formulario.className = "comment-form";

            const entrada = document.createElement("input");
            entrada.type = "text";
            entrada.placeholder = "Escreva seu comentário...";
            entrada.maxLength = 300;
            entrada.required = true;

            const enviar = document.createElement("button");
            enviar.type = "submit";
            enviar.textContent = "Enviar";

            formulario.append(entrada, enviar);
            comentarios.appendChild(formulario);

            formulario.addEventListener("submit", function (e) {
                e.preventDefault();

                const texto = entrada.value.trim();

                if (!texto) return;

                const comentario = document.createElement("p");
                comentario.className = "comment-item";

                const autor = document.createElement("strong");
                autor.textContent = "Gustavo: ";

                const mensagem = document.createElement("span");
                mensagem.textContent = texto;

                comentario.append(autor, mensagem);

                formulario.after(comentario);
                entrada.value = "";
            });
        }

        comentarios.querySelector("input").focus();
    }
});

// Preparar as publicações que já estão no HTML
document.querySelectorAll("#feed .post").forEach(function (post) {
    const acoes = post.querySelector(".actions");

    if (!acoes) return;

    // Adicionar contador de curtidas
    const curtir = acoes.querySelector("button:first-child");

    if (curtir) {
        curtir.classList.add("like-button");
        curtir.dataset.likes = "0";
        curtir.dataset.liked = "false";
        curtir.textContent = "🖤 Curtir (0)";
    }

    // Área para os comentários
    if (!post.querySelector(".comments")) {
        const comentarios = document.createElement("div");
        comentarios.className = "comments";
        post.appendChild(comentarios);
    }
});

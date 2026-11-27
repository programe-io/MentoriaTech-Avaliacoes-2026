
const feed = document.getElementById("feedPublicacoes");
const campoLegenda = document.getElementById("legenda");

// PUBLICAR
document.getElementById("btnPublicar").addEventListener("click", publicar);

function publicar() {
    const texto = campoLegenda.value.trim();

    if (!texto) {
        alert("Digite uma mensagem antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "👤";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const nome = document.createElement("strong");
    nome.textContent = "Minha publicação";

    const data = document.createElement("small");
    data.textContent = "Agora";

    usuario.append(nome, data);
    cabecalho.append(avatar, usuario);

    const legenda = document.createElement("p");
    legenda.className = "legenda-post";
    legenda.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtir = document.createElement("button");
    curtir.textContent = "♡";
    curtir.setAttribute("aria-label", "Curtir");

    const comentar = document.createElement("button");
    comentar.textContent = "▢";
    comentar.setAttribute("aria-label", "Comentar");

    const compartilhar = document.createElement("button");
    compartilhar.textContent = "➤";
    compartilhar.setAttribute("aria-label", "Compartilhar");

    acoes.append(curtir, comentar, compartilhar);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const aviso = document.createElement("small");
    aviso.className = "ver-comentarios";
    aviso.textContent = "Seja o primeiro a comentar";

    const area = document.createElement("div");
    area.className = "comentar-area";

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";

    const enviar = document.createElement("button");
    enviar.className = "enviar-comentario";
    enviar.textContent = "Enviar";

    area.append(input, enviar);

    post.append(
        cabecalho,
        legenda,
        acoes,
        likes,
        comentarios,
        aviso,
        area
    );

    feed.prepend(post);
    campoLegenda.value = "";
    campoLegenda.focus();
}

// EVENTOS DOS POSTS
document.addEventListener("click", function(event) {

    const botao = event.target;

    // CURTIR
    if (botao.classList.contains("like-button") ||
        (botao.closest(".post") &&
         botao.closest(".post").contains(botao) &&
         botao.textContent === "♡" &&
         botao.parentElement.classList.contains("post-actions"))) {

        const post = botao.closest(".post");
        const contador = post.querySelector(".likes");

        let total = Number(contador.dataset.total || 0);

        if (botao.dataset.curtido === "sim") {
            total--;
            botao.dataset.curtido = "nao";
            botao.textContent = "♡";
        } else {
            total++;
            botao.dataset.curtido = "sim";
            botao.textContent = "❤️";
        }

        contador.dataset.total = total;
        contador.textContent = total + " curtidas";
    }

    // ENVIAR COMENTÁRIO
    if (botao.classList.contains("enviar-comentario")) {

        const post = botao.closest(".post");
        const input = post.querySelector(".comentar-area input");
        const area = post.querySelector(".comentarios");

        const mensagem = input.value.trim();

        if (!mensagem) {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + mensagem;

        area.appendChild(novoComentario);
        input.value = "";
    }

    // COMPARTILHAR
    if (botao.classList.contains("share-button")) {
        compartilhar();
    }
});

// COMPARTILHAMENTO
function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "PRFgram",
            text: "Confira esta publicação do PRFgram!"
        }).catch(() => {});
    } else {
        alert("Seu navegador não oferece compartilhamento nativo.");
    }
}

console.log("PRFgram Dark Mode iniciado!");

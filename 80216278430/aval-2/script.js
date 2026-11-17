
function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.total || 0);

    if (botao.dataset.curtido === "true") {
        quantidade--;
        botao.dataset.curtido = "false";
        botao.innerHTML = "♡ Curtir";
    } else {
        quantidade++;
        botao.dataset.curtido = "true";
        botao.innerHTML = "❤️ Curtido";
    }

    likes.dataset.total = quantidade;
    likes.textContent = quantidade + " curtidas";
}

function comentar(botao) {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim()) {
        const post = botao.closest(".post");
        const novoComentario = document.createElement("p");

        novoComentario.textContent = "@nunis: " + comentario;
        post.appendChild(novoComentario);
    }
}

function publicar() {
    const legenda = document.getElementById("legenda").value;
    const foto = document.getElementById("foto").value;

    if (!legenda.trim() || !foto.trim()) {
        alert("Preencha a legenda e o link da foto!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "@nunis";

    const imagem = document.createElement("img");
    imagem.src = foto;
    imagem.alt = "Publicação de nunis";

    const texto = document.createElement("p");
    texto.textContent = legenda;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ Curtir";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    acoes.append(botaoCurtir, botaoComentar);
    post.append(titulo, imagem, acoes, likes, texto);

    document.getElementById("feed").prepend(post);

    const contador = document.getElementById("postCount");
    contador.textContent = Number(contador.textContent) + 1;

    document.getElementById("legenda").value = "";
    document.getElementById("foto").value = "";
}

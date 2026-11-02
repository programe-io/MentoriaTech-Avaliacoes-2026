// CURTIDAS
document.querySelectorAll(".curtir").forEach(function(botao) {
    botao.addEventListener("click", function() {
        const post = botao.closest(".post");
        const likes = post.querySelector(".likes");

        let quantidade = Number(likes.dataset.total || 120);

        if (botao.classList.toggle("ativo")) {
            quantidade++;
            botao.textContent = "♥";
            botao.style.color = "red";
        } else {
            quantidade--;
            botao.textContent = "♡";
            botao.style.color = "";
        }

        likes.dataset.total = quantidade;
        likes.textContent = quantidade + " curtidas";
    });
});

// COMENTÁRIOS
function comentar(botao) {
    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim()) {
        const post = botao.closest(".post");
        const area = post.querySelector(".comentarios");

        const comentario = document.createElement("p");
        comentario.textContent = "Você: " + texto;

        area.appendChild(comentario);
    }
}

// COMPARTILHAMENTO
function compartilhar() {
    alert("Compartilhe esta publicação com seus amigos!");
}

// SEGUIR USUÁRIOS
document.querySelectorAll(".seguir").forEach(function(botao) {
    botao.addEventListener("click", function() {
        botao.textContent =
            botao.textContent === "Seguir" ? "Seguindo" : "Seguir";
    });
});

// CRIAR PUBLICAÇÃO
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !legenda || !imagem) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error();
        }

        const post = document.createElement("article");
        post.className = "post";

        const usuario = document.createElement("div");
        usuario.className = "usuario";

        const titulo = document.createElement("strong");
        titulo.textContent = nome;

        usuario.appendChild(titulo);

        const foto = document.createElement("img");
        foto.className = "foto";
        foto.src = url.href;
        foto.alt = "Foto publicada por " + nome;

        const legendaPost = document.createElement("p");
        const nomeUsuario = document.createElement("strong");
        nomeUsuario.textContent = nome + " ";
        legendaPost.append(nomeUsuario, legenda);

        const curtida = document.createElement("button");
        curtida.className = "curtir";
        curtida.textContent = "♡";

        const acoes = document.createElement("div");
        acoes.className = "acoes";
        acoes.appendChild(curtida);

        const likes = document.createElement("p");
        likes.className = "likes";
        likes.textContent = "0 curtidas";
        likes.dataset.total = "0";

        const comentarios = document.createElement("p");
        comentarios.className = "comentarios";

        const botaoComentario = document.createElement("button");
        botaoComentario.textContent = "💬";
        botaoComentario.addEventListener("click", function() {
            comentar(botaoComentario);
        });

        const botaoCompartilhar = document.createElement("button");
        botaoCompartilhar.textContent = "➤";
        botaoCompartilhar.addEventListener("click", compartilhar);

        acoes.append(botaoComentario, botaoCompartilhar);

        post.append(usuario, foto, acoes, likes, legendaPost, comentarios);

        const feed = document.getElementById("feed");
        feed.prepend(post);

        // Ativa a curtida da nova publicação
        curtida.addEventListener("click", function() {
            let total = Number(likes.dataset.total);

            if (curtida.classList.toggle("ativo")) {
                total++;
                curtida.textContent = "♥";
                curtida.style.color = "red";
            } else {
                total--;
                curtida.textContent = "♡";
                curtida.style.color = "";
            }

            likes.dataset.total = total;
            likes.textContent = total + " curtidas";
        });

        document.getElementById("nome").value = "";
        document.getElementById("legenda").value = "";
        document.getElementById("imagem").value = "";

        alert("Publicação criada!");

    } catch (erro) {
        alert("Digite um link de imagem válido!");
    }
}

// PESQUISA
document.getElementById("pesquisa").addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(function(post) {
        post.style.display = post.textContent
            .toLowerCase()
            .includes(busca) ? "block" : "none";
    });
});
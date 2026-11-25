
// Sistema de curtidas

function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.split(" ")[0]
    );

    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "♡";
        quantidade--;
    } else {
        botao.classList.add("curtido");
        botao.textContent = "♥";
        quantidade++;
    }

    likes.textContent = quantidade + " curtidas";
}

// Sistema de comentários

function comentar(botao) {
    const post = botao.closest(".post");

    const texto = prompt("Digite seu comentário:");

    if (!texto || !texto.trim()) return;

    const area = post.querySelector(".comentarios");

    const novoComentario = document.createElement("p");
    novoComentario.textContent = "💬 " + texto.trim();

    area.appendChild(novoComentario);
}

// Criar publicação

function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (!usuario || !legenda) {
        alert("Preencha o usuário e a legenda!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const nome = document.createElement("strong");
    nome.textContent = usuario;

    topo.append(avatar, nome);

    post.appendChild(topo);

    if (foto) {
        try {
            const url = new URL(foto);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const imagem = document.createElement("img");
            imagem.className = "foto-post";
            imagem.src = url.href;
            imagem.alt = "Foto publicada";
            post.appendChild(imagem);

        } catch {
            alert("Digite uma URL de imagem válida!");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "♧";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    acoes.append(botaoCurtir, botaoComentar);
    post.appendChild(acoes);

    const descricao = document.createElement("div");
    descricao.className = "descricao";

    const likes = document.createElement("strong");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const legendaTexto = document.createElement("p");
    legendaTexto.textContent = usuario + " " + legenda;

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    descricao.append(likes, legendaTexto, comentarios);
    post.appendChild(descricao);

    document.getElementById("feed").prepend(post);

    document.getElementById("usuario").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("foto").value = "";
}

// Pesquisa de usuários e publicações

document.getElementById("pesquisa").addEventListener("input", function() {
    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(pesquisa)
            ? "block"
            : "none";
    });
});

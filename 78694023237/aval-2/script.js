
function curtir(botao) {
    let post = botao.closest(".post");
    let curtidas = post.querySelector(".curtidas");

    let numero = parseInt(
        curtidas.textContent.match(/\d+/)[0]
    );

    if (botao.textContent === "🤍") {
        botao.textContent = "❤️";
        numero++;
    } else {
        botao.textContent = "🤍";
        numero--;
    }

    curtidas.textContent = "❤️ " + numero + " curtidas";
}

function comentar(botao) {
    let post = botao.closest(".post");
    let area = post.querySelector(".comentarios");

    let campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    let enviar = document.createElement("button");
    enviar.textContent = "Enviar";

    enviar.onclick = function() {
        if (campo.value.trim() === "") {
            alert("Digite um comentário!");
            return;
        }

        let comentario = document.createElement("p");
        comentario.textContent = "Você: " + campo.value;

        area.appendChild(comentario);
        campo.remove();
        enviar.remove();
    };

    area.appendChild(campo);
    area.appendChild(enviar);
    campo.focus();
}

function mostrarCriacao() {
    let criacao = document.getElementById("criacao");
    criacao.hidden = !criacao.hidden;
}

function publicar() {
    let legenda = document.getElementById("legenda").value;
    let imagem = document.getElementById("imagem").value;

    if (!legenda.trim() || !imagem.trim()) {
        alert("Preencha a legenda e o link da imagem!");
        return;
    }

    try {
        let url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite um link de imagem válido!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("article");
    post.className = "post";

    let cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    let avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Seu perfil";

    let nome = document.createElement("strong");
    nome.textContent = "Maria";

    cabecalho.append(avatar, nome);

    let foto = document.createElement("img");
    foto.className = "foto-post";
    foto.src = imagem;
    foto.alt = "Nova publicação";

    let acoes = document.createElement("div");
    acoes.className = "acoes";

    let curtirBtn = document.createElement("button");
    curtirBtn.textContent = "🤍";
    curtirBtn.onclick = function() {
        curtir(curtirBtn);
    };

    let comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬";
    comentarBtn.onclick = function() {
        comentar(comentarBtn);
    };

    acoes.append(curtirBtn, comentarBtn);

    let likes = document.createElement("p");
    likes.className = "curtidas";
    likes.textContent = "❤️ 0 curtidas";

    let texto = document.createElement("p");
    let destaque = document.createElement("strong");
    destaque.textContent = "maria ";
    texto.append(destaque, document.createTextNode(legenda));

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(
        cabecalho, foto, acoes, likes, texto, comentarios
    );

    feed.prepend(post);

    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("criacao").hidden = true;

    alert("Publicação criada com sucesso!");
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let busca = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        let conteudo = post.textContent.toLowerCase();
        post.style.display = conteudo.includes(busca) ? "" : "none";
    });
});


// Função para criar uma publicação
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(mensagem);

    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            const foto = document.createElement("img");
            foto.src = url.href;
            foto.alt = "Imagem da publicação";

            foto.onerror = function () {
                foto.remove();
            };

            post.appendChild(foto);
        } catch {
            alert("Digite uma URL de imagem válida!");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
    curtirBtn.onclick = function () {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function () {
        comentar(this);
    };

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "🔗 Compartilhar";
    compartilharBtn.onclick = function () {
        compartilhar(this);
    };

    acoes.append(curtirBtn, comentarBtn, compartilharBtn);
    post.appendChild(acoes);

    const feed = document.getElementById("postagens");
    feed.prepend(post);

    // Limpar os campos
    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";

    alert("Publicação realizada com sucesso!");
}

// Função Curtir
function curtir(botao) {
    const contador = botao.querySelector("span");
    let quantidade = Number(contador.textContent);

    quantidade++;

    contador.textContent = quantidade;
}

// Função Comentar
function comentar(botao) {
    const post = botao.closest(".post");

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        let area = post.querySelector(".comentarios");

        if (!area) {
            area = document.createElement("div");
            area.className = "comentarios";
            post.appendChild(area);
        }

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + comentario.trim();

        area.appendChild(novoComentario);
    }
}

// Função Compartilhar
function compartilhar(botao) {
    const post = botao.closest(".post");
    const texto = post.querySelector("h3").textContent +
        ": " + post.querySelector("p").textContent;

    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: texto
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Publicação copiada!"))
            .catch(() => alert("Não foi possível copiar."));
    } else {
        alert(texto);
    }
}

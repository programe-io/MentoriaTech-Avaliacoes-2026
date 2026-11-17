
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function curtir(botao) {
    let post = botao.closest(".post");
    let contador = post.querySelector(".contador");

    let curtidas = Number(contador.dataset.total || 0);

    if (botao.classList.contains("curtiu")) {
        curtidas--;
        botao.classList.remove("curtiu");
        botao.innerHTML = "♡ Curtir";
    } else {
        curtidas++;
        botao.classList.add("curtiu");
        botao.innerHTML = "♥ Curtido";
    }

    contador.dataset.total = curtidas;
    contador.innerText = curtidas + " curtidas";
}

function comentar(botao) {
    let post = botao.closest(".post");
    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        let comentarios = post.querySelector(".comentarios");

        let p = document.createElement("p");
        p.innerText = "Você: " + texto.trim();

        comentarios.appendChild(p);
    }
}

function publicar() {
    let nome = document.getElementById("nome").value.trim();
    let imagem = document.getElementById("imagem").value.trim();
    let legenda = document.getElementById("legenda").value.trim();

    if (!nome || !imagem) {
        alert("Preencha seu nome e a URL da imagem!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            alert("Digite uma URL válida de imagem!");
            return;
        }
    } catch {
        alert("Digite uma URL válida!");
        return;
    }

    let publicacoes = document.getElementById("publicacoes");

    let post = document.createElement("article");
    post.className = "post";

    let usuario = document.createElement("div");
    usuario.className = "usuario";

    let nomeUsuario = document.createElement("strong");
    nomeUsuario.textContent = nome;

    usuario.appendChild(nomeUsuario);

    let foto = document.createElement("img");
    foto.className = "foto";
    foto.src = imagem;
    foto.alt = "Foto da publicação";

    let acoes = document.createElement("div");
    acoes.className = "acoes";

    let botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ Curtir";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    let botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    acoes.append(botaoCurtir, botaoComentar);

    let texto = document.createElement("p");
    texto.className = "legenda";

    let autor = document.createElement("strong");
    autor.textContent = nome + " ";

    texto.append(autor, document.createTextNode(legenda));

    let contador = document.createElement("p");
    contador.className = "contador";
    contador.dataset.total = "0";
    contador.textContent = "0 curtidas";

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(usuario, foto, acoes, texto, contador, comentarios);

    publicacoes.prepend(post);

    fecharModal();

    document.getElementById("nome").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    alert("Publicação criada com sucesso!");
}

document.getElementById("pesquisa").addEventListener("input", function() {
    let busca = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.innerText
            .toLowerCase()
            .includes(busca) ? "block" : "none";
    });
});

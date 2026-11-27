function curtir(botao) {
    let contador = botao.querySelector("span");

    contador.textContent =
        Number(contador.textContent) + 1;
}

function comentar(botao) {
    let area = botao.parentElement;

    let campo = area.querySelector("input");
    let lista = area.querySelector(".lista-comentarios");

    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    let comentario = document.createElement("p");

    comentario.textContent = "💬 " + texto;

    lista.appendChild(comentario);

    campo.value = "";
}

function publicar() {
    let nome = document.getElementById("nome").value.trim();
    let legenda = document.getElementById("legenda").value.trim();
    let imagem = document.getElementById("imagem").value.trim();

    if (nome === "" || legenda === "") {
        alert("Preencha seu nome e sua legenda!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("article");
    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = nome + " 🌸";

    post.appendChild(titulo);

    if (imagem !== "") {
        let foto = document.createElement("img");

        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        post.appendChild(foto);
    }

    let texto = document.createElement("p");
    texto.textContent = legenda;

    post.appendChild(texto);

    let botaoCurtir = document.createElement("button");

    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    post.appendChild(botaoCurtir);

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    let campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    let botaoComentar = document.createElement("button");
    botaoComentar.textContent = "Comentar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    let lista = document.createElement("div");
    lista.className = "lista-comentarios";

    comentarios.appendChild(campo);
    comentarios.appendChild(botaoComentar);
    comentarios.appendChild(lista);

    post.appendChild(comentarios);

    feed.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("legenda").value = "";
    document.getElementById("imagem").value = "";
}
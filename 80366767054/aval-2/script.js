
// Criar publicação

function criarPost() {

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

    const descricao = document.createElement("p");
    descricao.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(descricao);

    if (imagem !== "") {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const img = document.createElement("img");
                img.src = url.href;
                img.alt = "Imagem da publicação";
                post.appendChild(img);
            }
        } catch (erro) {
            alert("Digite uma URL de imagem válida!");
            return;
        }
    }

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.appendChild(botaoCurtir);
    post.appendChild(botaoComentar);
    post.appendChild(comentarios);

    const publicacoes = document.getElementById("publicacoes");
    publicacoes.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}

// Curtir publicação

function curtir(botao) {

    const contador = botao.querySelector("span");

    contador.textContent = Number(contador.textContent) + 1;

}

// Comentar publicação

function comentar(botao) {

    const comentario = prompt("Digite seu comentário:");

    if (comentario === null || comentario.trim() === "") {
        return;
    }

    const area = botao.parentElement.querySelector(".comentarios");

    const novoComentario = document.createElement("div");
    novoComentario.className = "comentario";
    novoComentario.textContent = "💬 " + comentario;

    area.appendChild(novoComentario);

}

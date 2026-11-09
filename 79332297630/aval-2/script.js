
function curtir(botao) {
    let contador = botao.querySelector("span");

    let quantidade = Number(contador.textContent);

    quantidade++;

    contador.textContent = quantidade;

    botao.style.background = "#ff3030";
}

function comentar(botao) {
    let area = botao.parentElement.querySelector(".comentarios");

    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        let novoComentario = document.createElement("p");

        novoComentario.textContent = "💬 " + comentario;

        area.appendChild(novoComentario);
    }
}

function publicar() {
    let nome = document.getElementById("nome").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    let post = document.createElement("article");

    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = "🦸 " + nome;

    let texto = document.createElement("p");
    texto.textContent = mensagem;

    let botaoCurtir = document.createElement("button");
    botaoCurtir.className = "curtir";
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    let botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(this);
    };

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(titulo, texto, botaoCurtir, botaoComentar, comentarios);

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";

    alert("Publicação realizada com sucesso!");
}

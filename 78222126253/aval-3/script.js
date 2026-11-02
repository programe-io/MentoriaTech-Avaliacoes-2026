function curtir(botao) {
    if (botao.textContent === "♡ Curtir") {
        botao.textContent = "♥ Curtido";
    } else {
        botao.textContent = "♡ Curtir";
    }
}

function publicar() {
    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome.trim() === "" || mensagem.trim() === "") {
        alert("Preencha os campos!");
        return;
    }

    let post = document.createElement("article");

    let titulo = document.createElement("h3");
    titulo.textContent = "🌸 " + nome;

    let texto = document.createElement("p");
    texto.textContent = mensagem;

    let botao = document.createElement("button");
    botao.textContent = "♡ Curtir";
    botao.onclick = function() {
        curtir(botao);
    };

    post.append(titulo, texto, botao);
    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
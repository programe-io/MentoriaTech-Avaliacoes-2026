function curtir(botao) {
    if (botao.innerText === "♡ Curtir") {
        botao.innerText = "♥ Curtido";
    } else {
        botao.innerText = "♡ Curtir";
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
    let autor = document.createElement("b");
    let texto = document.createElement("p");
    let botao = document.createElement("button");

    autor.textContent = nome;
    texto.textContent = mensagem;
    botao.textContent = "♡ Curtir";
    botao.onclick = function() {
        curtir(botao);
    };

    post.append(autor, texto, botao);
    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
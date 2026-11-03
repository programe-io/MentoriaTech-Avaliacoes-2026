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
    post.className = "post";

    let autor = document.createElement("h3");
    autor.textContent = nome;

    let texto = document.createElement("p");
    texto.textContent = mensagem;

    let botao = document.createElement("button");
    botao.textContent = "♡ Curtir";
    botao.onclick = function() {
        curtir(botao);
    };

    post.appendChild(autor);
    post.appendChild(botao);
    post.appendChild(texto);

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";
}
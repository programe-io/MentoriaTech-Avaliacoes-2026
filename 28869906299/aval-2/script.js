
function publicar() {
    let mensagem = document.getElementById("mensagem").value;

    if (mensagem.trim() === "") {
        alert("Digite alguma coisa!");
        return;
    }

    let post = document.createElement("div");
    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = "Você";

    let texto = document.createElement("p");
    texto.textContent = mensagem;

    let botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "❤️ Curtir 0";

    botao.onclick = function() {
        curtir(botao);
    };

    post.appendChild(titulo);
    post.appendChild(texto);
    post.appendChild(botao);

    document.getElementById("feed").prepend(post);

    document.getElementById("mensagem").value = "";
}

function curtir(botao) {
    let quantidade = Number(
        botao.textContent.replace(/\D/g, "")
    );

    quantidade++;

    botao.textContent = "❤️ Curtir " + quantidade;
}

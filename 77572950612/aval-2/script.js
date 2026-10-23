
function adicionarPost() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const lista = document.getElementById("listaPosts");

    const post = document.createElement("article");
    post.className = "post card";

    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = "♡ Nova ideia";

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "♡ Curtir (0)";
    botao.onclick = function () {
        curtirPost(botao);
    };

    post.appendChild(categoria);
    post.appendChild(paragrafo);
    post.appendChild(botao);

    lista.prepend(post);

    campo.value = "";
}

function curtirPost(botao) {
    let curtidas = Number(
        botao.textContent.match(/\d+/)[0]
    );

    curtidas++;

    botao.textContent = "♥ Curtir (" + curtidas + ")";
}

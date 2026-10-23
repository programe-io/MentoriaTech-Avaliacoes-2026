
function publicarPost() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar! 💗");
        return;
    }

    const lista = document.getElementById("listaPosts");

    // Cria o card da publicação
    const post = document.createElement("article");
    post.className = "post card";

    // Cria a categoria
    const categoria = document.createElement("span");
    categoria.className = "categoria";
    categoria.textContent = "🌸 Nova publicação";

    // Cria o texto
    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    // Cria o botão de curtir
    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "♡ Curtir (0)";

    botao.onclick = function () {
        curtirPost(botao);
    };

    // Adiciona os elementos ao card
    post.appendChild(categoria);
    post.appendChild(paragrafo);
    post.appendChild(botao);

    // Coloca a publicação no início do feed
    lista.prepend(post);

    // Limpa o campo
    campo.value = "";
}

function curtirPost(botao) {
    let curtidas = Number(
        botao.textContent.match(/\d+/)[0]
    );

    curtidas++;

    botao.textContent = "♥ Curtir (" + curtidas + ")";
}


const feed = document.getElementById("feed");

function adicionarPost() {
    const texto = document.getElementById("textoPost");

    if (texto.value.trim() === "") {
        alert("Digite alguma publicação!");
        return;
    }

    const post = document.createElement("div");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "⚽ Jogador";

    const conteudo = document.createElement("p");
    conteudo.textContent = texto.value;

    const botao = document.createElement("button");
    botao.className = "curtir";
    botao.textContent = "❤️ Curtir (0)";

    let curtidas = 0;

    botao.addEventListener("click", function() {
        curtidas++;
        botao.textContent = `❤️ Curtir (${curtidas})`;
    });

    post.appendChild(titulo);
    post.appendChild(conteudo);
    post.appendChild(botao);

    feed.prepend(post);

    texto.value = "";
}

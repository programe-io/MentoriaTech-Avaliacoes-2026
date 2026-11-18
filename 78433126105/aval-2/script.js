
function curtir(botao) {
    let contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    contador.textContent = curtidas + 1;
}

function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário enviado: " + comentario);
    }
}

function adicionarPost() {
    let texto = document.getElementById("textoPost");
    let feed = document.getElementById("feed");

    if (texto.value.trim() === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    let novoPost = document.createElement("article");

    novoPost.className = "post";

    novoPost.innerHTML = `
        <h3>🌸 Kamilinha</h3>
        <p></p>
        <button onclick="curtir(this)">
            ❤️ Curtir <span>0</span>
        </button>
        <button onclick="comentar()">💬 Comentar</button>
    `;

    novoPost.querySelector("p").textContent = texto.value;

    feed.prepend(novoPost);

    texto.value = "";

    alert("Post publicado com sucesso! 💗");
}

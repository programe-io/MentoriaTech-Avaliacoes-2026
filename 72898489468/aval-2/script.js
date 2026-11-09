
function curtir(botao) {
    let contador = botao.querySelector("span");

    contador.textContent = Number(contador.textContent) + 1;
}

function comentar(botao) {
    let comentarios = botao.parentElement.querySelector(".comentarios");

    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        let novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + texto;

        comentarios.appendChild(novoComentario);
    }
}

function criarPost() {
    let campo = document.getElementById("textoPost");
    let texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma mensagem!");
        return;
    }

    let post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <h3>🌈 Nova publicação</h3>
        <p></p>
        <button onclick="curtir(this)">
            ❤️ Curtir <span>0</span>
        </button>
        <button onclick="comentar(this)">
            💬 Comentar
        </button>
        <div class="comentarios"></div>
    `;

    post.querySelector("p").textContent = texto;

    document.getElementById("feed").prepend(post);

    campo.value = "";
}

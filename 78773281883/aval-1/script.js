function criarPost() {
    const texto = document.getElementById("textoPost").value;

    if (texto.trim() === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
        <h3>👤 Usuário</h3>
        <p>${texto}</p>

        <div class="acoes">
            <button class="curtir" onclick="curtirPost(this)">
                👍 Curtir <span>0</span>
            </button>

            <button class="excluir" onclick="excluirPost(this)">
                🗑️ Excluir
            </button>
        </div>
    `;

    document.getElementById("feed").prepend(post);

    document.getElementById("textoPost").value = "";
}

function curtirPost(botao) {
    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
}

function excluirPost(botao) {
    const post = botao.closest(".post");

    post.remove();
}
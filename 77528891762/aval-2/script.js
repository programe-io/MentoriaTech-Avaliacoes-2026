
function publicar() {
    const input = document.getElementById("postInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const postagem = document.createElement("article");
    postagem.className = "post";

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">M</div>
            <div>
                <strong>Maria Eduarda</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button onclick="curtir(this)">Curtir ❤️</button>
            <button onclick="comentar(this)">Comentar 💬</button>
        </div>
    `;

    postagem.querySelector(".post-text").textContent = texto;

    feed.prepend(postagem);

    input.value = "";
}

function curtir(botao) {
    if (botao.dataset.curtido === "true") {
        botao.innerHTML = "Curtir ❤️";
        botao.dataset.curtido = "false";
    } else {
        botao.innerHTML = "Curtido ❤️";
        botao.dataset.curtido = "true";
    }
}

function comentar(botao) {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const novoComentario = document.createElement("p");

        novoComentario.textContent = "💬 " + comentario;

        botao.closest(".post").appendChild(novoComentario);
    }
}

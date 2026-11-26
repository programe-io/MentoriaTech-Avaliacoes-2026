
// Curtir publicação
function curtir(botao) {
    let post = botao.closest(".post");
    let likes = post.querySelector(".likes");

    let total = Number(likes.dataset.total || 0);

    if (botao.innerHTML === "♡") {
        total++;
        botao.innerHTML = "❤️";
    } else {
        total--;
        botao.innerHTML = "♡";
    }

    likes.dataset.total = total;
    likes.innerHTML = total + " curtidas";
}

// Adicionar comentário
function comentar(botao) {
    let post = botao.closest(".post");
    let input = post.querySelector("input");
    let area = post.querySelector(".comentarios");

    if (input.value.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    let comentario = document.createElement("p");
    comentario.textContent = "Você: " + input.value;

    area.appendChild(comentario);
    input.value = "";
}

// Focar no campo de comentário
function focarComentario(botao) {
    let post = botao.closest(".post");
    post.querySelector("input").focus();
}

// Criar publicação
function novaPublicacao() {
    let texto = prompt("Escreva sua publicação:");

    if (texto && texto.trim() !== "") {
        let post = document.createElement("div");

        post.className = "post";
        post.innerHTML = `
            <div class="usuario">
                <strong>Meu perfil</strong>
                <span>•••</span>
            </div>
            <p>${texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            <div class="botoes">
                <button onclick="curtir(this)">♡</button>
            </div>
            <p class="likes" data-total="0">0 curtidas</p>
        `;

        document.getElementById("feed").prepend(post);
    }
}

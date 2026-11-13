
// CURTIR PUBLICAÇÃO
function curtir(botao) {
    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.innerHTML = "❤️ Curtir";
    } else {
        botao.classList.add("curtido");
        botao.innerHTML = "💜 Curtido";
    }
}

// PUBLICAR POST
function publicar() {
    const input = document.querySelector(".create-post input");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const feed = document.querySelector(".feed");

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="user-avatar">J</div>
            <div>
                <h3>Você</h3>
                <small>Agora</small>
            </div>
        </div>

        <p>${texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>

        <div class="post-actions">
            <button onclick="curtir(this)">❤️ Curtir</button>
            <button onclick="comentar(this)">💬 Comentar</button>
            <button>↗ Compartilhar</button>
        </div>
    `;

    feed.insertBefore(post, feed.children[1]);
    input.value = "";
}

// COMENTAR
function comentar(botao) {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + comentario;

        botao.closest(".post").appendChild(novoComentario);
    }
}

// ATIVAR OS BOTÕES DOS POSTS EXISTENTES
document.querySelectorAll(".post-actions").forEach(area => {
    area.children[0].onclick = function() {
        curtir(this);
    };

    area.children[1].onclick = function() {
        comentar(this);
    };
});

// BOTÃO PUBLICAR
document.querySelector(".create-post button").onclick = publicar;

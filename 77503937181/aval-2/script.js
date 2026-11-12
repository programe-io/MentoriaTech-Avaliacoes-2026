
const feed = document.getElementById("feed");
const publicar = document.getElementById("publicar");
const textoPost = document.getElementById("textoPost");

// Criar uma nova publicação
publicar.addEventListener("click", function() {
    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.className = "post";

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar kayllow">K</div>
            <div>
                <h3>Kayllow</h3>
                <span>Agora</span>
            </div>
        </div>

        <p></p>

        <div class="post-actions">
            <button class="curtir">♡ Curtir</button>
            <button class="comentar">Comentar</button>
        </div>

        <div class="comentarios"></div>
    `;

    postagem.querySelector("p").textContent = texto;

    feed.prepend(postagem);
    textoPost.value = "";
});

// Curtir e comentar
feed.addEventListener("click", function(event) {
    const post = event.target.closest(".post");

    if (!post) return;

    if (event.target.classList.contains("curtir")) {
        const botao = event.target;

        if (botao.textContent === "♡ Curtir") {
            botao.textContent = "♥ Curtido";
        } else {
            botao.textContent = "♡ Curtir";
        }
    }

    if (event.target.classList.contains("comentar")) {
        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            const novoComentario = document.createElement("p");
            novoComentario.textContent = "💬 " + comentario.trim();

            post.querySelector(".comentarios").append(novoComentario);
        }
    }
});

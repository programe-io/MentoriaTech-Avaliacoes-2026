
const publicarBtn = document.querySelector(".new-post button");
const campoTexto = document.querySelector(".user-info span");
const feed = document.querySelector("main");

// Publicar nova postagem
publicarBtn.addEventListener("click", () => {
    const texto = prompt("O que você deseja publicar?");

    if (texto && texto.trim() !== "") {
        const postagem = document.createElement("article");
        postagem.classList.add("post");

        postagem.innerHTML = `
            <div class="post-header">
                <div class="user">
                    <div class="avatar">N</div>

                    <div class="user-info">
                        <strong>Noemi</strong>
                        <span>Agora</span>
                    </div>
                </div>
            </div>

            <div class="post-text">
                <p>${texto}</p>
            </div>

            <div class="post-actions">
                <button class="curtir">♡ Curtir</button>
                <button class="comentar">💬 Comentar</button>
            </div>
        `;

        feed.insertBefore(postagem, feed.children[1]);
        ativarBotoes(postagem);
    }
});

// Curtir e comentar
function ativarBotoes(postagem) {
    const curtirBtn = postagem.querySelector(".curtir");
    const comentarBtn = postagem.querySelector(".comentar");

    if (curtirBtn) {
        curtirBtn.addEventListener("click", () => {
            curtirBtn.classList.toggle("curtido");

            curtirBtn.textContent =
                curtirBtn.classList.contains("curtido")
                ? "♥ Curtido"
                : "♡ Curtir";
        });
    }

    if (comentarBtn) {
        comentarBtn.addEventListener("click", () => {
            const comentario = prompt("Digite seu comentário:");

            if (comentario && comentario.trim() !== "") {
                alert("Comentário: " + comentario);
            }
        });
    }
}

// Ativar botões das postagens existentes
document.querySelectorAll(".post").forEach(ativarBotoes);

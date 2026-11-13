

// Selecionar os elementos
const publishBtn = document.getElementById("publishBtn");
const postInput = document.getElementById("postInput");
const main = document.querySelector("main");

// FUNÇÃO PUBLICAR
publishBtn.addEventListener("click", function() {

    const texto = postInput.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const novoPost = document.createElement("article");
    novoPost.classList.add("post");

    novoPost.innerHTML = `
        <div class="post-header">
            <div class="Avatar">Y</div>
            <div>
                <strong>Yasmin</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <div class="post-text">${texto}</div>

        <div class="post-actions">
            <button class="likeBtn">Curtir</button>
            <button class="commentBtn">Comentar</button>
        </div>

        <div class="comments"></div>
    `;

    main.appendChild(novoPost);

    postInput.value = "";
});


// FUNÇÃO CURTIR E COMENTAR
main.addEventListener("click", function(event) {

    // BOTÃO CURTIR
    if (event.target.classList.contains("likeBtn")) {

        if (event.target.textContent === "Curtir") {
            event.target.textContent = "Curtido ❤️";
        } else {
            event.target.textContent = "Curtir";
        }
    }

    // BOTÃO COMENTAR
    if (event.target.classList.contains("commentBtn")) {

        const post = event.target.closest(".post");
        const comentarios = post.querySelector(".comments");

        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {

            const novoComentario = document.createElement("p");

            novoComentario.textContent = "Yasmin: " + comentario;

            comentarios.appendChild(novoComentario);
        }
    }

});

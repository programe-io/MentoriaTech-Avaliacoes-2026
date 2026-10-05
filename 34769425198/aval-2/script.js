```javascript
const publishBtn = document.getElementById("publishBtn");

publishBtn.addEventListener("click", function () {

    const texto = prompt("O que você deseja publicar?");

    if (texto === null || texto.trim() === "") {
        alert("Digite alguma coisa antes de publicar.");
        return;
    }

    const feed = document.querySelector(".feed");

    const post = document.createElement("article");

    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">

            <div class="user">

                <div class="avatar">
                    A
                </div>

                <div>
                    <strong>Ana Leticia</strong>
                    <span>agora mesmo</span>
                </div>

            </div>

        </div>

        <p class="post-text">
            ${texto}
        </p>

        <div class="post-actions">

            <button class="like-btn">
                ❤️ Curtir <span>0</span>
            </button>

            <button class="comment-btn">
                💬 Comentar
            </button>

        </div>

        <div class="comments"></div>
    `;

    feed.prepend(post);

    alert("Publicação criada com sucesso! 🎉");

    adicionarInteracoes(post);
});


function adicionarInteracoes(post) {

    const likeBtn = post.querySelector(".like-btn");

    likeBtn.addEventListener("click", function () {

        const contador = likeBtn.querySelector("span");

        let curtidas = Number(contador.textContent);

        curtidas++;

        contador.textContent = curtidas;
    });


    const commentBtn = post.querySelector(".comment-btn");

    commentBtn.addEventListener("click", function () {

        const comentario = prompt("Digite seu comentário:");

        if (comentario === null || comentario.trim() === "") {
            return;
        }

        const comments = post.querySelector(".comments");

        const novoComentario = document.createElement("div");

        novoComentario.classList.add("comment");

        novoComentario.textContent = "💬 " + comentario;

        comments.appendChild(novoComentario);
    });
}


const posts = document.querySelectorAll(".post");

posts.forEach(function (post) {
    adicionarInteracoes(post);
});
```

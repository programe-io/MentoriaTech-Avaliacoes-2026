/* ==========================
CURTIDAS
========================== */

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(function(button) {

```
button.addEventListener("click", function() {

    const post = button.closest(".post");

    const contador = post.querySelector(".like-count");

    let curtidas = Number(contador.textContent);


    if (button.classList.contains("liked")) {

        curtidas--;

        button.classList.remove("liked");

        button.textContent = "♡";

    } else {

        curtidas++;

        button.classList.add("liked");

        button.textContent = "♥";

    }


    contador.textContent = curtidas;

});
```

});

/* ==========================
COMENTÁRIOS
========================== */

const commentButtons =
document.querySelectorAll(".comment-button");

commentButtons.forEach(function(button) {

```
button.addEventListener("click", function() {

    const comentario =
        prompt("Digite seu comentário:");

    if (
        comentario !== null &&
        comentario.trim() !== ""
    ) {

        alert("Comentário publicado! 💬");

    }

});
```

});

/* ==========================
PUBLICAR
========================== */

const publishButton =
document.querySelector("#publishButton");

const postInput =
document.querySelector("#postInput");

publishButton.addEventListener("click", function() {

```
const texto = postInput.value.trim();


if (texto === "") {

    alert("Digite alguma coisa antes de publicar.");

    return;

}


const main =
    document.querySelector("main");


const novoPost =
    document.createElement("article");


novoPost.classList.add("post");


novoPost.innerHTML = `

    <div class="post-header">

        <div class="post-user">

            <img
                class="profile-photo"
                src="https://static.wikia.nocookie.net/dublagem/images/6/6e/Homem-Aranha_Cl%C3%A1ssico.png/revision/latest?cb=20231224151143&path-prefix=pt-br"
                alt="Gabriel"
            >

            <div>

                <strong>gabriel</strong>

                <span>Agora</span>

            </div>

        </div>

        <button class="more">
            •••
        </button>

    </div>


    <div class="post-content">

        <div class="actions">

            <button class="like-button">
                ♡
            </button>

            <button class="comment-button">
                💬
            </button>

            <button>
                ➤
            </button>

        </div>


        <p class="likes">

            <strong>
                <span class="like-count">0</span>
                curtidas
            </strong>

        </p>


        <p>
            <strong>gabriel</strong>
            ${texto}
        </p>

    </div>

`;


main.appendChild(novoPost);


/* Limpa o campo */

postInput.value = "";


/* Ativa curtida do novo post */

const novoLike =
    novoPost.querySelector(".like-button");


novoLike.addEventListener("click", function() {

    const contador =
        novoPost.querySelector(".like-count");


    let curtidas =
        Number(contador.textContent);


    if (novoLike.classList.contains("liked")) {

        curtidas--;

        novoLike.classList.remove("liked");

        novoLike.textContent = "♡";

    } else {

        curtidas++;

        novoLike.classList.add("liked");

        novoLike.textContent = "♥";

    }


    contador.textContent = curtidas;

});


/* Ativa comentário */

const novoComentario =
    novoPost.querySelector(".comment-button");


novoComentario.addEventListener("click", function() {

    const comentario =
        prompt("Digite seu comentário:");

    if (
        comentario !== null &&
        comentario.trim() !== ""
    ) {

        alert("Comentário publicado! 💬");

    }

});
```

});

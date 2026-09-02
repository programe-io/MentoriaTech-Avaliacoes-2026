```javascript
/* ==========================================
   🕷️ SPIDER FEED - JAVASCRIPT
========================================== */


/* ==========================================
   CURTIR / DESCURTIR POST
========================================== */

function likePost(button) {

    const likesNumber = button.querySelector("span");

    let likes = parseInt(likesNumber.textContent);

    if (button.classList.contains("liked")) {

        likes--;

        button.classList.remove("liked");

    } else {

        likes++;

        button.classList.add("liked");

    }

    likesNumber.textContent = likes;

}


/* ==========================================
   MOSTRAR / ESCONDER COMENTÁRIOS
========================================== */

function toggleComments(button) {

    const post = button.closest(".post");

    const comments = post.querySelector(".comments");

    if (comments.style.display === "block") {

        comments.style.display = "none";

    } else {

        comments.style.display = "block";

        const input = comments.querySelector("input");

        if (input) {
            input.focus();
        }

    }

}


/* ==========================================
   ADICIONAR COMENTÁRIO
========================================== */

function addComment(event, input) {

    // Só executa quando apertar Enter
    if (event.key !== "Enter") {
        return;
    }

    const text = input.value.trim();

    // Não permite comentário vazio
    if (text === "") {
        return;
    }

    const commentsContainer =
        input.closest(".comments");

    const commentList =
        commentsContainer.querySelector(".comment-list");


    // Cria o comentário
    const comment =
        document.createElement("div");

    comment.classList.add("comment");


    // Cria o nome
    const username =
        document.createElement("strong");

    username.textContent = "Você: ";


    // Cria o texto
    const commentText =
        document.createTextNode(text);


    comment.appendChild(username);

    comment.appendChild(commentText);


    // Adiciona ao feed
    commentList.appendChild(comment);


    // Limpa o campo
    input.value = "";

}


/* ==========================================
   CRIAR NOVO POST
========================================== */

function createPost() {

    const input =
        document.getElementById("postInput");

    const text =
        input.value.trim();


    // Verifica se existe texto
    if (text === "") {

        alert(
            "🕷️ Escreva alguma coisa antes de publicar!"
        );

        input.focus();

        return;
    }


    // Cria o elemento do post
    const post =
        document.createElement("article");

    post.classList.add("post");


    /*
       Estrutura do novo post
    */

    post.innerHTML = `

        <div class="user">

            <div class="avatar">
                🕷️
            </div>

            <div class="user-info">

                <strong>Você</strong>

                <span>
                    @spideruser · agora
                </span>

            </div>

        </div>


        <p class="post-text"></p>


        <div class="actions">

            <button
                class="action-btn"
                onclick="likePost(this)"
            >
                ❤️ Curtir <span>0</span>
            </button>


            <button
                class="action-btn"
                onclick="toggleComments(this)"
            >
                💬 Comentários
            </button>

        </div>


        <div class="comments">

            <input
                type="text"
                placeholder="Escreva um comentário e pressione Enter..."
                onkeydown="addComment(event, this)"
            >

            <div class="comment-list"></div>

        </div>

    `;


    /*
       Insere o texto com segurança
       para evitar HTML indevido
    */

    post.querySelector(".post-text")
        .textContent = text;


    /*
       Coloca o novo post no começo
       do feed
    */

    const feed =
        document.getElementById("feed");

    feed.prepend(post);


    // Limpa o campo
    input.value = "";


    // Animação
    post.style.opacity = "0";

    post.style.transform =
        "translateY(-20px)";


    setTimeout(() => {

        post.style.transition =
            "all 0.4s ease";

        post.style.opacity = "1";

        post.style.transform =
            "translateY(0)";

    }, 10);

}


/* ==========================================
   ENTER PARA PUBLICAR
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
            document.getElementById("postInput");


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            function (event) {

                /*
                   Ctrl + Enter publica
                */

                if (
                    event.key === "Enter" &&
                    event.ctrlKey
                ) {

                    event.preventDefault();

                    createPost();

                }

            }
        );

    }
);


/* ==========================================
   EFEITO DE TEIA AO PASSAR O MOUSE
========================================== */

document.addEventListener(
    "mouseover",
    function (event) {

        const post =
            event.target.closest(".post");

        if (!post) {
            return;
        }

        post.style.setProperty(
            "--mouse-x",
            event.offsetX + "px"
        );

        post.style.setProperty(
            "--mouse-y",
            event.offsetY + "px"
        );

    }
);


/* ==========================================
   MENSAGEM DE BOAS-VINDAS
========================================== */

window.addEventListener(
    "load",
    function () {

        console.log(
            "🕷️ Spider Feed carregado!"
        );

        console.log(
            "🕸️ Bem-vindo, herói da vizinhança!"
        );

    }
);
```

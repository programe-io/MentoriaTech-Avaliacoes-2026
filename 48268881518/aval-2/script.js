
/* ========================================
   1. SELEÇÃO DOS ELEMENTOS
======================================== */

// Seleciona o formulário de publicação
const postForm = document.getElementById("post-form");

// Seleciona o campo de texto
const postInput = document.getElementById("post-input");

// Seleciona a área do feed
const feed = document.getElementById("feed");

// Nome do usuário
const userName = "Marcos Melo";


/* ========================================
   2. FUNÇÃO PARA FORMATAR HORÁRIO
======================================== */

function getCurrentTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}


/* ========================================
   3. FUNÇÃO PARA CRIAR POSTAGENS
======================================== */

function createPost(text) {

    // Cria o elemento principal
    const post = document.createElement("article");

    post.className = "post card";

    // Cria a estrutura da postagem
    post.innerHTML = `
        <div class="post-header">

            <div class="user">

                <div class="avatar">M</div>

                <div>
                    <strong>${userName}</strong>
                    <span>Agora mesmo - ${getCurrentTime()}</span>
                </div>

            </div>

        </div>

        <p class="post-text"></p>

        <div class="post-actions">

            <button class="like-button">
                Curtir <span>0</span>
            </button>

            <button class="comment-toggle">
                Comentar
            </button>

        </div>

        <div class="comment-area hidden">

            <form class="comment-form">

                <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    required
                >

                <button type="submit">
                    Enviar
                </button>

            </form>

            <div class="comments"></div>

        </div>
    `;

    // Insere o texto de maneira segura
    post.querySelector(".post-text").textContent = text;

    // Retorna a postagem criada
    return post;
}


/* ========================================
   4. PUBLICAR NOVA POSTAGEM
======================================== */

postForm.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Obtém o texto digitado
    const text = postInput.value.trim();

    // Verifica se o campo está vazio
    if (text === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    // Cria a nova postagem
    const newPost = createPost(text);

    // Adiciona a postagem no início do feed
    feed.prepend(newPost);

    // Limpa o campo de texto
    postInput.value = "";

});


/* ========================================
   5. SISTEMA DE CURTIDAS
======================================== */

feed.addEventListener("click", function(event) {

    // Verifica se o botão Curtir foi clicado
    const likeButton = event.target.closest(".like-button");

    if (likeButton) {

        // Seleciona o contador
        const counter = likeButton.querySelector("span");

        // Obtém a quantidade atual de curtidas
        let likes = Number(counter.textContent);

        // Verifica se a postagem já foi curtida
        if (likeButton.classList.contains("liked")) {

            // Remove uma curtida
            likes--;

            likeButton.classList.remove("liked");

        } else {

            // Adiciona uma curtida
            likes++;

            likeButton.classList.add("liked");

        }

        // Atualiza o contador
        counter.textContent = likes;

    }


    /* ========================================
       6. MOSTRAR E ESCONDER COMENTÁRIOS
    ======================================== */

    const commentButton = event.target.closest(".comment-toggle");

    if (commentButton) {

        // Localiza a postagem
        const post = commentButton.closest(".post");

        // Localiza a área de comentários
        const commentArea = post.querySelector(".comment-area");

        // Alterna a visibilidade
        commentArea.classList.toggle("hidden");

    }

});


/* ========================================
   7. SISTEMA DE COMENTÁRIOS
======================================== */

feed.addEventListener("submit", function(event) {

    // Verifica se foi enviado um comentário
    if (!event.target.classList.contains("comment-form")) {
        return;
    }

    // Impede o recarregamento da página
    event.preventDefault();

    // Seleciona o formulário
    const form = event.target;

    // Seleciona o campo de comentário
    const input = form.querySelector("input");

    // Obtém o texto digitado
    const text = input.value.trim();

    // Verifica se está vazio
    if (text === "") {
        alert("Digite um comentário!");
        return;
    }

    // Localiza a postagem
    const post = form.closest(".post");

    // Localiza a área dos comentários
    const comments = post.querySelector(".comments");

    // Cria um novo comentário
    const comment = document.createElement("div");

    comment.className = "comment";

    // Cria o nome do usuário
    const name = document.createElement("strong");

    name.textContent = userName + ": ";

    // Cria o texto do comentário
    const message = document.createElement("span");

    message.textContent = text;

    // Adiciona as informações ao comentário
    comment.appendChild(name);

    comment.appendChild(message);

    // Adiciona o comentário na postagem
    comments.appendChild(comment);

    // Limpa o campo
    input.value = "";

});


/* ========================================
   8. MENSAGEM NO CONSOLE
======================================== */

console.log("Mini Feed iniciado com sucesso!");
console.log("Usuário conectado: " + userName);

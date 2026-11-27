
const posts = document.getElementById("posts");
const postInput = document.getElementById("postInput");
const publishBtn = document.getElementById("publishBtn");
const search = document.getElementById("search");

// CONTROLE DE CURTIDAS
document.querySelectorAll(".post").forEach(post => {
    const count = post.querySelector(".likes-count");

    if (count) {
        count.dataset.likes = "0";
    }
});

// EVENTOS DOS BOTÕES
posts.addEventListener("click", function(event) {

    const button = event.target;

    // CURTIR
    if (button.classList.contains("like-btn")) {

        const post = button.closest(".post");
        const count = post.querySelector(".likes-count");

        let likes = Number(count.dataset.likes || 0);

        if (button.classList.contains("liked")) {
            likes--;
            button.classList.remove("liked");
            button.textContent = "👍 Curtir";
        } else {
            likes++;
            button.classList.add("liked");
            button.textContent = "👍 Curtido";
        }

        count.dataset.likes = likes;

        count.textContent = "👍 " + likes.toLocaleString("pt-BR") +
            " curtidas";
    }

    // ABRIR COMENTÁRIOS
    if (button.classList.contains("comment-btn")) {

        const post = button.closest(".post");
        const area = post.querySelector(".comment-area");

        area.classList.toggle("active");
    }

    // ENVIAR COMENTÁRIO
    if (button.classList.contains("send-comment")) {

        const post = button.closest(".post");
        const input = post.querySelector(".comment-area input");
        const list = post.querySelector(".comment-list");

        const message = input.value.trim();

        if (!message) {
            alert("Digite um comentário!");
            return;
        }

        const comment = document.createElement("div");

        comment.className = "comment-item";

        const name = document.createElement("strong");
        name.textContent = "Você: ";

        const text = document.createElement("span");
        text.textContent = message;

        comment.append(name, text);
        list.appendChild(comment);

        input.value = "";

        // ATUALIZAR CONTADOR
        const counter = post.querySelector(".comments-count");

        if (counter) {
            const total = Number(counter.dataset.total || 0) + 1;
            counter.dataset.total = total;
            counter.textContent = total.toLocaleString("pt-BR") +
                " comentários";
        }
    }

    // COMPARTILHAR
    if (button.classList.contains("share-btn")) {

        const post = button.closest(".post");
        const text = post.querySelector(".post-text");

        const message = text
            ? text.innerText
            : post.querySelector("p").innerText;

        if (navigator.share) {

            navigator.share({
                title: "GTA VI News",
                text: message
            }).catch(() => {});

        } else if (navigator.clipboard) {

            navigator.clipboard.writeText(message)
                .then(() => alert("Publicação copiada!"))
                .catch(() => alert("Não foi possível copiar."));

        } else {
            alert("Compartilhamento indisponível.");
        }
    }

});

// CRIAR PUBLICAÇÃO
publishBtn.addEventListener("click", function() {

    const message = postInput.value.trim();

    if (!message) {
        alert("Escreva alguma notícia antes de publicar!");
        return;
    }

    const article = document.createElement("article");

    article.className = "post";

    article.innerHTML = `
        <div class="post-header">
            <div class="page-avatar">G</div>

            <div class="post-user">
                <strong>GTA VI News</strong>
                <small>Agora · 🌎 Público</small>
            </div>

            <button class="more-button">•••</button>
        </div>

        <div class="post-text">
            <p></p>
        </div>

        <div class="post-information">
            <span class="likes-count" data-likes="0">👍 0 curtidas</span>
            <span class="comments-count" data-total="0">0 comentários</span>
        </div>

        <div class="post-buttons">
            <button class="like-btn">👍 Curtir</button>
            <button class="comment-btn">💬 Comentar</button>
            <button class="share-btn">↗ Compartilhar</button>
        </div>

        <div class="comment-area">
            <input type="text" placeholder="Escreva um comentário...">
            <button class="send-comment">Enviar</button>
            <div class="comment-list"></div>
        </div>
    `;

    // INSERIR TEXTO COM SEGURANÇA
    article.querySelector(".post-text p").textContent = message;

    posts.prepend(article);

    postInput.value = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// PESQUISAR PUBLICAÇÕES
search.addEventListener("input", function() {

    const term = search.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const content = post.innerText.toLowerCase();

        post.style.display = content.includes(term)
            ? "block"
            : "none";

    });

});

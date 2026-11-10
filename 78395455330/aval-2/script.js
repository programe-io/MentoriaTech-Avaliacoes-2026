
// Selecionando elementos
const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");
const feed = document.getElementById("feed");

// Criar nova publicação
publishBtn.addEventListener("click", function () {

    const text = postText.value.trim();

    if (text === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">M</div>
            <div>
                <h3>Maria</h3>
                <small>Agora mesmo</small>
            </div>
        </div>

        <p></p>

        <div class="post-actions">
            <button class="like-btn">♡ Curtir <span>0</span></button>
            <button class="comment-btn">💬 Comentar</button>
            <button class="share-btn">↗ Compartilhar</button>
        </div>
    `;

    // Inserir texto com segurança
    post.querySelector("p").textContent = text;

    // Adicionar no início do feed
    feed.prepend(post);

    // Limpar campo
    postText.value = "";

});

// Curtir publicações
feed.addEventListener("click", function (event) {

    const button = event.target.closest(".like-btn");

    if (!button) return;

    const count = button.querySelector("span");
    let likes = Number(count.textContent);

    if (button.classList.contains("liked")) {
        likes--;
        button.classList.remove("liked");
        button.innerHTML = `♡ Curtir <span>${likes}</span>`;
    } else {
        likes++;
        button.classList.add("liked");
        button.innerHTML = `♥ Curtido <span>${likes}</span>`;
    }

});

// Comentar publicação
feed.addEventListener("click", function (event) {

    const button = event.target.closest(".comment-btn");

    if (!button) return;

    const comment = prompt("Digite seu comentário:");

    if (comment && comment.trim() !== "") {
        alert("Comentário adicionado: " + comment);
    }

});

// Compartilhar publicação
feed.addEventListener("click", function (event) {

    const button = event.target.closest(".share-btn");

    if (!button) return;

    const post = button.closest(".post");
    const text = post.querySelector("p").textContent;

    if (navigator.share) {
        navigator.share({
            title: "MiniFeed",
            text: text
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text)
            .then(() => alert("Publicação copiada!"))
            .catch(() => alert("Não foi possível copiar."));
    }

});

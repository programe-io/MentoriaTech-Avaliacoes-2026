
// ELEMENTOS PRINCIPAIS

const feed = document.querySelector("#feed");

const modal = document.querySelector("#createModal");

const openCreate = document.querySelector("#openCreate");

const closeModal = document.querySelector("#closeModal");

const publishModal = document.querySelector("#publishModal");

const newCaption = document.querySelector("#newCaption");

const newImage = document.querySelector("#newImage");

const imagePreview = document.querySelector("#imagePreview");


// ABRIR MODAL

openCreate.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("show");
});


// FECHAR MODAL

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});


// VISUALIZAR IMAGEM ANTES DE PUBLICAR

newImage.addEventListener("input", () => {

    const url = newImage.value.trim();

    imagePreview.replaceChildren();

    if (!url) return;

    try {
        const parsedUrl = new URL(url);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return;
        }

        const img = document.createElement("img");
        img.src = parsedUrl.href;
        img.alt = "Pré-visualização da publicação";

        imagePreview.append(img);

        img.onerror = () => {
            imagePreview.textContent = "Não foi possível carregar a imagem.";
        };

    } catch {
        // URL inválida: não exibe pré-visualização.
    }
});


// CURTIDAS

function configurarCurtida(post) {

    const button = post.querySelector(".like-btn");

    const likes = post.querySelector(".likes");

    let liked = false;

    let total = Number(
        (likes.textContent.match(/\d+/g) || ["0"]).join("")
    );

    button.addEventListener("click", () => {

        liked = !liked;

        total += liked ? 1 : -1;

        button.classList.toggle("liked", liked);

        button.textContent = liked ? "♥" : "♡";

        likes.textContent =
            total.toLocaleString("pt-BR") + " curtidas";

    });
}


// COMENTÁRIOS

function configurarComentarios(post) {

    const form = post.querySelector(".comment-form");

    const input = form.querySelector("input");

    const list = post.querySelector(".comments-list");

    const commentButton = post.querySelector(".comment-focus");

    const viewButton = post.querySelector(".view-comments");

    commentButton.addEventListener("click", () => {
        input.focus();
    });

    viewButton.addEventListener("click", () => {
        input.focus();
    });

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const message = input.value.trim();

        if (!message) return;

        const comment = document.createElement("div");

        comment.className = "comment-item";

        const author = document.createElement("strong");

        author.textContent = "jonathan";

        const text = document.createTextNode(message);

        comment.append(author, text);

        list.append(comment);

        input.value = "";

    });

}


// SALVAR PUBLICAÇÃO

function configurarSalvamento(post) {

    const button = post.querySelector(".save-btn");

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        button.textContent =
            button.classList.contains("saved") ? "▣" : "♧";

    });

}


// CONFIGURAR TODAS AS PUBLICAÇÕES

function configurarPost(post) {

    configurarCurtida(post);

    configurarComentarios(post);

    configurarSalvamento(post);

}

document.querySelectorAll(".post").forEach(configurarPost);


// SEGUIR USUÁRIOS

document.querySelectorAll(".follow-btn").forEach(button => {

    button.addEventListener("click", () => {

        const seguindo = button.textContent === "Seguindo";

        button.textContent = seguindo ? "Seguir" : "Seguindo";

        button.style.color = seguindo ? "#0095f6" : "#8e8e8e";

    });

});


// CRIAR NOVA PUBLICAÇÃO

publishModal.addEventListener("click", () => {

    const caption = newCaption.value.trim();

    const imageUrl = newImage.value.trim();

    if (!caption && !imageUrl) {
        alert("Adicione uma legenda ou uma imagem.");
        return;
    }

    // VALIDAR ENDEREÇO DA IMAGEM

    let validImage = "";

    if (imageUrl) {

        try {
            const url = new URL(imageUrl);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }

            validImage = url.href;

        } catch {
            alert("Informe um endereço de imagem válido.");
            return;
        }

    }

    // CRIAR PUBLICAÇÃO

    const post = document.createElement("article");

    post.className = "post";

    // CABEÇALHO

    const header = document.createElement("div");

    header.className = "post-header";

    const avatar = document.createElement("img");

    avatar.className = "profile-pic";

    avatar.src = "https://i.pravatar.cc/150?img=12";

    avatar.alt = "Foto de perfil";

    const user = document.createElement("div");

    user.className = "post-user";

    const username = document.createElement("strong");

    username.textContent = "jonathan";

    const time = document.createElement("span");

    time.textContent = "Agora";

    user.append(username, time);

    const options = document.createElement("button");

    options.className = "options";

    options.textContent = "•••";

    header.append(avatar, user, options);

    post.append(header);

    // IMAGEM

    if (validImage) {

        const img = document.createElement("img");

        img.className = "post-image";

        img.src = validImage;

        img.alt = caption || "Imagem publicada por jonathan";

        post.append(img);

    }

    // BOTÕES

    const buttons = document.createElement("div");

    buttons.className = "post-buttons";

    buttons.innerHTML = `
        <div class="left-buttons">
            <button class="like-btn">♡</button>
            <button class="comment-focus">♧</button>
            <button>➤</button>
        </div>

        <button class="save-btn">♧</button>
    `;

    post.append(buttons);

    // INFORMAÇÕES

    const info = document.createElement("div");

    info.className = "post-info";

    info.innerHTML = `
        <strong class="likes">0 curtidas</strong>
        <p></p>
        <button class="view-comments">
            Ver comentários
        </button>
        <span class="post-date">AGORA</span>
    `;

    info.querySelector("p").append(
        document.createElement("strong"),
        document.createTextNode("")
    );

    info.querySelector("p strong").textContent = "jonathan";

    info.querySelector("p").append(
        document.createTextNode(" " + caption)
    );

    post.append(info);

    // FORMULÁRIO DE COMENTÁRIO

    const commentForm = document.createElement("form");

    commentForm.className = "comment-form";

    commentForm.innerHTML = `
        <input
            type="text"
            placeholder="Adicione um comentário..."
            required>

        <button type="submit">Publicar</button>
    `;

    post.append(commentForm);

    // LISTA DE COMENTÁRIOS

    const comments = document.createElement("div");

    comments.className = "comments-list";

    post.append(comments);

    // COLOCAR NO INÍCIO DO FEED

    feed.prepend(post);

    // ATIVAR FUNCIONALIDADES

    configurarPost(post);

    // LIMPAR CAMPOS

    newCaption.value = "";

    newImage.value = "";

    imagePreview.replaceChildren();

    modal.classList.remove("show");

});


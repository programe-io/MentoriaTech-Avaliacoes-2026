
const feed = document.getElementById("feed");

const captionInput = document.getElementById("captionInput");
const imageInput = document.getElementById("imageInput");
const publishButton = document.getElementById("publishButton");

const selectedFile = document.getElementById("selectedFile");

const STORAGE_KEY = "coraline_instagram_posts";

// SALVAR PUBLICAÇÕES NO NAVEGADOR
function savePosts() {
    localStorage.setItem(STORAGE_KEY, feed.innerHTML);
}

// RECUPERAR PUBLICAÇÕES SALVAS
const savedPosts = localStorage.getItem(STORAGE_KEY);

if (savedPosts) {
    feed.innerHTML = savedPosts;
}


// ESCAPAR TEXTOS PARA EVITAR QUE VIREM HTML
function escapeHTML(text) {
    return text.replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}


// SELECIONAR IMAGEM
imageInput.addEventListener("change", () => {

    if (imageInput.files.length > 0) {
        selectedFile.textContent = imageInput.files[0].name;
    } else {
        selectedFile.textContent = "Nenhuma imagem selecionada";
    }

});


// CRIAR PUBLICAÇÃO
publishButton.addEventListener("click", () => {

    const text = captionInput.value.trim();
    const file = imageInput.files[0];

    if (!text && !file) {
        alert("Adicione uma legenda ou uma imagem!");
        return;
    }

    if (file && !file.type.startsWith("image/")) {
        alert("Escolha um arquivo de imagem válido.");
        return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
        alert("Escolha uma imagem de até 5 MB.");
        return;
    }

    function createPost(imageURL = "") {

        const post = document.createElement("article");

        post.className = "post";

        const safeText = escapeHTML(text);

        post.innerHTML = `

            <div class="post-header">

                <div class="post-user">

                    <img src="imagens/coraline.jpg" alt="Perfil">

                    <div>
                        <strong>coraline.jones</strong>
                        <small>Acabou de publicar</small>
                    </div>

                </div>

                <button class="more-button">•••</button>

            </div>

            ${imageURL ? `
                <img class="post-photo"
                src="${imageURL}"
                alt="Minha publicação">
            ` : ""}

            <div class="post-buttons">

                <div>
                    <button class="like-button">♡</button>
                    <button class="comment-button">♧</button>
                    <button class="share-button">➤</button>
                </div>

                <button class="save-button">♧</button>

            </div>

            <div class="post-details">

                <strong class="likes">0 curtidas</strong>

                <p>
                    <strong>coraline.jones</strong>
                    ${safeText}
                </p>

                <div class="comments"></div>

                <button class="view-comments">
                    Ver todos os comentários
                </button>

                <small>AGORA</small>

            </div>

            <div class="comment-area">

                <input type="text"
                placeholder="Adicione um comentário...">

                <button class="send-comment">Publicar</button>

            </div>

        `;

        feed.prepend(post);

        captionInput.value = "";
        imageInput.value = "";
        selectedFile.textContent = "Nenhuma imagem selecionada";

        savePosts();

        post.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    if (file) {

        const reader = new FileReader();

        reader.onload = event => {
            createPost(event.target.result);
        };

        reader.onerror = () => {
            alert("Não foi possível carregar a imagem.");
        };

        reader.readAsDataURL(file);

    } else {
        createPost();
    }

});


// FUNÇÕES DO FEED
feed.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) return;

    const post = button.closest(".post");

    if (!post) return;


    // CURTIR
    if (button.classList.contains("like-button")) {

        const likes = post.querySelector(".likes");

        const current = parseInt(
            likes.textContent.replace(/\D/g, "")
        ) || 0;

        const liked = button.classList.toggle("liked");

        button.textContent = liked ? "♥" : "♡";

        const total = liked ? current + 1 : Math.max(0, current - 1);

        likes.textContent =
            total.toLocaleString("pt-BR") + " curtidas";

        savePosts();
    }


    // ABRIR COMENTÁRIOS
    if (button.classList.contains("comment-button")) {

        post.querySelector(".comment-area input").focus();

    }


    // PUBLICAR COMENTÁRIO
    if (button.classList.contains("send-comment")) {

        const input = post.querySelector(".comment-area input");

        const text = input.value.trim();

        if (!text) return;

        const comment = document.createElement("p");

        const username = document.createElement("strong");

        username.textContent = "Você ";

        comment.appendChild(username);

        comment.appendChild(
            document.createTextNode(text)
        );

        post.querySelector(".comments").appendChild(comment);

        input.value = "";

        savePosts();
    }


    // VER OU ESCONDER COMENTÁRIOS
    if (button.classList.contains("view-comments")) {

        const comments = post.querySelector(".comments");

        comments.style.display =
            comments.style.display === "none" ? "block" : "none";

    }


    // SALVAR PUBLICAÇÃO
    if (button.classList.contains("save-button")) {

        const saved = button.classList.toggle("saved");

        button.textContent = saved ? "♥" : "♧";

        savePosts();
    }


    // COMPARTILHAR
    if (button.classList.contains("share-button")) {

        const description =
            post.querySelector(".post-details p")?.textContent || "";

        if (navigator.share) {

            navigator.share({
                title: "Coraline Instagram",
                text: description
            }).catch(() => {});

        } else if (navigator.clipboard) {

            navigator.clipboard.writeText(description)
                .then(() => alert("Texto copiado!"))
                .catch(() => alert("Não foi possível copiar."));

        } else {
            alert(description);
        }

    }


    // EXCLUIR PUBLICAÇÃO
    if (button.classList.contains("more-button")) {

        const confirmDelete = confirm(
            "Deseja excluir esta publicação?"
        );

        if (confirmDelete) {
            post.remove();
            savePosts();
        }

    }

});


// PESQUISAR PUBLICAÇÕES
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const content = post.textContent.toLowerCase();

        post.style.display =
            content.includes(search) ? "" : "none";

    });

});


// SEGUIR PERSONAGENS
document.querySelectorAll(".follow-button").forEach(button => {

    button.addEventListener("click", () => {

        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";

        button.style.color = following ? "#55b9e9" : "#f4d52e";

    });

});


// ADICIONAR STORY
const storyInput = document.getElementById("storyInput");

const addStory = document.getElementById("addStory");

addStory.addEventListener("click", () => {
    storyInput.click();
});

storyInput.addEventListener("change", () => {

    const file = storyInput.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Escolha uma imagem válida.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Escolha uma imagem de até 5 MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = event => {

        const imageURL = event.target.result;

        const story = document.createElement("div");

        story.className = "story";

        story.innerHTML = `
            <div class="story-ring">
                <img src="${imageURL}" alt="Meu story">
            </div>
            <p>seu story</p>
        `;

        story.addEventListener("click", () => {
            openStory(imageURL);
        });

        addStory.after(story);

        openStory(imageURL);

    };

    reader.readAsDataURL(file);

});


// ABRIR STORIES
const storyModal = document.getElementById("storyModal");

const storyPreview = document.getElementById("storyPreview");

function openStory(imageURL) {

    storyPreview.src = imageURL;

    storyModal.classList.add("show");

}

document.querySelectorAll(".story:not(#addStory)").forEach(story => {

    story.addEventListener("click", () => {

        const image = story.querySelector("img");

        if (image && image.src) {
            openStory(image.src);
        }

    });

});


// FECHAR STORIES
document.getElementById("closeStory").addEventListener("click", () => {

    storyModal.classList.remove("show");

});

storyModal.addEventListener("click", event => {

    if (event.target === storyModal) {
        storyModal.classList.remove("show");
    }

});


// TROCAR FOTO DO PERFIL
const avatarInput = document.getElementById("avatarInput");

const editProfile = document.getElementById("editProfile");

editProfile.addEventListener("click", () => {
    avatarInput.click();
});

avatarInput.addEventListener("change", () => {

    const file = avatarInput.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Escolha uma imagem válida.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Escolha uma imagem de até 5 MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = event => {

        const imageURL = event.target.result;

        document.getElementById("profileAvatar").src = imageURL;

        document.getElementById("createAvatar").src = imageURL;

        document.querySelectorAll(".mobile-header img").forEach(img => {
            img.src = imageURL;
        });

        localStorage.setItem("coraline_avatar", imageURL);

    };

    reader.readAsDataURL(file);

});


// RECUPERAR FOTO DE PERFIL
const savedAvatar = localStorage.getItem("coraline_avatar");

if (savedAvatar) {

    document.getElementById("profileAvatar").src = savedAvatar;

    document.getElementById("createAvatar").src = savedAvatar;

}

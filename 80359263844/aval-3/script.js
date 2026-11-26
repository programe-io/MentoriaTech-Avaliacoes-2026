
// ELEMENTOS
const createModal = document.getElementById("createModal");
const createButton = document.getElementById("createButton");
const mobileCreate = document.getElementById("mobileCreate");
const closeModal = document.getElementById("closeModal");


// ABRIR E FECHAR MODAL
function openCreateModal() {
    createModal.classList.add("show");
}

function closeCreateModal() {
    createModal.classList.remove("show");
}

createButton.addEventListener("click", openCreateModal);
mobileCreate.addEventListener("click", openCreateModal);
closeModal.addEventListener("click", closeCreateModal);

createModal.addEventListener("click", (event) => {
    if (event.target === createModal) {
        closeCreateModal();
    }
});


// MODO ESCURO
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeButton.querySelector("i");

    if (document.body.classList.contains("dark")) {
        icon.className = "fa-solid fa-sun";
        themeButton.querySelector("span").textContent = "Modo claro";
    } else {
        icon.className = "fa-solid fa-moon";
        themeButton.querySelector("span").textContent = "Alternar tema";
    }

});


// SISTEMA DE CURTIDAS
document.querySelectorAll(".post").forEach(post => {

    const likeButton = post.querySelector(".like-button");
    const likesCount = post.querySelector(".likes-count");
    const postImage = post.querySelector(".post-image");
    const bigHeart = post.querySelector(".big-heart");

    let liked = false;
    let likes = parseInt(likesCount.textContent.replace(/\D/g, "")) || 0;

    function toggleLike() {

        liked = !liked;

        if (liked) {
            likes++;
            likeButton.classList.add("liked");
            likeButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
        } else {
            likes--;
            likeButton.classList.remove("liked");
            likeButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }

        likesCount.textContent =
            likes.toLocaleString("pt-BR") + " curtidas";
    }

    likeButton.addEventListener("click", toggleLike);

    postImage.addEventListener("dblclick", () => {

        if (!liked) {
            toggleLike();
        }

        bigHeart.classList.remove("animate");

        void bigHeart.offsetWidth;

        bigHeart.classList.add("animate");

    });

});


// SALVAR PUBLICAÇÃO
document.querySelectorAll(".save-button").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        if (button.classList.contains("saved")) {
            button.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
        } else {
            button.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        }

    });

});


// COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {

    const input = post.querySelector(".comment-field");
    const publish = post.querySelector(".publish-comment");
    const comments = post.querySelector(".comments");

    input.addEventListener("input", () => {
        publish.classList.toggle("active", input.value.trim().length > 0);
    });

    function addComment() {

        const message = input.value.trim();

        if (!message) return;

        const comment = document.createElement("div");

        comment.className = "comment-item";

        const username = document.createElement("strong");
        username.textContent = "seu_usuario ";

        const text = document.createTextNode(message);

        comment.append(username, text);

        comments.appendChild(comment);

        input.value = "";
        publish.classList.remove("active");
    }

    publish.addEventListener("click", addComment);

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            addComment();
        }

    });

});


// SEGUIR USUÁRIOS
document.querySelectorAll(".suggestion button").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#8e8e8e";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }

    });

});


// STORIES
const storyModal = document.getElementById("storyModal");
const storyViewer = document.getElementById("storyViewer");
const closeStory = document.getElementById("closeStory");

document.querySelectorAll(".story").forEach(story => {

    story.addEventListener("click", () => {

        const image = story.querySelector("img");

        storyViewer.src = image.src;

        storyModal.classList.add("show");

        const progress = document.querySelector(".story-progress div");

        progress.style.animation = "none";

        void progress.offsetWidth;

        progress.style.animation = "progress 5s linear forwards";

        clearTimeout(window.storyTimer);

        window.storyTimer = setTimeout(() => {
            storyModal.classList.remove("show");
        }, 5000);

    });

});

closeStory.addEventListener("click", () => {
    clearTimeout(window.storyTimer);
    storyModal.classList.remove("show");
});


// UPLOAD DE IMAGEM
const imageUpload = document.getElementById("imageUpload");
const previewArea = document.getElementById("previewArea");

let selectedImage = null;

imageUpload.addEventListener("change", event => {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem.");
        return;
    }

    selectedImage = URL.createObjectURL(file);

    previewArea.innerHTML = "";

    const image = document.createElement("img");
    image.src = selectedImage;

    previewArea.appendChild(image);

});


// PUBLICAR POSTAGEM
const shareButton = document.getElementById("shareButton");

shareButton.addEventListener("click", () => {

    if (!selectedImage) {
        alert("Selecione uma imagem primeiro!");
        return;
    }

    const caption = document.getElementById("caption").value;

    const post = document.createElement("article");

    post.className = "post";

    const header = document.createElement("header");
    header.className = "post-header";

    const user = document.createElement("div");
    user.className = "post-user";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const userInfo = document.createElement("div");

    const username = document.createElement("strong");
    username.textContent = "seu_usuario";

    const location = document.createElement("small");
    location.textContent = "Publicado agora";

    userInfo.append(username, location);
    user.append(avatar, userInfo);
    header.append(user);

    const imageContainer = document.createElement("div");
    imageContainer.className = "post-image-container";

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = selectedImage;

    imageContainer.appendChild(image);

    const info = document.createElement("div");
    info.className = "post-info";

    const likes = document.createElement("strong");
    likes.className = "likes-count";
    likes.textContent = "0 curtidas";

    const description = document.createElement("p");

    const author = document.createElement("strong");
    author.textContent = "seu_usuario ";

    description.append(author, document.createTextNode(caption));

    info.append(likes, description);

    post.append(header, imageContainer, info);

    const feed = document.getElementById("feed");

    feed.prepend(post);

    // Limpar modal
    document.getElementById("caption").value = "";
    previewArea.innerHTML = "";
    imageUpload.value = "";
    selectedImage = null;

    closeCreateModal();

    // Liberar imagem temporária
    URL.revokeObjectURL(image.src);

    alert("Publicação adicionada ao feed!");

});


// NAVEGAÇÃO VISUAL
document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", event => {

        if (
            item.id === "createButton" ||
            item.id === "themeButton"
        ) return;

        event.preventDefault();

        document.querySelectorAll(".nav-item")
            .forEach(nav => nav.classList.remove("active"));

        item.classList.add("active");

    });

});


// MENU DE TECLADO
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeCreateModal();
        storyModal.classList.remove("show");
        clearTimeout(window.storyTimer);
    }

});


// ANIMAÇÃO DE ENTRADA
document.querySelectorAll(".post").forEach((post, index) => {

    post.style.opacity = "0";

    post.style.transform = "translateY(15px)";

    setTimeout(() => {

        post.style.transition = ".5s ease";

        post.style.opacity = "1";

        post.style.transform = "translateY(0)";

    }, index * 150);

});

console.log("Instagram Clone iniciado com sucesso!");


/* Inicializar ícones */

function initializeIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

initializeIcons();


/* Curtir publicação */

function likePost(button) {

    const icon = button.querySelector("svg");

    if (!icon) return;

    const liked = icon.classList.toggle("liked");

    icon.style.color = liked ? "#ed4956" : "#262626";
    icon.style.fill = liked ? "#ed4956" : "none";
}


/* Salvar publicação */

function savePost(button) {

    const icon = button.querySelector("svg");

    if (!icon) return;

    const saved = icon.classList.toggle("liked");

    icon.style.fill = saved ? "#262626" : "none";

    alert(saved ? "Publicação salva!" : "Publicação removida dos salvos!");
}


/* Comentar */

function commentPost() {

    const comment = prompt("Escreva seu comentário:");

    if (comment && comment.trim()) {
        alert("Comentário adicionado: " + comment);
    }

}


/* Compartilhar */

function sharePost() {

    if (navigator.share) {

        navigator.share({
            title: "Instagram Clone",
            text: "Confira esta publicação!"
        }).catch(() => {});

    } else {

        alert("Compartilhamento não disponível neste navegador.");

    }

}


/* Seguir usuário */

function followUser(button) {

    if (button.textContent === "Seguir") {

        button.textContent = "Seguindo";
        button.style.color = "#888";

    } else {

        button.textContent = "Seguir";
        button.style.color = "#0095f6";

    }

}


/* Criar publicação */

function createPost() {

    const text = document.getElementById("postText").value.trim();

    const image = document.getElementById("postImage").value.trim();

    if (!text && !image) {

        alert("Digite um texto ou adicione uma imagem!");
        return;

    }

    if (image && !/^https?:\/\//i.test(image)) {
        alert("Informe uma URL válida começando com http:// ou https://");
        return;
    }

    const feed = document.getElementById("feedPosts");

    const post = document.createElement("article");

    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const profile = document.createElement("div");
    profile.className = "flex items-center gap-3";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.className = "avatar";

    const profileInfo = document.createElement("div");

    const username = document.createElement("h3");
    username.className = "font-semibold";
    username.textContent = "seu_perfil";

    const time = document.createElement("small");
    time.className = "text-gray-500";
    time.textContent = "Agora mesmo";

    profileInfo.append(username, time);
    profile.append(avatar, profileInfo);
    header.append(profile);

    const content = document.createElement("div");
    content.className = "post-info my-3";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.append(paragraph);

    post.append(header);

    if (image) {

        const photo = document.createElement("img");

        photo.src = image;
        photo.className = "post-image";
        photo.alt = "Imagem da publicação";

        photo.onerror = function() {
            this.style.display = "none";
        };

        post.append(photo);

    }

    post.append(content);

    const actions = document.createElement("div");

    actions.className = "post-actions";

    actions.innerHTML = `
        <div class="flex gap-4">
            <button onclick="likePost(this)">
                <i data-lucide="heart"></i>
            </button>

            <button onclick="commentPost()">
                <i data-lucide="message-circle"></i>
            </button>

            <button onclick="sharePost()">
                <i data-lucide="send"></i>
            </button>
        </div>

        <button onclick="savePost(this)">
            <i data-lucide="bookmark"></i>
        </button>
    `;

    post.append(actions);

    feed.prepend(post);

    document.getElementById("postText").value = "";
    document.getElementById("postImage").value = "";

    initializeIcons();

}

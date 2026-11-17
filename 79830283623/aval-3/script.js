
/* =================================
   INSTAGRAM CLONE - JAVASCRIPT
================================= */

// USUÁRIOS
const users = [
    "mariana_silva",
    "pedro_oficial",
    "ana",
    "lucas",
    "gabriel",
    "carolina"
];

let followed = {};
let currentStory = 0;

// STORIES
const stories = [
    {
        user: "Seu story",
        image: "https://picsum.photos/id/100/600/800"
    },
    {
        user: "mariana",
        image: "https://picsum.photos/id/1015/600/800"
    },
    {
        user: "pedro",
        image: "https://picsum.photos/id/1025/600/800"
    },
    {
        user: "ana",
        image: "https://picsum.photos/id/1035/600/800"
    },
    {
        user: "lucas",
        image: "https://picsum.photos/id/1043/600/800"
    }
];


/* =================================
   NAVEGAÇÃO ENTRE ABAS
================================= */

function showPage(page) {

    document.querySelectorAll("main section").forEach(section => {
        section.classList.remove("active");
    });

    const selectedPage = document.getElementById(page);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }
}


/* =================================
   STORIES
================================= */

function openStory(index) {

    currentStory = index;

    renderStory();

    document.getElementById("storyViewer").style.display = "flex";
}

function renderStory() {

    document.getElementById("storyUser").textContent =
        stories[currentStory].user;

    document.getElementById("storyImage").src =
        stories[currentStory].image;
}

function nextStory() {

    if (currentStory < stories.length - 1) {

        currentStory++;

        renderStory();

    } else {

        closeStory();
    }
}

function previousStory() {

    if (currentStory > 0) {

        currentStory--;

        renderStory();
    }
}

function closeStory() {

    document.getElementById("storyViewer").style.display = "none";
}

// FECHAR STORY COM ESC
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeStory();
        closeCreate();
    }

    if (event.key === "ArrowRight") {
        if (document.getElementById("storyViewer").style.display === "flex") {
            nextStory();
        }
    }

    if (event.key === "ArrowLeft") {
        if (document.getElementById("storyViewer").style.display === "flex") {
            previousStory();
        }
    }
});


/* =================================
   CURTIDAS
================================= */

function likePost(button) {

    const post = button.closest(".post");

    const likes = post.querySelector(".likes");

    let count = parseInt(
        likes.textContent.replace(/\D/g, "")
    ) || 0;

    if (button.textContent.trim() === "♡") {

        button.textContent = "❤️";

        count++;

    } else {

        button.textContent = "♡";

        count--;
    }

    likes.textContent =
        count.toLocaleString("pt-BR") + " curtidas";
}


/* =================================
   SALVAR PUBLICAÇÕES
================================= */

function savePost(button) {

    if (button.textContent.trim() === "🔖") {

        button.textContent = "✅";

        alert("Publicação salva!");

    } else {

        button.textContent = "🔖";

        alert("Publicação removida dos salvos!");
    }
}


/* =================================
   COMENTÁRIOS
================================= */

function focusComment(button) {

    const post = button.closest(".post");

    post.querySelector("input").focus();
}

function commentPost(event, form) {

    event.preventDefault();

    const input = form.querySelector("input");

    const commentText = input.value.trim();

    if (!commentText) return;

    const comment = document.createElement("p");

    comment.textContent = "Você: " + commentText;

    form.parentElement
        .querySelector(".comments-list")
        .appendChild(comment);

    input.value = "";
}


/* =================================
   COMPARTILHAMENTO
================================= */

function sharePost() {

    if (navigator.share) {

        navigator.share({
            title: "Instagram Clone",
            text: "Confira esta publicação!"
        }).catch(() => {});

    } else if (navigator.clipboard) {

        navigator.clipboard.writeText(
            "Confira esta publicação no Instagram Clone!"
        );

        alert("Texto copiado para compartilhar!");

    } else {

        alert("Compartilhamento demonstrativo!");
    }
}


/* =================================
   PESQUISA DE USUÁRIOS
================================= */

function searchUsers() {

    const value = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const results = document.getElementById("searchResults");

    results.innerHTML = "";

    users
        .filter(user => user.includes(value) && value !== "")
        .forEach(user => {

            const div = document.createElement("div");

            div.className = "suggestion";

            const name = document.createElement("strong");

            name.textContent = user;

            const button = document.createElement("button");

            button.textContent = followed[user]
                ? "Seguindo"
                : "Seguir";

            button.onclick = function() {

                followed[user] = !followed[user];

                button.textContent = followed[user]
                    ? "Seguindo"
                    : "Seguir";
            };

            div.appendChild(name);

            div.appendChild(button);

            results.appendChild(div);
        });

    if (results.innerHTML === "") {

        results.textContent = value
            ? "Nenhum usuário encontrado."
            : "Pesquise um usuário.";
    }
}


/* =================================
   MENSAGENS
================================= */

function sendMessage(event) {

    event.preventDefault();

    const input = document.getElementById("messageInput");

    const text = input.value.trim();

    if (!text) return;

    const message = document.createElement("p");

    message.textContent = "Você: " + text;

    document.getElementById("messages").appendChild(message);

    input.value = "";
}


/* =================================
   CRIAR PUBLICAÇÃO
================================= */

function openCreate() {

    document.getElementById("createModal").style.display = "flex";
}

function closeCreate() {

    document.getElementById("createModal").style.display = "none";
}

function escapeHTML(text) {

    return text.replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function publishPost() {

    const file = document.getElementById("imageInput").files[0];

    const caption = document.getElementById("captionInput").value;

    if (!file) {

        alert("Selecione uma imagem!");

        return;
    }

    if (!file.type.startsWith("image/")) {

        alert("Selecione um arquivo de imagem válido!");

        return;
    }

    const url = URL.createObjectURL(file);

    const article = document.createElement("article");

    article.className = "post";

    article.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>seu_perfil</strong>
        </div>

        <img class="post-image" src="${url}">

        <div class="post-actions">
            <button onclick="likePost(this)">♡</button>
            <button onclick="focusComment(this)">💬</button>
            <button onclick="sharePost()">📤</button>
            <button onclick="savePost(this)">🔖</button>
        </div>

        <div class="post-info">
            <p><strong class="likes">0 curtidas</strong></p>

            <p>
                <strong>seu_perfil</strong>
                ${escapeHTML(caption)}
            </p>

            <div class="comments-list"></div>

            <form class="comment-form" onsubmit="commentPost(event,this)">
                <input placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </div>
    `;

    document.getElementById("feed").prepend(article);

    document.getElementById("imageInput").value = "";

    document.getElementById("captionInput").value = "";

    closeCreate();

    showPage("home");

    alert("Publicação criada com sucesso!");
}


/* =================================
   EDITAR PERFIL
================================= */

function editProfile() {

    const name = prompt("Digite o nome do seu perfil:");

    if (name && name.trim()) {

        document.getElementById("profileName").textContent =
            name.trim();
    }
}


/* =================================
   FECHAR MODAL AO CLICAR FORA
================================= */

document.getElementById("createModal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {
            closeCreate();
        }
    }
);


/* =================================
   INICIALIZAÇÃO
================================= */

document.addEventListener("DOMContentLoaded", function() {

    showPage("home");

    console.log("Instagram Clone iniciado!");

});

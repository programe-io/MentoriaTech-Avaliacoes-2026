let totalPosts = 0;

// CURTIR
function likePost(button) {
    const count = button.querySelector("span");

    if (!count) return;

    let number = Number(count.textContent);

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        count.textContent = number - 1;
    } else {
        button.classList.add("liked");
        count.textContent = number + 1;
    }
}

// COMENTAR
function addComment(button) {
    const area = button.parentElement;
    const input = area.querySelector("input");
    const text = input.value.trim();

    if (!text) return;

    const comments = area.previousElementSibling;
    const comment = document.createElement("div");

    comment.className = "comment";
    comment.textContent = "💪 Você: " + text;

    comments.appendChild(comment);
    input.value = "";
}

// ABRIR COMENTÁRIO
function focusComment(button) {
    const post = button.closest(".post");
    post.querySelector(".comment-area input").focus();
}

// CRIAR PUBLICAÇÃO
function createPost() {
    const text = document.getElementById("postText");
    const image = document.getElementById("postImage");

    const description = text.value.trim();
    const imageUrl = image.value.trim();

    if (!description) {
        alert("Escreva alguma coisa sobre seu treino!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-user";
    header.innerHTML = `
        <div class="avatar">EU</div>
        <div>
            <strong>Meu Perfil</strong>
            <small>💪 Fitness · Agora</small>
        </div>
    `;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    post.appendChild(header);

    if (imageUrl) {
        try {
            const url = new URL(imageUrl);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const img = document.createElement("img");
                img.className = "post-img";
                img.src = url.href;
                img.alt = "Foto do treino";
                img.onerror = () => img.remove();
                post.appendChild(img);
            }
        } catch {
            alert("Digite um endereço de imagem válido.");
            return;
        }
    }

    post.appendChild(paragraph);

    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.innerHTML = `
        <button onclick="likePost(this)">❤️ <span>0</span></button>
        <button onclick="focusComment(this)">💬 Comentar</button>
        <button onclick="sharePost()">↗ Compartilhar</button>
    `;

    post.appendChild(actions);

    const comments = document.createElement("div");
    comments.className = "comments";
    post.appendChild(comments);

    const commentArea = document.createElement("div");
    commentArea.className = "comment-area";
    commentArea.innerHTML = `
        <input placeholder="Adicione um comentário...">
        <button onclick="addComment(this)">Enviar</button>
    `;

    post.appendChild(commentArea);

    document.getElementById("feed").prepend(post);

    totalPosts++;
    document.getElementById("myPosts").textContent = totalPosts;

    text.value = "";
    image.value = "";
}

// COMPARTILHAR
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "Fitgram",
            text: "Confira esta publicação fitness!"
        }).catch(() => {});
    } else {
        alert("Compartilhamento disponível pelo seu dispositivo!");
    }
}

// PESQUISAR
document.getElementById("search").addEventListener("input", function() {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});

// NAVEGAÇÃO
function showFeed() {
    window.scrollTo({top: 0, behavior: "smooth"});
}

function showExplore() {
    document.getElementById("search").focus();
}

function showNotifications() {
    alert("Você não tem novas notificações!");
}

function showProfile() {
    alert("Perfil do atleta!");
}

function showTraining() {
    alert("Área de treinos!");
}

function showAthletes() {
    alert("Conheça outros atletas!");
}

function showSports() {
    alert("Explore os esportes!");
}
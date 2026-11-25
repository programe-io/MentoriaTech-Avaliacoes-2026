
const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");
const postsContainer = document.getElementById("posts");

const currentUser = {
    name: "Meu Perfil",
    photo: "https://i.pravatar.cc/100?img=12"
};

let posts = JSON.parse(localStorage.getItem("miniSocialPosts")) || [];

// SALVAR PUBLICAÇÕES
function savePosts() {
    localStorage.setItem("miniSocialPosts", JSON.stringify(posts));
}

// FORMATAR DATA
function getDate() {
    return new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });
}

// CRIAR PUBLICAÇÃO
function createPost() {

    const text = postText.value.trim();

    if (!text) {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = {
        id: Date.now() + Math.random(),
        user: currentUser.name,
        photo: currentUser.photo,
        text: text,
        date: getDate(),
        likes: 0,
        liked: false,
        comments: []
    };

    posts.unshift(post);

    savePosts();
    renderPosts();

    postText.value = "";
}

publishBtn.addEventListener("click", createPost);

// RENDERIZAR FEED
function renderPosts() {

    postsContainer.innerHTML = "";

    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="empty">
                <h3>Nenhuma publicação ainda</h3>
                <p>Seja o primeiro a compartilhar alguma coisa!</p>
            </div>
        `;
        return;
    }

    posts.forEach(post => {

        const article = document.createElement("article");
        article.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = post.photo;
        avatar.alt = "Foto de perfil";

        const info = document.createElement("div");
        info.className = "post-info";

        const name = document.createElement("strong");
        name.textContent = post.user;

        const date = document.createElement("small");
        date.textContent = post.date;

        info.append(name, date);

        header.append(avatar, info);

        // BOTÃO EXCLUIR
        if (post.user === currentUser.name) {

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete";
            deleteBtn.textContent = "Excluir";

            deleteBtn.addEventListener("click", () => {
                posts = posts.filter(p => p.id !== post.id);
                savePosts();
                renderPosts();
            });

            header.appendChild(deleteBtn);
        }

        // TEXTO
        const text = document.createElement("p");
        text.className = "post-text";
        text.textContent = post.text;

        // AÇÕES
        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeBtn = document.createElement("button");
        likeBtn.className = post.liked ? "liked" : "";
        likeBtn.textContent = `${post.liked ? "❤️" : "♡"} Curtir (${post.likes})`;

        likeBtn.addEventListener("click", () => {

            post.liked = !post.liked;

            post.likes += post.liked ? 1 : -1;

            savePosts();
            renderPosts();
        });

        const commentBtn = document.createElement("button");
        commentBtn.textContent = "💬 Comentar";

        commentBtn.addEventListener("click", () => {
            commentInput.focus();
        });

        actions.append(likeBtn, commentBtn);

        // COMENTÁRIOS
        const commentList = document.createElement("div");
        commentList.className = "comment-list";

        post.comments.forEach(comment => {

            const item = document.createElement("div");
            item.className = "comment";

            const strong = document.createElement("strong");
            strong.textContent = comment.user;

            const content = document.createElement("span");
            content.textContent = comment.text;

            item.append(strong, content);
            commentList.appendChild(item);
        });

        // CAMPO DE COMENTÁRIO
        const commentBox = document.createElement("div");
        commentBox.className = "comment-box";

        const commentInput = document.createElement("input");
        commentInput.placeholder = "Escreva um comentário...";

        const sendComment = document.createElement("button");
        sendComment.textContent = "Enviar";

        function addComment() {

            const value = commentInput.value.trim();

            if (!value) return;

            post.comments.push({
                user: currentUser.name,
                text: value
            });

            savePosts();
            renderPosts();
        }

        sendComment.addEventListener("click", addComment);

        commentInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                addComment();
            }
        });

        commentBox.append(commentInput, sendComment);

        article.append(
            header,
            text,
            actions,
            commentList,
            commentBox
        );

        postsContainer.appendChild(article);

    });
}

// CARREGAR PUBLICAÇÕES SALVAS
renderPosts();

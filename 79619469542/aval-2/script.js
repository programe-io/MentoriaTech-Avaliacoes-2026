
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const publishBtn = document.getElementById("publishBtn");
const postsContainer = document.getElementById("posts");

const user = {
    name: "Meu Perfil",
    photo: "https://i.pravatar.cc/100?img=12"
};

let posts = JSON.parse(
    localStorage.getItem("socialFeedPosts")
) || [];

// SALVAR
function savePosts() {
    localStorage.setItem(
        "socialFeedPosts",
        JSON.stringify(posts)
    );
}

// DATA
function getDate() {
    return new Date().toLocaleString("pt-BR");
}

// CRIAR POSTAGEM
publishBtn.addEventListener("click", () => {

    const text = postText.value.trim();
    const image = postImage.value.trim();

    if (!text && !image) {
        alert("Escreva algo ou adicione uma imagem!");
        return;
    }

    const post = {
        id: Date.now() + Math.random(),
        user: user.name,
        photo: user.photo,
        text,
        image,
        date: getDate(),
        likes: 0,
        liked: false,
        comments: [],
        shares: 0
    };

    posts.unshift(post);

    savePosts();
    renderPosts();

    postText.value = "";
    postImage.value = "";

});

// RENDERIZAR
function renderPosts() {

    postsContainer.innerHTML = "";

    posts.forEach(post => {

        const article = document.createElement("article");
        article.className = "post";

        // CABEÇALHO
        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = post.photo;

        const info = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = post.user;

        const date = document.createElement("small");
        date.textContent = post.date;

        info.append(name, date);
        header.append(avatar, info);

        // EXCLUIR
        if (post.user === user.name) {

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "more";
            deleteBtn.textContent = "🗑️";

            deleteBtn.addEventListener("click", () => {

                if (!confirm("Deseja excluir esta publicação?")) return;

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

        // IMAGEM
        const elements = [header, text];

        if (post.image) {

            const img = document.createElement("img");
            img.className = "post-image";
            img.src = post.image;
            img.alt = "Imagem da publicação";

            img.onerror = () => img.remove();

            elements.push(img);
        }

        // ESTATÍSTICAS
        const stats = document.createElement("div");
        stats.className = "post-stats";

        const likesCount = document.createElement("span");
        likesCount.textContent = `❤️ ${post.likes} curtidas`;

        const commentsCount = document.createElement("span");
        commentsCount.textContent =
            `${post.comments.length} comentários`;

        stats.append(likesCount, commentsCount);

        // AÇÕES
        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeBtn = document.createElement("button");
        likeBtn.className = post.liked ? "like-btn liked" : "like-btn";
        likeBtn.textContent = post.liked ? "❤️ Curtido" : "♡ Curtir";

        likeBtn.addEventListener("click", () => {

            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;

            savePosts();
            renderPosts();

        });

        const commentBtn = document.createElement("button");
        commentBtn.className = "comment-btn";
        commentBtn.textContent = "💬 Comentar";

        const shareBtn = document.createElement("button");
        shareBtn.className = "share-btn";
        shareBtn.textContent = "↗ Compartilhar";

        actions.append(likeBtn, commentBtn, shareBtn);

        // COMENTÁRIOS
        const comments = document.createElement("div");
        comments.className = "comments";

        post.comments.forEach(item => {

            const comment = document.createElement("div");
            comment.className = "comment";

            const strong = document.createElement("strong");
            strong.textContent = item.user + ": ";

            const content = document.createElement("span");
            content.textContent = item.text;

            comment.append(strong, content);
            comments.appendChild(comment);

        });

        // CAMPO DE COMENTÁRIO
        const commentInput = document.createElement("input");
        commentInput.placeholder = "Escreva um comentário...";

        const sendComment = document.createElement("button");
        sendComment.textContent = "Enviar";

        function addComment() {

            const value = commentInput.value.trim();

            if (!value) return;

            post.comments.push({
                user: user.name,
                text: value
            });

            savePosts();
            renderPosts();

        }

        sendComment.addEventListener("click", addComment);

        commentInput.addEventListener("keydown", event => {
            if (event.key === "Enter") addComment();
        });

        const commentArea = document.createElement("div");
        commentArea.className = "comment-input";

        commentArea.append(commentInput, sendComment);

        commentBtn.addEventListener("click", () => {
            commentInput.focus();
        });

        // COMPARTILHAR
        shareBtn.addEventListener("click", async () => {

            const shareText = `${post.user}: ${post.text}`;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "SocialFeed",
                        text: shareText
                    });
                } catch (error) {
                    // Compartilhamento cancelado.
                }
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareText);
                alert("Texto copiado!");
            } else {
                alert(shareText);
            }

        });

        article.append(
            ...elements.slice(0, 2)
        );

        if (post.image) article.appendChild(elements[2]);

        article.append(
            stats,
            actions,
            comments,
            commentArea
        );

        postsContainer.appendChild(article);

    });

}

// SEGUIR
document.querySelectorAll(".follow-btn").forEach(button => {

    button.addEventListener("click", () => {

        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";

    });

});

// CARREGAR
renderPosts();

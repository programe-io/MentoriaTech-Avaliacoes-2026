
const postsContainer = document.getElementById("posts");

const modal = document.getElementById("createModal");

const openModal = document.getElementById("openCreate");
const closeModal = document.getElementById("closeModal");

const publishPost = document.getElementById("publishPost");

const imageURL = document.getElementById("imageURL");
const caption = document.getElementById("caption");

const user = {
    name: "seu_perfil",
    photo: "https://i.pravatar.cc/100?img=12"
};

let posts = JSON.parse(
    localStorage.getItem("instagramPosts")
) || [];

// ABRIR MODAL
openModal.addEventListener("click", event => {
    event.preventDefault();
    modal.style.display = "flex";
});

// FECHAR MODAL
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// SALVAR
function savePosts() {
    localStorage.setItem(
        "instagramPosts",
        JSON.stringify(posts)
    );
}

// PUBLICAR
publishPost.addEventListener("click", () => {

    const image = imageURL.value.trim();
    const text = caption.value.trim();

    if (!image && !text) {
        alert("Adicione uma imagem ou uma legenda!");
        return;
    }

    const post = {
        id: Date.now() + Math.random(),
        user: user.name,
        photo: user.photo,
        image,
        text,
        likes: 0,
        liked: false,
        saved: false,
        comments: [],
        date: new Date().toLocaleString("pt-BR")
    };

    posts.unshift(post);

    savePosts();
    renderPosts();

    imageURL.value = "";
    caption.value = "";

    modal.style.display = "none";
});

// RENDERIZAR FEED
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

        const username = document.createElement("strong");
        username.textContent = post.user;

        const more = document.createElement("span");
        more.textContent = "•••";

        header.append(avatar, username, more);

        // IMAGEM
        const image = document.createElement("img");
        image.className = "post-image";
        image.src = post.image;
        image.alt = "Publicação";

        if (!post.image) image.style.display = "none";

        // AÇÕES
        const actions = document.createElement("div");
        actions.className = "post-actions";

        const like = document.createElement("button");
        like.className = post.liked ? "like liked" : "like";
        like.textContent = post.liked ? "♥" : "♡";

        like.addEventListener("click", () => {

            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;

            savePosts();
            renderPosts();

        });

        const commentFocus = document.createElement("button");
        commentFocus.className = "comment-focus";
        commentFocus.textContent = "💬";

        const share = document.createElement("button");
        share.className = "share";
        share.textContent = "➤";

        const save = document.createElement("button");
        save.className = "save";
        save.textContent = post.saved ? "♣" : "♧";

        save.addEventListener("click", () => {

            post.saved = !post.saved;

            savePosts();
            renderPosts();

        });

        actions.append(like, commentFocus, share, save);

        // CONTEÚDO
        const content = document.createElement("div");
        content.className = "post-content";

        const likes = document.createElement("strong");
        likes.className = "likes";
        likes.textContent =
            `${post.likes.toLocaleString("pt-BR")} curtidas`;

        const description = document.createElement("p");

        const name = document.createElement("strong");
        name.textContent = post.user + " ";

        description.append(name, document.createTextNode(post.text));

        // COMENTÁRIOS
        const comments = document.createElement("div");
        comments.className = "comments";

        post.comments.forEach(item => {

            const comment = document.createElement("p");
            comment.className = "comment";

            const commentUser = document.createElement("strong");
            commentUser.textContent = item.user + " ";

            comment.append(
                commentUser,
                document.createTextNode(item.text)
            );

            comments.appendChild(comment);

        });

        // INPUT
        const area = document.createElement("div");
        area.className = "comment-area";

        const input = document.createElement("input");
        input.placeholder = "Adicione um comentário...";

        const button = document.createElement("button");
        button.textContent = "Publicar";

        function addComment() {

            if (!input.value.trim()) return;

            post.comments.push({
                user: user.name,
                text: input.value.trim()
            });

            savePosts();
            renderPosts();

        }

        button.addEventListener("click", addComment);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") addComment();
        });

        area.append(input, button);

        commentFocus.addEventListener("click", () => {
            input.focus();
        });

        // COMPARTILHAR
        share.addEventListener("click", async () => {

            const text = `${post.user}: ${post.text}`;

            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Instagram Clone",
                        text
                    });
                } catch (error) {
                    // Compartilhamento cancelado.
                }
            } else {
                try {
                    await navigator.clipboard.writeText(text);
                    alert("Publicação copiada!");
                } catch {
                    alert(text);
                }
            }

        });

        content.append(likes, description, comments, area);

        article.append(header, image, actions, content);

        postsContainer.appendChild(article);

    });

}

// SEGUIR
document.querySelectorAll(".follow").forEach(button => {

    button.addEventListener("click", () => {

        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";

    });

});

// CARREGAR PUBLICAÇÕES
renderPosts();

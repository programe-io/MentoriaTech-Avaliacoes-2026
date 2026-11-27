const postsContainer = document.getElementById("posts");
const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");

const currentUser = {
    name: "Lucas",
    avatar: "https://i.pravatar.cc/100?img=12"
};

// PUBLICAÇÕES INICIAIS

const initialPosts = [
    {
        id: 1,
        name: "Mariana Silva",
        avatar: "https://i.pravatar.cc/100?img=5",
        text: "Hoje foi um dia incrível! Aproveitando cada momento da vida. ❤️",
        time: "Há 10 minutos",
        likes: 12,
        liked: false,
        comments: [
            { name: "Pedro Santos", text: "Que bom! 😍" },
            { name: "Ana Oliveira", text: "Você merece!" }
        ],
        owner: false
    },
    {
        id: 2,
        name: "Pedro Santos",
        avatar: "https://i.pravatar.cc/100?img=11",
        text: "Nada melhor do que começar o dia com um bom café e muita disposição! ☕",
        time: "Há 30 minutos",
        likes: 8,
        liked: false,
        comments: [
            { name: "Lucas", text: "Concordo totalmente!" }
        ],
        owner: false
    },
    {
        id: 3,
        name: "Lucas",
        avatar: currentUser.avatar,
        text: "Bem-vindos ao meu novo espaço social! 🚀",
        time: "Há 1 hora",
        likes: 5,
        liked: false,
        comments: [],
        owner: true
    }
];

// LOCAL STORAGE

let posts = JSON.parse(localStorage.getItem("socialPosts"));

if (!posts) {
    posts = initialPosts;
    savePosts();
}

function savePosts() {
    localStorage.setItem("socialPosts", JSON.stringify(posts));
}

// MOSTRAR PUBLICAÇÕES

function renderPosts() {
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = post.avatar;
        avatar.alt = "Foto de perfil";

        const userInfo = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = post.name;

        const time = document.createElement("small");
        time.textContent = post.time;

        userInfo.append(name, time);
        header.append(avatar, userInfo);

        if (post.owner) {
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "🗑";
            deleteBtn.title = "Excluir publicação";
            deleteBtn.addEventListener("click", () => deletePost(post.id));
            header.appendChild(deleteBtn);
        }

        const content = document.createElement("div");
        content.className = "post-content";
        content.textContent = post.text;

        const stats = document.createElement("div");
        stats.className = "post-stats";

        const likeCount = document.createElement("span");
        likeCount.textContent = `👍 ${post.likes} curtidas`;

        const commentCount = document.createElement("span");
        commentCount.textContent = `${post.comments.length} comentários`;

        stats.append(likeCount, commentCount);

        // BOTÕES DE INTERAÇÃO

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeBtn = document.createElement("button");
        likeBtn.textContent = post.liked ? "👍 Curtido" : "👍 Curtir";
        likeBtn.className = post.liked ? "liked" : "";

        likeBtn.addEventListener("click", () => {
            toggleLike(post.id);
        });

        const commentBtn = document.createElement("button");
        commentBtn.textContent = "💬 Comentar";

        commentBtn.addEventListener("click", () => {
            const input = article.querySelector(".comment-input");
            input.focus();
        });

        actions.append(likeBtn, commentBtn);

        // ÁREA DE COMENTÁRIOS

        const commentsArea = document.createElement("div");
        commentsArea.className = "comments";

        post.comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";

            const commentName = document.createElement("strong");
            commentName.textContent = comment.name;

            const commentText = document.createElement("span");
            commentText.textContent = comment.text;

            commentDiv.append(commentName, commentText);
            commentsArea.appendChild(commentDiv);
        });

        // FORMULÁRIO DE COMENTÁRIO

        const commentForm = document.createElement("form");
        commentForm.className = "comment-form";

        const commentInput = document.createElement("input");
        commentInput.className = "comment-input";
        commentInput.placeholder = "Escreva um comentário...";

        const sendBtn = document.createElement("button");
        sendBtn.type = "submit";
        sendBtn.textContent = "Enviar";

        commentForm.append(commentInput, sendBtn);

        commentForm.addEventListener("submit", event => {
            event.preventDefault();
            addComment(post.id, commentInput.value);
        });

        article.append(
            header,
            content,
            stats,
            actions,
            commentsArea,
            commentForm
        );

        postsContainer.appendChild(article);
    });
}

// PUBLICAR

publishBtn.addEventListener("click", () => {
    const text = postText.value.trim();

    if (!text) {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const newPost = {
        id: Date.now(),
        name: currentUser.name,
        avatar: currentUser.avatar,
        text: text,
        time: "Agora mesmo",
        likes: 0,
        liked: false,
        comments: [],
        owner: true
    };

    posts.unshift(newPost);

    savePosts();
    renderPosts();

    postText.value = "";
});

// CURTIR / DESCURTIR

function toggleLike(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    savePosts();
    renderPosts();
}

// COMENTAR

function addComment(id, text) {
    if (!text.trim()) return;

    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.comments.push({
        name: currentUser.name,
        text: text.trim()
    });

    savePosts();
    renderPosts();
}

// EXCLUIR PUBLICAÇÃO

function deletePost(id) {
    const post = posts.find(p => p.id === id);

    if (!post || !post.owner) return;

    const confirmDelete = confirm(
        "Deseja realmente excluir esta publicação?"
    );

    if (!confirmDelete) return;

    posts = posts.filter(p => p.id !== id);

    savePosts();
    renderPosts();
}

// PESQUISAR PUBLICAÇÕES

document.getElementById("search").addEventListener("input", event => {
    const search = event.target.value.toLowerCase();

    const filteredPosts = posts.filter(post =>
        post.name.toLowerCase().includes(search) ||
        post.text.toLowerCase().includes(search)
    );

    const originalPosts = posts;

    posts = filteredPosts;
    renderPosts();
    posts = originalPosts;
});

// INICIAR FEED

renderPosts();


document.addEventListener("DOMContentLoaded", function () {

    const menuItems = document.querySelectorAll(".menu-item");
    const pages = document.querySelectorAll(".page");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const pageName = item.dataset.page;

            // Esconde todas as páginas
            pages.forEach(function (page) {
                page.classList.add("hidden");
            });

            // Remove seleção de todos os menus
            menuItems.forEach(function (menu) {
                menu.classList.remove("active");
            });

            // Mostra a página selecionada
            const selectedPage = document.getElementById(
                "pagina-" + pageName
            );

            if (selectedPage) {
                selectedPage.classList.remove("hidden");
            }

            // Destaca o menu selecionado
            item.classList.add("active");

        });

    });

});

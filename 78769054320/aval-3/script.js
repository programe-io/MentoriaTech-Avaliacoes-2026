
let posts = [
    {
        user: "mariana.silva",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
        likes: 1250,
        caption: "Um dia maravilhoso! ❤️",
        comments: []
    },
    {
        user: "lucas.fotografia",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        likes: 850,
        caption: "A natureza é incrível! 🌿",
        comments: []
    }
];

function showPage(page) {
    const content = document.getElementById("content");

    if (page === "home") {
        renderPosts();
    }

    if (page === "profile") {
        content.innerHTML = `
            <h2>Juninho</h2>
            <p>@juninho_perneta</p>
            <p>${posts.length} publicações</p>
        `;
    }

    if (page === "search") {
        content.innerHTML = `
            <h2>Pesquisar</h2>
            <input id="search" placeholder="Pesquisar usuários...">
        `;
    }

    if (page === "messages") {
        content.innerHTML = `
            <h2>Mensagens</h2>
            <p>Suas conversas aparecerão aqui.</p>
        `;
    }

    if (page === "explore") {
        renderPosts();
    }
}

function renderPosts() {
    const content = document.getElementById("content");

    content.innerHTML = `
        <div class="stories">
            <div class="story" onclick="viewStory()">
                <img src="https://i.pravatar.cc/100?img=12">
                <p>Seu story</p>
            </div>
            <div class="story" onclick="viewStory()">
                <img src="https://i.pravatar.cc/100?img=32">
                <p>Mariana</p>
            </div>
            <div class="story" onclick="viewStory()">
                <img src="https://i.pravatar.cc/100?img=45">
                <p>Lucas</p>
            </div>
        </div>
    `;

    posts.forEach((post, index) => {
        content.innerHTML += `
            <div class="post">
                <div class="post-header">
                    ${post.user}
                </div>

                <img src="${post.image}">

                <div class="actions">
                    <button onclick="likePost(${index}, this)">♡</button>
                    <button onclick="commentPost(${index})">💬</button>
                    <button onclick="sharePost(${index})">➤</button>
                    <button onclick="savePost(${index})">▢</button>
                </div>

                <div class="post-info">
                    <p class="likes">
                        ${post.likes} curtidas
                    </p>

                    <p>
                        <strong>${post.user}</strong>
                        ${post.caption}
                    </p>

                    <div id="comments-${index}">
                        ${post.comments.map(c => `<p>${c}</p>`).join("")}
                    </div>
                </div>

                <form class="comment-form"
                    onsubmit="addComment(event, ${index})">

                    <input id="comment-${index}"
                        placeholder="Adicione um comentário...">

                    <button>Publicar</button>
                </form>
            </div>
        `;
    });
}

function likePost(index, button) {
    posts[index].likes++;
    button.innerHTML = "♥";
    button.style.color = "red";
    renderPosts();
}

function commentPost(index) {
    document.getElementById(`comment-${index}`).focus();
}

function addComment(event, index) {
    event.preventDefault();

    const input = document.getElementById(`comment-${index}`);

    if (!input.value.trim()) return;

    posts[index].comments.push(input.value.trim());

    renderPosts();
}

function sharePost(index) {
    const post = posts[index];

    if (navigator.share) {
        navigator.share({
            title: post.user,
            text: post.caption
        });
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

function savePost(index) {
    alert("Publicação salva!");
}

function viewStory() {
    alert("Você está visualizando um Story!");
}

function openCreate() {
    const caption = prompt("Digite a legenda da publicação:");
    const image = prompt("Cole o endereço de uma imagem:");

    if (!image) return;

    posts.unshift({
        user: "seu_perfil",
        image: image,
        likes: 0,
        caption: caption || "",
        comments: []
    });

    renderPosts();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

showPage("home");

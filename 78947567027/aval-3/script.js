
const feed = document.getElementById("feed");
const modal = document.getElementById("modal");

const openCreate = document.getElementById("openCreate");
const closeModal = document.getElementById("closeModal");

const postText = document.getElementById("postText");
const modalText = document.getElementById("modalText");
const imageUrl = document.getElementById("imageUrl");

const createPost = document.getElementById("createPost");
const publishModal = document.getElementById("publishModal");
const search = document.getElementById("search");

// ABRIR MODAL
function abrirModal() {
    modal.classList.add("show");
}

function fecharModal() {
    modal.classList.remove("show");
}

openCreate.addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal();
});

closeModal.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
});

// CRIAR PUBLICAÇÃO
function publicar(texto, imagem = "") {

    if (!texto.trim()) {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const info = document.createElement("div");

    const username = document.createElement("strong");
    username.textContent = "meu_usuario";

    const time = document.createElement("small");
    time.textContent = "Agora mesmo";

    info.append(username, time);
    header.append(avatar, info);

    const caption = document.createElement("p");
    caption.style.padding = "15px 18px";
    caption.textContent = texto;

    post.append(header);

    if (imagem.trim()) {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const img = document.createElement("img");
                img.className = "post-image";
                img.src = url.href;
                img.alt = "Imagem da publicação";
                post.append(img);
            }
        } catch {
            alert("URL da imagem inválida. A publicação será feita sem imagem.");
        }
    }

    post.append(caption);

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like";
    like.textContent = "♡";

    const comment = document.createElement("button");
    comment.textContent = "💬";

    actions.append(like, comment);

    const postInfo = document.createElement("div");
    postInfo.className = "post-info";

    const likes = document.createElement("strong");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    postInfo.append(likes);
    post.append(actions, postInfo);

    configurarCurtida(post);

    feed.prepend(post);

    fecharModal();
    modalText.value = "";
    imageUrl.value = "";
    postText.value = "";
}

// PUBLICAÇÃO RÁPIDA
createPost.addEventListener("click", () => {
    publicar(postText.value);
});

// PUBLICAÇÃO PELO MODAL
publishModal.addEventListener("click", () => {
    publicar(modalText.value, imageUrl.value);
});

// CURTIDAS
function configurarCurtida(post) {
    const button = post.querySelector(".like");

    if (!button) return;

    let curtidas = 0;

    button.addEventListener("click", () => {
        const liked = button.classList.toggle("liked");

        curtidas += liked ? 1 : -1;

        button.textContent = liked ? "♥" : "♡";

        const likes = post.querySelector(".likes");

        if (likes) {
            likes.textContent = `${curtidas} curtidas`;
        }
    });
}

// CURTIDAS DAS PUBLICAÇÕES INICIAIS
document.querySelectorAll(".post").forEach(configurarCurtida);

// COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {
    const input = post.querySelector(".comment-area input");
    const button = post.querySelector(".comment-area button");

    if (!input || !button) return;

    button.addEventListener("click", () => {
        const texto = input.value.trim();

        if (!texto) return;

        const comentario = document.createElement("p");
        comentario.style.padding = "5px 18px";
        comentario.textContent = "meu_usuario: " + texto;

        post.querySelector(".post-info").append(comentario);

        input.value = "";
    });
});

// PESQUISA
search.addEventListener("input", () => {
    const termo = search.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const texto = post.textContent.toLowerCase();

        post.style.display = texto.includes(termo)
            ? "block"
            : "none";
    });
});

// SUGESTÕES DE SEGUIR
document.querySelectorAll(".suggestion button").forEach(button => {
    button.addEventListener("click", () => {
        const seguindo = button.textContent === "Seguindo";

        button.textContent = seguindo ? "Seguir" : "Seguindo";
        button.style.color = seguindo ? "#a78bfa" : "#22c55e";
    });
});

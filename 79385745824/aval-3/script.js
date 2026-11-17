// ======================================
// INSTAGRAM - PAULIMHO O LOKO 🔥
// ======================================

// CURTIDAS
document.querySelectorAll(".post").forEach(post => {
    const like = post.querySelector(".like");
    
    if (like) {
        like.addEventListener("click", () => {
            like.classList.toggle("liked");

            if (like.classList.contains("liked")) {
                like.textContent = "♥";
            } else {
                like.textContent = "♡";
            }
        });
    }
});


// COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {
    const input = post.querySelector(".comment-box input");
    const button = post.querySelector(".comment-box button");
    const caption = post.querySelector(".caption");

    if (input && button && caption) {
        function publicarComentario() {
            const texto = input.value.trim();

            if (texto === "") return;

            const comentario = document.createElement("p");
            comentario.innerHTML =
                `<strong>Você:</strong> ${escapeHTML(texto)}`;

            caption.appendChild(comentario);
            input.value = "";
        }

        button.addEventListener("click", publicarComentario);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                publicarComentario();
            }
        });
    }
});


// PROTEÇÃO DO TEXTO DOS COMENTÁRIOS
function escapeHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}


// BOTÃO SEGUIR
let seguindo = false;

const botaoSeguir = document.createElement("button");

botaoSeguir.textContent = "Seguir";

botaoSeguir.style.cssText = `
    background: #0095f6;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 8px;
    margin: 12px;
    cursor: pointer;
    font-weight: bold;
`;

const perfil = document.querySelector(".profile");

if (perfil) {
    perfil.appendChild(botaoSeguir);

    botaoSeguir.addEventListener("click", () => {
        seguindo = !seguindo;

        botaoSeguir.textContent = seguindo
            ? "Seguindo"
            : "Seguir";

        botaoSeguir.style.background = seguindo
            ? "#333"
            : "#0095f6";
    });
}


// CRIAR PUBLICAÇÃO
function criarPublicacao(imagem, legenda) {
    const feed = document.querySelector("#feed");

    if (!feed) return;

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100">
            <strong>paulimho_oloko 🔥</strong>
        </div>

        <img class="post-image" src="${escapeHTML(imagem)}">

        <div class="actions">
            <span class="like">♡</span>
            <span>💬</span>
            <span>➤</span>
        </div>

        <div class="caption">
            <strong>paulimho_oloko</strong>
            <p>${escapeHTML(legenda)}</p>
        </div>

        <div class="comment-box">
            <input placeholder="Adicione um comentário...">
            <button>Publicar</button>
        </div>
    `;

    feed.prepend(post);

    ativarPost(post);
}


// ATIVAR CURTIDAS E COMENTÁRIOS
function ativarPost(post) {
    const like = post.querySelector(".like");

    like.addEventListener("click", () => {
        like.classList.toggle("liked");
        like.textContent =
            like.classList.contains("liked") ? "♥" : "♡";
    });

    const input = post.querySelector("input");
    const button = post.querySelector("button");
    const caption = post.querySelector(".caption");

    function comentar() {
        const texto = input.value.trim();

        if (!texto) return;

        const comentario = document.createElement("p");
        comentario.textContent = "Você: " + texto;

        caption.appendChild(comentario);
        input.value = "";
    }

    button.addEventListener("click", comentar);

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") comentar();
    });
}


// ANIMAÇÃO DOS STORIES
document.querySelectorAll(".story img").forEach(story => {
    story.addEventListener("click", () => {
        story.style.transform = "scale(1.15)";

        setTimeout(() => {
            story.style.transform = "scale(1)";
        }, 300);
    });
});

console.log("🔥 Instagram do Paulimho o Loko carregado!");
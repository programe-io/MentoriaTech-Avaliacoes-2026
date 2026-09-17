```javascript
/* =========================================
   FLASHFEED ⚡
   JavaScript
   ========================================= */


/* =========================================
   INICIALIZAÇÃO
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    carregarPosts();

    // Permite publicar usando Ctrl + Enter
    const textarea = document.getElementById("newPostText");

    if (textarea) {
        textarea.addEventListener("keydown", (event) => {
            if (event.ctrlKey && event.key === "Enter") {
                criarPost();
            }
        });
    }
});


/* =========================================
   CURTIR POST
   ========================================= */

function likePost(button) {

    const contador = button.querySelector("span");

    if (!contador) return;

    let curtidas = Number(contador.textContent) || 0;

    if (button.classList.contains("liked")) {

        // Retirar curtida
        curtidas--;

        button.classList.remove("liked");

    } else {

        // Adicionar curtida
        curtidas++;

        button.classList.add("liked");
    }

    contador.textContent = curtidas;
}


/* =========================================
   MOSTRAR / ESCONDER COMENTÁRIOS
   ========================================= */

function toggleComments(button) {

    const post = button.closest(".post");

    if (!post) return;

    const comments = post.querySelector(".comments");

    if (!comments) return;

    comments.classList.toggle("active");

    // Coloca o cursor automaticamente no campo
    if (comments.classList.contains("active")) {

        const input = comments.querySelector("input");

        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }
}


/* =========================================
   ADICIONAR COMENTÁRIO
   ========================================= */

function addComment(button) {

    const comments = button.closest(".comments");

    if (!comments) return;

    const input = comments.querySelector("input");

    if (!input) return;

    const texto = input.value.trim();

    if (texto === "") {

        input.focus();

        return;
    }


    // Remove mensagem "Ainda não existem comentários"
    const vazio = comments.querySelector(".empty");

    if (vazio) {
        vazio.remove();
    }


    // Cria o comentário
    const comentario = document.createElement("div");

    comentario.className = "comment";

    comentario.innerHTML = `
        <strong>Você ⚡</strong>
        <div>${escapeHTML(texto)}</div>
    `;


    // Coloca antes do campo de comentário
    const campo = comments.querySelector(".comment-input");

    comments.insertBefore(comentario, campo);


    // Limpa o input
    input.value = "";

    input.focus();
}


/* =========================================
   PERMITIR ENTER NO COMENTÁRIO
   ========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") return;

    const elemento = event.target;

    if (elemento.tagName !== "INPUT") return;

    if (!elemento.closest(".comment-input")) return;

    event.preventDefault();

    const button = elemento
        .closest(".comment-input")
        .querySelector("button");

    if (button) {
        addComment(button);
    }
});


/* =========================================
   CRIAR NOVA PUBLICAÇÃO
   ========================================= */

function criarPost() {

    const textarea = document.getElementById("newPostText");

    if (!textarea) return;

    const texto = textarea.value.trim();


    if (texto === "") {

        textarea.focus();

        return;
    }


    const post = criarElementoPost({
        usuario: "Você",
        tempo: "Agora",
        texto: texto,
        curtidas: 0,
        comentarios: []
    });


    const feed = document.getElementById("feed");

    if (!feed) return;


    // Coloca a nova publicação no topo
    feed.insertBefore(post, feed.firstChild);


    // Limpa o campo
    textarea.value = "";


    // Salva no navegador
    salvarPosts();


    // Pequeno destaque visual
    post.style.animation = "aparecer 0.4s ease";


    // Rola até a nova publicação
    setTimeout(() => {

        post.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);
}


/* =========================================
   COMPATIBILIDADE COM O HTML ANTERIOR
   ========================================= */

function createPost() {
    criarPost();
}


/* =========================================
   CRIAR ELEMENTO DE POST
   ========================================= */

function criarElementoPost(dados) {

    const post = document.createElement("article");

    post.className = "post";


    const comentariosHTML = dados.comentarios
        .map(comentario => `
            <div class="comment">
                <strong>${escapeHTML(comentario.usuario)}</strong>
                <div>${escapeHTML(comentario.texto)}</div>
            </div>
        `)
        .join("");


    post.innerHTML = `

        <div class="post-header">

            <img
                class="avatar"
                src="https://i.pravatar.cc/100?img=33"
                alt="Avatar"
            >

            <div class="user-info">

                <strong>
                    ${escapeHTML(dados.usuario)} ⚡
                </strong>

                <small>
                    ${escapeHTML(dados.tempo)} · Central City
                </small>

            </div>

        </div>


        <div class="post-text">
            ${escapeHTML(dados.texto)}
        </div>


        <div class="actions">

            <button
                class="action-btn like-btn"
                onclick="likePost(this)"
            >
                ❤️ Curtir <span>${dados.curtidas}</span>
            </button>


            <button
                class="action-btn"
                onclick="toggleComments(this)"
            >
                💬 Comentários
            </button>


            <button
                class="action-btn"
                onclick="sharePost(this)"
            >
                📤 Compartilhar
            </button>

        </div>


        <div class="comments">

            ${
                comentariosHTML ||
                `<div class="empty">
                    Ainda não existem comentários.
                </div>`
            }


            <div class="comment-input">

                <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    maxlength="300"
                >

                <button onclick="addComment(this)">
                    Enviar
                </button>

            </div>

        </div>
    `;


    return post;
}


/* =========================================
   COMPARTILHAR
   ========================================= */

async function sharePost(button) {

    const post = button
        ? button.closest(".post")
        : null;


    let texto = "Confira esta publicação no FlashFeed ⚡";


    if (post) {

        const textoPost = post.querySelector(".post-text");

        if (textoPost) {

            texto =
                textoPost.textContent.trim() +
                "\n\n⚡ FlashFeed";
        }
    }


    // API nativa de compartilhamento
    if (navigator.share) {

        try {

            await navigator.share({
                title: "FlashFeed ⚡",
                text: texto
            });

        } catch (erro) {

            // Usuário cancelou o compartilhamento.
            console.log("Compartilhamento cancelado.");

        }

        return;
    }


    // Alternativa para navegadores que não suportam navigator.share
    try {

        await navigator.clipboard.writeText(
            window.location.href
        );

        mostrarMensagem("🔗 Link copiado!");

    } catch (erro) {

        mostrarMensagem("📤 Compartilhe o endereço desta página.");
    }
}


/* =========================================
   MENSAGEM TEMPORÁRIA
   ========================================= */

function mostrarMensagem(texto) {

    const mensagem = document.createElement("div");

    mensagem.textContent = texto;


    mensagem.style.position = "fixed";
    mensagem.style.bottom = "25px";
    mensagem.style.left = "50%";
    mensagem.style.transform = "translateX(-50%)";

    mensagem.style.background = "#e10600";
    mensagem.style.color = "#fff";

    mensagem.style.padding = "12px 20px";

    mensagem.style.borderRadius = "10px";

    mensagem.style.fontWeight = "bold";

    mensagem.style.zIndex = "9999";

    mensagem.style.boxShadow =
        "0 5px 20px rgba(225, 6, 0, .5)";


    document.body.appendChild(mensagem);


    setTimeout(() => {

        mensagem.style.opacity = "0";

        mensagem.style.transition = ".3s";

        setTimeout(() => {
            mensagem.remove();
        }, 300);

    }, 1800);
}


/* =========================================
   LOCAL STORAGE
   ========================================= */

function salvarPosts() {

    const posts = document.querySelectorAll("#feed .post");

    const dados = [];


    posts.forEach(post => {

        const usuario =
            post.querySelector(".user-info strong")
                ?.textContent
                .replace("⚡", "")
                .trim() || "Usuário";


        const tempo =
            post.querySelector(".user-info small")
                ?.textContent
                .split("·")[0]
                .trim() || "Agora";


        const texto =
            post.querySelector(".post-text")
                ?.textContent
                .trim() || "";


        const contador =
            post.querySelector(".like-btn span");


        const curtidas =
            Number(contador?.textContent || 0);


        const comentarios = [];


        post.querySelectorAll(".comment").forEach(comment => {

            const usuarioComentario =
                comment.querySelector("strong")
                    ?.textContent
                    .replace("⚡", "")
                    .trim() || "Usuário";


            const textoComentario =
                comment.querySelector("div")
                    ?.textContent
                    .trim() || "";


            comentarios.push({
                usuario: usuarioComentario,
                texto: textoComentario
            });
        });


        dados.push({
            usuario,
            tempo,
            texto,
            curtidas,
            comentarios
        });
    });


    localStorage.setItem(
        "flashfeed_posts",
        JSON.stringify(dados)
    );
}


/* =========================================
   CARREGAR POSTS
   ========================================= */

function carregarPosts() {

    const dadosSalvos =
        localStorage.getItem("flashfeed_posts");


    // Se ainda não existem posts salvos,
    // mantém os posts do HTML
    if (!dadosSalvos) return;


    let dados;


    try {

        dados = JSON.parse(dadosSalvos);

    } catch (erro) {

        console.error(
            "Não foi possível carregar os posts."
        );

        return;
    }


    if (!Array.isArray(dados)) return;


    const feed = document.getElementById("feed");

    if (!feed) return;


    feed.innerHTML = "";


    dados.forEach(postDados => {

        const post =
            criarElementoPost(postDados);

        feed.appendChild(post);
    });
}


/* =========================================
   LIMPAR POSTS SALVOS
   ========================================= */

function limparFeed() {

    localStorage.removeItem("flashfeed_posts");

    location.reload();
}


/* =========================================
   PROTEÇÃO CONTRA HTML
   ========================================= */

function escapeHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}
```

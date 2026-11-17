
// ===================================
// 1. SISTEMA DE CURTIDAS
// ===================================

document.querySelectorAll(".post").forEach(post => {

    const likeButton = post.querySelector(".post-actions button");
    const likesText = post.querySelector(".post-actions")
        .nextElementSibling;

    let liked = false;
    let likes = parseInt(likesText.textContent.replace(/\D/g, ""));

    likeButton.addEventListener("click", () => {

        liked = !liked;

        if (liked) {
            likes++;
            likeButton.textContent = "❤️";
        } else {
            likes--;
            likeButton.textContent = "🤍";
        }

        likesText.textContent = likes.toLocaleString("pt-BR") + " curtidas";
    });

});


// ===================================
// 2. SISTEMA DE COMENTÁRIOS
// ===================================

document.querySelectorAll(".post form").forEach(form => {

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input = form.querySelector("input");
        const comment = input.value.trim();

        if (comment === "") {
            return;
        }

        const newComment = document.createElement("p");

        newComment.classList.add("new-comment");

        const username = document.createElement("strong");
        username.textContent = "Você ";

        newComment.appendChild(username);
        newComment.appendChild(
            document.createTextNode(comment)
        );

        form.before(newComment);

        input.value = "";

    });

});


// ===================================
// 3. SISTEMA DE SEGUIR PESSOAS
// ===================================

document.querySelectorAll("aside button").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#888";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }

    });

});


// ===================================
// 4. SALVAR PUBLICAÇÕES
// ===================================

document.querySelectorAll(".post").forEach(post => {

    const buttons = post.querySelectorAll(".post-actions button");
    const saveButton = buttons[3];

    let saved = false;

    saveButton.addEventListener("click", () => {

        saved = !saved;

        saveButton.textContent = saved ? "🔖" : "🔖";
        saveButton.style.opacity = saved ? "0.5" : "1";

        alert(
            saved
                ? "Publicação salva!"
                : "Publicação removida dos salvos!"
        );

    });

});


// ===================================
// 5. CRIAR NOVA PUBLICAÇÃO
// ===================================

function criarPublicacao() {

    const imagem = prompt("Digite o endereço da imagem:");

    if (!imagem || imagem.trim() === "") {
        return;
    }

    const legenda = prompt("Digite a legenda da publicação:");

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/40?img=1" alt="Perfil">
            <h3>seu_perfil</h3>
            <span>• agora</span>
        </div>

        <img class="post-image" src="${imagem}" alt="Publicação">

        <div class="post-actions">
            <button>🤍</button>
            <button>💬</button>
            <button>📤</button>
            <button>🔖</button>
        </div>

        <p><strong>0 curtidas</strong></p>

        <p>
            <strong>seu_perfil</strong>
            ${legenda || ""}
        </p>

        <p class="comments">Comentários</p>

        <form>
            <input type="text" placeholder="Adicione um comentário...">
            <button type="submit">Publicar</button>
        </form>
    `;

    document.querySelector(".feed").prepend(post);

    ativarInteracoes(post);

}


// ===================================
// 6. ATIVAR INTERAÇÕES NAS PUBLICAÇÕES
// ===================================

function ativarInteracoes(post) {

    // Curtidas
    const likeButton = post.querySelector(".post-actions button");
    const likesText = post.querySelector(".post-actions")
        .nextElementSibling;

    let liked = false;
    let likes = 0;

    likeButton.addEventListener("click", () => {

        liked = !liked;
        likes += liked ? 1 : -1;

        likeButton.textContent = liked ? "❤️" : "🤍";
        likesText.textContent = likes + " curtidas";

    });

    // Comentários
    const form = post.querySelector("form");

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input = form.querySelector("input");
        const comment = input.value.trim();

        if (!comment) return;

        const newComment = document.createElement("p");

        const username = document.createElement("strong");
        username.textContent = "Você ";

        newComment.appendChild(username);
        newComment.appendChild(
            document.createTextNode(comment)
        );

        form.before(newComment);

        input.value = "";

    });

    // Salvar
    const buttons = post.querySelectorAll(".post-actions button");
    const saveButton = buttons[3];

    let saved = false;

    saveButton.addEventListener("click", () => {

        saved = !saved;

        saveButton.style.opacity = saved ? "0.5" : "1";

    });

}


// ===================================
// 7. BOTÃO CRIAR PUBLICAÇÃO
// ===================================

const createButton = [...document.querySelectorAll("nav a")]
    .find(link => link.textContent.includes("Criar publicação"));

if (createButton) {

    createButton.addEventListener("click", event => {

        event.preventDefault();
        criarPublicacao();

    });

}

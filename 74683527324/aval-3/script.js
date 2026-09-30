const postBtn = document.getElementById("postBtn");
const postText = document.getElementById("postText");
const feed = document.getElementById("feed");
const themeBtn = document.getElementById("themeBtn");


// Publicar postagem
postBtn.addEventListener("click", () => {

    const text = postText.value.trim();

    if (!text) {
        alert("Digite uma mensagem.");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-top">

            <div class="avatar">
                PL
            </div>

            <div>
                <strong>Pedro Lucas</strong>
                <small>agora</small>
            </div>

        </div>

        <p>${escapeHTML(text)}</p>

        <div class="tag">
            CONSCIENTIZAÇÃO
        </div>

        <div class="actions">

            <button class="like">
                ♡ Curtir
            </button>

            <button>
                💬 Comentar
            </button>

            <button>
                ↗ Compartilhar
            </button>

        </div>
    `;

    feed.prepend(post);

    postText.value = "";

    activateLike(post);
});


// Curtidas
function activateLike(post) {

    const button = post.querySelector(".like");

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥ Curtido";
        } else {
            button.textContent = "♡ Curtir";
        }

    });
}


// Ativar curtidas dos posts existentes
document.querySelectorAll(".post").forEach(post => {
    activateLike(post);
});


// Tema claro/escuro
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "🌙";
    } else {
        themeBtn.textContent = "☀️";
    }

});


// Segurança: impede HTML inserido pelo usuário
function escapeHTML(text) {

    const element = document.createElement("div");

    element.textContent = text;

    return element.innerHTML;
}

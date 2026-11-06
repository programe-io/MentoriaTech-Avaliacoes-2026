
// ===================================
// MINI INSTAGRAM - JAVASCRIPT
// ===================================


// CURTIR PUBLICAÇÃO
function like(element) {

    const post = element.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 0);

    if (element.classList.contains("liked")) {

        count--;

        element.classList.remove("liked");
        element.innerText = "♡";

    } else {

        count++;

        element.classList.add("liked");
        element.innerText = "♥";
    }

    likes.dataset.count = count;
    likes.innerText = count + " curtidas";
}


// COMENTAR PUBLICAÇÃO
function comment(button) {

    const post = button.closest(".post");

    const input = post.querySelector(".comment-box input");

    const comments = post.querySelector(".comments");

    const message = input.value.trim();

    if (message === "") {
        alert("Digite um comentário!");
        return;
    }

    const p = document.createElement("p");

    p.textContent = "Você: " + message;

    comments.appendChild(p);

    input.value = "";
}


// FOCAR NO CAMPO DE COMENTÁRIO
function focusComment(element) {

    const post = element.closest(".post");

    post.querySelector(".comment-box input").focus();
}


// CRIAR NOVA PUBLICAÇÃO
function createPost() {

    const user = document.getElementById("user").value.trim();

    const image = document.getElementById("image").value.trim();

    const caption = document.getElementById("caption").value.trim();

    if (!user || !image) {

        alert("Preencha seu nome e a imagem!");

        return;
    }

    // Validar URL
    try {

        const url = new URL(image);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error();
        }

    } catch {

        alert("Digite uma URL válida!");

        return;
    }

    // Criar publicação
    const post = document.createElement("article");

    post.className = "post";


    // CABEÇALHO
    const header = document.createElement("div");

    header.className = "post-header";

    const avatar = document.createElement("img");

    avatar.src = "https://i.pravatar.cc/100?u=" +
        encodeURIComponent(user);

    const username = document.createElement("strong");

    username.textContent = user;

    header.append(avatar, username);


    // IMAGEM
    const photo = document.createElement("img");

    photo.className = "post-image";

    photo.src = image;

    photo.alt = "Publicação de " + user;


    // BOTÕES
    const actions = document.createElement("div");

    actions.className = "actions";

    actions.innerHTML = `
        <span onclick="like(this)">♡</span>
        <span onclick="focusComment(this)">💬</span>
        <span>📤</span>
    `;


    // DESCRIÇÃO
    const description = document.createElement("div");

    description.className = "description";

    const name = document.createElement("strong");

    name.textContent = user + " ";

    const text = document.createTextNode(caption);

    const likes = document.createElement("p");

    likes.className = "likes";

    likes.textContent = "0 curtidas";

    description.append(name, text, likes);


    // COMENTÁRIOS
    const comments = document.createElement("div");

    comments.className = "comments";


    // CAMPO DE COMENTÁRIO
    const commentBox = document.createElement("div");

    commentBox.className = "comment-box";

    commentBox.innerHTML = `
        <input placeholder="Adicione um comentário...">
        <button onclick="comment(this)">Publicar</button>
    `;


    // MONTAR PUBLICAÇÃO
    post.append(
        header,
        photo,
        actions,
        description,
        comments,
        commentBox
    );


    // ADICIONAR NO FEED
    const feed = document.getElementById("feed");

    feed.prepend(post);


    // LIMPAR CAMPOS
    document.getElementById("user").value = "";

    document.getElementById("image").value = "";

    document.getElementById("caption").value = "";

}


// ===================================
// PESQUISAR PUBLICAÇÕES
// ===================================

const search = document.querySelector(".navbar input");

search.addEventListener("input", function() {

    const value = search.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {

        const text = post.innerText.toLowerCase();

        post.style.display = text.includes(value)
            ? "block"
            : "none";

    });

});


// ===================================
// MENSAGEM DE INICIALIZAÇÃO
// ===================================

console.log("Mini Instagram iniciado com sucesso! 📸");

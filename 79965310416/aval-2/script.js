
// BOTÃO PUBLICAR
const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const feed = document.getElementById("feed");

publishBtn.addEventListener("click", function() {

    const texto = postText.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "J";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Julia";

    const tempo = document.createElement("span");
    tempo.textContent = "Agora";

    usuario.append(nome, tempo);
    header.append(avatar, usuario);

    const textoPost = document.createElement("p");
    textoPost.className = "post-text";
    textoPost.textContent = texto;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like-btn";
    like.textContent = "❤️ Curtir";

    const comment = document.createElement("button");
    comment.className = "comment-btn";
    comment.textContent = "💬 Comentar";

    const comments = document.createElement("div");
    comments.className = "comments";

    actions.append(like, comment);

    post.append(header, textoPost, actions, comments);

    feed.prepend(post);

    postText.value = "";
});

// CURTIR E COMENTAR
feed.addEventListener("click", function(event) {

    if (event.target.classList.contains("like-btn")) {
        event.target.classList.toggle("liked");

        if (event.target.classList.contains("liked")) {
            event.target.textContent = "❤️ Curtido";
        } else {
            event.target.textContent = "❤️ Curtir";
        }
    }

    if (event.target.classList.contains("comment-btn")) {
        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            const post = event.target.closest(".post");
            const comments = post.querySelector(".comments");

            const novoComentario = document.createElement("p");
            novoComentario.textContent = "Você: " + comentario.trim();

            comments.appendChild(novoComentario);
        }
    }

});

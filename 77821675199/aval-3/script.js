
 * MINEGRAM *

 * CURTIR PUBLICACAO *
function likePost(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = parseInt(likes.textContent) || 0;

    if (button.classList.contains("liked")) {
        count--;
        button.classList.remove("liked");
        button.textContent = "♡";
     } else {
        count++;
        button.classList.add("liked");
        button.textContent = "♥";
     }

    likes.textContent = count + " curtidas";
 }

  * COMENTAR *
function commentPost(button) {
    const post = button.closest(".post");
    const comments = post.querySelector(".comments");

    const comment = prompt("💬 Digite seu comentário:");

    if (!comment || !comment.trim()) return;

    const p = document.createElement("p");
    p.textContent = "🧑 Jogador: " + comment;

    comments.appendChild(p);
 }

   CRIAR PUBLICACAO
function createPost() {
    const username = document
        .getElementById("username").value.trim();

    const description = document
        .getElementById("description").value.trim();

    const emoji = document
        .getElementById("emoji").value.trim() || "⛏️";

    if (!username || !description) {
        alert("⚠️ Preencha seu nome e sua publicação!");
        return;
     }

    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "🧑";

    const name = document.createElement("b");
    name.textContent = username;

    header.append(avatar, name);

    const image = document.createElement("div");
    image.className = "post-image";
    image.textContent = emoji;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like";
    like.textContent = "♡";
    like.onclick = () => likePost(like);

    const likes = document.createElement("span");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const comment = document.createElement("button");
    comment.textContent = "💬 Comentar";
    comment.onclick = () => commentPost(comment);

    actions.append(like, likes, comment);

    const caption = document.createElement("div");
    caption.className = "caption";

    const bold = document.createElement("b");
    bold.textContent = username + " ";

    caption.append(
        bold,
        document.createTextNode(description)
    );

    const comments = document.createElement("div");
    comments.className = "comments";

    post.append(
        header,
        image,
        actions,
        caption,
        comments
    );

    document.getElementById("feed").prepend(post);

    savePosts();

    document.getElementById("description").value = "";
    document.getElementById("emoji").value = "";

    alert("✅ Publicação criada!");
 }

   PESQUISAR JOGADORES
document.getElementById("search")
.addEventListener("input", function() {

    const search = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const content = post.textContent.toLowerCase();

        post.style.display = content.includes(search)
            ? "block"
            : "none";

     });
 });

   SALVAR PUBLICACOES
function savePosts() {
    const posts = [];

    document.querySelectorAll("#feed .post").forEach(post => {
        posts.push({
            username: post.querySelector(".post-header b").textContent;
            description: post.querySelector(".caption").textContent;
            emoji: post.querySelector(".post-image").textContent;
            likes: post.querySelector(".likes").textContent
         });
     });

    localStorage.setItem("minegram_posts", JSON.stringify(posts));
 }

   CARREGAR PUBLICAÇÕES
function loadPosts() {
    const saved = JSON.parse(
        localStorage.getItem("minegram_posts") || "[]"
     });

    saved.reverse().forEach(data => {
        createSavedPost(data);
     });
   }

function createSavedPost(data) {
    const feed = document.getElementById("feed");

    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "🧑";

    const name = document.createElement("b");
    name.textContent = data.username;

    header.append(avatar, name);

    const image = document.createElement("div");
    image.className = "post-image";
    image.textContent = data.emoji;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like";
    like.textContent = "♡";
    like.onclick = () => likePost(like);

    const likes = document.createElement("span");
    likes.className = "likes";
    likes.textContent = data.likes;

    const comment = document.createElement("button");
    comment.textContent = "💬 Comentar";
    comment.onclick = () => commentPost(comment);

    actions.append(like, likes, comment);

    const caption = document.createElement("div");
    caption.className = "caption";

    const bold = document.createElement("b");
    bold.textContent = data.username + " ";

    caption.append(
        bold,
        document.createTextNode(
            data.description.replace(data.username, "").trim()
        )
    );

    const comments = document.createElement("div");
    comments.className = "comments";

    post.append(header, image, actions, caption, comments);

    feed.prepend(post);
 }

   INICIAR MINEGRAM
loadPosts();

console.log("⛏️ MineGram iniciado com sucesso!");
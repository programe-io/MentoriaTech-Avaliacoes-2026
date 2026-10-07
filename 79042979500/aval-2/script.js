:::writing{variant="document" id="39165" title="script.js — Funcionalidades do SocialFeed"} document.addEventListener("DOMContentLoaded", () => {

const feed = document.querySelector(".feed"); const postInput = document.getElementById("postInput"); const publishButton = document.getElementById("publishButton");

/* ========================= CURTIR ========================= */

function configurarCurtida(post) {

const button = post.querySelector(".like-button");

const counter = post.querySelector(".like-number");

button.addEventListener("click", () => {

let likes = Number(counter.textContent);

if (button.classList.contains("liked")) {

likes--;

button.classList.remove("liked");

} else {

likes++;

button.classList.add("liked"); }

counter.textContent = likes; }); }

/* ========================= COMENTÁRIOS ========================= */

function configurarComentarios(post) {

const commentButton = post.querySelector(".comment-button");

const comments = post.querySelector(".comments");

const input = post.querySelector(".comment-input");

const sendButton = post.querySelector(".send-comment");

const commentList = post.querySelector(".comment-list");

const counter = post.querySelector(".comment-number");

commentButton.addEventListener("click", () => {

comments.classList.toggle("active");

if (comments.classList.contains("active")) { input.focus(); } });

function enviarComentario() {

const text = input.value.trim();

if (text === "") { return; }

const comment = document.createElement("div");

comment.classList.add("comment");

comment.textContent = "João Silva: " + text;

commentList.appendChild(comment);

let total = Number(counter.textContent);

total++;

counter.textContent = total;

input.value = ""; }

sendButton.addEventListener( "click", enviarComentario );

input.addEventListener("keydown", (event) => {

if (event.key === "Enter") {

enviarComentario();

}

}); }

/* ========================= COMPARTILHAR ========================= */

function configurarCompartilhamento(post) {

const button = post.querySelector(".share-button");

button.addEventListener("click", async () => {

const text = post.querySelector(".post-text").textContent.trim();

if (navigator.share) {

try {

await navigator.share({ title: "SocialFeed", text: text });

} catch (error) {

console.log( "Compartilhamento cancelado." );

}

} else {

try {

await navigator.clipboard.writeText(text);

alert( "Publicação copiada para a área de transferência!" );

} catch (error) {

alert( "Não foi possível compartilhar." ); } } }); }

/* ========================= CONFIGURAR POSTS EXISTENTES ========================= */

function configurarPost(post) {

configurarCurtida(post);

configurarComentarios(post);

configurarCompartilhamento(post); }

const posts = document.querySelectorAll(".post");

posts.forEach(post => {

configurarPost(post);

});

/* ========================= PUBLICAR NOVO POST ========================= */

publishButton.addEventListener("click", () => {

const text = postInput.value.trim();

if (text === "") {

alert( "Digite alguma coisa antes de publicar." );

postInput.focus();

return; }

const post = document.createElement("article");

post.classList.add("post");

post.innerHTML = `

<div class="post-header">

<div class="avatar"> J </div>

<div class="post-user">

<strong> João Silva </strong>

<span> Agora · 🌎 </span>

</div>

<button class="more"> ⋯ </button>

</div>

<p class="post-text"></p>

<div class="post-info">

<span> ❤️ <span class="like-number"> 0 </span> </span>

<span> <span class="comment-number"> 0 </span> comentários </span>

</div>

<div class="post-actions">

<button class="like-button"> ❤️ Curtir </button>

<button class="comment-button"> 💬 Comentar </button>

<button class="share-button"> ↗️ Compartilhar </button>

</div>

<div class="comments">

<div class="comment-list"></div>

<div class="comment-box">

<div class="avatar small"> J </div>

<input class="comment-input" type="text" placeholder="Escreva um comentário..." >

<button class="send-comment"> Enviar </button>

</div>

</div> `;

/* * Coloca o texto usando textContent * para evitar inserir HTML diretamente. */

post.querySelector(".post-text").textContent = text;

/* * Coloca a nova publicação * antes dos outros posts. */

const primeiroPost = feed.querySelector(".post");

feed.insertBefore( post, primeiroPost );

/* * Ativa os eventos do novo post. */

configurarPost(post);

/* * Limpa o campo. */

postInput.value = "";

postInput.focus(); });

/* ========================= PESQUISA ========================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

const search = searchInput.value .toLowerCase() .trim();

const allPosts = document.querySelectorAll(".post");

allPosts.forEach(post => {

const text = post.textContent.toLowerCase();

if (text.includes(search)) {

post.style.display = "";

} else {

post.style.display = "none";

}

}); });

/* ========================= BOTÃO DE AMIGOS ========================= */

const friendButtons = document.querySelectorAll(".friend button");

friendButtons.forEach(button => {

button.addEventListener("click", () => {

if (button.textContent === "+") {

button.textContent = "✓";

button.style.background = "#42b72a";

button.style.color = "white";

}

});

});

/* ========================= BOTÃO MAIS ========================= */

const moreButtons = document.querySelectorAll(".more");

moreButtons.forEach(button => {

button.addEventListener("click", () => {

alert( "Menu da publicação." );

});

});

}); :::
document.addEventListener("DOMContentLoaded", () => {

/* * Curtir publicações */ const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => { button.addEventListener("click", () => { button.classList.toggle("liked");

if (button.classList.contains("liked")) { button.textContent = "♥"; button.setAttribute( "aria-label", "Descurtir publicação" ); } else { button.textContent = "♡"; button.setAttribute( "aria-label", "Curtir publicação" ); } }); });

/* * Salvar publicações */ const saveButtons = document.querySelectorAll(".save-button");

saveButtons.forEach((button) => { button.addEventListener("click", () => { button.classList.toggle("saved");

if (button.classList.contains("saved")) { button.textContent = "♣"; button.setAttribute( "aria-label", "Remover publicação dos salvos" ); } else { button.textContent = "♧"; button.setAttribute( "aria-label", "Salvar publicação" ); } }); });

/* * Botões de seguir */ const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach((button) => { button.addEventListener("click", () => {

const following = button.dataset.following === "true";

if (following) { button.textContent = "Seguir"; button.dataset.following = "false"; } else { button.textContent = "Seguindo"; button.dataset.following = "true"; } }); });

/* * Formulários de comentário */ const commentForms = document.querySelectorAll(".comment-form");

commentForms.forEach((form) => {

form.addEventListener("submit", (event) => {

event.preventDefault();

const input = form.querySelector("input"); const value = input.value.trim();

if (!value) { return; }

alert(Comentário publicado: ${value});

input.value = ""; });

});

/* * Botão de tema */ const themeButton = document.querySelector("#theme-button");

themeButton.addEventListener("click", () => {

document.body.classList.toggle("dark");

const darkMode = document.body.classList.contains("dark");

localStorage.setItem( "darkMode", darkMode ? "enabled" : "disabled" ); });

/* * Recupera o tema escolhido */ const savedTheme = localStorage.getItem("darkMode");

if (savedTheme === "enabled") { document.body.classList.add("dark"); }

/* * Pesquisa */ const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", () => {

const search = searchInput.value.toLowerCase().trim();

const posts = document.querySelectorAll(".post");

posts.forEach((post) => {

const content = post.textContent.toLowerCase();

post.style.display = !search || content.includes(search) ? "" : "none"; }); });

});
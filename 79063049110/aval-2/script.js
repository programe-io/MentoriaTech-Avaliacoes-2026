/*

CURTIDAS

*/

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach((button) => {

button.addEventListener("click", () => {

const post = button.closest(".post");

if (!post) { return; }

const likesElement = post.querySelector(".likes");

if (!likesElement) { return; }

const isLiked = button.classList.contains("liked");

let likes = parseInt( likesElement.textContent.replace(/\D/g, ""), 10 );

if (isNaN(likes)) { likes = 0; }

if (isLiked) {

likes--;

button.classList.remove("liked"); button.textContent = "♡"; button.setAttribute("aria-pressed", "false");

} else {

likes++;

button.classList.add("liked"); button.textContent = "♥"; button.setAttribute("aria-pressed", "true");

}

likesElement.textContent = ${likes.toLocaleString("pt-BR")} curtidas;

});

});

/*

SALVAR PUBLICAÇÃO

*/

const saveButtons = document.querySelectorAll(".save-button");

saveButtons.forEach((button) => {

button.addEventListener("click", () => {

const saved = button.classList.toggle("saved");

button.textContent = saved ? "♥" : "♡";

button.setAttribute( "aria-pressed", String(saved) );

});

});

/*

SEGUIR USUÁRIO

*/

const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach((button) => {

button.addEventListener("click", () => {

const isFollowing = button.classList.contains("following");

if (isFollowing) {

button.classList.remove("following"); button.textContent = "Seguir";

} else {

button.classList.add("following"); button.textContent = "Seguindo";

}

});

});

/*

BOTÕES "MAIS OPÇÕES"

*/

const moreButtons = document.querySelectorAll(".more-button");

moreButtons.forEach((button) => {

button.addEventListener("click", () => {

alert( "Aqui você poderia abrir um menu com opções para a publicação." );

});

});
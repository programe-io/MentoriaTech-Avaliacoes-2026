
const likeButton = document.querySelector(".like-button");
const saveButton = document.querySelector(".save-button");
const likesText = document.querySelector(".likes");

let liked = false;
let saved = false;
let likes = 1248;

likeButton.addEventListener("click", () => {
    liked = !liked;

    if (liked) {
        likes++;
        likeButton.textContent = "♥";
        likeButton.classList.add("liked");
    } else {
        likes--;
        likeButton.textContent = "♡";
        likeButton.classList.remove("liked");
    }

    likesText.textContent = likes.toLocaleString("pt-BR") + " curtidas";
});

saveButton.addEventListener("click", () => {
    saved = !saved;
    saveButton.textContent = saved ? "▣" : "♧";
    saveButton.classList.toggle("saved", saved);
});

document.querySelector(".comment-area button").addEventListener("click", () => {
    const input = document.querySelector(".comment-area input");

    if (input.value.trim() !== "") {
        alert("Comentário publicado: " + input.value);
        input.value = "";
    } else {
        alert("Digite um comentário primeiro!");
    }
});

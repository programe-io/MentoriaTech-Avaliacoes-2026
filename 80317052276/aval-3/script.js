/* NAVEGAÇÃO */

function navAction(name) {
    alert("Você selecionou: " + name);
}

/* CURTIR */

function toggleLike(button) {

    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let current = parseInt(
        likes.textContent.replace(/\D/g, "")
    ) || 0;

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");
        button.innerHTML = "♡";

        current--;

    } else {

        button.classList.add("liked");
        button.innerHTML = "♥";

        current++;

    }

    likes.textContent = current.toLocaleString("pt-BR") + " curtidas";

}

/* CURTIR COM DOIS CLIQUES */

function doubleLike(imageContainer) {

    const post = imageContainer.closest(".post");
    const button = post.querySelector(".like-button");
    const animation = imageContainer.querySelector(".heart-animation");

    if (!button.classList.contains("liked")) {
        toggleLike(button);
    }

    animation.classList.remove("show");

    void animation.offsetWidth;

    animation.classList.add("show");

}

/* COMENTÁRIOS */

function commentInput(input) {

    const button = input.parentElement.querySelector("button");

    button.disabled = input.value.trim() === "";

}

function addComment(button) {

    const container = button.parentElement;
    const input = container.querySelector("input");
    const post = button.closest(".post");

    const text = input.value.trim();

    if (!text) return;

    const comment = document.createElement("div");

    comment.className = "caption";

    const strong = document.createElement("strong");
    strong.textContent = "seu_perfil";

    const span = document.createElement("span");
    span.textContent = text;

    comment.appendChild(strong);
    comment.appendChild(span);

    const commentsLink = post.querySelector(".comments-link");

    post.insertBefore(comment, commentsLink);

    input.value = "";
    button.disabled = true;

}

/* FOCO NO CAMPO DE COMENTÁRIO */

function focusComment(element) {

    const post = element.closest(".post");

    const input = post.querySelector(".add-comment input");

    input.focus();

}

/* SALVAR PUBLICAÇÃO */

function toggleSave(button) {

    if (button.classList.contains("saved")) {

        button.classList.remove("saved");
        button.innerHTML = "♧";

        alert("Publicação removida dos salvos.");

    } else {

        button.classList.add("saved");
        button.innerHTML = "▣";

        alert("Publicação salva!");

    }

}

/* SEGUIR */

function toggleFollow(button) {

    if (button.classList.contains("following")) {

        button.classList.remove("following");
        button.textContent = "Seguir";

    } else {

        button.classList.add("following");
        button.textContent = "Seguindo";

    }

}

/* STORIES */

function openStory(story) {

    const name = story.querySelector(".story-name").textContent;

    alert("Abrindo story de: " + name);

    story.querySelector(".story-ring").classList.add("seen");

}

/* CRIAR PUBLICAÇÃO */

function createPost() {

    const caption = prompt("Escreva uma legenda para sua publicação:");

    if (caption === null) return;

    alert(
        "Publicação criada na demonstração!\n\nLegenda: " + caption
    );

}
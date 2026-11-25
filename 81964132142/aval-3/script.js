
// FUNÇÃO DE CURTIR

function toggleLike(element, id) {

    const likes = document.getElementById(id);

    let count = Number(likes.dataset.count);

    if (element.classList.contains("bxs-heart")) {

        element.classList.remove("bxs-heart");
        element.classList.add("bx-heart");

        count--;

    } else {

        element.classList.remove("bx-heart");
        element.classList.add("bxs-heart");

        count++;

    }

    likes.dataset.count = count;
    likes.textContent = count + " curtidas";
}


// FUNÇÃO DE SALVAR PUBLICAÇÃO

function toggleBookmark(element) {

    if (element.classList.contains("bxs-bookmark")) {

        element.classList.remove("bxs-bookmark");
        element.classList.add("bx-bookmark");

    } else {

        element.classList.remove("bx-bookmark");
        element.classList.add("bxs-bookmark");

    }

}


// FUNÇÃO DE SEGUIR

function toggleFollow(button) {

    if (button.textContent.trim() === "Seguir") {

        button.textContent = "Seguindo";

        button.style.color = "#262626";

    } else {

        button.textContent = "Seguir";

        button.style.color = "#0095f6";

    }

}


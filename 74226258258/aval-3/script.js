
// FUNÇÃO DE CURTIR
function toggleLike(element, id) {

    const likes = document.getElementById(id);
    let count = Number(likes.dataset.count);

    if (element.classList.contains("liked")) {
        element.classList.remove("liked");
        element.classList.replace("bxs-heart", "bx-heart");

        count--;
    } else {
        element.classList.add("liked");
        element.classList.replace("bx-heart", "bxs-heart");

        count++;
    }

    likes.dataset.count = count;
    likes.innerText = count.toLocaleString("pt-BR") + " curtidas";
}


// FUNÇÃO DE SALVAR PUBLICAÇÃO
function toggleBookmark(element) {

    if (element.classList.contains("saved")) {
        element.classList.remove("saved");
        element.classList.replace("bxs-bookmark", "bx-bookmark");
    } else {
        element.classList.add("saved");
        element.classList.replace("bx-bookmark", "bxs-bookmark");
    }

}


// FUNÇÃO DE SEGUIR
function toggleFollow(button) {

    if (button.innerText === "Seguir") {
        button.innerText = "Seguindo";
        button.style.color = "#777";
    } else {
        button.innerText = "Seguir";
        button.style.color = "#0095f6";
    }

}

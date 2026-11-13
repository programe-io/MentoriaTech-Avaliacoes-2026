
function like(element) {
    if (element.classList.contains("liked")) {
        element.innerHTML = "♡";
        element.classList.remove("liked");
    } else {
        element.innerHTML = "♥";
        element.classList.add("liked");
    }
}

function comment() {
    alert("Área de comentários!");
}

function share() {
    alert("Publicação compartilhada!");
}


/* SISTEMA DE CURTIDAS */

const likeButton = document.getElementById("likeButton");
const likeCount = document.getElementById("likeCount");

let curtidas = 0;
let curtido = false;

likeButton.addEventListener("click", function() {

    if (!curtido) {

        curtidas++;
        curtido = true;

        likeButton.classList.add("curtido");
        likeButton.innerHTML = `❤️ Curtido <span id="likeCount">${curtidas}</span>`;

    } else {

        curtidas--;
        curtido = false;

        likeButton.classList.remove("curtido");
        likeButton.innerHTML = `♡ Curtir <span id="likeCount">${curtidas}</span>`;

    }

    likeButton.setAttribute("aria-pressed", curtido);

});


/* ABRIR COMENTÁRIOS */

const commentButton = document.getElementById("commentButton");
const comentarios = document.getElementById("comentarios");

commentButton.addEventListener("click", function() {

    comentarios.classList.toggle("ativo");

});


/* PUBLICAR COMENTÁRIOS */

const commentInput = document.getElementById("commentInput");
const sendComment = document.getElementById("sendComment");
const commentList = document.getElementById("commentList");

function adicionarComentario() {

    const texto = commentInput.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("div");

    novoComentario.classList.add("comentario-item");

    novoComentario.textContent = "Jonathan: " + texto;

    commentList.appendChild(novoComentario);

    commentInput.value = "";

}


/* BOTÃO ENVIAR */

sendComment.addEventListener("click", adicionarComentario);


/* ENVIAR COM ENTER */

commentInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarComentario();
    }

});

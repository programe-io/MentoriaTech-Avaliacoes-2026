// ==========================================
// MINI FEED - OS VINGADORES
// ARQUIVO: script.js
// ==========================================


// ------------------------------------------
// VARIÁVEIS
// ------------------------------------------

let likes = 0;
let dislikes = 0;

let curtiu = false;
let naoCurtiu = false;


// ------------------------------------------
// ELEMENTOS DO HTML
// ------------------------------------------

const likeButton = document.getElementById("likeButton");
const dislikeButton = document.getElementById("dislikeButton");

const likesElement = document.getElementById("likes");
const dislikesElement = document.getElementById("dislikes");

const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");


// ------------------------------------------
// ATUALIZAR CONTADORES
// ------------------------------------------

function atualizarContadores() {

    likesElement.textContent = likes;
    dislikesElement.textContent = dislikes;

}


// ------------------------------------------
// LIKE
// ------------------------------------------

function darLike() {

    if (!curtiu) {

        likes++;
        curtiu = true;

        // Se estava no deslike, remove o deslike
        if (naoCurtiu) {

            dislikes--;
            naoCurtiu = false;

            dislikeButton.classList.remove(
                "active-dislike"
            );
        }

        likeButton.classList.add(
            "active-like"
        );

    } else {

        likes--;
        curtiu = false;

        likeButton.classList.remove(
            "active-like"
        );
    }

    atualizarContadores();
}


// ------------------------------------------
// DESLIKE
// ------------------------------------------

function darDislike() {

    if (!naoCurtiu) {

        dislikes++;
        naoCurtiu = true;

        // Se estava no like, remove o like
        if (curtiu) {

            likes--;
            curtiu = false;

            likeButton.classList.remove(
                "active-like"
            );
        }

        dislikeButton.classList.add(
            "active-dislike"
        );

    } else {

        dislikes--;
        naoCurtiu = false;

        dislikeButton.classList.remove(
            "active-dislike"
        );
    }

    atualizarContadores();
}


// ------------------------------------------
// ADICIONAR COMENTÁRIO
// ------------------------------------------

function adicionarComentario() {

    const texto = commentInput.value.trim();

    // Não permite comentário vazio
    if (texto === "") {

        alert("Digite um comentário!");

        commentInput.focus();

        return;
    }


    // Cria o comentário
    const novoComentario =
        document.createElement("div");

    novoComentario.classList.add("comment");


    // Nome do usuário
    const nome =
        document.createElement("strong");

    nome.textContent = "🦸 Usuário";


    // Texto do comentário
    const mensagem =
        document.createElement("p");

    mensagem.textContent = texto;


    // Monta o comentário
    novoComentario.appendChild(nome);

    novoComentario.appendChild(mensagem);


    // Coloca o comentário na tela
    commentList.appendChild(novoComentario);


    // Limpa o campo
    commentInput.value = "";

    commentInput.focus();
}


// ------------------------------------------
// ENTER PARA COMENTAR
// ------------------------------------------

commentInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            adicionarComentario();
        }
    }
);


// ------------------------------------------
// INICIAR CONTADORES
// ------------------------------------------

atualizarContadores();

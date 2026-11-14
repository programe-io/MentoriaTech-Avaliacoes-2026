
const button = document.getElementById("likeButton");
const count = document.getElementById("likeCount");
const message = document.getElementById("likeMessage");

let likes = Number(localStorage.getItem("dragonLikes")) || 0;

let jaCurtiu = localStorage.getItem("jaCurtiu") === "true";

function atualizarLikes() {

    count.textContent = likes +
        (likes === 1 ? " curtida" : " curtidas");

    if (jaCurtiu) {

        button.textContent = "❤️ Curtido!";
        button.classList.add("liked");

        message.textContent = "Obrigado por apoiar nosso blog!";

    } else {

        button.textContent = "❤️ Curtir";
        button.classList.remove("liked");

        message.textContent = "";

    }
}

function curtir() {

    if (jaCurtiu) {

        likes--;
        jaCurtiu = false;

    } else {

        likes++;
        jaCurtiu = true;

    }

    localStorage.setItem("dragonLikes", likes);
    localStorage.setItem("jaCurtiu", jaCurtiu);

    atualizarLikes();
}

// Evento do botão
button.addEventListener("click", curtir);

// Atualiza quando a página abre
atualizarLikes();

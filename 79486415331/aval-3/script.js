
// BOTÃO SEGUIR
const followBtn = document.getElementById("followBtn");
const followersCount = document.getElementById("followersCount");

let following = false;
let followers = 1250;

followBtn.addEventListener("click", () => {
    following = !following;

    if (following) {
        followers++;
        followBtn.textContent = "Seguindo";
        followBtn.classList.add("following");
    } else {
        followers--;
        followBtn.textContent = "Seguir";
        followBtn.classList.remove("following");
    }

    followersCount.textContent = followers.toLocaleString("pt-BR");
});

// CURTIR PUBLICAÇÕES
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "❤️ Curtido";
        } else {
            button.textContent = "♡ Curtir";
        }
    });
});

// BOTÃO MENSAGEM
document.querySelector(".message-btn").addEventListener("click", () => {
    alert("Você está iniciando uma conversa com @sergio_delfino0!");
});

// ABAS DO PERFIL
const tabs = document.querySelectorAll(".tabs span");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(item => item.classList.remove("active"));
        tab.classList.add("active");
    });
});

// BOTÃO DE MAIS OPÇÕES
document.querySelector(".more-btn").addEventListener("click", () => {
    alert("Mais opções do perfil @sergio_delfino0");
});

// CONTADOR DE PUBLICAÇÕES
const postsCount = document.getElementById("postsCount");
postsCount.textContent = document.querySelectorAll(".post").length;

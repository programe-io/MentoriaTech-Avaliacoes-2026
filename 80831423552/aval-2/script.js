
// INSTAGRAM 2026 - @JADSON

let followers = 1200;
let following = false;

// FUNÇÃO SEGUIR / DEIXAR DE SEGUIR
function followUser() {
    const btn = document.getElementById("followBtn");
    const count = document.getElementById("followers");

    following = !following;

    if (following) {
        followers++;
        btn.innerText = "Seguindo";
        btn.style.background = "#363636";
    } else {
        followers--;
        btn.innerText = "Seguir";
        btn.style.background = "#0095f6";
    }

    count.innerText = followers.toLocaleString("pt-BR");
}

// FUNÇÃO DE CURTIR PUBLICAÇÕES
function like(post) {
    const heart = post.querySelector(".like-count");

    heart.style.opacity = "1";
    heart.innerText = "❤️";

    setTimeout(() => {
        heart.style.opacity = "0";
    }, 900);
}

// ABRIR STORIES
function openStory(name) {
    alert("Você abriu os stories: " + name);
}

// BOTÃO DE MENSAGEM
function sendMessage() {
    alert("Bem-vindo ao chat de @jadson!");
}

// PESQUISAR
const search = document.querySelector(".search");

if (search) {
    search.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            alert("Pesquisando: " + search.value);
        }
    });
}

// ANIMAÇÃO DAS PUBLICAÇÕES
document.querySelectorAll(".post").forEach(post => {
    post.addEventListener("dblclick", function() {
        like(this);
    });
});

// ANIMAÇÃO DE CLIQUE
document.querySelectorAll(".icons span").forEach(icon => {
    icon.addEventListener("click", function() {
        console.log("Ícone selecionado:", this.innerText);
    });
});

console.log("Instagram 2026 carregado com sucesso!");
console.log("Perfil: @jadson");

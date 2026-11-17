
const form = document.getElementById("postForm");
const postText = document.getElementById("postText");
const posts = document.getElementById("posts");

// Criar nova publicação
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = postText.value.trim();

    if (texto === "") return;

    const post = document.createElement("article");
    post.classList.add("post");

    const usuario = document.createElement("div");
    usuario.classList.add("user");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");
    avatar.textContent = "V";

    const info = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Você";

    const data = document.createElement("small");
    data.textContent = "Agora";

    info.append(nome, data);
    usuario.append(avatar, info);

    const legenda = document.createElement("p");
    legenda.textContent = texto;

    const botao = document.createElement("button");
    botao.classList.add("like-btn");
    botao.innerHTML = "♡ Curtir <span>0</span>";

    post.append(usuario, legenda, botao);

    posts.prepend(post);

    postText.value = "";
});

// Curtir publicações
posts.addEventListener("click", function(event) {
    if (event.target.closest(".like-btn")) {
        const botao = event.target.closest(".like-btn");
        const numero = botao.querySelector("span");

        let curtidas = Number(numero.textContent);

        if (botao.classList.contains("liked")) {
            curtidas--;
            botao.classList.remove("liked");
            botao.firstChild.textContent = "♡ Curtir ";
        } else {
            curtidas++;
            botao.classList.add("liked");
            botao.firstChild.textContent = "♥ Curtido ";
        }

        numero.textContent = curtidas;
    }
});

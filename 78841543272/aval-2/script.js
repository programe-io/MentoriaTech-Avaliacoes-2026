
const botaoPublicar = document.getElementById("publicar");
const textoPost = document.getElementById("textoPost");
const feed = document.getElementById("feed");

// CRIAR NOVA PUBLICAÇÃO

botaoPublicar.addEventListener("click", function () {

    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    const cabecalho = document.createElement("div");
    cabecalho.classList.add("post-header");

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Meu perfil";

    const usuario = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Meu Perfil";

    const data = document.createElement("small");
    data.textContent = "Agora mesmo · 🌎";

    usuario.appendChild(nome);
    usuario.appendChild(data);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(usuario);

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    const contador = document.createElement("div");
    contador.classList.add("contador");
    contador.textContent = "❤️ 0 curtidas · 0 comentários";

    const botoes = document.createElement("div");
    botoes.classList.add("botoes-post");

    botoes.innerHTML = `
        <button class="curtir">♡ Curtir</button>
        <button class="comentar">💬 Comentar</button>
        <button class="compartilhar">↗ Compartilhar</button>
    `;

    post.appendChild(cabecalho);
    post.appendChild(paragrafo);
    post.appendChild(contador);
    post.appendChild(botoes);

    feed.prepend(post);

    textoPost.value = "";

});

// INTERAÇÕES DOS POSTS

feed.addEventListener("click", function(event) {

    const botao = event.target;

    // CURTIR
    if (botao.classList.contains("curtir")) {

        botao.classList.toggle("curtido");

        if (botao.classList.contains("curtido")) {
            botao.textContent = "❤️ Curtido";
        } else {
            botao.textContent = "♡ Curtir";
        }
    }

    // COMENTAR
    if (botao.classList.contains("comentar")) {

        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            alert("Comentário adicionado: " + comentario);
        }
    }

    // COMPARTILHAR
    if (botao.classList.contains("compartilhar")) {

        const post = botao.closest(".post");
        const texto = post.querySelector("p").textContent;

        if (navigator.share) {
            navigator.share({
                title: "MiniFeed",
                text: texto
            }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(texto)
                .then(() => alert("Publicação copiada!"))
                .catch(() => alert("Não foi possível copiar."));
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    }

});

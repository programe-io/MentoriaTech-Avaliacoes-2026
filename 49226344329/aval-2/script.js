
const nomeInput = document.getElementById("nome");
const mensagemInput = document.getElementById("mensagem");
const musicaInput = document.getElementById("musica");
const botaoPublicar = document.getElementById("publicar");
const listaPosts = document.getElementById("lista-posts");

// Criar uma nova publicação
botaoPublicar.addEventListener("click", function () {
    const nome = nomeInput.value.trim();
    const mensagem = mensagemInput.value.trim();
    const musica = musicaInput.value.trim();

    if (!nome || !mensagem || !musica) {
        alert("Preencha seu nome, mensagem e música!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const perfil = document.createElement("div");
    perfil.className = "perfil";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = nome.charAt(0).toUpperCase();

    const informacoes = document.createElement("div");

    const nomeUsuario = document.createElement("h3");
    nomeUsuario.textContent = nome;

    const horario = document.createElement("small");
    horario.textContent = "Agora mesmo";

    informacoes.append(nomeUsuario, horario);
    perfil.append(avatar, informacoes);

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    const musicaPost = document.createElement("div");
    musicaPost.className = "musica";
    musicaPost.textContent = "🎵 " + musica;

    const curtir = document.createElement("button");
    curtir.className = "curtir";
    curtir.textContent = "♡ Curtir ";

    const contador = document.createElement("span");
    contador.textContent = "0";

    curtir.appendChild(contador);

    post.append(perfil, texto, musicaPost, curtir);

    listaPosts.prepend(post);

    // Limpar os campos
    nomeInput.value = "";
    mensagemInput.value = "";
    musicaInput.value = "";
});

// Curtir publicações, inclusive as novas
listaPosts.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".curtir");

    if (!botao) return;

    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("liked")) {
        curtidas--;
        botao.classList.remove("liked");
        botao.firstChild.textContent = "♡ Curtir ";
    } else {
        curtidas++;
        botao.classList.add("liked");
        botao.firstChild.textContent = "♥ Curtido ";
    }

    contador.textContent = curtidas;
});

function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes span");

    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "♡";
        quantidade--;
    \} else {
        botao.classList.add("curtido");
        botao.textContent = "♥";
        quantidade++;
    \}

    contador.textContent = quantidade;
\}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const novoComentario = document.createElement("p");

        novoComentario.className = "comentario";

        const usuario = document.createElement("strong");
        usuario.textContent = "Você ";

        novoComentario.appendChild(usuario);
        novoComentario.appendChild(
            document.createTextNode(texto.trim())
        );

        comentarios.appendChild(novoComentario);
    \}
\}

function publicar() {
    const legenda = document.getElementById("novaLegenda");
    const feed = document.getElementById("feed");

    if (legenda.value.trim() === "") {
        alert("Digite alguma coisa para publicar!");
        return;
    \}

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const nome = document.createElement("strong");
    nome.textContent = "seu_perfil";

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(nome);

    const texto = document.createElement("p");
    texto.textContent = legenda.value;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡";
    curtirBtn.addEventListener("click", function() {
        curtir(this);
    \});

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬";
    comentarBtn.addEventListener("click", function() {
        comentar(this);
    \});

    acoes.appendChild(curtirBtn);
    acoes.appendChild(comentarBtn);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "❤️ ";

    const contador = document.createElement("span");
    contador.textContent = "0";

    likes.appendChild(contador);
    likes.appendChild(document.createTextNode(" curtidas"));

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.appendChild(cabecalho);
    post.appendChild(texto);
    post.appendChild(acoes);
    post.appendChild(likes);
    post.appendChild(comentarios);

    feed.prepend(post);

    legenda.value = "";
\}$0

// GAMEBOOK - REDE SOCIAL DOS MELHORES JOGOS

// FUNÇÃO DE CURTIR PUBLICAÇÃO
function curtir(botao) {

    if (botao.classList.contains("curtido")) {
        botao.innerHTML = "👍 Curtir";
        botao.classList.remove("curtido");

    } else {
        botao.innerHTML = "❤️ Curtido!";
        botao.classList.add("curtido");
    }
}

// FUNÇÃO DE COMENTAR
function comentar(botao) {

    let comentario = prompt("Digite seu comentário sobre o jogo:");

    if (comentario && comentario.trim() !== "") {

        let area = botao.closest(".post");

        let novoComentario = document.createElement("p");

        novoComentario.innerHTML = "<strong>💬 Comentário:</strong> ";

        let texto = document.createTextNode(comentario);

        novoComentario.appendChild(texto);

        area.appendChild(novoComentario);

        alert("Comentário publicado com sucesso!");
    }
}

// FUNÇÃO DE COMPARTILHAR
function compartilhar() {

    if (navigator.share) {

        navigator.share({
            title: "GameBook",
            text: "Confira esta publicação sobre os melhores jogos!"
        });

    } else {

        alert("Publicação compartilhada com sucesso!");
    }
}

// FUNÇÃO DE CRIAR PUBLICAÇÃO
function publicar() {

    let texto = document.getElementById("texto").value;

    if (texto.trim() === "") {

        alert("Digite alguma coisa antes de publicar!");

        return;
    }

    let publicacoes = document.getElementById("publicacoes");

    let post = document.createElement("article");

    post.className = "post";

    let titulo = document.createElement("h2");
    titulo.textContent = "🎮 Nova publicação";

    let usuario = document.createElement("p");
    usuario.innerHTML = "<strong>GameBook</strong> • Agora";

    let conteudo = document.createElement("p");
    conteudo.textContent = texto;

    let botoes = document.createElement("div");
    botoes.className = "buttons";

    botoes.innerHTML = `
        <button class="like" onclick="curtir(this)">
            👍 Curtir
        </button>

        <button onclick="comentar(this)">
            💬 Comentar
        </button>

        <button onclick="compartilhar()">
            ↗ Compartilhar
        </button>
    `;

    post.appendChild(titulo);
    post.appendChild(usuario);
    post.appendChild(conteudo);
    post.appendChild(botoes);

    publicacoes.prepend(post);

    document.getElementById("texto").value = "";

    alert("Sua publicação foi criada!");
}

// FUNÇÃO DE PESQUISAR JOGOS
function pesquisarJogos() {

    let pesquisa = document.querySelector(
        'header input'
    ).value.toLowerCase();

    let posts = document.querySelectorAll(".post");

    posts.forEach(function(post) {

        let conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(pesquisa)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });
}

// EVENTO DE PESQUISA
document.querySelector("header input")
    .addEventListener("input", pesquisarJogos);

console.log("🎮 GameBook iniciado com sucesso!");


// ABRIR MODAL

function abrirCriacao() {
    document.getElementById("modal").style.display = "flex";
}

// FECHAR MODAL

function fecharCriacao() {
    document.getElementById("modal").style.display = "none";
}

// CURTIR PUBLICAÇÃO

function curtir(botao) {

    const icone = botao.querySelector("i");
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    const curtido = botao.classList.toggle("curtido");

    if (curtido) {
        icone.className = "fa-solid fa-heart";
        icone.style.color = "red";
        likes.textContent = "1.251 curtidas";
    } else {
        icone.className = "fa-regular fa-heart";
        icone.style.color = "";
        likes.textContent = "1.250 curtidas";
    }
}

// SALVAR PUBLICAÇÃO

function salvar(botao) {

    const icone = botao.querySelector("i");

    icone.classList.toggle("fa-solid");
    icone.classList.toggle("fa-regular");
}

// COMENTAR

function comentar(botao) {
    const input = botao.closest(".post")
        .querySelector("input");

    input.focus();
}

// ENVIAR COMENTÁRIO

function enviarComentario(event, input) {

    if (event.key === "Enter") {

        const texto = input.value.trim();

        if (texto === "") return;

        const post = input.closest(".post");
        const comentarios = post.querySelector(".comentarios");

        const comentario = document.createElement("p");

        comentario.textContent = "Você: " + texto;

        comentarios.appendChild(comentario);

        input.value = "";
    }
}

// CRIAR PUBLICAÇÃO

function publicar() {

    const nome = document.getElementById("nomePost").value.trim();
    const legenda = document.getElementById("legendaPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (!nome || !legenda) {
        alert("Preencha o nome e a legenda!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const usuario = document.createElement("strong");
    usuario.textContent = nome;

    header.appendChild(usuario);

    post.appendChild(header);

    if (imagem) {

        const foto = document.createElement("img");

        foto.className = "post-image";
        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        post.appendChild(foto);
    }

    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    acoes.innerHTML = `
        <div>
            <button onclick="curtir(this)">
                <i class="fa-regular fa-heart"></i>
            </button>
            <button onclick="comentar(this)">
                <i class="fa-regular fa-comment"></i>
            </button>
            <button>
                <i class="fa-regular fa-paper-plane"></i>
            </button>
        </div>
        <button onclick="salvar(this)">
            <i class="fa-regular fa-bookmark"></i>
        </button>
    `;

    post.appendChild(acoes);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    post.appendChild(likes);

    const texto = document.createElement("p");
    texto.textContent = nome + " " + legenda;

    post.appendChild(texto);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.appendChild(comentarios);

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";
    input.addEventListener("keydown", function(event) {
        enviarComentario(event, input);
    });

    post.appendChild(input);

    feed.prepend(post);

    fecharCriacao();

    document.getElementById("nomePost").value = "";
    document.getElementById("legendaPost").value = "";
    document.getElementById("imagemPost").value = "";
}

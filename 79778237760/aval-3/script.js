
const feed = document.getElementById("feed");

// CURTIR PUBLICAÇÃO

function curtir(botao) {

    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let quantidade = Number(
        likes.textContent.match(/\d+/)[0]
    );

    if (botao.classList.contains("ativo")) {
        quantidade--;
        botao.classList.remove("ativo");
        botao.textContent = "♡";
    } else {
        quantidade++;
        botao.classList.add("ativo");
        botao.textContent = "♥";
    }

    likes.textContent = quantidade + " curtidas";
}


// COMENTÁRIOS

function mostrarComentario(botao) {

    const post = botao.closest(".post");

    const area = post.querySelector(".adicionar-comentario");

    area.style.display =
        area.style.display === "none" ? "flex" : "none";

}


// ADICIONAR COMENTÁRIO

function comentar(botao) {

    const post = botao.closest(".post");

    const campo = post.querySelector(
        ".adicionar-comentario input"
    );

    const lista = post.querySelector(".comentarios");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");

    novoComentario.textContent = "joaosilva: " + texto;

    lista.appendChild(novoComentario);

    campo.value = "";

}


// CRIAR PUBLICAÇÃO

function publicar() {

    const legenda = document.getElementById("legenda");
    const imagem = document.getElementById("imagem");

    const texto = legenda.value.trim();

    if (!texto && imagem.files.length === 0) {
        alert("Adicione uma legenda ou uma imagem!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    const data = new Date().toLocaleString("pt-BR");

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12" alt="Perfil">
            <div>
                <strong>joaosilva</strong>
                <span>${data}</span>
            </div>
            <button class="opcoes">•••</button>
        </div>

        <div class="post-info">
            <p class="legenda-post"></p>
        </div>

        <div class="post-actions">
            <button class="curtir" onclick="curtir(this)">♡</button>
            <button onclick="mostrarComentario(this)">💬</button>
            <button>➤</button>
            <button class="salvar">♧</button>
        </div>

        <div class="post-info">
            <strong class="likes">0 curtidas</strong>
            <div class="comentarios"></div>

            <div class="adicionar-comentario">
                <input type="text" placeholder="Adicione um comentário...">
                <button onclick="comentar(this)">Publicar</button>
            </div>
        </div>
    `;

    post.querySelector(".legenda-post").textContent = texto;

    if (imagem.files.length > 0) {

        const foto = document.createElement("img");

        foto.className = "post-image";
        foto.alt = "Imagem publicada";
        foto.src = URL.createObjectURL(imagem.files[0]);

        post.insertBefore(
            foto,
            post.querySelector(".post-actions")
        );
    }

    feed.prepend(post);

    legenda.value = "";
    imagem.value = "";

}


// PESQUISAR

document.getElementById("pesquisa")
    .addEventListener("input", function() {

        const termo = this.value.toLowerCase();

        document.querySelectorAll(".post").forEach(post => {

            post.style.display =
                post.textContent.toLowerCase().includes(termo)
                ? "block"
                : "none";

        });

    });


// MODO ESCURO

document.getElementById("tema")
    .addEventListener("click", function() {

        document.body.classList.toggle("dark");

        this.textContent =
            document.body.classList.contains("dark")
            ? "☀️ Modo claro"
            : "🌙 Modo escuro";

    });


// BOTÃO DE SALVAR

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("salvar")) {

        event.target.classList.toggle("salvo");

        event.target.textContent =
            event.target.classList.contains("salvo")
            ? "🔖"
            : "♧";

    }

});

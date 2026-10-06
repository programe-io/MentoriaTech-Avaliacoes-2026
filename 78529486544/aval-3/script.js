```javascript
// CURTIR PUBLICAÇÃO

function curtir(botao) {

    let texto = botao.querySelector("span");

    if (texto.textContent === "Curtido") {

        texto.textContent = "Curtir";
        botao.style.color = "#555";

    } else {

        texto.textContent = "Curtido";
        botao.style.color = "#6956e8";

    }
}


// CRIAR PUBLICAÇÃO

function publicar() {

    let texto = document.getElementById("novoTexto").value;

    if (texto.trim() === "") {

        alert("Digite alguma coisa antes de publicar!");

        return;
    }

    let feed = document.getElementById("feedPosts");

    let novoPost = document.createElement("article");

    novoPost.className = "post";

    novoPost.innerHTML = `
        <div class="post-cabecalho">

            <div class="usuario">

                <div class="avatar">
                    👩🏻
                </div>

                <div>
                    <strong>Meu Perfil</strong>
                    <span>@meuperfil • agora</span>
                </div>

            </div>

            <button class="mais">•••</button>

        </div>

        <p class="texto-post">
            ${texto}
        </p>

        <div class="informacoes">
            <span>❤️ 0 curtidas</span>
            <span>0 comentários</span>
        </div>

        <div class="botoes-post">

            <button onclick="curtir(this)">
                ❤️ <span>Curtir</span>
            </button>

            <button onclick="comentar(this)">
                💬 Comentar
            </button>

            <button>
                ↗️ Compartilhar
            </button>

        </div>

        <div class="comentarios"></div>
    `;

    feed.prepend(novoPost);

    document.getElementById("novoTexto").value = "";

}


// COMENTAR

function comentar(botao) {

    let post = botao.closest(".post");

    let comentarios = post.querySelector(".comentarios");

    let comentario = prompt("Digite seu comentário:");

    if (comentario !== null && comentario.trim() !== "") {

        let novoComentario = document.createElement("div");

        novoComentario.className = "comentario";

        novoComentario.innerHTML =
            "<strong>Você:</strong> " + comentario;

        comentarios.appendChild(novoComentario);
    }
}


// MODO ESCURO

function modoEscuro() {

    document.body.classList.toggle("escuro");

}


// PESQUISA

function pesquisar() {

    let pesquisa =
        document.getElementById("pesquisa").value.toLowerCase();

    let posts =
        document.querySelectorAll(".post");

    posts.forEach(function(post) {

        let texto = post.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });

}
```

// ======================================
// MODO ESCURO
// ======================================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }

});


// ======================================
// CURTIR PUBLICAÇÃO
// ======================================

const curtirBotoes =
    document.querySelectorAll(".curtirBtn");

curtirBotoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const post = botao.closest(".post");

        const contador =
            post.querySelector(".curtidas");

        let numero =
            parseInt(contador.textContent);

        if (!botao.classList.contains("curtido")) {

            numero++;

            botao.classList.add("curtido");

            botao.textContent = "♥ Curtido";

        } else {

            numero--;

            botao.classList.remove("curtido");

            botao.textContent = "♡ Curtir";

        }

        contador.textContent =
            numero + " curtidas";

    });

});


// ======================================
// ABRIR COMENTÁRIOS
// ======================================

const botoesComentario =
    document.querySelectorAll(".comentarioBtn");

botoesComentario.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const post = botao.closest(".post");

        const comentarios =
            post.querySelector(".comentarios");

        comentarios.classList.toggle("ativo");

    });

});


// ======================================
// ENVIAR COMENTÁRIO
// ======================================

const enviarBotoes =
    document.querySelectorAll(".enviarComentario");

enviarBotoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const post = botao.closest(".post");

        const input =
            post.querySelector(".comentarioInput");

        const lista =
            post.querySelector(".listaComentarios");

        const texto =
            input.value.trim();

        if (texto === "") {

            alert("Digite um comentário!");

            return;
        }


        const comentario =
            document.createElement("div");

        comentario.classList.add("comentario");

        comentario.innerHTML =
            "<strong>Kailane:</strong> " + texto;


        lista.appendChild(comentario);

        input.value = "";


        // Atualiza contador
        const contador =
            post.querySelector(".post-info span:last-child");

        let numero =
            parseInt(contador.textContent);

        contador.textContent =
            (numero + 1) + " comentários";

    });

});


// ======================================
// PUBLICAR NOVO POST
// ======================================

const publicarBtn =
    document.getElementById("publicarBtn");

const textoPost =
    document.getElementById("textoPost");

const feed =
    document.querySelector(".feed");


publicarBtn.addEventListener("click", function () {

    const texto =
        textoPost.value.trim();

    if (texto === "") {

        alert("Escreva alguma coisa antes de publicar!");

        return;
    }


    const novoPost =
        document.createElement("article");

    novoPost.classList.add("post");


    novoPost.innerHTML = `

        <div class="post-header">

            <div class="mini-foto">
                👩🏻
            </div>

            <div>
                <strong>Kailane</strong>
                <p>@kailane • agora</p>
            </div>

            <button class="mais">
                •••
            </button>

        </div>


        <div class="post-text">
            <p>${texto}</p>
        </div>


        <div class="post-info">

            <span class="curtidas">
                0 curtidas
            </span>

            <span>
                0 comentários
            </span>

        </div>


        <div class="botoes-post">

            <button class="curtirBtn">
                ♡ Curtir
            </button>

            <button class="comentarioBtn">
                💬 Comentar
            </button>

            <button>
                ↗ Compartilhar
            </button>

        </div>


        <div class="comentarios">

            <input
                type="text"
                class="comentarioInput"
                placeholder="Escreva um comentário..."
            >

            <button class="enviarComentario">
                Enviar
            </button>

            <div class="listaComentarios"></div>

        </div>

    `;


    feed.prepend(novoPost);

    textoPost.value = "";


    // Adiciona as funcionalidades ao novo post

    adicionarFuncoesPost(novoPost);

});


// ======================================
// FUNÇÕES PARA NOVOS POSTS
// ======================================

function adicionarFuncoesPost(post) {

    const curtir =
        post.querySelector(".curtirBtn");

    curtir.addEventListener("click", function () {

        const contador =
            post.querySelector(".curtidas");

        let numero =
            parseInt(contador.textContent);

        if (!curtir.classList.contains("curtido")) {

            numero++;

            curtir.classList.add("curtido");

            curtir.textContent = "♥ Curtido";

        } else {

            numero--;

            curtir.classList.remove("curtido");

            curtir.textContent = "♡ Curtir";

        }

        contador.textContent =
            numero + " curtidas";

    });


    const comentarioBtn =
        post.querySelector(".comentarioBtn");

    comentarioBtn.addEventListener("click", function () {

        post.querySelector(".comentarios")
            .classList.toggle("ativo");

    });


    const enviar =
        post.querySelector(".enviarComentario");

    enviar.addEventListener("click", function () {

        const input =
            post.querySelector(".comentarioInput");

        const lista =
            post.querySelector(".listaComentarios");

        const texto =
            input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }


        const comentario =
            document.createElement("div");

        comentario.classList.add("comentario");

        comentario.innerHTML =
            "<strong>Kailane:</strong> " + texto;

        lista.appendChild(comentario);

        input.value = "";


        const contador =
            post.querySelector(".post-info span:last-child");

        let numero =
            parseInt(contador.textContent);

        contador.textContent =
            (numero + 1) + " comentários";

    });

}


// ======================================
// BOTÃO FOTO
// ======================================

const fotoBtn =
    document.getElementById("fotoBtn");

fotoBtn.addEventListener("click", function () {

    alert(
        "A função de adicionar fotos pode ser conectada a um upload de imagens."
    );

});


// ======================================
// BOTÃO EMOJI
// ======================================

const emojiBtn =
    document.getElementById("emojiBtn");

emojiBtn.addEventListener("click", function () {

    textoPost.value += " 💙😊✨";

    textoPost.focus();

});


// ======================================
// MENSAGEM NO CONSOLE
// ======================================

console.log(
    "BlueSocial carregado com sucesso! Desenvolvido por Kailane 💙"
);
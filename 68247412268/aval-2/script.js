// ===============================
// MODO ESCURO
// ===============================

const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }

});


// ===============================
// CURTIR PUBLICAÇÃO
// ===============================

function configurarCurtidas() {

    const botoesCurtir = document.querySelectorAll(".curtir");

    botoesCurtir.forEach(botao => {

        botao.onclick = () => {

            const contador = botao.querySelector("span");

            let quantidade = Number(contador.textContent);

            if (botao.classList.contains("ativo")) {

                quantidade--;

                botao.classList.remove("ativo");

            } else {

                quantidade++;

                botao.classList.add("ativo");

            }

            contador.textContent = quantidade;

        };

    });

}

configurarCurtidas();


// ===============================
// MOSTRAR COMENTÁRIOS
// ===============================

function configurarComentarios() {

    const botoes = document.querySelectorAll(".comentar");

    botoes.forEach(botao => {

        botao.onclick = () => {

            const post = botao.closest(".post");

            const comentarios =
                post.querySelector(".comentarios");

            comentarios.classList.toggle("mostrar");

        };

    });

}

configurarComentarios();


// ===============================
// ADICIONAR COMENTÁRIO
// ===============================

function configurarEnvioComentarios() {

    const botoes =
        document.querySelectorAll(".btnComentario");

    botoes.forEach(botao => {

        botao.onclick = () => {

            const comentarios =
                botao.closest(".comentarios");

            const campo =
                comentarios.querySelector(".campoComentario");

            const lista =
                comentarios.querySelector(".listaComentarios");

            const texto = campo.value.trim();

            if (texto === "") {

                alert("Digite um comentário.");

                return;

            }

            const novoComentario =
                document.createElement("div");

            novoComentario.classList.add("comentario");

            novoComentario.textContent =
                "Você: " + texto;

            lista.appendChild(novoComentario);

            campo.value = "";

        };

    });

}

configurarEnvioComentarios();


// ===============================
// CRIAR NOVA PUBLICAÇÃO
// ===============================

const formulario =
    document.getElementById("postForm");

const listaPosts =
    document.getElementById("listaPosts");


formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome =
        document.getElementById("nome").value.trim();

    const texto =
        document.getElementById("textoPost").value.trim();


    if (nome === "" || texto === "") {

        alert("Preencha todos os campos.");

        return;

    }


    const novoPost =
        document.createElement("article");

    novoPost.classList.add("post");


    novoPost.innerHTML = `

        <div class="usuario">

            <div class="avatar">
                👤
            </div>

            <div>

                <strong>${nome}</strong>

                <small>
                    Agora
                </small>

            </div>

        </div>


        <p class="texto">
            ${texto}
        </p>


        <div class="acoes">

            <button class="curtir">
                ❤️ <span>0</span>
            </button>

            <button class="comentar">
                💬 Comentar
            </button>

        </div>


        <div class="comentarios">

            <input
                type="text"
                placeholder="Escreva um comentário..."
                class="campoComentario"
            >

            <button class="btnComentario">
                Enviar
            </button>

            <div class="listaComentarios"></div>

        </div>

    `;


    listaPosts.prepend(novoPost);


    formulario.reset();


    configurarCurtidas();

    configurarComentarios();

    configurarEnvioComentarios();


    alert("Publicação criada com sucesso! 🎉");

});

// =============================
// MODO ESCURO
// =============================

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }

});


// =============================
// CURTIDAS
// =============================

const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {

    botao.addEventListener("click", () => {

        const contador = botao.querySelector("span");

        let curtidas = Number(contador.textContent);

        if (botao.classList.contains("ativo")) {

            curtidas--;

            botao.classList.remove("ativo");

            botao.firstChild.textContent = "♡ ";

        } else {

            curtidas++;

            botao.classList.add("ativo");

            botao.firstChild.textContent = "♥ ";

        }

        contador.textContent = curtidas;

    });

});


// =============================
// COMENTÁRIOS
// =============================

const botoesComentario =
    document.querySelectorAll(".enviar-comentario");

botoesComentario.forEach(botao => {

    botao.addEventListener("click", () => {

        const area = botao.parentElement;

        const input = area.querySelector("input");

        const lista =
            area.querySelector(".lista-comentarios");

        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario =
            document.createElement("div");

        novoComentario.classList.add("comentario");

        novoComentario.textContent =
            "👤 Você: " + texto;

        lista.appendChild(novoComentario);

        input.value = "";

    });

});


// =============================
// COMPARTILHAR
// =============================

const botoesCompartilhar =
    document.querySelectorAll(".compartilhar");

botoesCompartilhar.forEach(botao => {

    botao.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert("Link copiado!");

        } catch {

            alert("Não foi possível copiar o link.");

        }

    });

});


// =============================
// CRIAR NOVA PUBLICAÇÃO
// =============================

const publicar =
    document.getElementById("publicar");

publicar.addEventListener("click", () => {

    const nome =
        document.getElementById("nome").value.trim();

    const look =
        document.getElementById("look").value.trim();

    const estilo =
        document.getElementById("estilo").value;

    if (nome === "" || look === "") {

        alert("Preencha seu nome e descreva seu look!");

        return;
    }

    const feed =
        document.getElementById("feed");

    const novoPost =
        document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `

        <div class="post-header">

            <div class="mini-avatar">
                👤
            </div>

            <div>
                <strong>${nome}</strong>
                <small>@novousuario</small>
            </div>

        </div>

        <div class="foto look-3">
            👕
        </div>

        <div class="post-info">

            <span class="categoria">
                ${estilo}
            </span>

            <h3>
                Meu look de hoje ✨
            </h3>

            <p>
                ${look}
            </p>

            <div class="acoes">

                <button class="curtir">
                    ♡ <span>0</span>
                </button>

                <button class="comentario-btn">
                    💬
                </button>

                <button class="compartilhar">
                    ↗
                </button>

            </div>

        </div>
    `;

    feed.prepend(novoPost);

    document.getElementById("nome").value = "";
    document.getElementById("look").value = "";

    alert("Publicação criada com sucesso! 🎉");

});


const textoPublicacao = document.getElementById("textoPublicacao");
const botaoPublicar = document.getElementById("botaoPublicar");
const listaPostagens = document.getElementById("listaPostagens");

// Criar uma nova publicação
botaoPublicar.addEventListener("click", function() {

    const texto = textoPublicacao.value.trim();

    if (texto.length < 3) {
        alert("Digite uma publicação com pelo menos 3 caracteres!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.className = "post";

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">M</div>

            <div>
                <strong>Miqueias</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button class="botaoCurtir">
                Curtir <span>0</span>
            </button>

            <button class="botaoComentar">Comentar</button>
        </div>

        <div class="area-comentarios" hidden></div>
    `;

    postagem.querySelector(".post-text").textContent = texto;

    listaPostagens.prepend(postagem);

    textoPublicacao.value = "";

});

// Curtir e comentar nas publicações
listaPostagens.addEventListener("click", function(event) {

    const postagem = event.target.closest(".post");

    if (!postagem) return;

    // Botão Curtir
    if (event.target.closest(".botaoCurtir")) {

        const botao = event.target.closest(".botaoCurtir");
        const contador = botao.querySelector("span");

        let curtidas = Number(contador.textContent);

        curtidas++;

        contador.textContent = curtidas;

        botao.textContent = "Curtido ";

        const novoContador = document.createElement("span");
        novoContador.textContent = curtidas;

        botao.appendChild(novoContador);
    }

    // Botão Comentar
    if (event.target.closest(".botaoComentar")) {

        const area = postagem.querySelector(".area-comentarios");

        if (area.hidden) {

            area.hidden = false;

            if (!area.querySelector("input")) {

                area.innerHTML = `
                    <input type="text"
                    placeholder="Escreva um comentário..."
                    maxlength="200">

                    <button class="enviarComentario">
                        Enviar comentário
                    </button>
                `;
            }

        } else {
            area.hidden = true;
        }
    }

    // Enviar comentário
    if (event.target.closest(".enviarComentario")) {

        const area = postagem.querySelector(".area-comentarios");
        const campo = area.querySelector("input");
        const comentario = campo.value.trim();

        if (comentario === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.className = "comentario";
        novoComentario.textContent = "Comentário: " + comentario;

        area.appendChild(novoComentario);

        campo.value = "";
    }

});

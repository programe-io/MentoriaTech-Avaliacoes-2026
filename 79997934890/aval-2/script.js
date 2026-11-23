// PUBLICAR

const campoTexto = document.getElementById("postText");
const botaoPublicar = document.getElementById("publishButton");
const feed = document.getElementById("feed");

botaoPublicar.addEventListener("click", function() {

    const texto = campoTexto.value.trim();

    if (texto === "") {
        alert("Escreva algo antes de publicar.");
        return;
    }

    const novaPublicacao = document.createElement("article");
    novaPublicacao.className = "post";

    novaPublicacao.innerHTML = `
        <div class="post-header">
            <div class="avatar">M</div>

            <div>
                <div class="author">Nova publicação</div>
                <div class="date">Agora</div>
            </div>
        </div>

        <p class="caption"></p>

        <div class="actions">
            <button class="action like">♡ Curtir <span>0</span></button>
            <button class="action comment">▢ Comentários</button>
            <button class="action share">↗ Compartilhar</button>
        </div>

        <div class="comments">
            Comentários demonstrativos.
        </div>
    `;

    novaPublicacao.querySelector(".caption").textContent = texto;

    feed.prepend(novaPublicacao);

    campoTexto.value = "";

});


// CURTIR, COMENTAR E COMPARTILHAR

document.addEventListener("click", async function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;


    // CURTIR

    if (botao.classList.contains("like")) {

        const contador = botao.querySelector("span");

        let quantidade = Number(contador.textContent);

        const curtiu = botao.classList.toggle("liked");

        quantidade = curtiu ? quantidade + 1 : quantidade - 1;

        botao.innerHTML = `${curtiu ? "♥" : "♡"} Curtir <span>${quantidade}</span>`;

        if (curtiu) {
            botao.classList.add("liked");
        } else {
            botao.classList.remove("liked");
        }

    }


    // COMENTÁRIOS

    if (botao.classList.contains("comment")) {

        const post = botao.closest(".post");
        const comentarios = post.querySelector(".comments");

        comentarios.classList.toggle("show");

    }


    // COMPARTILHAR

    if (botao.classList.contains("share")) {

        const post = botao.closest(".post");
        const texto = post.querySelector(".caption").textContent;

        try {

            await navigator.clipboard.writeText(texto);

            botao.textContent = "✓ Texto copiado";

            setTimeout(function() {
                botao.textContent = "↗ Compartilhar";
            }, 1500);

        } catch (erro) {

            alert(texto);

        }

    }

});
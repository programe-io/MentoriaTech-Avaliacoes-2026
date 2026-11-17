

const input = document.querySelector(".nova-publicacao input");
const botaoPublicar = document.querySelector(".nova-publicacao button");
const feed = document.querySelector(".feed");


botaoPublicar.addEventListener("click", function() {

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <h3>Você</h3>
        <small>Agora mesmo</small>

        <p>${texto}</p>

        <div class="acoes">
            <button class="curtir">❤️ Curtir (0)</button>
            <button class="comentar">💬 Comentar</button>
            <button class="compartilhar">🔗 Compartilhar</button>
        </div>
    `;

    feed.prepend(post);

    input.value = "";

});


feed.addEventListener("click", function(event) {

    const botao = event.target;

    
    if (botao.classList.contains("curtir")) {

        let curtidas = Number(
            botao.dataset.curtidas || 0
        );

        const curtiu = botao.dataset.curtiu === "true";

        if (curtiu) {
            curtidas--;
            botao.dataset.curtiu = "false";
            botao.textContent = `❤️ Curtir (${curtidas})`;
        } else {
            curtidas++;
            botao.dataset.curtiu = "true";
            botao.textContent = `💖 Curtido (${curtidas})`;
        }

        botao.dataset.curtidas = curtidas;
    }

    
    if (botao.classList.contains("comentar")) {

        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {

            const novoComentario = document.createElement("p");

            novoComentario.textContent =
                "💬 Você: " + comentario.trim();

            novoComentario.classList.add("comentario");

            botao.closest(".post").appendChild(novoComentario);
        }
    }

    
    if (botao.classList.contains("compartilhar")) {

        const postagem = botao.closest(".post");
        const texto = postagem.querySelector("p").textContent;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(texto)
                .then(() => alert("Publicação copiada!"))
                .catch(() => alert("Não foi possível copiar."));
        } else {
            alert("Compartilhamento indisponível neste navegador.");
        }
    }

});


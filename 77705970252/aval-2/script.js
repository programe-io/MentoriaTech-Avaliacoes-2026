
// FUNÇÃO PARA PUBLICAR POSTAGENS
function publicarPost() {

    const input = document.getElementById("postInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite algo antes de publicar!");
        return;
    }

    const main = document.querySelector("main");

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">K</div>
            <div>
                <strong>Kelly</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <div class="post-text">
            ${texto.replace(/&/g, "&amp;")
                   .replace(/</g, "&lt;")
                   .replace(/>/g, "&gt;")}
        </div>

        <div class="post-actions">
            <button onclick="curtirPost(this)">
                ♡ Curtir (0)
            </button>

            <button onclick="comentarPost(this)">
                Comentar
            </button>
        </div>

        <div class="comentarios"></div>
    `;

    main.appendChild(post);

    input.value = "";

    alert("Sua publicação foi realizada com sucesso! 💜");
}


// FUNÇÃO PARA CURTIR POSTAGENS
function curtirPost(botao) {

    let curtidas = Number(
        botao.dataset.curtidas || 0
    );

    let curtiu = botao.dataset.curtiu === "true";

    if (!curtiu) {
        curtidas++;
        botao.dataset.curtiu = "true";
        botao.innerHTML = `♥ Curtido (${curtidas})`;
        botao.style.background = "#d63384";
    } else {
        curtidas--;
        botao.dataset.curtiu = "false";
        botao.innerHTML = `♡ Curtir (${curtidas})`;
        botao.style.background = "";
    }

    botao.dataset.curtidas = curtidas;
}


// FUNÇÃO PARA COMENTAR
function comentarPost(botao) {

    const comentario = prompt("Digite seu comentário:");

    if (comentario === null || comentario.trim() === "") {
        return;
    }

    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const novoComentario = document.createElement("p");

    novoComentario.style.background = "#f3e5f5";
    novoComentario.style.padding = "10px";
    novoComentario.style.marginTop = "10px";
    novoComentario.style.borderRadius = "10px";
    novoComentario.style.color = "#7b2cbf";

    const nome = document.createElement("strong");
    nome.textContent = "Kelly: ";

    novoComentario.appendChild(nome);
    novoComentario.appendChild(
        document.createTextNode(comentario)
    );

    comentarios.appendChild(novoComentario);
}


const form = document.getElementById("post-form");
const texto = document.getElementById("post-text");
const feed = document.getElementById("feed");

// Criar publicação
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const mensagem = texto.value.trim();

    if (mensagem === "") {
        alert("Digite uma publicação!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    const cabecalho = document.createElement("div");
    cabecalho.classList.add("post-header");

    cabecalho.innerHTML = `
        <div class="avatar">M</div>
        <div>
            <strong>Meu Perfil</strong>
            <span>Estudante de Tecnologia</span>
            <span>Agora mesmo</span>
        </div>
    `;

    const paragrafo = document.createElement("p");
    paragrafo.classList.add("post-text");
    paragrafo.textContent = mensagem;

    const acoes = document.createElement("div");
    acoes.classList.add("post-actions");

    acoes.innerHTML = `
        <button class="like-button">👍 Curtir</button>
        <button class="comment-button">💬 Comentar</button>
    `;

    const comentarios = document.createElement("div");
    comentarios.classList.add("comments");

    post.append(cabecalho, paragrafo, acoes, comentarios);

    feed.prepend(post);

    texto.value = "";
});

// Curtir e comentar
feed.addEventListener("click", function(event) {

    if (event.target.classList.contains("like-button")) {
        const botao = event.target;

        botao.classList.toggle("liked");

        botao.textContent = botao.classList.contains("liked")
            ? "👍 Curtido"
            : "👍 Curtir";
    }

    if (event.target.classList.contains("comment-button")) {
        const post = event.target.closest(".post");
        const comentarios = post.querySelector(".comments");

        if (comentarios.querySelector("form")) return;

        const formulario = document.createElement("form");

        formulario.innerHTML = `
            <input type="text"
                placeholder="Escreva um comentário..."
                required>

            <button type="submit">Enviar</button>
        `;

        formulario.style.display = "flex";
        formulario.style.gap = "8px";
        formulario.style.marginTop = "10px";

        comentarios.appendChild(formulario);
    }
});

// Enviar comentário
feed.addEventListener("submit", function(event) {

    if (!event.target.matches(".comments form")) return;

    event.preventDefault();

    const formulario = event.target;
    const campo = formulario.querySelector("input");
    const mensagem = campo.value.trim();

    if (mensagem === "") return;

    const comentario = document.createElement("div");
    comentario.classList.add("comment-item");
    comentario.textContent = "Você: " + mensagem;

    formulario.parentElement.appendChild(comentario);
    formulario.remove();
});

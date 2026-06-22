function criarPost() {
    const texto = document.getElementById("textoPost").value;

    if (texto.trim() === "") {
        alert("Digite algo para publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("div");
    post.className = "post";

    let curtidas = 0;

    post.innerHTML = `
        <h4>Pedro</h4>
        <p>${texto}</p>

        <div class="acoes">
            <button class="like-btn">👍 Curtir (0)</button>
        </div>

        <div class="comentarios">
            <input type="text" placeholder="Escreva um comentário...">
            <button>Comentar</button>
            <ul></ul>
        </div>
    `;

    const likeBtn = post.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => {
        curtidas++;
        likeBtn.textContent = `👍 Curtir (${curtidas})`;
    });

    const comentarioBtn = post.querySelector(".comentarios button");
    const comentarioInput = post.querySelector(".comentarios input");
    const listaComentarios = post.querySelector("ul");

    comentarioBtn.addEventListener("click", () => {
        if (comentarioInput.value.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = comentarioInput.value;
            listaComentarios.appendChild(li);
            comentarioInput.value = "";
        }
    });

    feed.prepend(post);

    document.getElementById("textoPost").value = "";
}
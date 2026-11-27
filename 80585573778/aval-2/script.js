
// Selecionando elementos
const botaoPublicar = document.querySelector(".new-post button");
const areaPublicacao = document.querySelector(".new-post");
const campoUsuario = document.querySelector(".user strong");

// Função para criar uma publicação
botaoPublicar.addEventListener("click", function () {

    const texto = prompt("O que você está pensando?");

    if (texto === null || texto.trim() === "") {
        alert("Digite alguma publicação!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.classList.add("post");

    postagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">A</div>
            <div>
                <strong>${campoUsuario.textContent}</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <div class="post-text">
            <p></p>
        </div>

        <div class="post-actions">
            <button class="curtir">Curtir</button>
            <button class="comentar">Comentar</button>
        </div>
    `;

    postagem.querySelector(".post-text p").textContent = texto;

    document.querySelector("main").insertBefore(
        postagem,
        areaPublicacao.nextElementSibling
    );

});

// Curtir e comentar publicações
document.querySelector("main").addEventListener("click", function (evento) {

    if (evento.target.classList.contains("curtir")) {
        evento.target.textContent =
            evento.target.textContent === "Curtir"
                ? "Curtido!"
                : "Curtir";
    }

    if (evento.target.classList.contains("comentar")) {
        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            const novoComentario = document.createElement("p");
            novoComentario.textContent = "Comentário: " + comentario;

            evento.target.closest(".post")
                .appendChild(novoComentario);
        }
    }

});

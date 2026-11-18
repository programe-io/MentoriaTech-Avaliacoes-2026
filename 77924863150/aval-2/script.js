
function publicar() {
    const input = document.getElementById("postInput");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const feed = document.getElementById("feed");

    const novaPostagem = document.createElement("article");
    novaPostagem.className = "post";

    novaPostagem.innerHTML = `
        <div class="post-header">
            <div class="avatar">L</div>
            <div>
                <strong>Luiz</strong>
                <span>Agora mesmo</span>
            </div>
        </div>

        <p class="post-text"></p>

        <div class="post-actions">
            <button onclick="curtir(this)">Curtir ❤️</button>
            <button onclick="comentar()">Comentar 💬</button>
        </div>
    `;

    novaPostagem.querySelector(".post-text").textContent = texto;

    feed.prepend(novaPostagem);

    input.value = "";
}

function curtir(botao) {
    if (botao.textContent.includes("Curtir")) {
        botao.textContent = "Curtido ❤️";
    } else {
        botao.textContent = "Curtir ❤️";
    }
}

function comentar() {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Comentário adicionado: " + comentario);
    }
}

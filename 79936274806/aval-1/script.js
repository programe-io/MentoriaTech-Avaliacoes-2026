```javascript
// ======================================
// MINI FEED - HOMEM-ARANHA
// JAVASCRIPT
// ======================================

// PUBLICAR NOVO POST
function publicar() {

    const campo = document.getElementById("postText");
    const texto = campo.value.trim();

    // Verifica se o campo está vazio
    if (texto === "") {
        alert("🕷️ Escreva alguma coisa antes de publicar!");
        return;
    }

    // Cria o novo post
    const novoPost = document.createElement("div");
    novoPost.classList.add("post");

    novoPost.innerHTML = `
        <h3>🕷️ Peter Parker</h3>

        <p>${texto}</p>

        <button class="like" onclick="curtir(this)">
            ❤️ Curtir
        </button>

        <span class="likes">0 curtidas</span>

        <button class="delete" onclick="apagar(this)">
            🗑️ Apagar
        </button>
    `;

    // Coloca o novo post no começo do feed
    const feed = document.getElementById("feed");
    feed.prepend(novoPost);

    // Limpa a caixa de texto
    campo.value = "";

    // Mensagem de confirmação
    alert("🕸️ Publicação criada com sucesso!");
}


// ======================================
// CURTIR PUBLICAÇÃO
// ======================================

function curtir(botao) {

    const contador = botao.nextElementSibling;

    let numero = parseInt(contador.innerText);

    numero++;

    contador.innerText = numero + " curtidas";

    // Impede curtidas infinitas no mesmo botão
    if (numero === 1) {
        botao.innerText = "❤️ Curtido";
        botao.disabled = true;
    }
}


// ======================================
// APAGAR PUBLICAÇÃO
// ======================================

function apagar(botao) {

    const post = botao.parentElement;

    const confirmar = confirm(
        "🕷️ Tem certeza que deseja apagar esta publicação?"
    );

    if (confirmar) {
        post.remove();
    }
}


// ======================================
// ENTER PARA PUBLICAR
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const campo = document.getElementById("postText");

    campo.addEventListener("keydown", function (evento) {

        // Ctrl + Enter publica
        if (evento.ctrlKey && evento.key === "Enter") {
            publicar();
        }

    });

});
```

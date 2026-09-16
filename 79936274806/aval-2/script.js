```javascript
// ================================
// MINI FEED HOMEM-ARANHA
// ================================

// Contador de curtidas
let curtidas = {
    1: 0,
    2: 0
};


// ================================
// FUNÇÃO DE CURTIR
// ================================

function curtir(post) {

    curtidas[post]++;

    const contador = document.getElementById("likes" + post);

    if (contador) {
        contador.textContent = curtidas[post];
    }
}


// ================================
// FUNÇÃO DE COMENTAR
// ================================

function comentar(post) {

    const campo = document.getElementById("comentario" + post);
    const areaComentarios = document.getElementById("comentarios" + post);

    const texto = campo.value.trim();

    if (texto === "") {
        alert("🕷️ Digite um comentário primeiro!");
        return;
    }

    const comentario = document.createElement("div");

    comentario.classList.add("comentario");

    comentario.textContent = "🕷️ Você: " + texto;

    areaComentarios.appendChild(comentario);

    campo.value = "";
}


// ================================
// FUNÇÃO COMPARTILHAR
// ================================

function compartilhar() {

    if (navigator.share) {

        navigator.share({
            title: "MiniFeed Homem-Aranha",
            text: "Confira este MiniFeed do Homem-Aranha! 🕷️"
        });

    } else {

        alert("🕷️ Postagem compartilhada!");
    }
}


// ================================
// CRIAR NOVA POSTAGEM
// ================================

function publicar() {

    const campo = document.getElementById("textoPost");

    const texto = campo.value.trim();

    if (texto === "") {

        alert("🕷️ Escreva alguma coisa antes de publicar!");

        return;
    }

    const novaPostagem = document.createElement("div");

    novaPostagem.classList.add("post");

    novaPostagem.innerHTML = `
        <h2>🕷️ Homem-Aranha</h2>

        <p>${texto}</p>

        <div class="curtidas">
            ❤️ <span>0</span> curtidas
        </div>

        <button class="botao-curtir">
            ❤️ Curtir
        </button>

        <button class="botao-compartilhar">
            🔄 Compartilhar
        </button>
    `;

    document
        .getElementById("novasPostagens")
        .prepend(novaPostagem);


    // Botão de curtir da nova postagem
    const botaoCurtir =
        novaPostagem.querySelector(".botao-curtir");

    const contador =
        novaPostagem.querySelector(".curtidas span");

    let numeroCurtidas = 0;

    botaoCurtir.addEventListener("click", function () {

        numeroCurtidas++;

        contador.textContent = numeroCurtidas;

    });


    // Botão compartilhar
    const botaoCompartilhar =
        novaPostagem.querySelector(".botao-compartilhar");

    botaoCompartilhar.addEventListener("click", function () {

        compartilhar();

    });


    // Limpar campo
    campo.value = "";

    alert("🕷️ Postagem publicada com sucesso!");
}
```

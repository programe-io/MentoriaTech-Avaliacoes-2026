```javascript
// ==========================================
// CACHEIA - JAVASCRIPT
// MiniFeed sobre cabelos cacheados
// ==========================================


// ==========================================
// CURTIR PUBLICAÇÃO
// ==========================================

function curtir(botao) {

    let contador = botao.querySelector("span");

    let quantidade = Number(contador.innerText);

    quantidade++;

    contador.innerText = quantidade;

    botao.innerHTML = "❤️ Curtido <span>" + quantidade + "</span>";

}


// ==========================================
// COMENTAR
// ==========================================

function comentar(botao) {

    let comentario = prompt("💬 Escreva seu comentário:");

    if (comentario === null || comentario.trim() === "") {
        return;
    }

    let post = botao.closest(".post");

    let comentarios = post.querySelector(".comentarios");

    // Se ainda não existir área de comentários
    if (!comentarios) {

        comentarios = document.createElement("div");

        comentarios.className = "comentarios";

        post.appendChild(comentarios);
    }

    let novoComentario = document.createElement("p");

    novoComentario.innerHTML =
        "👤 <strong>Você:</strong> " + comentario;

    comentarios.appendChild(novoComentario);

}


// ==========================================
// CRIAR PUBLICAÇÃO
// ==========================================

function criarPost() {

    let campo =
        document.getElementById("textoPost");

    let texto = campo.value.trim();

    if (texto === "") {

        alert("⚠️ Escreva alguma coisa antes de publicar!");

        return;
    }

    let feed =
        document.getElementById("feed");

    let novoPost =
        document.createElement("article");

    novoPost.className = "post";

    novoPost.innerHTML = `

        <div class="usuario">
            👤 Você
        </div>

        <p>${texto}</p>

        <div class="acoes">

            <button onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button onclick="comentar(this)">
                💬 Comentar
            </button>

        </div>

        <div class="comentarios"></div>

    `;

    feed.prepend(novoPost);

    campo.value = "";

    alert("✅ Sua publicação foi criada!");

}


// ==========================================
// PESQUISA
// ==========================================

function pesquisar() {

    let campo =
        document.getElementById("busca");

    let termo =
        campo.value.toLowerCase().trim();

    let posts =
        document.querySelectorAll(".post");

    posts.forEach(function(post) {

        let texto =
            post.innerText.toLowerCase();

        if (texto.includes(termo)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });

}


// ==========================================
// PRODUTOS
// ==========================================

let carrinho = [];


function comprar(produto) {

    carrinho.push(produto);

    alert(
        "🛍️ " + produto +
        " foi adicionado ao carrinho!"
    );

    atualizarCarrinho();

}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    console.log("Carrinho:");

    console.log(carrinho);

}


// ==========================================
// VER CARRINHO
// ==========================================

function verCarrinho() {

    if (carrinho.length === 0) {

        alert("🛒 Seu carrinho está vazio!");

        return;
    }

    let mensagem =
        "🛒 PRODUTOS NO CARRINHO:\n\n";

    carrinho.forEach(function(produto, indice) {

        mensagem +=
            (indice + 1) +
            " - " +
            produto +
            "\n";

    });

    mensagem +=
        "\nTotal de produtos: " +
        carrinho.length;

    alert(mensagem);

}


// ==========================================
// MENU - INÍCIO
// ==========================================

function mostrarInicio() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// MENU - PRODUTOS
// ==========================================

function mostrarProdutos() {

    let produtos =
        document.getElementById("produtos");

    produtos.scrollIntoView({

        behavior: "smooth"

    });

}


// ==========================================
// MENU - DICAS
// ==========================================

function mostrarDicas() {

    let dicas =
        document.getElementById("dicas");

    dicas.scrollIntoView({

        behavior: "smooth"

    });

}


// ==========================================
// ENTER PARA PUBLICAR
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    let campo =
        document.getElementById("textoPost");

    campo.addEventListener("keydown", function(event) {

        // Ctrl + Enter publica
        if (event.ctrlKey && event.key === "Enter") {

            criarPost();

        }

    });

});


// ==========================================
// MENSAGEM DE BOAS-VINDAS
// ==========================================

window.addEventListener("load", function() {

    console.log(
        "🌀 Bem-vindo ao Cacheia!"
    );

    console.log(
        "Seu espaço para compartilhar dicas sobre cabelos cacheados."
    );

});
```

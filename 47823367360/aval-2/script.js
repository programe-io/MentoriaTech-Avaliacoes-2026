
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".contador");

    let total = Number(contador.dataset.total || 0);

    if (botao.dataset.curtido === "sim") {
        total--;
        botao.dataset.curtido = "nao";
        botao.textContent = "👍 Curtir";
    } else {
        total++;
        botao.dataset.curtido = "sim";
        botao.textContent = "❤️ Curtido";
    }

    contador.dataset.total = total;
    contador.textContent = total + " curtidas";
}

function publicar() {
    const texto = document.getElementById("texto");
    const publicacoes = document.getElementById("publicacoes");

    if (texto.value.trim() === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "👤 Publicação da comunidade";

    const conteudo = document.createElement("p");
    conteudo.textContent = texto.value;

    const botao = document.createElement("button");
    botao.textContent = "👍 Curtir";
    botao.onclick = function() {
        curtir(this);
    };

    const contador = document.createElement("p");
    contador.className = "contador";
    contador.textContent = "0 curtidas";

    post.append(titulo, conteudo, botao, contador);
    publicacoes.prepend(post);

    texto.value = "";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const novo = document.createElement("p");
        novo.textContent = "💬 " + comentario;
        comentarios.appendChild(novo);
    }
}

function compartilhar() {
    alert("Compartilhamento demonstrativo do PRF Social!");
}

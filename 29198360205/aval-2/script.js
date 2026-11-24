
// Criar nova publicação
function publicarPost() {

    const texto = document.getElementById("textoPost").value;
    const imagem = document.getElementById("imagemPost").value;

    if (texto.trim() === "") {
        alert("Eduarda, escreva algo antes de publicar! 💙");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "Eduarda 💙";

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(paragrafo);

    if (imagem.trim() !== "") {
        const img = document.createElement("img");
        img.src = imagem;
        img.alt = "Imagem da publicação";
        post.appendChild(img);
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "❤️ Curtir";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = comentar;

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "🔗 Compartilhar";
    botaoCompartilhar.onclick = compartilhar;

    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoComentar);
    acoes.appendChild(botaoCompartilhar);

    post.appendChild(acoes);

    const curtidas = document.createElement("p");
    curtidas.className = "curtidas";
    curtidas.textContent = "0 curtidas";

    post.appendChild(curtidas);

    feed.prepend(post);

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
}

// Curtir publicação
function curtir(botao) {

    const post = botao.closest(".post");
    const contador = post.querySelector(".curtidas");

    let quantidade = Number(contador.textContent.split(" ")[0]);

    if (botao.dataset.curtido === "true") {
        quantidade--;
        botao.dataset.curtido = "false";
        botao.textContent = "❤️ Curtir";
    } else {
        quantidade++;
        botao.dataset.curtido = "true";
        botao.textContent = "💙 Curtido";
    }

    contador.textContent = quantidade + " curtidas";
}

// Comentar publicação
function comentar() {

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Seu comentário foi enviado! 💙");
    }
}

// Compartilhar publicação
function compartilhar() {

    if (navigator.share) {
        navigator.share({
            title: "Mini Feed da Eduarda",
            text: "Confira meu Mini Feed sobre Cinderela! 💙"
        }).catch(() => {});
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

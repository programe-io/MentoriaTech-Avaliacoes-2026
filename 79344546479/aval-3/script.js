
// ===================================
// FUTGRAM - REDE SOCIAL DE FUTEBOL
// ===================================

// FUNÇÃO CURTIR
function curtir(botao) {

    const post = botao.closest(".post");
    const contador = post.querySelector(".contador");

    let curtidas = Number(contador.dataset.curtidas || 0);

    if (botao.dataset.curtido === "sim") {
        curtidas--;
        botao.dataset.curtido = "nao";
        botao.innerText = "❤️ Curtir";
    } else {
        curtidas++;
        botao.dataset.curtido = "sim";
        botao.innerText = "💚 Curtido";
    }

    contador.dataset.curtidas = curtidas;
    contador.innerText = curtidas + " curtidas";
}

// FUNÇÃO PUBLICAR
function publicar() {

    const texto = document
        .getElementById("textoPublicacao")
        .value.trim();

    const imagem = document
        .getElementById("imagemPublicacao")
        .value.trim();

    if (texto === "") {
        alert("Escreva algo sobre futebol!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "⚽ Torcedor FutGram";

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(mensagem);

    // ADICIONAR IMAGEM
    if (imagem) {
        try {
            const url = new URL(imagem);

            if (url.protocol === "https:" || url.protocol === "http:") {
                const foto = document.createElement("img");
                foto.src = url.href;
                foto.alt = "Imagem da publicação";
                post.appendChild(foto);
            } else {
                alert("Use um link de imagem válido.");
                return;
            }
        } catch {
            alert("Digite um endereço de imagem válido.");
            return;
        }
    }

    // BOTÃO CURTIR
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerText = "❤️ Curtir";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    // BOTÃO COMENTAR
    const botaoComentar = document.createElement("button");
    botaoComentar.innerText = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(botaoComentar);
    };

    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoComentar);

    post.appendChild(acoes);

    const contador = document.createElement("p");
    contador.className = "contador";
    contador.dataset.curtidas = "0";
    contador.innerText = "0 curtidas";

    post.appendChild(contador);

    document.getElementById("feed").prepend(post);

    document.getElementById("textoPublicacao").value = "";
    document.getElementById("imagemPublicacao").value = "";

    alert("Publicação realizada com sucesso! ⚽");
}

// FUNÇÃO COMENTAR
function comentar(botao) {

    const resposta = prompt("Escreva seu comentário:");

    if (resposta && resposta.trim() !== "") {

        const comentario = document.createElement("p");

        comentario.textContent = "💬 " + resposta;

        botao.closest(".post").appendChild(comentario);
    }
}

// FUNÇÃO PESQUISAR
document.getElementById("pesquisa")
    .addEventListener("input", function() {

        const busca = this.value.toLowerCase();

        const posts = document.querySelectorAll(".post");

        posts.forEach(function(post) {

            const texto = post.innerText.toLowerCase();

            post.style.display =
                texto.includes(busca) ? "block" : "none";

        });
    });

// MENSAGEM INICIAL
console.log("⚽ Bem-vindo ao FutGram!");
console.log("Sua rede social de futebol está funcionando!");

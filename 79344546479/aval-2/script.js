
// =================================
// FUTBOOK - REDE SOCIAL DE FUTEBOL
// =================================

// FUNÇÃO PARA CURTIR PUBLICAÇÕES
function curtir(botao) {
    if (botao.innerText === "👍 Curtir") {
        botao.innerText = "❤️ Curtido";
        botao.style.background = "#e91e63";
    } else {
        botao.innerText = "👍 Curtir";
        botao.style.background = "#1877f2";
    }
}

// FUNÇÃO PARA PUBLICAR
function publicar() {
    let campo = document.getElementById("publicacao");
    let texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva algo sobre futebol!");
        return;
    }

    let post = document.createElement("article");
    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = "⚽ Torcedor FutBook";

    let mensagem = document.createElement("p");
    mensagem.textContent = texto;

    let botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "👍 Curtir";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    let botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(botaoComentar);
    };

    post.appendChild(titulo);
    post.appendChild(mensagem);
    post.appendChild(botaoCurtir);
    post.appendChild(botaoComentar);

    document.getElementById("feed").prepend(post);

    campo.value = "";

    alert("Sua publicação foi compartilhada!");
}

// FUNÇÃO PARA COMENTAR
function comentar(botao) {
    let texto = prompt("Escreva seu comentário:");

    if (texto && texto.trim() !== "") {
        let comentario = document.createElement("p");

        comentario.textContent = "💬 " + texto;

        botao.parentElement.appendChild(comentario);
    }
}

// FUNÇÃO PARA PESQUISAR
function pesquisar() {
    let campo = document.getElementById("pesquisa");
    let busca = campo.value.toLowerCase();

    let publicacoes = document.querySelectorAll(".post");

    publicacoes.forEach(function(post) {
        let conteudo = post.innerText.toLowerCase();

        if (conteudo.includes(busca)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

// MENSAGEM DE BOAS-VINDAS
window.onload = function() {
    console.log("⚽ Bem-vindo ao FutBook!");
    console.log("Sua rede social de futebol está funcionando!");
};

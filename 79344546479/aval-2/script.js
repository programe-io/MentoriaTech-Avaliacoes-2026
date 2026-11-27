
// FACEBOOK
 - REDE SOCIAL ESPORTIVA

// CURTIR PUBLICAÇÕES
function curtir(botao) {
    if (botao.innerHTML === "👍 Curtir") {
        botao.innerHTML = "❤️ Curtido";
        botao.style.background = "#e91e63";
    } else {
        botao.innerHTML = "👍 Curtir";
        botao.style.background = "#1877f2";
    }
}

// PUBLICAR CONTEÚDO
function publicar() {
    let texto = document.getElementById("publicacao").value;

    if (texto.trim() === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    let novaPublicacao = document.createElement("article");

    novaPublicacao.className = "post";

    novaPublicacao.innerHTML = `
        <h3>👤 Usuário SportBook</h3>
        <p>${texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <button onclick="curtir(this)">👍 Curtir</button>
        <button onclick="comentar(this)">💬 Comentar</button>
    `;

    document.getElementById("feed").prepend(novaPublicacao);

    document.getElementById("publicacao").value = "";

    alert("Publicação realizada com sucesso!");
}

// COMENTAR PUBLICAÇÕES
function comentar(botao) {
    let comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {
        let novoComentario = document.createElement("p");

        novoComentario.textContent = "💬 " + comentario;

        botao.parentElement.appendChild(novoComentario);
    }
}

// PESQUISAR ESPORTES
function pesquisar() {
    let pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    let publicacoes = document.querySelectorAll(".post");

    publicacoes.forEach(function(post) {
        let conteudo = post.innerText.toLowerCase();

        if (conteudo.includes(pesquisa)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao SportBook!");
    console.log("Sua rede social esportiva está funcionando!");
});

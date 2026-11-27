
// ======================================
// GAMEGRAM - TUTORIAIS DE JOGOS
// JAVASCRIPT INSPIRADO NO INSTAGRAM
// ======================================

// 1. FUNÇÃO DE CURTIR PUBLICAÇÕES
function curtir(elemento) {

    if (elemento.dataset.curtido === "sim") {

        elemento.innerHTML = "🤍";
        elemento.dataset.curtido = "nao";

    } else {

        elemento.innerHTML = "❤️";
        elemento.dataset.curtido = "sim";

    }

}

// 2. FUNÇÃO DE COMENTAR
function comentar(botao) {

    let comentario = prompt(
        "Digite seu comentário sobre o tutorial:"
    );

    if (comentario && comentario.trim() !== "") {

        let post = botao.closest(".post");

        let novoComentario = document.createElement("p");

        novoComentario.className = "comentario";

        let nome = document.createElement("strong");
        nome.textContent = "👤 Você: ";

        novoComentario.appendChild(nome);
        novoComentario.appendChild(
            document.createTextNode(comentario)
        );

        post.appendChild(novoComentario);

        alert("Comentário publicado com sucesso!");

    }

}

// 3. FUNÇÃO DE COMPARTILHAR
function compartilhar() {

    if (navigator.share) {

        navigator.share({
            title: "GameGram",
            text: "Confira este tutorial incrível de jogos!"
        }).catch(() => {});

    } else {

        alert("Tutorial compartilhado com sucesso!");

    }

}

// 4. FUNÇÃO DE PUBLICAR TUTORIAL
function publicar() {

    let texto = document.getElementById("novoTutorial").value;

    if (texto.trim() === "") {

        alert("Escreva seu tutorial antes de publicar!");

        return;

    }

    let feed = document.querySelector(".feed");

    let post = document.createElement("article");

    post.className = "post";

    // Cabeçalho
    let cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    let usuario = document.createElement("strong");
    usuario.textContent = "🎮 gamegram_user";

    cabecalho.appendChild(usuario);

    // Conteúdo
    let conteudo = document.createElement("div");
    conteudo.className = "post-content";

    let titulo = document.createElement("h2");
    titulo.textContent = "📚 Novo tutorial";

    let descricao = document.createElement("p");
    descricao.textContent = texto;

    conteudo.appendChild(titulo);
    conteudo.appendChild(descricao);

    // Botões
    let acoes = document.createElement("div");
    acoes.className = "post-actions";

    acoes.innerHTML = `
        <span onclick="curtir(this)">🤍</span>
        <span onclick="comentar(this)">💬</span>
        <span onclick="compartilhar()">↗️</span>
    `;

    // Montar publicação
    post.appendChild(cabecalho);
    post.appendChild(conteudo);
    post.appendChild(acoes);

    feed.prepend(post);

    document.getElementById("novoTutorial").value = "";

    alert("Tutorial publicado com sucesso!");

}

// 5. FUNÇÃO DE PESQUISAR TUTORIAIS
function pesquisarTutoriais() {

    let pesquisa = document
        .getElementById("pesquisa")
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

// 6. FUNÇÃO DE ADICIONAR COMENTÁRIOS
function mostrarComentarios() {

    let comentarios = document.querySelectorAll(".comentario");

    alert(
        "Total de comentários: " + comentarios.length
    );

}

// 7. INICIALIZAÇÃO DO GAMEGRAM
document.addEventListener("DOMContentLoaded", function() {

    console.log(
        "🎮 GameGram iniciado com sucesso!"
    );

    console.log(
        "📚 Bem-vindo à comunidade de tutoriais de jogos!"
    );

});


// ==============================
// MEU FEED - JAVASCRIPT
// ==============================

// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".contador");

    let total = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "♡";
        contador.textContent = total - 1;
    } else {
        botao.classList.add("curtido");
        botao.textContent = "❤️";
        contador.textContent = total + 1;
    }
}

// CRIAR PUBLICAÇÃO
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (!nome || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("div");
    post.className = "post";

    const perfil = document.createElement("h3");
    perfil.textContent = "👤 " + nome;

    const descricao = document.createElement("p");
    descricao.className = "descricao";
    descricao.textContent = texto;

    post.append(perfil, descricao);

    if (foto) {
        const imagem = document.createElement("img");
        imagem.className = "foto";
        imagem.src = foto;
        imagem.alt = "Foto da publicação";
        post.appendChild(imagem);
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡";
    botaoCurtir.onclick = function() {
        curtir(this);
    };

    const curtidas = document.createElement("span");
    curtidas.className = "contador";
    curtidas.textContent = "0";

    acoes.append(botaoCurtir, curtidas, " curtidas");

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";
    enviar.onclick = function() {
        comentar(this);
    };

    const area = document.createElement("div");
    area.className = "comentar";
    area.append(campo, enviar);

    const excluir = document.createElement("button");
    excluir.textContent = "🗑️ Excluir";
    excluir.onclick = function() {
        excluirPost(this);
    };

    post.append(acoes, comentarios, area, excluir);

    document.getElementById("feed").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("foto").value = "";
}

// COMENTAR
function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector(".comentar input");
    const texto = campo.value.trim();

    if (!texto) {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;

    post.querySelector(".comentarios").appendChild(comentario);

    campo.value = "";
}

// PESQUISAR PUBLICAÇÕES
function pesquisar() {
    const busca = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const conteudo = post.textContent.toLowerCase();

        post.style.display =
            conteudo.includes(busca) ? "block" : "none";
    });
}

// EXCLUIR PUBLICAÇÃO
function excluirPost(botao) {
    const confirmar = confirm("Deseja excluir esta publicação?");

    if (confirmar) {
        botao.closest(".post").remove();
    }
}

console.log("🚀 Meu Feed está funcionando!");

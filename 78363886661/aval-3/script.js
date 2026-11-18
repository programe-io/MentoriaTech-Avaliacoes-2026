
const listaPosts = document.getElementById("listaPosts");

const textoPost = document.getElementById("textoPost");

const pesquisa = document.getElementById("pesquisa");

const semPosts = document.getElementById("semPosts");

// CRIAR PUBLICAÇÃO

function publicar() {

    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");

    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Avatar de Alex Gamer";

    const dados = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Alex Gamer";

    const tempo = document.createElement("small");
    tempo.textContent = "@alexgamer · Agora";

    dados.append(nome, tempo);
    cabecalho.append(avatar, dados);

    const mensagem = document.createElement("p");
    mensagem.className = "post-texto";
    mensagem.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "post-acoes";

    const like = document.createElement("button");
    like.className = "like-btn";
    like.innerHTML = '❤️ <span>0</span>';

    like.addEventListener("click", function() {
        curtir(like);
    });

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";

    comentarBtn.addEventListener("click", function() {
        mostrarComentario(comentarBtn);
    });

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "🔄 Compartilhar";

    compartilharBtn.addEventListener("click", function() {
        compartilhar(compartilharBtn);
    });

    acoes.append(like, comentarBtn, compartilharBtn);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";
    comentarios.hidden = true;

    const listaComentarios = document.createElement("div");
    listaComentarios.className = "lista-comentarios";

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    const enviar = document.createElement("button");
    enviar.textContent = "Enviar";

    enviar.addEventListener("click", function() {
        comentar(enviar);
    });

    comentarios.append(listaComentarios, campo, enviar);

    post.append(cabecalho, mensagem, acoes, comentarios);

    listaPosts.prepend(post);

    textoPost.value = "";

    verificarPesquisa();

}

// CURTIR PUBLICAÇÃO

function curtir(botao) {

    const contador = botao.querySelector("span");

    let total = Number(contador.textContent);

    total++;

    contador.textContent = total;

}

// MOSTRAR COMENTÁRIOS

function mostrarComentario(botao) {

    const post = botao.closest(".post");

    const comentarios = post.querySelector(".comentarios");

    comentarios.hidden = !comentarios.hidden;

}

// COMENTAR

function comentar(botao) {

    const area = botao.closest(".comentarios");

    const campo = area.querySelector("input");

    const lista = area.querySelector(".lista-comentarios");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");

    comentario.textContent = "👤 Alex Gamer: " + texto;

    lista.appendChild(comentario);

    campo.value = "";

}

// COMPARTILHAR

function compartilhar(botao) {

    const post = botao.closest(".post");

    const texto = post.querySelector(".post-texto").textContent;

    if (navigator.clipboard && window.isSecureContext) {

        navigator.clipboard.writeText(texto)
            .then(() => alert("Publicação copiada! 📋"))
            .catch(() => alert("Não foi possível copiar."));

    } else {

        alert("Publicação: " + texto);

    }

}

// SEGUIR USUÁRIO

function seguir(botao) {

    if (botao.textContent === "Seguir") {

        botao.textContent = "Seguindo";
        botao.style.background = "#555";

    } else {

        botao.textContent = "Seguir";
        botao.style.background = "#347cf6";

    }

}

// PESQUISAR PUBLICAÇÕES

pesquisa.addEventListener("input", verificarPesquisa);

function verificarPesquisa() {

    const texto = pesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    let encontrados = 0;

    posts.forEach(function(post) {

        const conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(texto)) {

            post.style.display = "block";
            encontrados++;

        } else {

            post.style.display = "none";

        }

    });

    semPosts.hidden = encontrados !== 0;

}

console.log("Connect Social iniciado!");

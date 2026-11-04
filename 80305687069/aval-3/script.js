function curtir(botao) {
    botao.classList.toggle("curtiu");

    if (botao.classList.contains("curtiu")) {
        botao.innerHTML = "♥";
    } else {
        botao.innerHTML = "♡";
    }
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {
        const area = post.querySelector(".comentarios");
        area.innerHTML += "💬 " + comentario + "<br>";
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "InstaVibe",
            text: "Veja esta publicação!"
        });
    } else {
        alert("Compartilhamento disponível no seu navegador!");
    }
}

function publicar() {
    const imagem = document.getElementById("imagem").value;
    const legenda = document.getElementById("legenda").value;

    if (!imagem.trim()) {
        alert("Adicione o link de uma foto!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const topo = document.createElement("div");
    topo.className = "post-topo";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=47";

    const nome = document.createElement("strong");
    nome.textContent = "Camila Vitória ✨";

    topo.append(avatar, nome);

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = imagem;
    foto.alt = "Foto publicada";

    foto.onerror = function() {
        alert("Não foi possível carregar essa imagem.");
        post.remove();
    };

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡";
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "↗";
    compartilharBtn.onclick = compartilhar;

    acoes.append(curtirBtn, comentarBtn, compartilharBtn);

    const likes = document.createElement("p");
    likes.className = "likes";
    likes.textContent = "❤️ 0 curtidas";

    const texto = document.createElement("p");
    const legendaTexto = document.createElement("span");
    legendaTexto.textContent = legenda;

    const usuario = document.createElement("strong");
    usuario.textContent = "Camila Vitória ";

    texto.append(usuario, legendaTexto);

    const comentarios = document.createElement("p");
    comentarios.className = "comentarios";

    post.append(topo, foto, acoes, likes, texto, comentarios);
    feed.prepend(post);

    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    alert("Publicação criada com sucesso! 💗");
}

function criarStory() {
    const link = prompt("Cole o link da foto para seu story:");

    if (link && link.trim() !== "") {
        const story = document.createElement("div");
        story.className = "story";

        const foto = document.createElement("img");
        foto.src = link;
        foto.alt = "Meu story";

        const nome = document.createElement("span");
        nome.textContent = "Seu story";

        story.append(foto, nome);
        document.querySelector(".stories").append(story);
    }
}

function mostrarNotificacao() {
    alert("Você não tem novas notificações! 💗");
}

function mostrarMensagem() {
    alert("Bem-vindo às mensagens do InstaVibe! 💌");
}
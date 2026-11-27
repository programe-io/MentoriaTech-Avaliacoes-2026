
function publicar() {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const publicacoes = document.getElementById("publicacoes");

    const novoPost = document.createElement("article");
    novoPost.className = "post";

    const usuario = document.createElement("div");
    usuario.className = "usuario";

    const foto = document.createElement("img");
    foto.src = "https://i.pravatar.cc/100?img=12";
    foto.alt = "Meu perfil";

    const identificacao = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Meu Perfil";

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    identificacao.append(nome, horario);
    usuario.append(foto, identificacao);

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "👍 Curtir ";

    const contador = document.createElement("span");
    contador.textContent = "0";
    botaoCurtir.append(contador);

    botaoCurtir.onclick = function () {
        curtir(botaoCurtir);
    };

    const botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function () {
        comentar(botaoComentar);
    };

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "↗ Compartilhar";
    botaoCompartilhar.onclick = compartilhar;

    acoes.append(botaoCurtir, botaoComentar, botaoCompartilhar);

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    novoPost.append(
        usuario,
        mensagem,
        acoes,
        comentarios
    );

    publicacoes.prepend(novoPost);
    campo.value = "";
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    let total = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        total--;
        botao.classList.remove("curtido");
    } else {
        total++;
        botao.classList.add("curtido");
    }

    contador.textContent = total;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    if (area.querySelector("input")) {
        area.querySelector("input").focus();
        return;
    }

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    campo.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const texto = campo.value.trim();

            if (texto !== "") {
                const comentario = document.createElement("p");
                comentario.textContent = "👤 Você: " + texto;

                area.insertBefore(comentario, campo);
                campo.value = "";
            }
        }
    });

    area.appendChild(campo);
    campo.focus();
}

function compartilhar() {
    alert("Você compartilhou esta publicação! 🚀");
}

// Pesquisa de publicações
document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.textContent
            .toLowerCase()
            .includes(termo) ? "block" : "none";
    });
});

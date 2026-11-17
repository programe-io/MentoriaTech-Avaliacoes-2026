
const campo = document.getElementById("texto-post");
const publicacoes = document.getElementById("publicacoes");
const contador = document.getElementById("contador");

// CONTADOR DE CARACTERES

campo.addEventListener("input", function() {
    contador.textContent = campo.value.length + "/280";
});

// PUBLICAR MENSAGEM

function publicarPost() {
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite alguma mensagem antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    // Cabeçalho da publicação
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-cabecalho";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "👤";

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = "Meu Usuário";

    const identificacao = document.createElement("span");
    identificacao.textContent = "@meuusuario · Agora";

    usuario.appendChild(nome);
    usuario.appendChild(identificacao);

    cabecalho.appendChild(avatar);
    cabecalho.appendChild(usuario);

    // Texto da publicação
    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    // Botões de interação
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoComentario = document.createElement("button");
    botaoComentario.textContent = "💬 Comentar";
    botaoComentario.onclick = function() {
        comentarPost(post);
    };

    const botaoCurtir = document.createElement("button");
    botaoCurtir.innerHTML = "❤️ <span>0</span>";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    const botaoCompartilhar = document.createElement("button");
    botaoCompartilhar.textContent = "🔁 Compartilhar";
    botaoCompartilhar.onclick = compartilhar;

    acoes.appendChild(botaoComentario);
    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoCompartilhar);

    // Montar publicação
    post.appendChild(cabecalho);
    post.appendChild(mensagem);
    post.appendChild(acoes);

    publicacoes.prepend(post);

    // Limpar campo
    campo.value = "";
    contador.textContent = "0/280";

    document.getElementById("aviso-notificacao").textContent =
        "Sua publicação foi criada com sucesso!";

    alert("Publicação realizada com sucesso!");

}

// CURTIR PUBLICAÇÃO

function curtir(botao) {
    const numero = botao.querySelector("span");

    if (!numero) return;

    let quantidade = Number(numero.textContent);

    if (botao.dataset.curtido === "sim") {
        quantidade--;
        botao.dataset.curtido = "nao";
        botao.style.color = "#657786";
    } else {
        quantidade++;
        botao.dataset.curtido = "sim";
        botao.style.color = "#e0245e";
    }

    numero.textContent = quantidade;
}

// COMENTAR PUBLICAÇÃO

function comentar() {
    comentarPost(null);
}

function comentarPost(post) {
    const texto = prompt("Digite seu comentário:");

    if (!texto || texto.trim() === "") {
        return;
    }

    if (post) {
        const comentario = document.createElement("p");

        comentario.textContent = "💬 Você: " + texto.trim();
        comentario.style.padding = "12px";
        comentario.style.color = "#657786";

        post.appendChild(comentario);
    } else {
        alert("Comentário: " + texto);
    }
}

// COMPARTILHAR PUBLICAÇÃO

function compartilhar() {
    const link = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: "Conecta",
            text: "Confira esta rede social!",
            url: link
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copiado com sucesso!"))
            .catch(() => alert("Não foi possível copiar o link."));
    } else {
        prompt("Copie o endereço para compartilhar:", link);
    }
}

// FOCAR NO CAMPO DE PUBLICAÇÃO

function focarPost() {
    campo.focus();

    campo.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

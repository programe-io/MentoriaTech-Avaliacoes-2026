
// TROCAR DE PÁGINA
function abrirPagina(id) {

    let paginas = document.querySelectorAll(".pagina");

    paginas.forEach(function(pagina) {
        pagina.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// CURTIR PUBLICAÇÃO
function curtir(botao) {

    let publicacao = botao.closest(".publicacao, .video-card");

    let contador = publicacao.querySelector(".contador");

    if (!contador) {
        contador = document.createElement("p");
        contador.className = "contador";
        contador.dataset.total = "0";
        publicacao.appendChild(contador);
    }

    let total = Number(contador.dataset.total || 0);

    if (botao.dataset.curtido === "sim") {

        total--;
        botao.dataset.curtido = "nao";
        botao.textContent = "♡ Curtir";

    } else {

        total++;
        botao.dataset.curtido = "sim";
        botao.textContent = "❤️ Curtido";
    }

    contador.dataset.total = total;
    contador.textContent = total + " curtidas";
}

// COMENTAR PUBLICAÇÃO
function comentar(botao) {

    let publicacao = botao.closest(".publicacao");

    let texto = prompt("O que você gostaria de comentar?");

    if (texto && texto.trim() !== "") {

        let comentario = document.createElement("p");

        comentario.textContent = "💬 Você: " + texto;

        publicacao.querySelector(".comentarios")
            .appendChild(comentario);
    }
}

// COMPARTILHAR
function compartilhar() {

    alert("Que legal! Você compartilhou esta publicação! 💙");
}

// CRIAR NOVA PUBLICAÇÃO
function adicionarPost() {

    let campo = document.getElementById("textoPost");

    let texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("article");
    post.className = "card publicacao";

    let autor = document.createElement("div");
    autor.className = "autor";

    let titulo = document.createElement("strong");
    titulo.textContent = "Você • Agora";

    autor.appendChild(titulo);

    let descricao = document.createElement("p");
    descricao.textContent = texto;

    let acoes = document.createElement("div");
    acoes.className = "acoes";

    let botaoCurtir = document.createElement("button");
    botaoCurtir.textContent = "♡ Curtir";
    botaoCurtir.onclick = function() {
        curtir(botaoCurtir);
    };

    let botaoComentar = document.createElement("button");
    botaoComentar.textContent = "💬 Comentar";
    botaoComentar.onclick = function() {
        comentar(botaoComentar);
    };

    acoes.append(botaoCurtir, botaoComentar);

    let contador = document.createElement("p");
    contador.className = "contador";
    contador.dataset.total = "0";
    contador.textContent = "0 curtidas";

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(
        autor,
        descricao,
        acoes,
        contador,
        comentarios
    );

    feed.prepend(post);

    campo.value = "";

    abrirPagina("inicio");

    alert("Sua publicação foi compartilhada! 💙");
}

// ENVIAR MENSAGEM
function enviarMensagem() {

    let campo = document.getElementById("mensagemTexto");

    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma mensagem primeiro!");
        return;
    }

    let historico = document.getElementById("historico");

    let mensagem = document.createElement("p");

    mensagem.className = "enviada";
    mensagem.textContent = texto;

    historico.appendChild(mensagem);

    campo.value = "";

    historico.scrollTop = historico.scrollHeight;
}

// TROCAR DE CONVERSA
function selecionarContato(nome) {

    document.getElementById("nomeContato").textContent =
        "Conversa com " + nome;

    let historico = document.getElementById("historico");

    historico.innerHTML = "";

    let aviso = document.createElement("p");

    aviso.className = "recebida";
    aviso.textContent = "Agora você está conversando com " + nome + ". 😊";

    historico.appendChild(aviso);
}

// ACEITAR SOLICITAÇÃO
function aceitarPedido(id) {

    let pedido = document.getElementById(id);

    let nome = pedido.querySelector("strong").textContent;

    pedido.remove();

    document.getElementById("resultadoPedido").textContent =
        "💙 Você aceitou a solicitação de " + nome + "!";

}

// RECUSAR SOLICITAÇÃO
function recusarPedido(id) {

    let pedido = document.getElementById(id);

    pedido.remove();

    document.getElementById("resultadoPedido").textContent =
        "Solicitação removida.";
}

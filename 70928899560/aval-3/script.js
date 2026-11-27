function curtir(botao) {

    if (botao.classList.contains("curtido")) {

        botao.innerHTML = "♡";
        botao.classList.remove("curtido");

    } else {

        botao.innerHTML = "❤️";
        botao.classList.add("curtido");

    }

}
function abrirComentarios(botao) {

    const postagem = botao.closest(".postagem");
    const comentarios = postagem.querySelector(".area-comentarios");

    if (comentarios.style.display === "block") {
        comentarios.style.display = "none";
    } else {
        comentarios.style.display = "block";
        comentarios.querySelector("input").focus();
    }

}

function publicarComentario(botao) {

    const area = botao.closest(".area-comentarios");
    const input = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.innerHTML = "";

    const nome = document.createElement("strong");
    nome.textContent = "Você: ";

    comentario.appendChild(nome);
    comentario.appendChild(document.createTextNode(texto));

    lista.appendChild(comentario);

    input.value = "";

}
function abrirMensagens() {
    document.getElementById("mensagens").style.display = "block";
}

function fecharMensagens() {
    document.getElementById("mensagens").style.display = "none";
    fecharChat();
}

function abrirChat(nome) {

    document.getElementById("nome-chat").textContent = nome;

    document.getElementById("chat").style.display = "flex";

    document.getElementById("historico").innerHTML = "";

    document.getElementById("texto-mensagem").focus();

}

function fecharChat() {
    document.getElementById("chat").style.display = "none";
}

function enviarMensagem() {

    const input = document.getElementById("texto-mensagem");

    const texto = input.value.trim();

    if (texto === "") {
        return;
    }

    const mensagem = document.createElement("div");

    mensagem.className = "mensagem-enviada";

    mensagem.textContent = texto;

    document.getElementById("historico").appendChild(mensagem);

    input.value = "";

    const historico = document.getElementById("historico");

    historico.scrollTop = historico.scrollHeight;

}
// ABRIR JANELA DE CRIAÇÃO

function abrirCriacao() {
    document.getElementById("modal-criar").style.display = "flex";
}

// FECHAR JANELA

function fecharCriacao() {
    document.getElementById("modal-criar").style.display = "none";
}

// PUBLICAR FOTO

function publicarPostagem() {

    const arquivo = document.getElementById("imagem-post").files[0];

    const legenda = document.getElementById("legenda-post").value.trim();

    if (!arquivo) {
        alert("Escolha uma imagem primeiro!");
        return;
    }

    if (!arquivo.type.startsWith("image/")) {
        alert("Escolha um arquivo de imagem válido!");
        return;
    }

    const imagem = URL.createObjectURL(arquivo);

    const postagem = document.createElement("section");

    postagem.className = "postagem";

    const titulo = document.createElement("h3");
    titulo.textContent = "📷 juliamiranda0_";

    const foto = document.createElement("img");
    foto.className = "foto";
    foto.src = imagem;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.innerHTML = `
        <button class="botao-curtir" onclick="curtir(this)">♡</button>
        <button class="botao-acao" onclick="abrirComentarios(this)">💬</button>
        <button class="botao-acao">↗</button>
    `;

    const curtidas = document.createElement("p");
    curtidas.innerHTML = "<strong>0 curtidas</strong>";

    const textoLegenda = document.createElement("p");
    const nome = document.createElement("strong");
    nome.textContent = "juliamiranda0_ ";

    textoLegenda.appendChild(nome);
    textoLegenda.appendChild(document.createTextNode(legenda));

    const comentarios = document.createElement("div");
    comentarios.className = "area-comentarios";

    comentarios.innerHTML = `
        <div class="lista-comentarios"></div>

        <div class="novo-comentario">
            <input type="text" placeholder="Adicione um comentário...">
            <button onclick="publicarComentario(this)">Publicar</button>
        </div>
    `;

    postagem.append(
        titulo,
        foto,
        acoes,
        curtidas,
        textoLegenda,
        comentarios
    );

    const stories = document.querySelector(".stories");

    stories.insertAdjacentElement("afterend", postagem);

    document.getElementById("imagem-post").value = "";
    document.getElementById("legenda-post").value = "";

    fecharCriacao();

    alert("Publicação realizada com sucesso! ❤️");
}
// ABRIR PERFIL

function abrirPerfil() {

    document.querySelector("main").style.display = "none";

    const perfil = document.getElementById("perfil-pagina");

    perfil.style.display = "block";

    atualizarPerfil();

}

// VOLTAR PARA O FEED

function voltarInicio() {

    document.querySelector("main").style.display = "block";

    document.getElementById("perfil-pagina").style.display = "none";

}

// ATUALIZAR PUBLICAÇÕES DO PERFIL

function atualizarPerfil() {

    const grade = document.getElementById("grade-perfil");

    const postagens = document.querySelectorAll("main .postagem");

    grade.innerHTML = "";

    postagens.forEach(postagem => {

        const foto = postagem.querySelector(".foto");

        if (foto) {

            const imagem = document.createElement("img");

            imagem.src = foto.src;

            grade.appendChild(imagem);

        }

    });

    document.getElementById("total-posts").textContent = postagens.length;

}

// EDITAR PERFIL

function editarPerfil() {

    const novoNome = prompt("Digite seu nome de usuário:");

    if (novoNome && novoNome.trim() !== "") {

        document.querySelector(".nome-perfil h2").textContent =
            novoNome.trim();

    }

}
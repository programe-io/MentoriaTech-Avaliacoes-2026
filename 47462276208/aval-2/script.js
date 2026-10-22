
/* =====================================
   MINI FEED - ENZO VINICIUS
   TEMA: CARROS, TUNAGEM E PERFORMANCE
===================================== */

// ELEMENTOS PRINCIPAIS
const botaoPublicar = document.querySelector(".new-post button");
const areaNovaPostagem = document.querySelector(".new-post");

// NOME E INICIAL DO USUARIO
const nomeUsuario = "Enzo Vinicius";
const iniciaisUsuario = "EV";

// PUBLICAR UMA NOVA POSTAGEM
botaoPublicar.addEventListener("click", function () {
    const texto = prompt(
        "🚗 Enzo Vinicius - Compartilhe uma novidade sobre carros, tunagem ou performance:"
    );

    if (texto === null || texto.trim() === "") {
        return;
    }

    // CRIAR POSTAGEM
    const postagem = document.createElement("article");
    postagem.className = "post";

    // CABECALHO
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = iniciaisUsuario;

    const usuario = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = nomeUsuario;

    const tempo = document.createElement("span");
    tempo.textContent = "Agora • Mundo Automotivo";

    usuario.append(nome, tempo);
    cabecalho.append(avatar, usuario);

    // TEXTO
    const mensagem = document.createElement("p");
    mensagem.className = "post-text";
    mensagem.textContent = "🏎️ " + texto;

    // BOTOES
    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    const curtir = document.createElement("button");
    curtir.textContent = "❤️ Curtir";

    const comentar = document.createElement("button");
    comentar.textContent = "💬 Comentar";

    acoes.append(curtir, comentar);

    // MONTAR A POSTAGEM
    postagem.append(cabecalho, mensagem, acoes);

    // MOSTRAR NO FEED
    areaNovaPostagem.after(postagem);

    // ATIVAR OS BOTOES
    adicionarAcoes(postagem);
});

// FUNCOES DE CURTIR E COMENTAR
function adicionarAcoes(postagem) {
    const botoes = postagem.querySelectorAll(".post-actions button");

    const curtir = botoes[0];
    const comentar = botoes[1];

    // CURTIR E DESCURTIR
    curtir.addEventListener("click", function () {
        if (curtir.textContent.includes("Curtido")) {
            curtir.textContent = "❤️ Curtir";
        } else {
            curtir.textContent = "❤️ Curtido";
        }
    });

    // ADICIONAR COMENTARIO
    comentar.addEventListener("click", function () {
        const textoComentario = prompt(
            "💬 Escreva um comentário sobre carros:"
        );

        if (
            textoComentario === null ||
            textoComentario.trim() === ""
        ) {
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.className = "comentario";
        novoComentario.textContent = "💬 " + textoComentario;

        postagem.append(novoComentario);
    });
}

// ATIVAR BOTOES DAS POSTAGENS QUE JA EXISTEM
document.querySelectorAll(".post").forEach(function (postagem) {
    adicionarAcoes(postagem);
});

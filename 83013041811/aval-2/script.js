
const campo = document.getElementById("mensagem");
const listaPosts = document.getElementById("lista-posts");
const btnPublicar = document.getElementById("btnPublicar");

// Publicar uma nova postagem
function publicarPost() {
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva algo antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const cabecalho = document.createElement("div");
    cabecalho.className = "cabecalho";

    const autor = document.createElement("span");
    autor.className = "autor";
    autor.textContent = "Você";

    const data = document.createElement("span");
    data.className = "data";
    data.textContent = new Date().toLocaleString("pt-BR");

    cabecalho.append(autor, data);

    const conteudo = document.createElement("p");
    conteudo.className = "texto";
    conteudo.textContent = texto;

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "curtir";
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';

    post.append(cabecalho, conteudo, botaoCurtir);

    listaPosts.prepend(post);
    campo.value = "";
}

// Curtir uma postagem
function curtir(botao) {
    const contador = botao.querySelector("span");
    contador.textContent = Number(contador.textContent) + 1;
}

// Eventos dos botões
btnPublicar.addEventListener("click", publicarPost);

listaPosts.addEventListener("click", function(evento) {
    const botao = evento.target.closest(".curtir");

    if (botao && listaPosts.contains(botao)) {
        curtir(botao);
    }
});

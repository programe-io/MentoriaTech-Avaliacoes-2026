const nome = document.getElementById("nome");
const mensagem = document.getElementById("mensagem");
const publicar = document.getElementById("publicar");
const feed = document.getElementById("feed");

publicar.addEventListener("click", function () {

    const nomeUsuario = nome.value.trim();
    const textoPost = mensagem.value.trim();

    if (nomeUsuario === "" || textoPost === "") {
        alert("Preencha o nome e a mensagem.");
        return;
    }

    criarPost(nomeUsuario, textoPost);

    nome.value = "";
    mensagem.value = "";
});


function criarPost(nomeUsuario, textoPost) {

    const post = document.createElement("div");

    post.classList.add("post");

    const titulo = document.createElement("h3");
    titulo.textContent = nomeUsuario;

    const texto = document.createElement("p");
    texto.textContent = textoPost;

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const botaoCurtir = document.createElement("button");
    botaoCurtir.classList.add("curtir");

    let curtidas = 0;

    botaoCurtir.innerHTML = `
        👍 Curtir
        <span>${curtidas}</span>
    `;

    botaoCurtir.addEventListener("click", function () {

        curtidas++;

        botaoCurtir.innerHTML = `
            👍 Curtir
            <span>${curtidas}</span>
        `;

    });


    const botaoExcluir = document.createElement("button");

    botaoExcluir.classList.add("excluir");

    botaoExcluir.textContent = "🗑 Excluir";

    botaoExcluir.addEventListener("click", function () {
        post.remove();
    });


    acoes.appendChild(botaoCurtir);
    acoes.appendChild(botaoExcluir);

    post.appendChild(titulo);
    post.appendChild(texto);
    post.appendChild(acoes);

    feed.prepend(post);
}


/* Ativa os botões do post que já existe no HTML */

document.querySelectorAll(".curtir").forEach(function (botao) {

    let curtidas = 0;

    botao.addEventListener("click", function () {

        curtidas++;

        botao.querySelector("span").textContent = curtidas;

    });

});


document.querySelectorAll(".excluir").forEach(function (botao) {

    botao.addEventListener("click", function () {

        botao.closest(".post").remove();

    });

});
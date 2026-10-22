
const formulario = document.getElementById("postForm");
const nome = document.getElementById("nome");
const mensagem = document.getElementById("mensagem");
const publicacoes = document.getElementById("publicacoes");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeUsuario = nome.value.trim();
    const texto = mensagem.value.trim();

    if (!nomeUsuario || !texto) {
        alert("Preencha todos os campos!");
        return;
    }

    const postagem = document.createElement("article");
    postagem.className = "publicacao";

    const autor = document.createElement("h3");
    autor.textContent = "⚽ " + nomeUsuario;

    const conteudo = document.createElement("p");
    conteudo.textContent = texto;

    postagem.appendChild(autor);
    postagem.appendChild(conteudo);

    publicacoes.prepend(postagem);

    formulario.reset();
});

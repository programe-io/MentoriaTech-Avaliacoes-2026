
const formulario = document.getElementById("postForm");
const posts = document.getElementById("posts");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const conteudo = document.getElementById("conteudo").value;

    const novoPost = document.createElement("article");
    novoPost.classList.add("post");

    const novoTitulo = document.createElement("h3");
    novoTitulo.textContent = titulo;

    const novoConteudo = document.createElement("p");
    novoConteudo.textContent = conteudo;

    const data = document.createElement("small");
    data.textContent = "Publicado em " + new Date().toLocaleDateString("pt-BR");

    novoPost.appendChild(novoTitulo);
    novoPost.appendChild(novoConteudo);
    novoPost.appendChild(data);

    posts.prepend(novoPost);

    formulario.reset();

    alert("Publicação adicionada com sucesso!");
});
